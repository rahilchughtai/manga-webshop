import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

// TODO Edit/ Save image
//          Disable Image edit for google kontos

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  editActive : Boolean= false;

  // TODO Check if Inputs are correct. If no: <mat-error>
  errorInEdit : Boolean= false;

  ngOnInit(): void {}

  // restes the shown profile data to pre edit
  resetData() : void{
    this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
