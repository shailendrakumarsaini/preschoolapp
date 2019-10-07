import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShiftService } from '../shift.service';
import { OrganizationService } from 'src/app/admin/organizations/orgarnization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createshift',
  templateUrl: './createshift.component.html',
  styleUrls: ['./createshift.component.css']
})
export class CreateshiftComponent implements OnInit, OnDestroy {
  shiftForm: FormGroup;
  organizations;
  dropdownList = [
      { item_id: 'Monday', item_text: 'Monday' },
      { item_id: 'Tuesday', item_text: 'Tuesday' },
      { item_id: 'Wednesday', item_text: 'Wednesday' },
      { item_id: 'Thursday', item_text: 'Thursday' },
      { item_id: 'Friday', item_text: 'Friday' },
      { item_id: 'Saturday', item_text: 'Saturday' },
      { item_id: 'Sunday', item_text: 'Sunday' }
    ];

  dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text', 
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      // allowSearchFilter: true
    };
  organizationId;
  loading = false;
  btnName = "Create";

  constructor(
    private fb: FormBuilder, 
    private shiftService: ShiftService,
    private organizationService: OrganizationService, 
    private route: ActivatedRoute,
    private router: Router,
    private tosater: ToastrService,
     ) {
      this.organizationId = sessionStorage.getItem('organizationId');
     }

  ngOnInit() {
    if(sessionStorage.getItem('shift')){
      this.btnName = "Update";
      this.populateUpdateFrom();
    }
    else{
      this.btnName = "Create";
      this.createForm();
    }
    this.getOrganizations();
  }

  onSubmit(){
    if(this.shiftForm.valid){
      this.loading = true;
      if(sessionStorage.getItem('shift')){
        let data = {
          name:  this.shiftForm.value.shift,
          days:  this.shiftForm.value.days,
          fromtime:  this.shiftForm.value.fromTime,
          totime:  this.shiftForm.value.toTime,
          organizationId:  this.shiftForm.value.organizationId
        }
        this.shiftService.updateShiftByOrganizations(data, JSON.parse(sessionStorage.getItem('shift'))._id).subscribe(res=>{
          if(res['statusMessage'] == 'OK'){
            this.loading = false;
            this.tosater.success('Shift updated successfully');
            this.router.navigate(['/organization/shift']);
          }
        },err=>this.loading = false);
      }else{
        let data = {
          name:  this.shiftForm.value.shift,
          days:  this.shiftForm.value.days,
          fromTime:  this.shiftForm.value.fromTime,
          toTime:  this.shiftForm.value.toTime,
          organizationId:  this.shiftForm.value.organizationId
        }
        this.shiftService.CreateShiftsByOrganizations(data).subscribe(res=>{
          if(res['statusMessage'] == 'OK'){
            this.loading = false;
            this.tosater.success('Shift created successfully');
            this.router.navigate(['/organization/shift']);
          }
        },err=>this.loading = false);
      }
    } 
  }

  populateUpdateFrom(){
    let parseShift = JSON.parse(sessionStorage.getItem('shift'));
    this.shiftForm = this.fb.group({
      shift: [parseShift.name, Validators.required],
      organizationId: [parseShift.organizationId, Validators.required],
      fromTime: [new Date(parseShift.fromTime), Validators.required],
      toTime: [new Date(parseShift.toTime), Validators.required],
      days: [parseShift.days, Validators.required]
    });
  }

  getOrganizations(){ 
    this.organizationService.getOrganizations().subscribe(res=>{
      for (let i = 0; i < res['result'].length; i++) {
        if (sessionStorage.getItem('organizationId') == res['result'][i]._id) {
          this.organizations = res['result'][i];
        }
      }
    }); 
  }
  
  createForm() {
    this.shiftForm = this.fb.group({
      shift: [null, Validators.required],
      organizationId: [this.organizationId, Validators.required],
      fromTime: [new Date(), Validators.required],
      toTime: [new Date(), Validators.required],
      days: [null, Validators.required]
    });
  }

  resetForm(){
    this.shiftForm.reset();
  }

  ngOnDestroy() {
    sessionStorage.removeItem('shift');
  }

}
