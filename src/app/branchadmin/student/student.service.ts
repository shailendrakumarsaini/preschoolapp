import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getStudentsByBranch(branchId, gradeId, paymentStatus){
    var url = `users/${branchId}/getStudentsByBranch`;
    if(gradeId && paymentStatus){
      url += `?gradeId=${gradeId}&paymentStatus=${paymentStatus}`;
    }else if(gradeId){
      url += `?gradeId=${gradeId}`;
    }else if(paymentStatus){
      url += `?paymentStatus=${paymentStatus}`;
    }
    return this.http.get(`${environment.devApiUrl}${url}`);
  }

  getUserInfo(userId){
    return this.http.get(`${environment.devApiUrl}users/${userId}/getProfile`);
  }

  updateStudent(data){
    this.http.post(`${environment.devApiUrl}users/updateProfile`, data);
  }

}
