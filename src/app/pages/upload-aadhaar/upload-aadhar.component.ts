import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-cmp",
  moduleId: module.id,
  templateUrl: "upload-aadhaar.component.html",
})
export class UploadAadhaarComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  gotoAadhaarXMLPage() {
    this.router.navigateByUrl('/uploadAadhaarXML');
  }
  gotoAadhaarOTPPage() {
    this.router.navigateByUrl('/uploadAadhaarOTP');
  }
  gotoAadhaarUploadPage() {
    this.router.navigateByUrl('/uploadAadhaarImage');
  }
}
