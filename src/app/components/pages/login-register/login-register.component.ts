import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
