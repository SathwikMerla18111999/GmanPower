import { Test, TestingModule } from '@nestjs/testing';
import { GManService } from './gman.service';

describe('Service', () => {
  let service: GManService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GManService],
    }).compile();

    service = module.get<GManService>(GManService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
