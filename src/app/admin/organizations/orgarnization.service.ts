import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    constructor(private http: HttpClient) {

    }

    getOrganizations() {
        return this.http.get(environment.devApiUrl + 'organizations').pipe(map(data => {
            return data;
        }));
    }


    getOrganizationById(orgId) {
        return this.http.get(environment.devApiUrl + 'organizations/' + orgId).pipe(map(data => {
            return data;
        }))
    }


    saveOrganization(data) {
        return this.http.post(environment.devApiUrl + "organizations", data).pipe(map(data => {
            return data;
        }));
    }

    updateOrganization(data) {
        return this.http.put(environment.devApiUrl + "organizations/"+data._id, data).pipe(map(data => {
            return data;
        }));
    }
}