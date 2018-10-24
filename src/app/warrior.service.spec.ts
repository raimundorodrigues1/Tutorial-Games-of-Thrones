import { TestBed } from '@angular/core/testing';

import { WarriorService } from './warrior.service';

describe('WarriorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarriorService = TestBed.get(WarriorService);
    expect(service).toBeTruthy();
  });
});
