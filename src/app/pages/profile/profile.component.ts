import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { AuthService } from 'src/app/shared/services/auth.service';


// TODO Edit/ Save image


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  userData = JSON.parse(localStorage.getItem('user')!);


  // revert changes of editing
  public resetEdit(){

    document.getElementById("username")!.innerText = this.userData.displayName;
    document.getElementById("email")!.innerText = this.userData.email;
  }


  public saveEdit(){
    alert("Saved")
    // TODO Save Edit
  }


  // make text editable and change showon buttons
  public swapEdit(){

    var elementList = document.querySelectorAll(".editables");

    elementList.forEach(element => {
      element.setAttribute("contenteditable",
      element.getAttribute("contenteditable") == "true" ? "false" : "true");
    });


    var buttonList = document.querySelectorAll(".editablesButton");

    buttonList.forEach(button => {
      button.classList.contains("hidden") ?
        button.classList.remove("hidden") :
        button.classList.add("hidden");
    });
  }

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
