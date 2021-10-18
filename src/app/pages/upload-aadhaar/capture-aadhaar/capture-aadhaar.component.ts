import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from '../../../modules/webcam/domain/webcam-image';
import { WebcamUtil } from '../../../modules/webcam/util/webcam.util';
import { WebcamInitError } from '../../../modules/webcam/domain/webcam-init-error';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedataService } from 'app/shared/services/sharedata.service';

@Component({
  selector: 'app-capture-aadhaar',
  templateUrl: './capture-aadhaar.component.html',
  styleUrls: ['./capture-aadhaar.component.css'],
})
export class CaptureAadhaarComponent implements OnInit {

  // Spinner Variable
  isLoading: Boolean = false;

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode = 'environment';
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private ngZone: NgZone,
    private sharedDataService: SharedataService
  ) { }

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.warn('Camera access was not allowed by user!');
    }
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }
  gobacktoPreviousPage() {
    this.router.navigateByUrl('upload-aadhaar');
  }

  gotoUploadPANPage(webcamImage: WebcamImage) {
    // this.router.navigateByUrl('uploadPAN');
    this.isLoading = true;
    this.webcamImage = webcamImage;
    const arr = this.webcamImage.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const imageName = `${'filename'}${new Date().getTime()}.jpeg`;
    const file: File = new File([u8arr], imageName, { type: 'image/jpeg' })
    console.log(file);

    let auth_token = this.sharedDataService.getJWToken()
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${auth_token}`)
    }

    let imageUploadFormdata = new FormData();
    imageUploadFormdata.append('image', file);

    this.httpClient.post('https://kycsit.in-d.ai/api/lightcheck', imageUploadFormdata, header).subscribe(data => {
      console.log(data);
      if (data['status'] === 'success') {
        this.isLoading = false;

        console.log('API HIT SUCCESS')
        // Navigate to Upload Aadhaar Page on successful signup.
        this.ngZone.run(() => this.router.navigateByUrl('/upload-aadhaar'))
      }
      else {
        this.isLoading = false;
        console.log('ERROR --- CAN\'T PROCEED.', data)
        if (data['data'].result === 'dark') {
          // Conditions for light >1 and light >3 etc
        }
      }
    })
  }

}
