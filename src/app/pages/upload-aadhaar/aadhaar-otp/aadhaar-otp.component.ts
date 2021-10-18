import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedataService } from 'app/shared/services/sharedata.service';
@Component({
  selector: 'app-aadhaar-otp',
  templateUrl: './aadhaar-otp.component.html',
  styleUrls: ['./aadhaar-otp.component.css']
})
export class AadhaarOTPComponent implements OnInit {
  aadhaarNumber = '' // Will store the aadhaar numbre
  inputOTP = '' // Will store the OTP recieved on phone.
  client_id = '' // will store the client_id recieved from the get otp api response
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private sharedDataService: SharedataService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
  }
  gobacktoPreviousPage() {
    this.router.navigateByUrl('upload-aadhaar');
  }
  gotoUploadPANPage() {
    let formData = new FormData();
    formData.append('otp', this.inputOTP);
    formData.append('client_id', this.client_id);

    let auth_token = this.sharedDataService.getJWToken()
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${auth_token}`)
        .set('Content-type', 'multipart/form-data')
    }
    this.httpClient.post('https://kycsit.in-d.ai/api/class/submit_otp/uid', formData, header).subscribe(res => {
    });
    // this.ngZone.run(() => this.router.navigateByUrl('uploadPAN'));
  }
  getOTP() {

    let formData = new FormData();
    formData.append('number', this.aadhaarNumber);

    console.log('Aadhaar Number: ', this.aadhaarNumber)

    let auth_token = this.sharedDataService.getJWToken()
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${auth_token}`)
    }
    this.httpClient.post('https://kycsit.in-d.ai/api/class/generate_otp/uid', formData, header).subscribe(data => {
      console.log(data);
      console.log(data['result'].client_id);
      this.client_id = data['result'].client_id;
    });
  }
}
