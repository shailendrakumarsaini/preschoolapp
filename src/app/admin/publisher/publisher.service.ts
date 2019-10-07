import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
     providedIn:"root"
})

export class PublisherService{
    constructor(private http:HttpClient){}

    savePublisher(data){
        return this.http.post(environment.devApiUrl+'publishers',data).pipe(map(data=>{
            return data;
        }))
    }

   getPublishers(){
        return this.http.get(environment.devApiUrl+'publishers').pipe(map(data=>{
            return data;
        }))
    }

    updatePublisher(data){
        return this.http.put(environment.devApiUrl+"publishers/"+data._id,data).pipe(map(data=>{
            return data;
        }))
    }

    deletePublisher(id){
        return this.http.delete(environment.devApiUrl+'publishers/'+id).pipe(map(data=>{
            debugger;
            return data;
        }))
    }
}