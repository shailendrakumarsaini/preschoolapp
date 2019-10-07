import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  getPaymentsBygrades(branchId, organizationId){
    return this.http.get(`${environment.devApiUrl}reports/branchAdminPaymentReport?branchId=${branchId}&organizationId=${organizationId}`);
  }
}
