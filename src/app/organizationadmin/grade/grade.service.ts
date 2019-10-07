import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http:HttpClient) { }
 
  getClassNames (organizationId){
    return this.http.get(environment.devApiUrl +'grades?organizationId=' + organizationId); 
  }

  CreateClassesByOrganizations(data){
    return this.http.post(environment.devApiUrl +'grades', data); 
  }

  updateClassesByOrganizations(data, id){
    return this.http.put(environment.devApiUrl +'grades/'+id, data);
  }

  getClassesByBranches(orgId, branchId){
    return this.http.get(`${environment.devApiUrl}classes?organizationId=${orgId}&branchId=${branchId}`);
  }

 
}
