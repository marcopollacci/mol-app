import { Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClientInterface } from '@common/interfaces/clients';
import { CommonService } from '@common/services/common.service';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends CommonService {
  getAllClients() {
    return rxResource({
      loader: () =>
        this.http
          .get<ClientInterface[]>(`${this.basePath}/client/findAll`)
          .pipe(catchError(() => of([]))),
      defaultValue: [],
    });
  }
}
