import { TestBed } from '@angular/core/testing';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ClientInterface } from '@common/interfaces/clients';
import { of, throwError } from 'rxjs';
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

  describe('searchClient', () => {
    it('should return an array of clients if exist searched value', () => {
      const mockClient: ClientInterface[] = [
        { ndg: 1, name: 'Client 1' },
        { ndg: 2, name: 'Client 2' },
      ];
      const mockResponse = of(mockClient);
      spyOn(http, 'get').and.returnValue(mockResponse);
      service.searchClient('Client').subscribe((data) => {
        expect(data).toEqual(mockClient);
      });
    });
    it('if no value is searched, should return all clients', () => {
      const mockClient: ClientInterface[] = [
        { ndg: 1, name: 'Client 1' },
        { ndg: 2, name: 'Client 2' },
      ];
      const mockResponse = of(mockClient);
      spyOn(http, 'get').and.returnValue(mockResponse);
      service.searchClient('').subscribe((data) => {
        expect(data).toEqual(mockClient);
      });
    });
    it('should return empty array if error', () => {
      spyOn(http, 'get').and.returnValue(throwError(() => 'error'));
      service.searchClient('Client').subscribe((data) => {
        console.log('🚀 ~ service.searchClient ~ data:', data);
        expect(data).toEqual([]);
      });
    });
  });

  // it('return empty array if error', () => {
  //   TestBed.runInInjectionContext(() => {
  //     spyOn(http, 'get').and.throwError('error');
  //     const result = service.getAllClients();
  //     expect(result.value()).toEqual([]);
  //   });
  // });
});
