import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http:HttpClient) { }

  getRegisteredSectionsNames(organizationId){
    return this.http.get(environment.devApiUrl +'sections?organizationId=' + organizationId);
  }

  CreateSectionsByOrganizations(data){
    return this.http.post(environment.devApiUrl +'sections', data);
  }

  updateSectionsByOrganizations(sectionId, data){
    return this.http.put(environment.devApiUrl +'sections/'+ sectionId, data);
  }
  
}
