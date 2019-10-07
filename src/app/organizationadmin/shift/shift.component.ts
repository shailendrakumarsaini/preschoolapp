import { Component, OnInit } from '@angular/core';
import { ShiftService } from './shift.service';
import { Router } from '@angular/router';
import { shift } from 'src/app/models/shift';
import { Subject } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  
  orgId;
  shifts:shift[]=[];
  constructor(private shiftService: ShiftService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };
    this.getAllShifts();
  }
  getAllShifts() {
    this.orgId = sessionStorage.getItem("organizationId");
    this.shiftService.getAllShifts(this.orgId).subscribe(data=>{
      this.shifts=data['result'];
      this.dtTrigger.next();
    });
  }

  editShift(item){
    sessionStorage.setItem('shift', JSON.stringify(item));
    this.router.navigate(['/organization/updateShift']);
  }


}
