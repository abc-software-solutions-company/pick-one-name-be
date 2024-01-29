import { Test, TestingModule } from '@nestjs/testing';
import { RandomsService } from './randoms.service';

describe('RandomsService', () => {
  let service: RandomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomsService]
    }).compile();

    service = module.get<RandomsService>(RandomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
