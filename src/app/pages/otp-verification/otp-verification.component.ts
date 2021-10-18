import { Component, OnDestroy, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from '../../shared/services/sharedata.service';
import { ToastrService } from "ngx-toastr";
import { RESTAPIService } from '../../shared/services/restapi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-icons-cmp',
  moduleId: module.id,
  templateUrl: 'otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OTPVerificationComponent implements OnInit {

  // Spinner Variable
  isLoading: Boolean = false;

  otpValue: string;
  public counter: number;
  public timer: any;
  GlobalJWTOken = ''; // stores the JSON Web Token
  globalUID = ''; // stores the uid of customer
  showOTPResendText: boolean = false;
  disableResendOTPButton: boolean = true;
  emailId = '';
  UserID = '';

  constructor(
    private router: Router,
    private sharedDataService: SharedataService,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private restapiservice: RESTAPIService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.emailId = this.sharedDataService.getEmailData();
    this.UserID = this.sharedDataService.getUserID();
    console.log(this.UserID);
  }

  otp: string;
  onOtpChange(otp) {
    this.otp = otp
    if (otp.length === 6) {
      console.log(this.otp)
      this.otpValue = this.otp
    }
  }

  gotoConsentPage() {

    this.isLoading = true;
    console.log(this.otpValue);

    // API Data on Submit Button
    let formData = new FormData();
    formData.append('otp', this.otpValue);
    formData.append('userID', this.UserID);

    // OTP Submit Success/Failure API
    this.restapiservice.otpverification(formData).subscribe((res) => {
      console.log(res)

      if (res['status'] === 'success') {
        // this.isLoading = false;
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">Please hold on. This might take a while. <b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );
      }
      else {
        // this.isLoading = false;
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message"><b>Incorrect OTP. Please try again. </b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );
      }
    })


    // Get JSON Web Token
    let companyName = 'dev'
    let company_nameformData = new FormData();
    company_nameformData.append('company_name', companyName)
    this.restapiservice.getJWToken(company_nameformData).subscribe((res) => {
      // this.isLoading = true;
      this.GlobalJWTOken = res['Auth_token'];
      console.log(res)
      console.log(this.GlobalJWTOken)
      this.sharedDataService.setJWToken(this.GlobalJWTOken);

      if (res['status'] === 'success') {
        // this.isLoading = false;
        setTimeout(() => {
          this.getuidFunction();
        }, 5000);
      }
      else {
        // this.isLoading = false;
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message"><b>Error occurred.Please try again. </b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );
      }
    });
  }

  getuidFunction() {
    let auth_token = this.GlobalJWTOken
    console.log(auth_token)
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${auth_token}`)
    }
    this.httpClient.get('https://kycsit.in-d.ai/api/upload/uid', header).subscribe(data => {
      // this.isLoading = true;
      console.log(data);
      console.log(data['result'].uid)
      this.globalUID = data['result'].uid
      this.sharedDataService.setuid(this.globalUID);
    });

    setTimeout(() => {
      this.uidreinsertionFunction()
    }, 10000);
    // this.isLoading = true;
  }

  uidreinsertionFunction() {
    // this.isLoading = true;
    let auth_token = this.GlobalJWTOken
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${auth_token}`)
    }
    let uidreinsertFormdata = new FormData();
    uidreinsertFormdata.append('uid', this.globalUID);
    uidreinsertFormdata.append('userid', this.sharedDataService.getUserID())
    console.log(uidreinsertFormdata);

    this.httpClient.post('https://kycsit.in-d.ai/uidinsertion', uidreinsertFormdata, header).subscribe(data => {
      console.log(data);
      if (data['status'] === 'success') {
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">OTP Submit Successfull. <b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );
        this.isLoading = false;
        // Navigate to KYC Consent Page on successful signup.
        this.ngZone.run(() => this.router.navigateByUrl('/consent-for-kyc'))
      }
      else {
        this.isLoading = false;
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message"><b>Something went wrong. Please click on Submit OTP Button again.</b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );
      }
    })


  }


  resendOTP() {

    // Toaster to show Notification 
    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">OTP sent successfully. <b></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-" + 'top' + "-" + 'right'
      }
    );
    this.counter = 10;
    window.clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.counter--;
      this.showOTPResendText = true;
      this.disableResendOTPButton = false;
      if (this.counter === 0) {
        window.clearInterval(this.timer);
        this.showOTPResendText = false;
        this.disableResendOTPButton = true;
      }
    }, 1000);
  }
}