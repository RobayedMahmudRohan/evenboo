import { Test, TestingModule } from '@nestjs/testing';
import { AuthOrgService } from './auth-org.service';

describe('AuthOrgService', () => {
  let service: AuthOrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthOrgService],
    }).compile();

    service = module.get<AuthOrgService>(AuthOrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
