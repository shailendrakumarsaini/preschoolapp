import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrganizationService } from './orgarnization.service';
import { Router } from '@angular/router';
import { MyOption } from 'src/app/models/my-options';
import { oraganization } from 'src/app/models/organization';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  oraganization;
  constructor(private organizationService: OrganizationService, private router: Router) { }
 
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };
    this.getAllOrganizations(); 
  }

  getAllOrganizations() {
    this.organizationService.getOrganizations().subscribe(data => {
      this.oraganization = data['result'];
      this.dtTrigger.next();
    });
  }

  editOrganization(id) {
    this.router.navigate(['/admin', 'createorg', id]);
  }
  createOrganization() {
    this.router.navigate(['/admin', 'createorg',0]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
