import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { AuthService } from 'src/app/shared/services/auth.service';


// TODO Edit/ Save image
// TODO Partially disable edit for google kontos


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  userData = JSON.parse(localStorage.getItem('user')!);
  editActive = false;

  public saveEdit(){
    // TODO Save Edit
  }

  public async resetData(){
    this.userData = await this.authService.GetUserData(JSON.parse(localStorage.getItem('user')!).uid)
  }

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
