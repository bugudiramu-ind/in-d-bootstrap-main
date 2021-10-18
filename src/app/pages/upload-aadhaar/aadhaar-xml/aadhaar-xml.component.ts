import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RESTAPIService } from '../../../shared/services/restapi.service';


@Component({
  selector: 'app-aadhaar-xml',
  templateUrl: './aadhaar-xml.component.html',
  styleUrls: ['./aadhaar-xml.component.css']
})
export class AadhaarXMLComponent implements OnInit {

  fileName = '';
  fileToUpload: File | null = null;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private restapiservice: RESTAPIService,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
  }
  gobacktoPreviousPage() {
    this.router.navigateByUrl('upload-aadhaar');
  }
  gotoUploadPANPage(fileToUpload: File) {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    this.restapiservice.aadharxml(formData).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/uploadPAN'));
    })


    // this.restapiservice.aadharxml().subscribe(res => {
    //   this.ngZone.run(() => this.router.navigateByUrl('uploadPAN');
    // })
    this.router.navigateByUrl('uploadPAN');
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      this.httpClient.post('https://kycsit.in-d.ai/api/class/aadhaarxml/' + uid, body, header).subscribe(data => {
        console.log(data);
      });

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      // upload$.subscribe();
    }
  }

}
