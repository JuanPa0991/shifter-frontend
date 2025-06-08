import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TurnDTO {
  id: number;
  initDate: string;
  endDate: string;
  userName: string;
  initHour: string;
  endHour: string;
  userId: number;
  groupId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getTurns(): Observable<TurnDTO[]> {
    return this.http.get<TurnDTO[]>(`${ this.apiUrl }/turns/all`);
  }

  registrarTurno(payload: TurnDTO): Observable<TurnDTO[]> {
    return this.http.post<TurnDTO[]>(`${ this.apiUrl }/turn`, payload);
  }

  deleteTurn(id: number) {
    return this.http.delete(`${ this.apiUrl }/turns/${ id }`);
  }
}
