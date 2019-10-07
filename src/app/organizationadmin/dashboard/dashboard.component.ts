import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  organizationId;
  organization = '';
  org_details;
  branch_details;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings[] = [];
  OrgSkillsInfoData;
  SkillsBrachesInfodata;
  LineChart=[];
  OrgMonthlyCurriculumdata =
    [
      { month: "April", students: 7200, CurriculumPer: 92, monthStatus: 'previous' },
      { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' },
    ];

  CurriculumBrachesInfodata =
    [
      {
        branchName: "Kangaroo Kids", address: 'Jubliee Hills', city: 'Hyderbad', 'Curriculumset': [
          { month: "April", students: 7200, CurriculumPer: 100, monthStatus: 'previous' },
          { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' },
        ]
      },
      {
        branchName: "Kangaroo Kids", address: 'Madhura Nagar', city: 'Visakapatnam', 'Curriculumset': [
          { month: "April", students: 7200, CurriculumPer: 100, monthStatus: 'previous' },
          { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' },
        ]
      },
      {
        branchName: "Kangaroo Kids", address: 'Malad', city: 'Mumbai', 'Curriculumset': [
          { month: "April", students: 7200, CurriculumPer: 84, monthStatus: 'previous' },
          { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' }
        ]
      },
      {
        branchName: "Kangaroo Kids", address: 'Thane', city: 'Pune', 'Curriculumset': [
          { month: "April", students: 7200, CurriculumPer: 92, monthStatus: 'previous' },
          { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' }
        ]
      },
      {
        branchName: "Kangaroo Kids", address: 'Metro Piller 12	', city: 'Delhi', 'Curriculumset': [
          { month: "April", students: 7200, CurriculumPer: 100, monthStatus: 'previous' },
          { month: "May", students: 1200, CurriculumPer: 82, monthStatus: 'current' }
        ]
      }
    ];

  test = [
    { precent: 0 },
    { precent: 1 },
    { precent: 2 },
    { precent: 5 },
    { precent: 10 },
    { precent: 30 },
    { precent: 50 },
    { precent: 70 },
    { precent: 90 },
    { precent: 100 },
    { precent: 110 },
    { precent: null },
    { precent: -20 },
  ];

  constructor(private dashboardService: DashboardService, private router: Router) {
    this.organizationId = sessionStorage.getItem('organizationId');
  }

  ngOnInit() {
    this.dashboardService.getOrganizationsById(this.organizationId).subscribe(res => {
      this.organization = res['result'];
    })

    this.dashboardService.getStudentsDataForSchoolByPayments(this.organizationId).subscribe(res => {
      this.org_details = res['result']['org_details'];
      this.branch_details = res['result']['branch_details'];
      this.dtOptions[0] = this.branch_details;
    });

    this.dashboardService.getStudentsDataForSchoolBySkills(this.organizationId).subscribe(res => {
      this.OrgSkillsInfoData = res['result']['org_progress_data']['skills_progress'];
      this.SkillsBrachesInfodata = res['result']['branch_progress_data'];
      this.dtOptions[1] = this.OrgSkillsInfoData;
      this.dtOptions[2] = this.SkillsBrachesInfodata;
      this.dtTrigger.next();
    })

     this.LineChart = new Chart ('lineChart' , {
       type:'line',
       data:{
         labels:["June 1 2018" , "June 2 2018" , "June 3 2018" , "June 4 2018" , "June 5 2018" , "June 6 2018" , "June 7 2018"],
         datasets:[{
           label:'Jan',
           data:[0,2,3.5,5,6.5,7,11],
           fill:false,
           lineTension:0.2,
           borderColor:"red",
           borderWidth:1
         }]
       },
       options:{
         title:{
           text:"Engagements Per Day",
           display:true
         },
         scales:{
           yAxes:[{
             ticks:{
               beginAtZero:true
             }
           }]
         }
       }
     });

  }

  goToBranchPayment(data) {
    sessionStorage.setItem('payment', JSON.stringify(data));
    this.router.navigate(['/organization/payment']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
