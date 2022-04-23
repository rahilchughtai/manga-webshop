import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  profilePic =
    'https://i.pinimg.com/originals/14/49/8e/14498ee653e49627b84352bc03699370.png';
  userData: Observable<User | null | undefined> = this.authService.userData$;

  ngOnInit(): void {
    this.initUserPic();
    this.buildForm();
    this.profileForm.disable();
  }

  initUserPic() {
    let userPic = this.authService.getStorageUserData()?.photoURL;
    if (userPic) this.profilePic = userPic;
  }
  buildForm() {
    const { email, displayName, firstName, lastName, address } =
      this.authService.getStorageUserData() || {};
    const { streetName, streetNumber, country, plz, ort } = address || {};
    this.profileForm = this.fb.group({
      email: [email, Validators.email],
      displayName: [displayName, Validators.required],
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      address: this.fb.group({
        streetName: [streetName, Validators.required],
        streetNumber: [streetNumber, Validators.required],
        country: [country, Validators.required],
        ort: [ort, Validators.required],
        plz: [plz, Validators.required],
      }),
    });
  }

  saveData() {
    this.authService.updateUserData(this.profileForm.value);
    this.disableEdit();
  }

  disableEdit() {
    this.profileForm.disable();
    this.editActive = false;
  }

  activateEdit() {
    this.profileForm.enable();
    this.editActive = true;
  }

  resetData(): void {
    this.disableEdit();
    // this.authService.userData = JSON.parse(localStorage.getItem('user')!);
  }

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
