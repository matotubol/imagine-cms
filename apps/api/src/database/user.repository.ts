import {UserEntity} from './user.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {HashService} from '../common/hash.service';
import {Repository, FindOptionsWhere} from 'typeorm';
import {BaseRepository} from '../utility/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) profileRepo: Repository<UserEntity>,
    private readonly hashService: HashService
  ) {
    super(profileRepo);
  }

  async create(newEntity: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return super.create({
      ...newEntity,
      password: this.hashService.generate(newEntity.password),
    });
  }

  async update(conditions: FindOptionsWhere<UserEntity>, changes: Partial<UserEntity>): Promise<void> {
    return super.update(conditions, {
      ...changes,
      password: changes.password ? this.hashService.generate(changes.password) : undefined,
    });
  }
}
