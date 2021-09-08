
import { User } from '../models/user';
import { Skills } from '../models/skill';
import { Status } from '../models/status';
import { TenantDetails } from '../models/tenantroles';
import { UserService } from '../services/user.service';
import { userPrivileges } from '../models/privileges';
import { ToastrManager } from 'ng6-toastr-notifications';
import { newRole } from '../models/postRoleWithPrivilege';
import { TopLevel } from '../models/updatePrivileges';
import { TenantService } from '../services/tenant.service';
import { resendMail } from '../models/resendMail';
import { NotificationMessageService } from '../services/notification.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NewServiceService } from '../services/new-service.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('inviteBtn') inviteBtn: ElementRef;
  @ViewChild('manageRoleBtn') manageRoleBtn: ElementRef;
  @ViewChild('managePreBtn') managePreBtn: ElementRef;
  @ViewChild('customRoleBtn') customRoleBtn: ElementRef;
  userPrivilege: userPrivileges = new userPrivileges();
  model: TenantDetails = new TenantDetails();
  public newRole: newRole = new newRole();
  resendId: any;
  list: any;
  userid: any;
  userForm: FormGroup;
  editUserForm: FormGroup;
  userDetailsObject: User = new User();
  userName: any;
  userDetails: any;
  form: any;
  allPrivilegesDetails: any;
  inviteuserForm: FormGroup;
  sampleroles: any = [];
  email: any;
  role: any;
  GridApi: any;
  // GridApi: any;
  userIdFrCstmRole: any;
  selectedUserPrivilege: any;
  checkedValues: any = [];
  privilegesss: any;
  list2: any = [];
  allPrivilegesToAssign: any = [];
  list1: any = [];
  addRoleForm: FormGroup;
  public privilegeId: any;
  privId: any;
  checkedPrivValues: any = [];
  customRoles: any = [];
  userList: any = [];
  resendEmails: any[];
  // GridApi: any;
  roles: any = [];
  tentId: string;
  checkId: any;
  addedRoles = [];
  skillresponse: any;
  skillForm: FormGroup;
  addStatusForm: FormGroup;
  public resendMailObj: resendMail;
  public skill: Skills = new Skills();
  hasUnsavedNotes: boolean;
  unregisterData: any = [];
  selectedPrivileges: any;
  resPriveliges: any;
  customRoless: any = [];
  filteredPrivileges: any = [];
  privilegesPerRole: any = [];
  public toplevel: TopLevel = new TopLevel();
  editprivelige: any = [];
  checkedPrivValuesForPrivilege: any = [];
  subscribe: Subject<any> = new Subject<any>();
  addedAuthoryobj: any = [];
  allResumeStatus: any = [];
  disableCreateRole: boolean = true;
  public status: Status = new Status();
  gridColumnApi: any;
  gridApi: any;
  name: any;
  multiplearray: any = [];
  selectedRole = [];
  selectedRolesPrevi: any = [];
  pagination = false;
  rowHeight: any;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  submitted: boolean;
  idvalue: any;
  rowClassRules: any;
  userInfo: any;
  isActive = false;

  public pageid: any = 0;
  public rowid: any = 15;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responsePageCount: number;
  pageCount: number = 1;
  totalCount: any;
  editstatus: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  stageid: any;
  resumestatus: any;
  editStatusForm: FormGroup;
  updateBtn = true;
  newRoleId: void;
  changePage: any;
  totalPages: any;
  privileges: any = [];
  authority: any = [];
  manageusers = false;
  firstLetter: any;
  statusUser: any;
  modulesList: any;
  mnageList: any = [];
  object= { '2': 'foo', '1': 'bar' };
  constructor(private formBuilder: FormBuilder,
    private _notificationsService: NotificationMessageService,
    public toastr: ToastrManager, private newSer: NewServiceService,
    private userService: UserService, private _TenantService: TenantService) {
    this.resendMailObj = new resendMail();
    const tentId = sessionStorage.getItem('tenantId');
    this.resendMailObj.tenantId = tentId;
    this.rowHeight = 30;
    this.rowClassRules = {
      'sick-days-warning': function (params) {
        return params.node.rowIndex % 2 !== 0;
      }

    };
  }

  public editformEmail() {
    this.editUserForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      editUserEmail: ['', Validators.compose([Validators.required, Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      roleId: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.userService.allModuleRoles()
      .pipe(takeUntil(this.subscribe))
      .subscribe((result: any) => {
        this.modulesList = result;
        this.mnageList = result['USER MANAGEMENT'];
        console.log(this.mnageList, 'All Roles');
        console.log(result, 'All Roles');

      }, error => {
        console.log(error);
      });
    this.getAllStatus();
    this.getUnregister();
    this.getPrivilege();
    this.inviteuserForm = this.formBuilder.group({
      inviteEmilId: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)])),
      userRole: new FormControl('', Validators.required),
    });
    this.editformEmail();
    this.getAllUsers();
    this.getAllUserRoles();
    this.getuser();

    this.userForm = this.formBuilder.group({
      Name: [''],
      Email: [''],
      Contact: ['']
    });

    this.addRoleForm = this.formBuilder.group({
      addRole: new FormControl('', Validators.required),
    });
    this.addStatusForm = new FormGroup({
      status: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\d-_]+$/)])),
    });
    this.editStatusForm = new FormGroup({
      status: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\d-_]+$/)])),
    });
    this.skillForm = this.formBuilder.group({
      addSkill: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
    });
  }
  get f() { return this.addRoleForm.controls; }
  ngAfterViewInit() {
  }

  // Table
  columnDefs = [
    { headerName: 'Name', field: 'firstName', width: 200, checkboxSelection: false, unSortIcon: true },
    { headerName: 'Email Id', field: 'emailId', width: 200, unSortIcon: true },
    { headerName: 'Phone', field: 'phoneNumber', width: 200, unSortIcon: true },
    { headerName: 'Role', valueGetter: 'data.roles[0].roleName', width: 200, unSortIcon: true },
    {
      headerName: 'Status', field: 'active', width: 200, unSortIcon: true,
      cellClassRules: {
        'rag-green-active': function (params) {
          return params.value === 'active';
        },
        'rag-amber-inactive': function (params) {
          return params.value === 'Inactive';
        },
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    },
    {
      headerName: 'Action', width: 180, field: 'active', unSortIcon: true,
      cellRenderer: function (paramas) {
        if (paramas.value === 'Inactive') {
          // tslint:disable-next-line: max-line-length
          return '<span class="editIcon"><i class="fas fa-user-check activeIcon" title="User Activation"  data-toggle="modal" data-target="#deletModal"></i></span>';
        } else {
          return '<span class="editIcon"><i class="fas fa-edit updateIcon" title="User Update"  data-toggle="modal" data-target="#gridicon"></i><i class="fas fa-user-times deleteIcon" title="User Inactivation"  data-toggle="modal" data-target="#deletModal"></i></span>';

        }
      }
      // cellRenderer: function () {
      //   return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#gridicon"></i> <i class="fas fa-trash deleteIcon"  data-toggle="modal" data-target="#deletModal"></i></span>';
      // }
    },
  ];
  // unregister
  unRegistercolumnDefs = [
    {
      headerName: ' Role Name', unSortIcon: true, headerClass: 'ctHeader', field: 'roleName',
      width: 300,
    },
    { headerName: 'Email Id', unSortIcon: true, field: 'emailId', width: 300 },
    {
      headerName: 'Action', width: 180, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-redo-alt updateIcon" title="Resend Invitation"></i></span>';
      }
    },
  ];

  // tslint:disable-next-line: member-ordering
  ColumnDefsToStatus = [
    // tslint:disable-next-line: max-line-length
    { headerName: ' Status Name', unSortIcon: true, headerClass: 'ctHeader', field: 'resumeStatus', width: 600, enableFilter: true, checkboxSelection: false, enableSorting: true, rowSelection: 'multiple' },
    // { headerName: 'Stage', unSortIcon: true, headerClass: 'ctHeader', field: 'stageId', width: 500, enableFilter: true },
    {
      headerName: 'Action', width: 600, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#editStatusModal" ></i> </span>';
      }
    },
  ];



  // Delete User
  removeUser() {
    const username = this.userInfo.emailId + '|' + sessionStorage.getItem('tenantId');
    if (this.userInfo.active === 'active') {
      this.isActive = true;
      const obj = {
        username,
        enabled: this.isActive
      };
      this.newSer.removeUser(obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(data => {
          console.log(data);
          this._notificationsService.showSuccessNotif('Removed', 'Deactivated Successfully..');
          this.getAllUsers();
        }, error => {
          console.log(error);
        });

    } else {
      this.isActive = false;
      const obj = {
        username,
        enabled: this.isActive
      };
      this.newSer.removeUser(obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(data => {
          console.log(data);
          this._notificationsService.showSuccessNotif('Activated', 'Activated Successfully..');
          this.getAllUsers();
        }, error => {
          console.log(error);
        });

    }
  }

  // Invite User
  inviteuser() {
    console.log(this.inviteuserForm.value);
    const inviteobj = {
      emailId: this.inviteuserForm.value.inviteEmilId,
      organizationId: sessionStorage.getItem('tenantId'),
      roleId: this.inviteuserForm.value.userRole
    };
    this.userService.inviteUser(inviteobj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(data => {
        if (data) {
          this._notificationsService.showSuccessNotif('Sent', 'Invitation sent Succefully');
          this.inviteuserForm.reset();
        }
      }, errror => {
        console.log(errror);
        this._notificationsService.showWarnNotif('Exists', 'Already Exists');
        this.inviteuserForm.reset();
      });
  }

  // To get All Resume Status
  getAllStatus() {
    this._TenantService.getAllStatus()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        console.log('resumeStatus', res);
        this.allResumeStatus = res;
      }, error => {
        console.log(error);
      });
  }


  // get Authority Names
  getuser() {
    this.userService.userList()
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.userList = result;
        console.log(result, 'Users');
      }, error => {
        console.log(error);
      });
  }
  // Get All All Users For Table
  getAllUsers() {
    this.userService.AllUsers(this.pageid, this.rowid)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.list = result;
        this.totalCount = this.list[0].jobCount;
        this.responsePageCount = this.list[0].pageCount;
        console.log(this.totalCount);
        for (let index = 0; index < this.list.length; index++) {
          this.list[index].firstName = this.list[index].firstName + ' ' + this.list[index].lastName;
          const element = this.list[index].active;
          if (element === true) {
            this.list[index].active = 'active';
          } else if (element === false) {
            this.list[index].active = 'Inactive';
          } else {

          }
        }
        console.log(this.list, 'All Users');
      }, error => {
        console.log(error);
      });
  }

  // Get Unregsiter Users
  getUnregister() {
    this.userService.getUnregsiter()
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.unregisterData = result;
        console.log(this.unregisterData, 'All Unregister Users');
      }, error => {
        console.log(error);
      });
  }

  // All User Roles and Previlizes
  getAllUserRoles() {
    this.userService.AllRoles()
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.roles = result;
        console.log(this.roles, 'All Roles From Backend');
      }, error => {
        console.log(error);
      });
  }

  // Select aUTHORITIES
  selectAuthority(data: any) {
    if (this.addedRoles.some(element => element.authorityId === data.authorityId)) {
      for (let i = 0; i <= this.addedRoles.length; i++) {
        if (this.addedRoles[i].authorityId === data.authorityId) {
          document.getElementById(data.authorityId).classList.remove('check');
          this.addedRoles.splice(i, 1);
          console.log(this.addedRoles);
          i = this.addedRoles.length;
        }
      }
    } else {
      document.getElementById(data.authorityId).classList.add('check');
      this.addedRoles.push(data);
      console.log(this.addedRoles);
    }
  }

  // Checking Duplicate  Role Name
  checkCreateRoleName(name: any) {
    this.submitted = true;
    if (this.addRoleForm.valid) {
      this.userService.checkRoleName(name)
        .pipe(takeUntil(this.subscribe))
        .subscribe(result => {
          console.log(result, 'RESULT');
          if (result === true) {
            console.log('already');
            this._notificationsService.showWarnNotif('Warning', 'Role Name Already Exists');
            this.addRoleForm.reset();
          }
        }, error => {
          console.log(error);
        });
    }
  }

  // add New Role
  addRole() {
    if (this.addRoleForm.value.addRole.charCodeAt(0) !== 32) {
      this.addedRoles.forEach(ele => {
        const authorityobj = {
          authorityId: ele.authorityId
        };
        this.addedAuthoryobj.push(authorityobj);
      });
      const obj = {
        roleName: this.addRoleForm.value.addRole,
        organizationId: sessionStorage.getItem('tenantId'),
        authorities: this.addedAuthoryobj
      };
      if (obj.authorities.length !== 0) {
        this.userService.createNewRole(obj)
          .pipe(takeUntil(this.subscribe))
          .subscribe(data => {
            console.log(data);
            this._notificationsService.showSuccessNotif('Role', 'Role Added Succefully');
            this.addRoleForm.reset();
            this.getuser();
            for (let i = 0; i < this.addedRoles.length; i++) {
              document.getElementById(this.addedRoles[i].authorityId).classList.remove('check');
              console.log(this.addedRoles);
            }
            this.addedRoles = [];
            this.addedAuthoryobj = [];
          }, error => {
            console.log(error);
          });
      } else {
        this._notificationsService.showWarnNotif('Warning', 'Role Should Contain Atleast One Privilege');
        for (let index = 0; index < this.roles.length; index++) {
          const element = this.roles[index].authorityId;
          document.getElementById(element).classList.remove('check');
        }
        this.addedRoles = [];
      }
    } else {
      this._notificationsService.showWarnNotif('Warning', 'Role Name Should Not Start with Empty Space');
      for (let index = 0; index < this.roles.length; index++) {
        const element = this.roles[index].authorityId;
        document.getElementById(element).classList.remove('check');
      }
      this.addedRoles = [];
    }
  }
  // get previliges
  getPriveliges(roleId: any) {
    for (let index = 0; index < this.roles.length; index++) {
      const element = this.roles[index].authority;
      document.getElementById(element).classList.remove('check');
    }
    console.log(roleId);
    this.list1 = [];
    this.selectedPrivileges = [];
    console.log(this.selectedPrivileges);
    this.allPrivilegesToAssign = [];
    this.toplevel.roleId = roleId;
    this.allPrivilegesDetails = [];

    this.userService.getprev(roleId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        console.log(res);
        this.privilegesPerRole = res;
        console.log(this.privilegesPerRole);
        const dups = [];
        const arr = this.privilegesPerRole.authorities.filter(function (el) {
          // If it is not a duplicate, return true
          if (dups.indexOf(el.authorityId) === -1) {
            dups.push(el.authorityId);
            return true;
          }
          return false;
        });
        console.log(arr);
        this.selectedPrivileges = arr;
        console.log(this.selectedPrivileges);
        for (let index = 0; index < this.selectedPrivileges.length; index++) {
          const element = this.selectedPrivileges[index].authority;
          document.getElementById(element).classList.add('check');
        }
      }, error => {
        console.log(error);
      });
  }
  updateData() {
    console.log(this.selectedPrivileges);
    if (this.selectedPrivileges.length > 1) {
      this.list2 = [];
      for (let index = 0; index < this.selectedPrivileges.length; index++) {
        const element = this.selectedPrivileges[index].authorityId;
        const authorityobj = {
          authorityId: element
        };
        this.list2.push(authorityobj);
      }
      const updateObj = {
        roleName: this.editUserForm.value.roleName,
        roleId: this.editUserForm.value.roleId,
        authorities: this.list2,
        organizationId: sessionStorage.getItem('tenantId')
      };
      this.userService.updateUserRoles(this.idvalue, updateObj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(data => {
          console.log(data);
          this._notificationsService.showSuccessNotif('Updated', 'User updated');
          console.log('data');
          this.getAllUsers();
        }, error => {
          console.log(error);
        });
    } else {
      this._notificationsService.showWarnNotif('Warning', 'Role Should Contain Atleast One Privilege');
    }
  }

  getData(event: any) {
    console.log(event.data);
    this.userInfo = event.data;
    this.idvalue = event.data.userId;
    this.userName = event.data.firstName;
    this.statusUser = event.data.active;
    // this.getPriveliges()
    this.selectedPrivileges = [];
    console.log(event.data.roles.length);
    if (event.data.active === 'active') {
      if (event.data.roles.length === 0) {
        console.log(event.data);
        this.editUserForm.setValue({
          roleName: event.data.firstName,
          editUserEmail: event.data.emailId,
          phoneNumber: event.data.phoneNumber,
          roleId: ''
        });
      } else {
        this.editUserForm.setValue({
          roleName: event.data.firstName,
          editUserEmail: event.data.emailId,
          phoneNumber: event.data.phoneNumber,
          roleId: event.data.roles[0].roleId
        });
        this.getPriveliges(event.data.roles[0].roleId);
      }
    }
  }



  public selectUserPrivelege(data: any) {
    if (this.selectedPrivileges.some(element => element.authority === data.authority)) {
      for (let i = 0; i <= this.selectedPrivileges.length; i++) {
        if (this.selectedPrivileges[i].authority === data.authority) {
          document.getElementById(data.authority).classList.remove('check');
          this.selectedPrivileges.splice(i, 1);
          console.log(this.selectedPrivileges);
          i = this.selectedPrivileges.length;
        }
      }
    } else {
      document.getElementById(data.authority).classList.add('check');
      this.selectedPrivileges.push(data);
      console.log(this.selectedPrivileges);
    }
  }

  // Setting Form Values to an Object
  createStatusObj() {
    this.status.tenantId = sessionStorage.getItem('tenantId');
    this.status.resumeStatus = this.addStatusForm.get('status').value;
    this.multiplearray.push(this.status);
  }
  // Create Status
  createStatus() {
    // this.checkResumeStatus();
    this.createStatusObj();
    this._TenantService.CreateStatus(this.multiplearray)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        console.log('createstatus', res);
        this.getAllStatus();
        this._notificationsService.showSuccessNotif('Success', 'Status Created Successfully');
        this.addStatusForm.reset();
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Failed', 'Status Creation Failed');
      });
  }
  // selected Row in unregisterd Users
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onRowClicked(event: any) {
    console.log('row', this.resendId = event.data.requestId);
    this.resendId = event.data.requestId;
    this.resendUser();
  }

  // resend Invitation
  resendUser() {
    console.log(this.resendId);
    if (this.resendId) {
      this.userService.resendInv(this.resendId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(data => {
          console.log(data);
          this._notificationsService.showSuccessNotif('Success', 'Invitation sent Successfully');
        }, error => {
          console.log(error);
          this._notificationsService.showWarnNotif('Exists', 'Already Exists');
        });
    } else {
      this._notificationsService.showWarnNotif('Warning', 'Please Select One User');
    }
  }

  inviteuserform() {
    this.inviteuserForm.reset();
  }
  statusFormClose() {
    this.addStatusForm.reset();
  }
  // destroy the subscription
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

  editData(data: any) {
    this.updateBtn = false;
    console.log(data);
    this.newRoleId = data.roleId;
    this.addRoleForm.setValue({
      addRole: data.roleName,
    });
    this.getPriveliges(data.roleId);
  }


  clearValidations() {
    this.updateBtn = true;
    this.addRoleForm.reset();
    for (let index = 0; index < this.roles.length; index++) {
      const element = this.roles[index].authority;
      document.getElementById(element).classList.remove('check');
    }
  }

  updateRoles() {
    console.log(this.addRoleForm.value);
    this.list2 = [];
    for (let index = 0; index < this.selectedPrivileges.length; index++) {
      const element = this.selectedPrivileges[index].authorityId;
      const authorityobj = {
        authorityId: element,
      };
      this.list2.push(authorityobj);
    }
    const updateObj = {
      roleName: this.addRoleForm.value.addRole,
      roleId: this.newRoleId,
      authorities: this.list2,
    };
    console.log(updateObj);
    this.userService.updateRoles(updateObj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(data => {
        console.log(data);
        this._notificationsService.showSuccessNotif('Updated', 'Role updated');
        console.log('data');
        this.getuser();
      }, error => {
        console.log(error);
      });
  }
  // For Paginations
  onBtNext() {
    this.disablePreviousButton = false;
    this.disableNextButton = false;
    this.pageCount++;
    if (this.pageCount === this.responsePageCount) {
      this.disableNextButton = true;
      this.disablePreviousButton = false;
    } else if (this.pageCount >= this.responsePageCount) {
      this.pageCount--;
      this.disableNextButton = true;
      this.disablePreviousButton = true;
      this.pageid = this.pageid - 1;
    } else {
      this.disableNextButton = false;
      this.disablePreviousButton = false;
    }
    this.list = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    this.getAllUsers();
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid - 1;
    this.list = [];
    this.getAllUsers();
  }
  // Edit Status
  editStatus(event: any) {
    debugger
    // this.editstatus = false;
    console.log(event.data.resumeStatus);
    console.log(event.data.candidateStageId);
    this.stageid = event.data.candidateStageId;
    this.resumestatus = this.editStatusForm.get('status').value;
    this.editStatusForm.patchValue({
      'status': event.data.resumeStatus
    });
  }
  // Update Resume Status
  statusEdit() {
    console.log(this.stageid);
    this.resumestatus = this.editStatusForm.get('status').value;
    console.log(this.resumestatus);
    this.newSer.editResumeStatus(this.stageid, this.resumestatus).takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this._notificationsService.showSuccessNotif('Resume Status', 'Updated Successfully');
        this.getAllStatus();
      } else {
        this._notificationsService.showErrorNotif('Failed', 'To Update Successfully');
      }
    }, error => {
      console.log(error);
    });
  }


  buttonupdate() {
    this.addStatusForm.reset();
    this.editstatus = true;
  }


  onBtNextag() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPreviousag() {
    this.gridApi.paginationGoToPreviousPage();
  }
  onPaginationChanged() {
    if (this.gridApi) {
      this.totalPages = this.gridApi.paginationGetTotalPages();
      this.changePage = this.gridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePage);
    }
  }
  getPrivilege() {
    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        // console.log(this.authority, 'authoirithyName');

        if (this.authority === 'MANAGE USERS') {
          this.manageusers = true;
        }

      });
    });

  }
  // check resume status whether it is exist or not
  checkResumeStatus(resumestatus: any) {
    if (this.manageusers == true) {
      this.resumestatus = this.addStatusForm.get('status').value;
      this.userService.checkResumeStatus(this.resumestatus).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        if (res === true) {
          this._notificationsService.showWarnNotif('Warning', 'Status already Exists');
          this.addStatusForm.reset();
        }

      }, error => {
        console.log(error);
      });
    }
  }
}

