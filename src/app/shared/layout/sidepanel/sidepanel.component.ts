import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit {
  role;
  constructor() { 
    this.role = sessionStorage.getItem('role');
    // console.log(sessionStorage.getItem('role'))
  }

  ngOnInit() {
  }


  closeSidenav(){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


}
