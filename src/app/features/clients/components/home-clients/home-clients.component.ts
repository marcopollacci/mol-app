import { Component, inject } from '@angular/core';
import { ClientsService } from '@features/clients/services/clients.service';

@Component({
  selector: 'app-home-clients',
  imports: [],
  templateUrl: './home-clients.component.html',
  styleUrl: './home-clients.component.scss',
})
export class HomeClientsComponent {
  #clientsService = inject(ClientsService);
  clients$ = this.#clientsService.getAllClients();
}
