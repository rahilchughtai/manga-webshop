import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { AuthService } from 'src/app/shared/services/auth.service';


// TODO scss/ style
// TODO Edit/ Save image
// TODO Partially disable edit for google kontos - Edit image

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  editActive = false;
  errorInEditInput = false;

   // restes the shown profile data to pre edit
  public resetData(){
    this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  public checkErrorInEditInput(){

    // TODO error types
    var localData = this.authService.userData

    if(typeof localData.adress.streetNumber != "number" || localData.adress.streetNumber == ""){
      return true
    }


    return false
  }

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
