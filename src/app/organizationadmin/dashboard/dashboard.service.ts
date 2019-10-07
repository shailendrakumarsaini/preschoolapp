import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http :HttpClient) { }

  getOrganizationsById(organizationId){
    return this.http.get(environment.devApiUrl+'organizations/' + organizationId);
  }

  getStudentsDataForSchoolByPayments(organizationId){
    return this.http.get(`${environment.devApiUrl}reports/orgAdminPaymentReport?id=${organizationId}`);
  }

  getStudentsDataForSchoolBySkills(organizationId){
    return this.http.get(`${environment.devApiUrl}reports/orgAdminSkillReport?organizationId=${organizationId}`);
  }

}