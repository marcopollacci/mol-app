import { Component, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ClientInterface } from '@common/interfaces/clients';
import { ClientsService } from '@features/clients/services/clients.service';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-home-clients',
  imports: [ReactiveFormsModule],
  templateUrl: './home-clients.component.html',
  styleUrl: './home-clients.component.scss',
})
export class HomeClientsComponent implements OnInit {
  #clientsService = inject(ClientsService);
  clients$ = rxResource({
    loader: () => this.#clientsService.getAllClients(),
    defaultValue: [],
  });
  readonly #fb = inject(FormBuilder);

  searchForm = this.#fb.group({
    search: [''],
  });

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(({ search }) =>
          this.#clientsService.searchClient(search || '')
        )
      )
      .subscribe((data: ClientInterface[]) => {
        this.clients$.set(data);
      });
  }
}
