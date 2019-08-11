import { TestBed } from '@angular/core/testing';

import { GetNutritionalInformationService } from './get-nutritional-information.service';

describe('GetNutritionalInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNutritionalInformationService = TestBed.get(GetNutritionalInformationService);
    expect(service).toBeTruthy();
  });
});
