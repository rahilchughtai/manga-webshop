import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

// TODO scss/ style
// TODO Edit/ Save image
// TODO Disable edit for google kontos - Edit image

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  editActive : Boolean= false;
  errorInEditInput : Boolean= false;

   // restes the shown profile data to pre edit
  resetData() : void{
    this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  checkIfUserDataIsCorrect() : Boolean{
    var localData : any = this.authService.userData

    if(typeof localData.adress.streetNumber != "number" || localData.adress.streetNumber == ""
      || localData.adress.streetName == ""
      || typeof localData.adress.plz != "number" || localData.adress.plz == ""
      || localData.adress.ort == ""
      || localData.adress.country == ""
      || localData.firstName == ""
      || localData.secondName == ""
      || localData.displayName == ""){
      return false
    }
    return true
  }


  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
