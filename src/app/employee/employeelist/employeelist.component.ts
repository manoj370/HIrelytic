import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';
import { NotificationMessageService } from '../../services/notification.service';
import { NewServiceService } from '../../services/new-service.service';
import { HttpUrls } from './../../shared/HttpUrls';
declare var $: any;
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeelistComponent implements OnInit, OnDestroy {
  empEmail: string;
  GridApi: any;
  headerValue: any;
  employeesData: any = [];
  inviteEmployeeForm: FormGroup;
  fileUpload:FormGroup;
  empStatusForm: FormGroup;
  userName: string;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();

  employeeCards: any;

  columnDefs = [
    {
      headerName: 'Name',
      field: 'firstName',
      width: 200,
      checkboxSelection: false,
      unSortIcon: true
    },
    { headerName: 'Email Id', field: 'emailId', width: 200, unSortIcon: true },
    { headerName: 'Phone', field: 'phoneNumber', width: 200, unSortIcon: true },
    {
      headerName: 'Designation',
      field: 'designation.designationName',
      width: 200,
      unSortIcon: true
    },
    {
      headerName: 'Department',
      field: 'department.departmentName',
      width: 200,
      unSortIcon: true
    },
    // { headerName: 'Status', field: 'active', width: 200, unSortIcon: true },
    {
      headerName: 'Status',
      field: 'active',
      width: 200,
      unSortIcon: true,
      cellClassRules: {
        'rag-green-active': function(params) {
          return params.value === 'Active';
        },
        'rag-amber-inactive': function(params) {
          return params.value === 'Inactive';
        }
      },
      cellRenderer: function(params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    },
    {
      headerName: 'Action',
      width: 180,
      field: 'active',
      unSortIcon: true,
      cellRenderer: function(paramas) {
        // console.log(paramas);
        if (paramas.value !== 'Active') {
          // tslint:disable-next-line: max-line-length
          return '<span class="editIcon"><i class="fas fa-user-check activeIcon" title="User Activation"  data-toggle="modal" data-target="#deletModal"></i></span>';
        } else {
          return '<span class="editIcon"><i class="fas fa-user-times deleteIcon" title="User Inactivation"  data-toggle="modal" data-target="#deletModal"></i></span>';
        }
      }
      // cellRenderer: function () {
      //  return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#deletModal"></i> <i class="fas fa-trash deleteIcon"  data-toggle="modal" data-target="#deletModal"></i></span>';
      // }
    }
  ];
  statusUser: any;
  empData: any;
  userInfo: any;
  isActive: boolean;
  downloadSheetData: string;

  constructor(
    private userService: UserService,
    private newSer: NewServiceService,
    private formBuilder: FormBuilder,
    private _notificationsService: NotificationMessageService
  ) {}

  ngOnInit() {
    // this.getData('Employee');
    // Add the following code if you want the name of the file appear on select
    $('.custom-file-input').on('change', function() {
      var fileName = $(this)
        .val()
        .split('\\')
        .pop();
      $(this)
        .siblings('.custom-file-label')
        .addClass('selected')
        .html(fileName);
    });
    this.getEmployeesData();
    console.log(HttpUrls.downloadSheet);
    this.downloadSheetData = HttpUrls.downloadSheet;
    this.getuser();


    this.inviteEmployeeForm = this.formBuilder.group({
      emailId: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)
        ])
      )
    });

    this.empStatusForm = this.formBuilder.group({
      empStatus: ['', Validators.required]
    });
  }
  get g() {
    return this.empStatusForm.controls;
  } // controls

  sendInvitation() {
    console.log(this.inviteEmployeeForm.value);
    this.userService
      .inviteEmployee(this.inviteEmployeeForm.value)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.clearValidations();
          this.closeBtn.nativeElement.click();
          this._notificationsService.showSuccessNotif(
            'Success',
            'Sent Successfully'
          );
        },
        error => {
          console.log(error);
          this._notificationsService.showErrorNotif(
            'Error',
            'Something Went Wrong Please Try Agin'
          );
        }
      );
  }
  // EmployeesData
  getEmployeesData() {
    this.userService
      .getEmployeesDta()
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.employeeCards = res;
        },
        error => {
          console.log(error);
        }
      );
  }
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }
  getuser() {
    this.userService
      .getAllEmployees()
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        result => {
          this.employeesData = result;
          this.employeesData.forEach(element => {
            element.firstName = element.firstName + element.lastName;
            if (element.active === true) {
              element.active = 'Active';
            } else {
              element.active = 'Inactive';
            }
          });
          // console.log(result, 'Users');
        },
        error => {
          console.log(error);
        }
      );
  }

  uploadData(event) {
    this.userService
      .postEmployeeSheet(event.target.files[0])
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this._notificationsService.showSuccessNotif(
              'Success',
              'Upload Successfully..'
            );
            document.getElementById("customFile").innerHTML = null;
            }
        },
        error => {
          console.log(error);
          this._notificationsService.showErrorNotif(
            'Error',
            'Try to Upload Agiain..'
          );
        }
      );
  }

  getData(data: any) {
    console.log(data);
    this.headerValue = data;
    this.statusUser = data.value;
    this.userName = data.data.firstName + data.data.lastName;
    this.empData = data.data;
    this.userInfo = data.data;
    console.log(this.statusUser);
  }

  // Delete User
  removeUser() {
    const username =
      this.userInfo.emailId + '|' + sessionStorage.getItem('tenantId');
    if (this.userInfo.active === 'Active') {
      this.isActive = true;
      const obj = {
        username,
        enabled: this.isActive
      };
      this.newSer
        .removeUser(obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(
          data => {
            console.log(data);
            this._notificationsService.showSuccessNotif(
              'Removed',
              'Deactivated Successfully..'
            );
            this.getuser();
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.isActive = false;
      const obj = {
        username,
        enabled: this.isActive
      };
      this.newSer
        .removeUser(obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(
          data => {
            console.log(data);
            this._notificationsService.showSuccessNotif(
              'Activated',
              'Activated Successfully..'
            );
            this.getuser();
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  clearValidations() {
    this.inviteEmployeeForm.reset();
  }

  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
