import { Test, TestingModule } from '@nestjs/testing';
import { AuthOrgController } from './auth-org.controller';

describe('AuthOrgController', () => {
  let controller: AuthOrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthOrgController],
    }).compile();

    controller = module.get<AuthOrgController>(AuthOrgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
