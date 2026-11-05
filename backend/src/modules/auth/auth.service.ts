import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Initialiser l'admin par défaut au démarrage si la table est vide
    try {
      const defaultUsername = this.configService.get<string>('ADMIN_USERNAME', 'admin');
      const defaultPassword = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');
      const existing = await this.userRepository.findOne({ where: { username: defaultUsername } });
      
      if (!existing) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        const admin = this.userRepository.create({
          username: defaultUsername,
          password: hashedPassword,
          role: 'ADMIN',
        });
        await this.userRepository.save(admin);
        console.log(`[AuthService] Compte administrateur initialisé (${defaultUsername})`);
      }
    } catch {
      // Ignorer si la base de données n'est pas encore connectée
    }
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; user: { username: string; role: string } }> {
    const user = await this.userRepository.findOne({ where: { username: dto.username } });
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        username: user.username,
        role: user.role,
      },
    };
  }

  async validateUser(payload: { sub: number; username: string }): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: payload.sub } });
  }
}
