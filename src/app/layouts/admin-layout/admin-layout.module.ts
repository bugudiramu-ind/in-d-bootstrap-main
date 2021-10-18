import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { SignupComponent } from '../../pages/signup/signup.component';
import { UploadAadhaarComponent } from '../../pages/upload-aadhaar/upload-aadhar.component';
import { AadhaarXMLComponent } from '../../pages/upload-aadhaar/aadhaar-xml/aadhaar-xml.component';
import { AadhaarOTPComponent } from '../../pages/upload-aadhaar/aadhaar-otp/aadhaar-otp.component';
import { CaptureAadhaarComponent } from '../../pages/upload-aadhaar/capture-aadhaar/capture-aadhaar.component';
import { OTPVerificationComponent } from '../../pages/otp-verification/otp-verification.component';
import { ConsentPageComponent } from '../../pages/consent-page/consent-page.component';
import { UploadPANComponent } from '../../pages/upload-pan/upload-pan.component';
import { UploadSignatureComponent } from '../../pages/upload-signature/upload-signature.component';
import { CheckLivelinessComponent } from '../../pages/check-liveliness/check-liveliness.component';
import { ProfileComponent } from '../../pages/profile/profile.component';




import { ImageCaptureComponent } from '../../pages/image capture/image-capture.component';
import { WebcamModule } from 'ngx-webcam';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* ng-otp module */
import { NgOtpInputModule } from 'ng-otp-input';

/* Angular Material Imports */
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

import { RESTAPIService } from 'app/shared/services/restapi.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    // ngx-webcam module Import
    WebcamModule,
    // ng-otp-input module Import
    NgOtpInputModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
  providers: [RESTAPIService],
  declarations: [
    SignupComponent,
    UploadAadhaarComponent,
    AadhaarXMLComponent,
    AadhaarOTPComponent,
    CaptureAadhaarComponent,
    OTPVerificationComponent,
    ConsentPageComponent,
    ImageCaptureComponent,
    UploadPANComponent,
    UploadSignatureComponent,
    CheckLivelinessComponent,
    ProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule { }
