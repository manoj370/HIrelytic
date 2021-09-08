import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationMessageService } from '../services/notification.service';

@Component({
  selector: 'app-employeeregister',
  templateUrl: './employeeregister.component.html',
  styleUrls: ['./employeeregister.component.css'],
})
export class EmployeeregisterComponent implements OnInit {
  departmentList: any = [];
  designationList: any = [];
  tenanatId: any;
  employeeRegistaionForm: FormGroup;
  emaiValue: string;
  constructor(private userService: UserService,
    private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private _notificationsService: NotificationMessageService) { }

  ngOnInit() {
    this.getDepartment();
    this.getDesignation();
    this.createForm();
  }

  getDepartment() {
    this.userService.getDepartment().subscribe((dep: any) => {
      // console.log(dep);
      this.departmentList = dep;
      console.log(this.departmentList);
      this.departmentList.forEach(element => {
        console.log(element.departmentName);
      });
    }, error => {
      console.log(error);
    });
  }

  createForm() {
    this.route.queryParams.subscribe(params => {
      console.log(params.emailId);
      console.log(atob(params.emailId));
      console.log(btoa(params.emailId));

      this.emaiValue = atob(params.emailId);
      this.tenanatId = atob(params.requestId);
    });
    this.employeeRegistaionForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      emailid: [{ value: this.emaiValue, disabled: true }],
      deg: [null, Validators.required],
      dep: [null, Validators.required],
      empId: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(5)]],
      pwd: ['', Validators.required],
      confiramPwd: ['', Validators.required]
    });
  }
  get f() { return this.employeeRegistaionForm.controls; }  // controls
  Submit() {
    if (this.employeeRegistaionForm.valid) {
      console.log(this.employeeRegistaionForm.value);
      this.departmentList.forEach(dep => {
        if (dep.departmentName === this.employeeRegistaionForm.value.dep) {
          this.employeeRegistaionForm.value.dep = dep.departmentId;
        }
      });
      this.designationList.forEach(deg => {
        if (deg.designationName === this.employeeRegistaionForm.value.deg) {
          this.employeeRegistaionForm.value.deg = deg.designationId;
        }
      });
      const obj = {
        emailId: this.emaiValue,
        firstName: this.employeeRegistaionForm.value.fname,
        lastName: this.employeeRegistaionForm.value.lname,
        phoneNumber: this.employeeRegistaionForm.value.mobile,
        passWord: this.employeeRegistaionForm.value.pwd,
        employeeId: this.employeeRegistaionForm.value.empId,
        organization: {
          tenantId: this.tenanatId
        },
        department: {
          departmentId: this.employeeRegistaionForm.value.dep
        },
        designation: {
          designationId: this.employeeRegistaionForm.value.deg
        }
      };
      console.log(obj);
      this.userService.createEmployee(obj).subscribe((empData: any) => {
        console.log(empData);
        this.employeeRegistaionForm.reset();
        this.router.navigate(['/login']);
        this._notificationsService.showSuccessNotif('Success', 'Successfully Joined Organisation');
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Error', 'Error Please Contact Admin');
      });
    }
  }

  getDesignation() {
    this.userService.getDesignation().subscribe((deg: any) => {
      this.designationList = deg;
      console.log(this.designationList);
    }, error => {
      console.log(error);
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
