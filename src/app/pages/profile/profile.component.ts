import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  userData = JSON.parse(localStorage.getItem('user')!);

  public changedUserData = JSON.parse(localStorage.getItem('user')!);

  public updateChangedUserData(text : any, position : any){
    this.changedUserData[position] = text.target.innerText;
    console.log(this.changedUserData)
  }

  public swapEdit(){

    var elementList = document.querySelectorAll(".editables");

    elementList.forEach(element => {
      element.setAttribute("contenteditable",
      element.getAttribute("contenteditable") == "true" ? "false" : "true");
    });
  }

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
