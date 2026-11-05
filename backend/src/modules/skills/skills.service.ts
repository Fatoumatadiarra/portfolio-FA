import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Compétence #${id} introuvable`);
    }
    return skill;
  }

  async create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(dto);
    return this.skillRepository.save(skill);
  }

  async update(id: number, dto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, dto);
    return this.skillRepository.save(skill);
  }

  async remove(id: number): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillRepository.remove(skill);
  }
}
