import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-createcoupon',
  templateUrl: './createcoupon.component.html',
  styleUrls: ['./createcoupon.component.css']
}) 
export class CreatecouponComponent implements OnInit, OnDestroy {
  couponTypes = ["regular", "promotional", "discount"];
  couponForm: FormGroup;
  batchCouponForm: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  submmited :boolean = false;
  loading :boolean = false;
  showPromotionalInputBox = false;
  showDiscountInputBox = false;
  placeholderCaption;
  data;
  csvContent: any;
  validationMessages  = {
    'couponCode': {
                  'required': 'Coupon Code is Required.'
                },
    'startDate': {
                      'required': 'Start Date is Required'
                },
    'endDate' : {
                  'required': 'End Date is Required'
                },
    'type' : {
                'required': 'Type is required.'
              },
    'limit' : {
                'required': 'Limit is required.'
              },
    'discountType' : {
                'required': 'Discount Type is required.'
              },
    'discount' : {
                'required': 'Discount is required.'
              },
    'coupons_data' : {
                'required': 'Fle is required.'
              },
  };

  formErrors = {
    'type' : '',
    'couponCode': '',
    'startDate': '',
    'endDate' : '',
    'limit' : '',
    'discountType' : '',
    'discount' : '',
    'coupons_data' : '',
  };

  constructor( 
    private fb: FormBuilder,
    private couponService: CouponService,
    private toaster :ToastrService,
    private router :Router
    ) {
      this.datePickerConfig = Object.assign({},
        {
          containerClass: 'theme-dark-blue',
          showWeekNumbers: false,
          dateInputFormat: 'DD/MM/YYYY'
        });
     }

  ngOnInit() {
    this.couponForm = this.fb.group({
      couponCode: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      type: ["", Validators.required],
    });

    this.couponForm.valueChanges.subscribe(value=>{
      this.logValidationMessages();
    });

    this.couponForm.get('type').valueChanges.subscribe(value=>{
      if(value == 'regular'){
        this.couponForm.removeControl('limit');
        this.couponForm.removeControl('discountType');
        this.couponForm.removeControl('discount');
        this.showPromotionalInputBox = false;
        this.showDiscountInputBox = false;
      }
      if(value == 'promotional'){
        this.showPromotionalInputBox = true;
        this.showDiscountInputBox = false;
        this.couponForm.addControl('limit', new FormControl('', Validators.required));
        this.couponForm.removeControl('discountType');
        this.couponForm.removeControl('discount');
      }
      if(value == 'discount'){
        this.showPromotionalInputBox = false;
        this.showDiscountInputBox = true;
        this.couponForm.addControl('discountType', new FormControl('', Validators.required));
        this.couponForm.addControl('discount', new FormControl('', Validators.required));
        this.couponForm.removeControl('limit');
      }
    })

    if(this.router.url == '/admin/updatecoupon'){
      this.data = JSON.parse(sessionStorage.getItem('coupon'));
      this.couponForm.patchValue({
        couponCode : this.data.couponCode,
        startDate : new Date(this.data.startDate),
        endDate : new Date(this.data.endDate),
        type : this.data.type
      })

      if(this.data.type == 'regular'){
        this.couponForm.removeControl('limit');
        this.couponForm.removeControl('discountType');
        this.couponForm.removeControl('discount');
      }

      if(this.data.type == 'promotional'){
        this.couponForm.patchValue({
          limit : this.data.limit
        });
      }

      if(this.data.type == 'discount'){
        this.couponForm.patchValue({
          discountType : this.data.discountType,
          discount : this.data.discount,
        });
      }
    }

    this.batchCouponForm = this.fb.group({
      coupons_data: this.fb.array([]),
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });

    this.batchCouponForm.valueChanges.subscribe(value=>{
      this.logValidationMessages();
    });
  }

  onSubmit(){
    this.submmited = true;
    this.logValidationMessages();
    if(this.couponForm.valid){
      this.loading = true;
      // let data = this.couponForm.value
      // data.startDate = data.startDate.toISOString();
      // data.endDate = data.endDate.toISOString();
      // console.log(data);
      if(this.router.url == '/admin/updatecoupon'){
        this.couponService.updateCoupon(this.data._id, this.couponForm.value).subscribe(res=>{
          if(res['statusMessage'] == 'OK'){
            this.toaster.success('The coupon has been updated.');
            this.router.navigate(['/admin/coupon']);
            this.loading = false;
          }
        },err =>{
          if(err['code'] == 11000){
            this.loading = false;
            this.toaster.error('Curriculum Type Entry Duplicate');
          }
        });
      }else{
        this.couponService.createCoupon(this.couponForm.value).subscribe(res=>{
          if(res['statusMessage'] == 'OK'){
            this.toaster.success('The coupon has been created.');
            this.router.navigate(['/admin/coupon']);
            this.loading = false;
          }
        },err =>{
          if(err['code'] == 11000){
            this.loading = false;
            this.toaster.error('Curriculum Type Entry Duplicate');
          }
        });
      }
      
    }
  }

  batchCouponFormSubmit(){
    if(sessionStorage.getItem('csv') != null){
      if(this.batchCouponForm.valid){
        this.loading = true;
        this.csvContent = JSON.parse(sessionStorage.getItem('csv')).split('\n');
        var filterCSVContent = this.csvContent.filter(function (hero) {
          return (hero.trim() != "couponCode") && hero != "";
        });
        filterCSVContent.forEach(element => {
          (<FormArray>this.batchCouponForm.get('coupons_data')).push(new FormControl(element.trim(),[Validators.required]))
        });
        this.couponService.batchUploadCouponsData(this.batchCouponForm.value).subscribe(res=>{
          if(res['statusMessage'] == 'OK'){
            this.toaster.success('CSV file uploded successfully');
            this.router.navigate(['/admin/coupon']);
          }
          this.loading = false;
        },err => this.loading = false)
      } 
    }else{
      this.toaster.error('Please Upload CSV File.');
    }
  }

  resetForm(){
    this.couponForm.reset();
  }

  resetBatchForm(){
    this.batchCouponForm.reset();
  }
  
  logValidationMessages(group: FormGroup = this.couponForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || this.submmited)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
          if (abstractControl instanceof FormGroup) {
            this.logValidationMessages(abstractControl);
          }
      });
  }

  ngOnDestroy(){
    sessionStorage.removeItem('coupon');
    sessionStorage.removeItem('csv');
  }


  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    sessionStorage.setItem('csv', JSON.stringify(this.csvContent))
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    var content = this.csvContent;
    if (files && files.length) {
      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }

  
}