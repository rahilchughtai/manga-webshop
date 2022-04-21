import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { AuthService } from 'src/app/shared/services/auth.service';


// TODO Adress Information
// TODO scss
// TODO Edit/ Save image
// TODO Verification = No - if email changed
// TODO Partially disable edit for google kontos -(send) No Verification

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  editActive = false;

  // restes the shown profile data to pre edit
  public resetData(){
    this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
