import { Test, TestingModule } from '@nestjs/testing';
import { GManController } from './GMan.controller';

describe('GManController', () => {
  let controller: GManController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GManController],
    }).compile();

    controller = module.get<GManController>(GManController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
