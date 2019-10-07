import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CouponService } from './coupon.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit, OnDestroy {
  dtTrigger = new Subject();
  coupons;
  loading: boolean = false;
  type = "";
  couponTypes = ["regular", "promotional", "discount"];
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  constructor(private couponService:CouponService, private router:Router) { }

  ngOnInit() {
    this.getCoupons("");
  }

  getCoupons(type){
    this.loading = true;
    this.couponService.getCoupons(type).subscribe(res=>{
      this.coupons = res['result'];
      this.dtTrigger.next();
      this.loading = false;
    },err=> this.loading = false)
  }

  filterCoupons(selCouponType){
    this.rerender();
    this.getCoupons(selCouponType);
  }

  editCoupon(item){
    sessionStorage.setItem('coupon',JSON.stringify(item));
    this.router.navigate(['/admin/updatecoupon']);
  }

  deleteCoupon(coupon_id){
    Swal.fire({
      title: 'Are you sure to delete coupon?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.couponService.deleteCoupon(coupon_id).subscribe(res=>{
          this.rerender();
          this.getCoupons("");
          this.loading = true;
        },err=>{this.loading = false});
        Swal.fire({
          title: 'Deleted!',
          text: "The coupon has been deleted.",
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
