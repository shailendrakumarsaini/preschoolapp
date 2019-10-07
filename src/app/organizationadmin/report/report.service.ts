import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http :HttpClient) { }

  getStudentsReportsData(organizationId, branchId){
    return this.http.get(`${environment.devApiUrl}users/fetchUsers?role=student&organizationId=${organizationId}&branchId=${branchId}`)
  }
}
