import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/signup', title: 'Signup', icon: 'nc-simple-add', class: '' },
  {
    path: '/otp-verification',
    title: 'OTP Verification',
    icon: 'nc-key-25',
    class: '',
  },
  {
    path: '/consent-for-kyc',
    title: 'Consent for KYC',
    icon: 'nc-alert-circle-i',
    class: '',
  },
  {
    path: '/image-capture',
    title: 'Image Capture',
    icon: 'nc-camera-compact',
    class: '',
  },
  {
    path: '/upload-aadhaar',
    title: 'Upload Aadhaar',
    icon: 'nc-cloud-upload-94',
    class: '',
  },
  {
    path: '/uploadPAN',
    title: 'Upload PAN',
    icon: 'nc-cloud-upload-94',
    class: '',
  },
  {
    path: '/uploadSignature',
    title: 'Upload Signature',
    icon: 'nc-cloud-upload-94',
    class: '',
  },
  {
    path: '/checkliveliness',
    title: 'Check Liveliness',
    icon: 'nc-cloud-upload-94',
    class: '',
  },
  {
    path: '/profile',
    title: 'Profile',
    icon: 'nc-cloud-upload-94',
    class: '',
  },
  {
    path: '/thankyou',
    title: 'Final Step',
    icon: 'nc-check-2',
    class: '',
  },
  {
    path: '/surveyform',
    title: 'Survey Form',
    icon: 'nc-check-2',
    class: '',
  },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
