import { Injectable, signal } from '@angular/core';
import { ClientInterface } from '@common/interfaces/clients';
import { CommonService } from '@common/services/common.service';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends CommonService {
  #allClientFetched = signal<ClientInterface[]>([]);

  getAllClients() {
    return this.http
      .get<ClientInterface[]>(`${this.basePath}/client/findAll`)
      .pipe(
        tap((data) => this.#allClientFetched.set(data)),
        catchError(() => of([]))
      );
  }

  searchClient(search: string) {
    if (!search) {
      return of(this.#allClientFetched());
    }
    return this.http
      .get<ClientInterface[]>(`${this.basePath}/client/${search}`)
      .pipe(
        catchError(() => {
          return of([]);
        })
      );
  }
}
