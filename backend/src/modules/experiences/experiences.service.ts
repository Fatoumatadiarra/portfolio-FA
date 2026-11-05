import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find({
      order: { dateDebut: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    if (!experience) {
      throw new NotFoundException(`Expérience #${id} introuvable`);
    }
    return experience;
  }

  async create(dto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experienceRepository.create(dto);
    return this.experienceRepository.save(experience);
  }

  async update(id: number, dto: UpdateExperienceDto): Promise<Experience> {
    const experience = await this.findOne(id);
    Object.assign(experience, dto);
    return this.experienceRepository.save(experience);
  }

  async remove(id: number): Promise<void> {
    const experience = await this.findOne(id);
    await this.experienceRepository.remove(experience);
  }
}
