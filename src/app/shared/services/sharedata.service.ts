import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
@Injectable({
  providedIn: 'root',
})
export class SharedataService {
  private info;
  private UserID;
  private JWTOken;
  private uid;
  private address;

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;


  constructor() { }

  // Email-Id  from signup page to OTP Verification Page. 
  setEmailData(info) {
    this.info = info;
  }
  getEmailData() {
    const temp = this.info;
    //  this.clearData();
    return temp;
  }

  // UserID from Signup Page to any component required
  setUserID(UserID) {
    this.UserID = UserID;
  }
  getUserID() {
    const temp = this.UserID;
    //  this.clearData();
    return temp;
  }

  // JSON Web Token from OTP Verification Page any component required
  setJWToken(JWTOken) {
    this.JWTOken = JWTOken;
  }
  getJWToken() {
    const temp = this.JWTOken;
    //  this.clearData();
    return temp;
  }

  // Set Address on Consent Page
  setAddress(address) {
    this.address = address
  }

  getAddress() {
    const temp = this.address;
    return temp;
  }

  // UID from OTP Verification Page any component required
  setuid(uid) {
    this.uid = uid;
  }
  getuid() {
    const temp = this.uid;
    //  this.clearData();
    return temp;
  }

  clearData() {
    this.info = undefined;
  }
}

