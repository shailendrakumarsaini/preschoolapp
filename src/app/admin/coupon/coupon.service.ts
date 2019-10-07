import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) { }

  getCoupons(selCouponType){
    var url = environment.devApiUrl + 'coupons';
    return this.http.get( environment.devApiUrl + 'coupons?type='+ selCouponType);
  }

  createCoupon(data){
    return this.http.post(`${environment.devApiUrl}coupons`, data);
  }

  updateCoupon(coupon_id, data){
    return this.http.put(`${environment.devApiUrl}coupons/${coupon_id}`, data);
  }

  deleteCoupon(coupon_id){
    return this.http.delete(`${environment.devApiUrl}coupons/${coupon_id}`);
  }

  batchUploadCouponsData(coupons_data){
    return this.http.post(`${environment.devApiUrl}coupons/batchUpload`, coupons_data);
  }

}
