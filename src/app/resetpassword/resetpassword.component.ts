import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; //This is for Model driven form form
import { IfStmt } from '@angular/compiler';
import { AppComponent } from '../app.component';
import { NotificationsService } from 'angular2-notifications';
import { ResetPassword } from '../newModels/resetPassword';

export class password {
  password: any;
  confirmpassword: any;
  resetToken: any;
}
declare var jquery: any;
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPassowrdComponent implements OnInit {
  passerrorMsg = '';
  public passerror: boolean = false;
  model: any = {};
  public submitFlag: boolean = true;
  display: boolean;
  errorform: boolean;
  tokenValue: any;
  success: boolean;
  resetPasswordForm: any;
  resetbutton = true;
  // Creating an Object for Reset Password
  public resetObj: ResetPassword = new ResetPassword();
  constructor(public toastr: ToastrManager, private _notificationsService: NotificationsService, private userService: UserService, private spin: NgxSpinnerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      token: new FormControl('', [Validators.compose([Validators.required])]),
      password: new FormControl("", Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required])),
      confirmpassword: new FormControl("", Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required]))
    });

  }




  checkPasswords(value: any) {
    this.model.confirmpassword = value;
    if (this.model.password != this.model.confirmpassword) {
      this.passerror = true;
      this.passerrorMsg = "Password  Mismatch";
      this.resetbutton = false;

    }
    else {
      this.passerror = false;
      this.passerrorMsg = "";
      this.resetbutton = true;
    }

  }


  // reset Obj
  resettObj() {
    this.resetObj.resetToken = this.resetPasswordForm.get('token').value;
    this.resetObj.newPassword = this.resetPasswordForm.get('password').value;
    this.resetObj.currentPassword = this.resetPasswordForm.get('confirmpassword').value;

  }
  // Reset Password
  resetPassword() {
    this.resettObj();
    this.userService.passwordReset(this.resetObj).subscribe(res => {
      console.log(res);
      this._notificationsService.success('Success', 'You have successfully created new password');
      this.router.navigate(['/login'])
    }, error => {
      console.log(error);
      this._notificationsService.success('Failed', 'You have Failed To create new password');
    })
  }
}