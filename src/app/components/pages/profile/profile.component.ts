import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
