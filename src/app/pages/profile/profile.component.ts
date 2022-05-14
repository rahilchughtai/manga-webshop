import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MangaUser } from 'src/app/shared/models/user.model';
import { defaultAppCheckInstanceFactory } from '@angular/fire/app-check/app-check.module';

type UserType = MangaUser | null | undefined;

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
  defaultPic =
    'https://i.pinimg.com/originals/14/49/8e/14498ee653e49627b84352bc03699370.png';
  profilePic = this.defaultPic;
  userData: Observable<MangaUser | null | undefined> =
    this.authService.userData$;
  oldFormData = {};

  ngOnInit(): void {
    this.initUserPic();
    this.buildForm();
    this.profileForm.disable();
  }

  initUserPic() {
    let userPic = this.authService.getStorageUserData()?.photoURL;
    if (userPic) this.profilePic = userPic;
  }

  resetFormData() {
    this.profileForm.setValue(this.oldFormData);
  }

  setOldFormData(data?: any) {
    let formData = this.authService.getStorageUserData() || {};
    if (data) {
      formData = data;
    }
    this.oldFormData = this.authService.initProfileData(formData);
  }

  buildForm() {
    const { email, displayName, firstName, lastName, address } =
      this.authService.getStorageUserData() || {};
    const { streetName, streetNumber, country, plz, ort } = address || {};
    this.setOldFormData();

    this.profileForm = this.fb.group({
      email: [email, [Validators.email, Validators.required]],
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
    this.profileForm.controls['email'].enable();
    this.authService.updateUserData(this.profileForm.value);
    this.setOldFormData(this.profileForm.value);
    this.disableEdit();
  }

  disableEdit() {
    this.profileForm.disable();
    this.editActive = false;
  }

  activateEdit() {
    this.profileForm.enable();
    this.profileForm.controls['email'].disable();
    this.editActive = true;
  }

  resetData(): void {
    this.resetFormData();
    this.disableEdit();
  }

  updateUrl(err: any) {
    this.profilePic = this.defaultPic;
  }

  //https://www.positronx.io/full-angular-firebase-authentication-system/
}
