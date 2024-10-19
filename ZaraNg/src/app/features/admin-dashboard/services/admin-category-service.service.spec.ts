import { TestBed } from '@angular/core/testing';

import { AdminCategoryServiceService } from './admin-category-service.service';

describe('AdminCategoryServiceService', () => {
  let service: AdminCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
