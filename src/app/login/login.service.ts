import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable( { 
  providedIn : "root" 
})
  export class LoginService {

    constructor(private http:HttpClient ) {}

     login(data){
       return this.http.post("http://d70c7b1b.ngrok.io/auth/mps/local", data).pipe(map(data =>{
      //  return this.http.post("http://dev.bulbulstudio.com/auth/local", data).pipe(map(data =>{
        debugger
            if(data['result'].user.role == 'admin'){
              sessionStorage.setItem('role',data['result'].user.role);
            }
            else if(data['result'].user.role == 'orgAdmin'){
              data['result'];
              sessionStorage.setItem('organizationId',data['result'].user.orgAdmin.organizationId);
              sessionStorage.setItem('role',data['result'].user.role);
            }else if(data['result'].user.role == 'branchAdmin'){
              sessionStorage.setItem('organizationId',data['result'].user.branchAdmin.organizationId);
              sessionStorage.setItem('branchId',data['result'].user.branchAdmin.branchId);
              sessionStorage.setItem('role',data['result'].user.role);
            } else if(data['result'].user.role == 'publisher'){
              sessionStorage.setItem('organizationId',data['result'].user.publisher.organizationId);
              sessionStorage.setItem('publisherId',data['result'].user.publisher.publisherId);
              sessionStorage.setItem('role',data['result'].user.role);
            } 
            else{
              sessionStorage.setItem('role',data['result'].user.role);
            }

            var userInfo = {
              accessToken: data['result'].token,
              userName: data['result'].user.firstName,
              userId: data['result'].user._id,
              token: null,
              role : sessionStorage.getItem('role'),
              organizationId: sessionStorage.getItem('organizationId'),
              branchId: sessionStorage.getItem('branchId')
            };
            return userInfo;
          })
        ); 
     }

  }