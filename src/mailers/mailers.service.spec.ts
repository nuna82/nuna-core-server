import { Test, TestingModule } from '@nestjs/testing';
import { MailersService } from './mailers.service';

describe('MailersService', () => {
  let service: MailersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailersService],
    }).compile();

    service = module.get<MailersService>(MailersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
