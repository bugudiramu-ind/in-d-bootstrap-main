import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SharedataService } from './sharedata.service';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  // Define API
  //KYC_SIT = 'https://vkyc.in-d.ai/';
  KYC_SIT = "https://kycsit.in-d.ai/";
  SAND_BOX = 'https://api.kyc.in-d.ai/';

  constructor(private http: HttpClient, sharedDataService: SharedataService) { }
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // headers = new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*');


  // Signup Page API(s).
  custRegister(body: any) {
    return this.http
      .post(this.KYC_SIT + 'mail_insert?company=dev', body)
      .pipe(retry(1), catchError(this.handleError));
  }

  // OTP Verification Page API(s).
  otpverification(body: any) {
    return this.http
      .post(this.KYC_SIT + 'otpverify', body)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get JSON Web Token API.
  getJWToken(body: any) {
    return this.http.post(this.KYC_SIT + 'company_apitoken', body)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Create JSON Web Token on OTP Verification Page.
  companytoken(body: any): any {
    const headers = { 'Content-type': 'multipart/form-data' }
    return this.http
      .post(this.KYC_SIT + 'company_apitoken', body, { 'headers': headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  // Upload UID  -- On OTP Verification Page
  // uid(): any {
  //   const headers = new Headers({
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http
  //     .get(this.SAND_BOX + 'api/upload/uid')
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // E-KYC Consent Page

  // Lightcheck and Image Upload
  lightcheck(body: any): any {
    const headers = { 'Content-type': 'multipart/form-data' }
    return this.http
      .post(this.KYC_SIT + 'api/lightcheck', body, { 'headers': headers })
      .pipe(retry(1), catchError(this.handleError))
  }


  opentokToken(): any {
    return this.http
      .get(this.SAND_BOX + 'api/opentok/opentok_create_token')
      .pipe(retry(1), catchError(this.handleError));
  }


  // Aadhar OTP APIs
  generateotp(body: any) {
    return this.http
      .post(this.SAND_BOX + 'api/class/generate_otp/', body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  agentLogin(): any {
    return this.http
      .get(this.SAND_BOX + 'api/queue/loginpass')
      .pipe(retry(1), catchError(this.handleError));
  }
  agentOpentok(): any {
    return this.http
      .get(this.SAND_BOX + 'api/que/consumer/')
      .pipe(retry(1), catchError(this.handleError));
  }
  userOpentok(): any {
    return this.http
      .get(this.SAND_BOX + 'api/que/producer')
      .pipe(retry(1), catchError(this.handleError));
  }
  bucket(): any {
    return this.http
      .get(this.SAND_BOX + 'submit_sign/')
      .pipe(retry(1), catchError(this.handleError));
  }
  imageExtraction(): any {
    return this.http
      .get(this.SAND_BOX + '"api/fields/')
      .pipe(retry(1), catchError(this.handleError));
  }
  classification(): any {
    return this.http
      .get(this.SAND_BOX + 'api/class/')
      .pipe(retry(1), catchError(this.handleError));
  }

  geocoding(): any {
    return this.http
      .get(this.SAND_BOX + 'reverseGeocode')
      .pipe(retry(1), catchError(this.handleError));
  }
  validation(): any {
    return this.http
      .get(this.SAND_BOX + 'api/fields/validation/')
      .pipe(retry(1), catchError(this.handleError));
  }
  agentprofilepage(): any {
    return this.http
      .get(this.SAND_BOX + 'api/profile/vkyc/')
      .pipe(retry(1), catchError(this.handleError));
  }
  profileChanges(): any {
    return this.http
      .get(this.SAND_BOX + 'api/profile/validation/vkyc/')
      .pipe(retry(1), catchError(this.handleError));
  }
  aadharxml(body: any): any {
    return this.http
      .post(this.SAND_BOX + 'api/class/aadhaarxml/', body)
      .pipe(retry(1), catchError(this.handleError));
  }
  create_token(): any {
    return this.http
      .get(this.SAND_BOX + 'api/create_token')
      .pipe(retry(1), catchError(this.handleError));
  }

  submitotp(): any {
    return this.http
      .get(this.SAND_BOX + 'api/class/submit_otp/')
      .pipe(retry(1), catchError(this.handleError));
  }
  screencapture(): any {
    return this.http
      .get(this.SAND_BOX + 'submit_video/')
      .pipe(retry(1), catchError(this.handleError));
  }

  agentidinsertion(): any {
    return this.http
      .get(this.SAND_BOX + 'agentidinsertion')
      .pipe(retry(1), catchError(this.handleError));
  }
  statusupdate(): any {
    return this.http
      .get(this.SAND_BOX + 'status_update')
      .pipe(retry(1), catchError(this.handleError));
  }
  livelines(body: any): any {
    return this.http
      .post(this.SAND_BOX + 'api/verification/vkyc/', body)
      .pipe(retry(1), catchError(this.handleError));
  }
  readuser(): any {
    return this.http
      .get(this.SAND_BOX + 'readuser')
      .pipe(retry(1), catchError(this.handleError));
  }
  readuser_pagination(): any {
    return this.http
      .get(this.SAND_BOX + 'readuser_pagination')
      .pipe(retry(1), catchError(this.handleError));
  }
  quedelete(): any {
    return this.http
      .get(this.SAND_BOX + 'api/que/delete/')
      .pipe(retry(1), catchError(this.handleError));
  }
  download(): any {
    return this.http
      .get(this.SAND_BOX + 'download')
      .pipe(retry(1), catchError(this.handleError));
  }


  // Error handling
  handleError(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
