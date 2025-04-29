import { Test, TestingModule } from '@nestjs/testing';
import { GenerateUsernameService } from './generate_username.service';

describe('GenerateUsernameService', () => {
  let service: GenerateUsernameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateUsernameService],
    }).compile();

    service = module.get<GenerateUsernameService>(GenerateUsernameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
