import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedataService } from '../../shared/services/sharedata.service';
import { RESTAPIService } from '../../shared/services/restapi.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // Spinner Variable
  isLoading: Boolean = false;

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private sharedDataService: SharedataService, // Inject Data Service
    private router: Router,
    private ngZone: NgZone,
    private restapiservice: RESTAPIService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', Validators.required],
      company: "dev",
      customer_id: '0',
      language: 'English',
    });
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {

      console.log('Invalid Form!');
      return;
    }

    // display form values on success
    console.log('Form Submitted!');

    this.sharedDataService.setEmailData(this.registerForm.value.email);

    let formData = new FormData();
    formData.append('name', this.registerForm.value.firstName);
    formData.append('email', this.registerForm.value.email);
    formData.append('phone', this.registerForm.value.mobilenumber);
    formData.append('company', this.registerForm.value.company);
    formData.append('customer_id', this.registerForm.value.customer_id);
    formData.append('language', this.registerForm.value.language);
    console.log(formData.get('name'));

    // API Call on Submit Button
    this.restapiservice.custRegister(formData).subscribe(res => {
      if (res['status'] === 'success') {
        this.isLoading = false;
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">User signup successful. <b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + 'top' + "-" + 'right'
          }
        );

        let userID = res['UserID'];
        console.log('UserID: ', userID);
        this.sharedDataService.setUserID(userID);
        // Navigate to OTP Verification Page on successful signup.
        this.ngZone.run(() => this.router.navigateByUrl('/otp-verification'))
      }
      else {
        this.isLoading = false;
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message"><b>User signup unsuccessful. </b></span>',
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
}
