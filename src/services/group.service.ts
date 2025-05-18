import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GroupDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  getGroups(): Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(`${this.apiUrl}/group`);
  }
}