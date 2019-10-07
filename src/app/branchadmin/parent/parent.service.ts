import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http:HttpClient) { }

  getParent(id){
    return this.http.get(`${environment.devApiUrl}users/${id}/getProfile?role=parent`);
  }

  createParent(data){
    return this.http.post(`${environment.devApiUrl}users`, data);
  }

}
