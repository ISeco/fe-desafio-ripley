import { TestBed } from '@angular/core/testing';

import { PasswordSecurityService } from './password-security.service';

describe('PasswordSecurityService', () => {
  let service: PasswordSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
