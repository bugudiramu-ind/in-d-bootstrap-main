import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { WebcamModule } from './modules/webcam/webcam.module';

// import { CaptureAadhaarComponent } from './pages/upload-aadhaar/capture-aadhaar/capture-aadhaar.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';

// import { UploadSignatureComponent } from './pages/upload-signature/upload-signature.component';
import { SurveyComponent } from './pages/survey/survey.component';

@NgModule({
  declarations: [AppComponent,
    AdminLayoutComponent,
    ThankyouComponent,
    SurveyComponent,],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    WebcamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
