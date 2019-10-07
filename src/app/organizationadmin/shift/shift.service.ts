import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:"root"
})

export class ShiftService{
    constructor(private http:HttpClient){}


    getAllShifts(orgId){
        return this.http.get(environment.devApiUrl + 'shifts/?organizationId=' + orgId ).pipe(map(data=>{
            return data;
        }))
    }

    CreateShiftsByOrganizations(data){
        return this.http.post(`${environment.devApiUrl}shifts`, data);
    }

    updateShiftByOrganizations(data, shiftId){
        return this.http.put(`${environment.devApiUrl}shifts/${shiftId}`, data);
    }

}