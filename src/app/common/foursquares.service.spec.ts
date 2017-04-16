import { TestBed, inject } from '@angular/core/testing';

import { FoursquaresService } from './foursquares.service';

describe('FoursquaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoursquaresService]
    });
  });

  it('should ...', inject([FoursquaresService], (service: FoursquaresService) => {
    expect(service).toBeTruthy();
  }));
});
