import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedataService } from 'app/shared/services/sharedata.service';
@Component({
  moduleId: module.id,
  selector: 'app-maps-cmp',
  templateUrl: 'consent-page.component.html',
})
export class ConsentPageComponent implements OnInit {

  public lat;
  public lng;

  public location = '' // Get inside India or outside India
  public address = '' // Get complete Address

  constructor(
    private httpClient: HttpClient,
    private shareddataService: SharedataService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);

          // API to reverse-geocode 
          let auth_token = this.shareddataService.getJWToken();
          var header = {
            headers: new HttpHeaders()
              .set('Authorization', `Bearer ${auth_token}`)
              .set('Content-type', 'application/json',)
          }

          this.httpClient.get('https://kycsit.in-d.ai/reverseGeocode/' + this.lat + ',' + this.lng, header).subscribe(data => {
            // this.isLoading = true;
            console.log(data);
            if (data['location'] === 'Inside India') {
              console.log('Address:', data['result']);
              this.location = data['location']
              this.address = data['result']
              this.shareddataService.setAddress(this.address);

            }
            else if (data['location'] !== 'Inside India') {
              console.warn('Location outside India');
            }
            else {
              console.log('Something went wrong!');
            }
          });
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  gotoImageCaptureComponent() {
    if (this.location === 'Inside India') {
      // Navigate to Image Capture Page on successful Acceptance of Consent.
      this.ngZone.run(() => this.router.navigateByUrl('/image-capture'));
      this.shareddataService.setAddress(this.address);
    }
    else {
      console.warn('Something went wrong!')
    }

  }


}
