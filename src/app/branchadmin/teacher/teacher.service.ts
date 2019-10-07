import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class TeacherService {
    constructor(private http: HttpClient) { }

    getAllTeachers(orgId, branchId, role) {
        return this.http.get(environment.devApiUrl + 'users/fetchUsers?organizationId=' + orgId + '&branchId=' + branchId + '&role=' + role);
    }

    save(data) {
        return this.http.post(environment.devApiUrl + 'users', data).pipe(map(data => {
            return data;
        }));
    }

    updateTeacher(data){
        return this.http.put(environment.devApiUrl + 'users', data).pipe(map(data => {
            return data;
        }));
    }

    getUserProfile(studentId, studentRole){
        return this.http.get(`${environment.devApiUrl}users/${studentId}/getProfile?role=${studentRole}`)
    }
}