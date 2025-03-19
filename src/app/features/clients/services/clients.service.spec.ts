import { TestBed } from '@angular/core/testing';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
      ],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return empty array if error', () => {
    TestBed.runInInjectionContext(() => {
      spyOn(http, 'get').and.throwError('error');
      const result = service.getAllClients();
      expect(result.value()).toEqual([]);
    });
  });
});
