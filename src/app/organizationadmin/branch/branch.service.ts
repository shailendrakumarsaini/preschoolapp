import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }

  getBranches(organizationId){
    return this.http.get(environment.devApiUrl +'branches/'+ organizationId);
  }

  getBranchDetails(branchId){
    return this.http.get(environment.devApiUrl +'branches?branchId='+ branchId);
  }

  createBranches(data){
    return this.http.post(environment.devApiUrl +'branches', data);
  }

  updateBranch(branchId, data){
    return this.http.put(environment.devApiUrl +'branches/'+branchId, data);
  }
 
  
}
