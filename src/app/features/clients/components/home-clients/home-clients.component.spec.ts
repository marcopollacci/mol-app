import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ClientsService } from '@features/clients/services/clients.service';
import { HomeClientsComponent } from './home-clients.component';

describe('HomeClientsComponent', () => {
  let component: HomeClientsComponent;
  let fixture: ComponentFixture<HomeClientsComponent>;
  let clientService: ClientsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeClientsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
      ],
    }).compileComponents();

    clientService = TestBed.inject(ClientsService);
    fixture = TestBed.createComponent(HomeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get clients', () => {
    const spy = spyOn(clientService, 'getAllClients').and.callThrough();
    fixture = TestBed.createComponent(HomeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
