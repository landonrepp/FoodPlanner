import { TestBed } from '@angular/core/testing';

import { LinkItemsService } from './link-items.service';

describe('LinkItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkItemsService = TestBed.get(LinkItemsService);
    expect(service).toBeTruthy();
  });
});
