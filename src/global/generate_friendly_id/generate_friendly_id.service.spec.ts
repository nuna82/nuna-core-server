import { Test, TestingModule } from '@nestjs/testing';
import { GenerateFriendlyIdService } from './generate_friendly_id.service';

describe('GenerateFriendlyIdService', () => {
  let service: GenerateFriendlyIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateFriendlyIdService],
    }).compile();

    service = module.get<GenerateFriendlyIdService>(GenerateFriendlyIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
