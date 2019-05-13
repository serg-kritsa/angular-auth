import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  requiredNumber: RegExp = /\d+/;
  requiredSpecialChars: RegExp = /[!@#]/;
  specialChars;
  requiredLetter: RegExp = /[a-z]/;
  minPasswordLength = 4;
  registerUserData = {};
  constructor(private _auth: AuthService,
              private _router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: [''],
      password: ['', [ValidatorForSpecialChar(this.requiredSpecialChars),
        ValidatorForLetter(this.requiredLetter),
      ValidatorForNumber(this.requiredNumber), Validators.minLength( this.minPasswordLength )]]
    });
    this.specialChars = this.requiredSpecialChars.toString().slice(2, 5);
  }
  get password() {
    return this.registrationForm.get('password');
  }

  registerUser() {
    this._auth.registerUser(this.registrationForm.value)
    // this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['/special']);
      },
      err => console.log(err)
    );
  }
}
function ValidatorForNumber(re: RegExp) {
  return (control: FormControl): { [key: string]: any } | null   => {
    // console.log(control.value);
    const hasNumbers = re.test(control.value);
    if (!hasNumbers) { return { 'needAtLeastOneNumber': true}; }
    // return hasNumbers ? { 'hasNumbers': { value: control.value } } : null;
  };
}
function ValidatorForLetter(re: RegExp) {
  return (control: FormControl): { [key: string]: any } | null   => {
    const hasLetters = re.test(control.value);
    // console.log(hasLetters);
    if (!hasLetters) { return { 'needAtLeastOneLetter': true}; }
    // return hasNumbers ? { 'hasNumbers': { value: control.value } } : null;
  };
}
function ValidatorForSpecialChar(re: RegExp) {
  return (control: FormControl): { [key: string]: any } | null   => {
    const hasSpecialChar = re.test(control.value);
    // console.log(hasLetters);
    if (!hasSpecialChar) { return { 'needAtLeastOneSpecialChar': true}; }
    // return hasNumbers ? { 'hasNumbers': { value: control.value } } : null;
  };
}
