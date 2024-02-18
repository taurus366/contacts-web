import { TestBed } from '@angular/core/testing';

import { SharedModule } from './shared.module';

describe('SharedService', () => {
  let service: SharedModule;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
