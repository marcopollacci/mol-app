import { Injectable } from '@angular/core';
import { ClientInterface } from '@common/interfaces/clients';
import { CommonService } from '@common/services/common.service';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends CommonService {
  getAllClients() {
    return this.http
      .get<ClientInterface[]>(`${this.basePath}/client/findAll`)
      .pipe(catchError(() => of([])));
  }

  searchClient(search: string) {
    if (!search) {
      return this.getAllClients();
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
