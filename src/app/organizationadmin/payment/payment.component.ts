import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from './payment.service'
import { Subject } from 'rxjs';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  paymentParse;
  organizationId;
  paymentData;
  dtTrigger = new Subject();
  constructor(private paymentService:PaymentService) 
    { 
      this.paymentParse = JSON.parse(sessionStorage.getItem('payment'));
      this.organizationId = sessionStorage.getItem('organizationId'); 
    }

  ngOnInit() {
    this.paymentService.getPaymentsBygrades(this.paymentParse.id, this.organizationId).subscribe(res =>{
      this.paymentData = res['result'];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
    sessionStorage.removeItem('payment');
  }


}
