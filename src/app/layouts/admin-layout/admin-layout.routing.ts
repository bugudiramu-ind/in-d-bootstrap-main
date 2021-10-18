import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from '../../pages/signup/signup.component';
import { UploadAadhaarComponent } from '../../pages/upload-aadhaar/upload-aadhar.component';
import { OTPVerificationComponent } from '../../pages/otp-verification/otp-verification.component';
import { ConsentPageComponent } from '../../pages/consent-page/consent-page.component';
import { ImageCaptureComponent } from '../../pages/image capture/image-capture.component';
import { AadhaarXMLComponent } from '../../pages/upload-aadhaar/aadhaar-xml/aadhaar-xml.component';
import { AadhaarOTPComponent } from '../../pages/upload-aadhaar/aadhaar-otp/aadhaar-otp.component';
import { CaptureAadhaarComponent } from '../../pages/upload-aadhaar/capture-aadhaar/capture-aadhaar.component';
import { ThankyouComponent } from 'app/pages/thankyou/thankyou.component';
import { UploadPANComponent } from 'app/pages/upload-pan/upload-pan.component';
import { UploadSignatureComponent } from 'app/pages/upload-signature/upload-signature.component';
import { CheckLivelinessComponent } from 'app/pages/check-liveliness/check-liveliness.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { SurveyComponent } from 'app/pages/survey/survey.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'upload-aadhaar', component: UploadAadhaarComponent },
  { path: 'otp-verification', component: OTPVerificationComponent },
  { path: 'consent-for-kyc', component: ConsentPageComponent },
  { path: 'image-capture', component: ImageCaptureComponent },
  { path: 'uploadAadhaarXML', component: AadhaarXMLComponent },
  { path: 'uploadAadhaarOTP', component: AadhaarOTPComponent },
  { path: 'uploadAadhaarImage', component: CaptureAadhaarComponent },
  { path: 'uploadPAN', component: UploadPANComponent },
  { path: 'uploadSignature', component: UploadSignatureComponent },
  { path: 'checkliveliness', component: CheckLivelinessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'surveyform', component: SurveyComponent },
];

