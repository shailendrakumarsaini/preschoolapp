import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PublisherService } from './publisher.service';
import { Router } from '@angular/router';
import { Publisher } from 'src/app/models/publisher';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit,OnDestroy {

  
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  publisher : Publisher[] = [];



  constructor(private fb: FormBuilder, private publisherService: PublisherService, private route: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };
    this.getAllPublishers();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAllPublishers() {
    this.publisherService.getPublishers().subscribe(data => {
      this.publisher = data['result'];
      this.dtTrigger.next();
    });
  }

  editPublisher(item) {
    sessionStorage.setItem("publisher",JSON.stringify(item));
    this.route.navigate(['admin', 'createpublisher',1]);
  }
  deletePublisher(id){
    this.publisherService.deletePublisher(id).subscribe(data=>{
      debugger;
      if(data['result'].statusCode=="200"){
        this.toastr.success('publisher deleted')
      }
    });
  }
  createPublisher() { 
    this.route.navigate(['admin', 'createpublisher', 0]);
  }
}
