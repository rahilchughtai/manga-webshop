import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

type UserType = User | null | undefined;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService, private fb: FormBuilder) {}
  public profileForm!: FormGroup;
  public addressForm!: FormGroup;
  editActive: Boolean = false;
  errorInEdit: Boolean = false;
  userData: Observable<User | null | undefined> = this.authService.userData$;

  ngOnInit(): void {
    this.buildForm();
    this.profileForm.disable();
  }

  buildForm() {
    const { email, displayName, firstName, lastName, address } =
      this.authService.getStorageUserData() || {};
    const { streetName, streetNumber, country, plz, ort } = address || {};
    this.profileForm = this.fb.group({
      email: [email],
      displayName: [displayName],
      firstName: [firstName],
      lastName: [lastName],
      address: this.fb.group({
        streetName: [streetName],
        streetNumber: [streetNumber],
        country: [country],
        city: [ort],
        plz: [plz],
      }),
    });
  }

  
  resetData(): void {
    // this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
