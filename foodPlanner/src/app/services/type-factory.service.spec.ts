import { TestBed } from '@angular/core/testing';

import { TypeFactoryService } from './type-factory.service';

describe('TypeFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeFactoryService = TestBed.get(TypeFactoryService);
    expect(service).toBeTruthy();
  });
});
