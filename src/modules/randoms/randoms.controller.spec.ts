import { Test, TestingModule } from '@nestjs/testing';
import { RandomsController } from './randoms.controller';
import { RandomsService } from './randoms.service';

describe('RandomsController', () => {
  let controller: RandomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomsController],
      providers: [RandomsService]
    }).compile();

    controller = module.get<RandomsController>(RandomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
