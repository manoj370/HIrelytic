import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Session } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Alert } from 'selenium-webdriver';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { clientCreationModel, addressIdModel } from '../../models/clientcreation';
import { AssignClientToUser } from '../../models/assignclienttouser';
import { createManager } from '../../models/createManager';
import { NewServiceService } from '../../services/new-service.service';
import { UserService } from '../../services/user.service';
import { TenantService } from '../../services/tenant.service';
import { NotificationMessageService } from '../../services/notification.service';
import { VendorService } from '../../services/vendor.service';
import { JobPostingService } from '../../services/jobposting.service';
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  // submitted = false;

  @ViewChild('addManagerBtn') addManagerBtn: ElementRef;
  @ViewChild('assignClientBtn') assignClientBtn: ElementRef;
  @ViewChild('modalForchangeStatus') modalForchangeStatus: ElementRef;
  clientCreationForm: FormGroup;
  public clientcreationObj: clientCreationModel;
  public assignToClientObj: AssignClientToUser;
  public createManagerObj: createManager = new createManager();
  addManagerForm: FormGroup;
  tenantId: any;
  managerList: any;
  getManagerName: any = [];
  gridOptions: { animateRows: boolean; enableColResize: boolean; columnDefs: any; rowData: any; rowHeight: number; headerHeight: number; };
  managerStatus: any;
  getAllUsers: any;
  getlistofusers: any;
  gridApi: any;
  rowSelectedUser: any;
  assignclienttouser: any;
  rowSelectedClient: any;
  EDITCLIENTID: any;
  getDetailsForEdit: any;
  updateclientdetails: any;
  rowSelectedId: any;
  viewClientDetails: any;
  clientIDD: any;
  managerDetails: any = [];
  statuses: any;
  countryName: string;
  statuse: any;
  obj: any;
  countryArray: any = [];
  countryList: any;
  stateList: any;
  countries = [
    { code: 'US', name: 'United States of America' },
    { code: 'IN', name: 'India' },
  ];
  countryCode: string = '+91';
  clientDetails: any = [];
  clientExist: boolean;
  getClientName: any;
  hideViewManager: boolean = true;
  hideAddManager: boolean = true;
  GridApi: any;
  clientId: any;
  happy: any;
  clientIdForManager: number;
  disableAssignClientToUser: boolean = true;
  disableEditClient: boolean = true;
  disableViewClient: boolean = true;
  clientIds: any[];
  userIds: any[];
  public disabledChangeStatus: boolean = true;
  disabledAssignClient: boolean = true;
  disableEditManager: boolean = true;
  submitted = false;
  countryId: any;
  addressData: any;
  clientuserss: any = [];
  totalPages: any;
  changePage: any;
  totalPagess: any;
  changePages: any;
  paginationrecords: any;
  rowSelectStatus: string;
  editManagerForm: FormGroup;
  clientcontactid: any;
  editMngBtn: boolean;
  constructor(private newService: NewServiceService, private router: Router,
    private activateroute: ActivatedRoute, private _UserService: UserService,
    private _TenantService: TenantService, private _notificationsService:
      NotificationMessageService, private fb: FormBuilder, private _jobpostingService: JobPostingService,
    private spin: NgxSpinnerService, private _VendorService: VendorService, ) {
    this.activateroute.params.subscribe((params: Params) => this.clientId = params['id']);
    this.activateroute.params.subscribe((params: Params) => this.statuses = params['status']);
    // alert(this.clientId);
    console.log(this.clientId, 'CLIENTIDDDDDD'),
      console.log(this.statuses, 'status');
    this.clientcreationObj = new clientCreationModel();
    this.assignToClientObj = new AssignClientToUser();
    let tentId = sessionStorage.getItem('tenantId');
  }
  createForm() {
    this.clientCreationForm = this.fb.group({
      addresses: this.fb.array([this.fb.group({
        line1: ['', Validators.compose([Validators.required,
        Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./:;@#$&*]*$/)])],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]*$/)])],
        landmark: [''],
        zipCode: ['', Validators.required]
      })]),
      clientName: new FormControl(null, Validators.compose
        ([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z0-9 ]*$/)])),
      personFirstName: new FormControl(null, Validators.compose
        ([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      personLastName: new FormControl(null, Validators.compose
        ([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      emailId: new FormControl(null, [Validators.compose
        ([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+.[a-zA-Z-.]+(com||in)+$'), Validators.email])]),
      contactNumber: new FormControl(null, Validators.compose
        ([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+[0-9]+')])),
      designation: new FormControl(null, Validators.compose
        ([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
    });
  }
  ngOnInit() {
    this.addManagerForm = new FormGroup({
      coOrdinatorFirstName: new FormControl('', Validators.compose
        ([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      coOrdinatorLastName: new FormControl('', Validators.compose
        ([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      clientCoOrdinatorEmailId: new FormControl('', Validators.compose
        ([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      clientCoOrdinatorPhoneNo: new FormControl('', Validators.compose
        ([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]*$/)])),
    });

    if (this.statuses == 'Active') {
      this.disableEditClient = false;
      this.disableAssignClientToUser = false;
      this.hideAddManager = false;
      this.disabledChangeStatus = false;
      this.disableEditManager = true;
    } else {
      this.disableEditClient = true;
      this.disableAssignClientToUser = true;
      this.hideAddManager = true;
      this.disabledChangeStatus = false;
      this.disableEditManager = false;
    }
    this.getClientsdatabyId();
    this.createForm();
    this.getManagerList();
    this.getAllListOfUsers();
    this.getAllCountries();
    this.getClientNames();
    this.listOfUsersWorkingOnClient();
    this.gridOptions = {
      animateRows: true,
      enableColResize: true,
      columnDefs: this.columnDefsToViewClients,
      rowData: null,
      rowHeight: 35,
      headerHeight: 35,
    };
  }
  // tslint:disable-next-line: member-ordering
  columnDefsToViewClients = [
    {
      headerName: 'Client Name', headerClass: 'ctHeader',
      field: 'clientName', minWidth: 100, width: 200, checkboxSelection: true, rowSelection: 'single'
    },
    { headerName: 'First Name', headerClass: 'ctHeader', field: 'personFirstName', minWidth: 100, width: 250 },
    { headerName: 'Last Name', headerClass: 'ctHeader', field: 'personLastName', minWidth: 100, width: 230 },
    { headerName: 'Email Id', headerClass: 'ctHeader', field: 'emailId', minWidth: 100, width: 250 },
    { headerName: 'Phone Number', headerClass: 'ctHeader', field: 'contactNumber', minWidth: 100, width: 200 },
    {
      headerName: 'Status', headerClass: 'ctHeader', field: 'status', minWidth: 100, width: 200,
      cellStyle: function (element) {
        if (element.value == 'Active') {
          return { color: 'green' }
        } else if (element.value == 'InActive') {
          return { color: 'red' }
        } else {
          return null;
        }
      }
    },
  ]
  // tslint:disable-next-line: member-ordering
  columnDefsToViewManagers = [
    { headerName: 'First Name', headerClass: 'ctHeader', field: 'coOrdinatorFirstName', minWidth: 100, width: 250 },
    { headerName: 'Last Name', headerClass: 'ctHeader', field: 'coOrdinatorLastName', minWidth: 100, width: 230 },
    { headerName: 'Email Id', headerClass: 'ctHeader', field: 'clientCoOrdinatorEmailId', minWidth: 100, width: 250 },
    { headerName: 'Phone Number', headerClass: 'ctHeader', field: 'clientCoOrdinatorPhoneNo', minWidth: 100, width: 200 },
  ];
  // tslint:disable-next-line: member-ordering
  columnDefsToUsers = [
    { headerName: 'Name', headerClass: 'ctHeader', field: 'name', minWidth: 100, width: 500, checkboxSelection: true, unSortIcon: true },
    { headerName: 'Role Name', headerClass: 'ctHeader', field: 'roleName', minWidth: 100, width: 500, unSortIcon: true },
  ];
  // tslint:disable-next-line: member-ordering
  columnDefsTousers = [
    { headerName: 'Name', headerClass: 'ctHeader', field: 'firstName', minWidth: 100, width: 500, unSortIcon: true },
    { headerName: 'Role Name', headerClass: 'ctHeader', field: 'lastName', minWidth: 100, width: 500, unSortIcon: true },
  ];
  setAddresses(addresses: addressIdModel[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.clientCreationForm.setControl('addresses', addressFormArray);
  }
  get addresses(): FormArray {
    return this.clientCreationForm.get('addresses') as FormArray;
  }
  keyPress(event: any) {
    const pattern = /^[0-9a-zA-Z]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPresss(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  addAdresses() {
    let control = <FormArray>this.clientCreationForm.controls.addresses;
    control.push(
      this.fb.group({
        line1: ['', Validators.compose([Validators.required,
        Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./:;@#$&*]*$/)])],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]*$/)])],
        landmark: [''],
        zipCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])]
      })
    );
  }
  removeAddress(i) {
    let control = <FormArray>this.clientCreationForm.controls.addresses;
    control.removeAt(i);
  }
  // tslint:disable-next-line: comment-format
  //Binding data using formcontrol name
  prepareSaveClientObj() {
    debugger
    const formModel = this.clientCreationForm.value;
    this.clientcreationObj.clientId = this.rowSelectedClient;
    this.clientcreationObj.clientName = formModel.clientName;
    this.clientcreationObj.emailId = formModel.emailId;
    this.clientcreationObj.designation = formModel.designation;
    this.clientcreationObj.personFirstName = formModel.personFirstName;
    this.clientcreationObj.personLastName = formModel.personLastName;
    this.clientcreationObj.contactNumber = formModel.contactNumber;
    /***here  i need to aaddd aall fileds herassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */
    const addressDeepCopy: addressIdModel[] = formModel.addresses.map(
      (addresses: addressIdModel) => Object.assign({}, addresses)
    );
    this.clientcreationObj.addresses = addressDeepCopy;
  }
  onReset() {
    this.clientCreationForm.reset();
  }
  getClientNames() {
    debugger
    this._jobpostingService.getClients(sessionStorage.getItem('tenantId')).subscribe(res => {
      this.getClientName = res;
      console.log('getclientname', this.getClientName);
      this.getClientName.forEach(element => {
        if (element.status === 1) {
          element.status = 'Active';
        } else {
          element.status = 'InActive';
        }
      });
    },
    );
  }
  //to get all countries
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.countryList, 'countrylist');
    });
  }
  // on selecting a country
  onCountryChange(countryId: any) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      console.log(this.stateList, 'states');
    });
  }
  checkClientName(clientName: any) {
    this._TenantService.checkClientName(clientName, sessionStorage.getItem('tenantId')).subscribe(res => {
      console.log(res, 'RESULT')
      if (res._body === true) {
        this._notificationsService.showWarnNotif('Warning', 'Client Already Exists');
        this.clientCreationForm.reset();
      }
    });
  }
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => { };
  }
  public onGridReadyAssignClient(param): void {
    this.gridApi = param.api;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
  }
  onSelectionChangedForCreateManager(value) {
    if (value.node.selected == true) {
      this.clientId = value.data.clientId;
      console.log('client', this.clientId);
    }
  }
  public onSelectionChanged() {
    let selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      this.hideAddManager = false;
      this.hideViewManager = false;
      this.disableAssignClientToUser = false;
      this.disableEditClient = false;
      this.disableViewClient = false;
      this.rowSelectedId = selectedRows[0].clientId;
      this.disabledChangeStatus = false;
    } else {
      this.hideAddManager = true;
      this.hideViewManager = true;
      this.disableAssignClientToUser = true;
      this.disableEditClient = true;
      this.disableViewClient = true;
      this.disabledChangeStatus = true;
    }
  }
  prepareManager() {
    const model = this.addManagerForm.value;
    this.createManagerObj.coOrdinatorFirstName = model.coOrdinatorFirstName;
    this.createManagerObj.coOrdinatorLastName = model.coOrdinatorLastName;
    this.createManagerObj.clientCoOrdinatorEmailId = model.clientCoOrdinatorEmailId;
    this.createManagerObj.clientCoOrdinatorPhoneNo = model.clientCoOrdinatorPhoneNo;
  }
  createManager() {
    this.createManagerObj.client.clientId = this.clientId;
    this.createManagerObj.organization.tenantId = sessionStorage.getItem('tenantId');
    this.prepareManager();
    this._TenantService.postManager(this.createManagerObj).subscribe(result => {
      console.log(result);
      this.getManagerList();
      this.spin.hide();
      this.managerStatus = result;
      console.log(result.status);
      if (this.managerStatus.response.respcode === 'SUCCESS') {
        this.spin.hide();
        this._notificationsService.showSuccessNotif('success', 'Manager added Successfully')
      } else if (this.managerStatus.response.respcode === '222') {
        this.spin.hide();
        this._notificationsService.showWarnNotif('Warning', 'Manager with this Email Already Exists');
      }
      // else {
      //   this.spin.hide();
      //   this._notificationsService.showErrorNotif("Failed", "Internal Server error");
      // }
      this.addManagerForm.reset();
    });
  }
  getAllListOfUsers() {
    this._TenantService.getAllUsers(sessionStorage.getItem('tenantId')).subscribe(res => {
      console.log(res)
      this.getlistofusers = res;
    }, error => {
      console.log(error)
    });
  }
  public onSelectionChangedAssignClient() {
    const selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows[0]);
    if (selectedRows.length > 0) {
      console.log(selectedRows[0].clientId);
      this.rowSelectedClient = this.clientId;
      console.log(this.clientId);
      this.rowSelectedUser = selectedRows[0].userId;
      this.disabledAssignClient = false;

    } else {
      this.disabledAssignClient = true;
    }
  }
  AssignClientToUser() {
    this.clientIds = [];
    this.clientIds.push(this.rowSelectedClient);
    console.log('clientid', this.clientIds)
    this.userIds = [];
    this.userIds.push(this.rowSelectedUser);
    console.log('userid', this.userIds)
    this.assignToClientObj.tenantId = sessionStorage.getItem('tenantId');
    this.assignToClientObj.clientId = this.clientIds;
    this.assignToClientObj.userIds = this.userIds;
    this._TenantService.assignClientToUser(this.assignToClientObj).subscribe(res => {
      this.assignclienttouser = res;
      this._notificationsService.showSuccessNotif('Success', 'Client Assigned To User Successfully ');
    }, error => {
      this._notificationsService.showErrorNotif('Failed', 'Client Assigned To User Failed ');
      console.log(error);
    });

  }
  private closeModal(): void {
    this.assignClientBtn.nativeElement.click();
  }
  // tslint:disable-next-line: comment-format
  //To Check Resume Status
  onChangeStatus(selectedStatus: string) {
    this.rowSelectStatus = selectedStatus;
    this.modalForchangeStatus.nativeElement.click();
    console.log(this.rowSelectStatus);
  }
  //  Changing the status
  submitStatus() {
    this._TenantService.updateClientStatus(this.clientId, this.rowSelectStatus, this.obj).subscribe(res => {
      if (status == '1') {
        this.disableEditClient = false;
        this.disableAssignClientToUser = false;
        this.hideAddManager = false;

      } else {
        this.disableEditClient = true;
        this.disableAssignClientToUser = true;
        this.hideAddManager = true;
      }
      this._notificationsService.showSuccessNotif('Success', 'Status Changed Successfully');
      this.router.navigate(['/manage-clients/manageClients']);

    }, error => {
      this._notificationsService.showSuccessNotif('Failed', 'Status Changed Failed');
    });

  }

  backToClients() {
    this.router.navigate(['/manage-clients/manageClients']);
  }
  formClose() {
    this.addManagerForm.reset();
  }
  // get Client By Id
  getClientsdatabyId() {
    console.log(this.countryList, 'listcountry');
    this._TenantService.getClientById(this.clientId).subscribe(res => {
      this.viewClientDetails = res;
      console.log(this.viewClientDetails, 'clientdetails');
      this.clientcreationObj.clientId = this.viewClientDetails.clientId;
      console.log(this.viewClientDetails.addresses.length);
      this.addressData = this.viewClientDetails.addresses.length;
    }, error => {
      console.log(error);
    });
  }
  getname(id: any) {
    if (id) {
      this.newService.countriesList().subscribe(res => {
        this.countryList = res;
        console.log(this.countryList, 'countrylist');
        for (let index = 0; index < this.countryList.length; index++) {
          const newElement = this.countryList[index].countryId;
          if (id === newElement) {
            this.countryName = this.countryList[index].countryName;
            console.log(this.countryList[index].countryName);
            const obj = {
              id: newElement,
              name: this.countryList[index].countryName
            };
            this.countryArray.push(obj);
          }
        }
      });
      console.log(this.countryArray);
    }
    console.log(this.countryList);
  }

  // For Edit Client  
  onEditClient(address: clientCreationModel) {
    debugger
    this.rowSelectedClient = this.clientId;
    this._TenantService.getClientById(this.rowSelectedClient).subscribe(res => {
      this.getDetailsForEdit = res;
      console.log(this.getDetailsForEdit, 'DETAILSFOREDITCLIENT');
      // For normal form controls we use patch value
      this.clientCreationForm.patchValue({
        clientName: this.getDetailsForEdit.clientName,
        personFirstName: this.getDetailsForEdit.personFirstName,
        personLastName: this.getDetailsForEdit.personLastName,
        emailId: this.getDetailsForEdit.emailId,
        contactNumber: this.getDetailsForEdit.contactNumber,
        designation: this.getDetailsForEdit.designation
      });
      // this.addressData = this.getDetailsForEdit.addresses;
      // console.log(this.addressData.length);
      // For form arrays we have to use setcontrols
      this.clientCreationForm.setControl('addresses', this.setExistingAddresses(this.getDetailsForEdit.addresses));
    });
  }
  // For Setting The Existing Addresses
  setExistingAddresses(addres: addressIdModel[]): FormArray {

    // this.newService.countriesList().subscribe(res => {
    //   this.countryList = res;
    //   this.countryList.forEach(element => {
    //     // console.log(element.countryId);
    //     this.newService.stateslistttt(element.countryId).subscribe(res => {
    //       this.stateList = res;
    //       console.log(this.stateList, 'states');
    //     });

    //   });

    // });
    const formArray = new FormArray([]);
    console.log(addres);
    addres.forEach(s => {
      formArray.push(this.fb.group
        ({
          line1: s.line1,
          city: s.city,
          state: s.state,
          country: s.country,
          landmark: s.landmark,
          zipCode: s.zipCode
        }))
    })
    return formArray;
  }

  // Updating Client
  updateClient() {

    this.prepareSaveClientObj();
    this._TenantService.updateClient(this.clientcreationObj).subscribe(res => {

      this.updateclientdetails = res;
      console.log(this.updateclientdetails, 'EDITCLIENT')
      debugger
      if (this.updateclientdetails.status == 1) {

        this._notificationsService.showSuccessNotif('Success', 'Client Updated  Successfully ');
        this.clientCreationForm.reset();
      }
      else {
        this._notificationsService.showErrorNotif('Failed', 'Client Updated  Failed ');

      }
      this.getClientsdatabyId();
      console.log(res);
    }, error => {
      console.log(error);
    }
    )

  }
  // Get Manager List By Client Id
  getManagerList() {
    debugger
    console.log('test');
    this._jobpostingService.getListOfManagers(this.clientId).subscribe(result => {
      this.getManagerName = result;
      console.log(result, 'LISTOFMANGAERS')
    }, error => {
      console.log(error)
    })
  }
  // Get List of users working on the selected client
  listOfUsersWorkingOnClient() {
    this._jobpostingService.clientusers(this.clientId).subscribe(response => {
      console.log(response);
      this.clientuserss = response;
    }, error => {
      console.log(error);
    });
  }

  // For paginations in aggrid
  onBtNextag() {
    this.GridApi.paginationGoToNextPage();
  }

  onBtPreviousag() {
    this.GridApi.paginationGoToPreviousPage();
  }
  onPaginationChanged() {

    if (this.GridApi) {
      this.totalPages = this.GridApi.paginationGetTotalPages();
      console.log(this.totalPages);
      this.changePage = this.GridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePage);
    }
  }
  onBtNextagrid() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPreviousagrid() {
    this.gridApi.paginationGoToPreviousPage();
  }
  onPaginationChangedd() {
    if (this.gridApi) {
      this.totalPagess = this.gridApi.paginationGetTotalPages();
      console.log(this.totalPages);
      this.changePages = this.gridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePages);
      this.paginationrecords = 15;
    }
  }
  // EDIT MANAGER DATA INTO FORM
  addMng() {
    this.editMngBtn = false;
  }
  editManager(id: any) {
    this.editMngBtn = true;
    console.log(id);
    console.log(this.getManagerName);
    this.getManagerName.forEach(element => {
      console.log(element.clientContactsId);
      if (element.clientContactsId === id) {
        this.clientcontactid = element.clientContactsId;
        this.addManagerForm.setValue({
          coOrdinatorFirstName: element.coOrdinatorFirstName,
          coOrdinatorLastName: element.coOrdinatorLastName,
          clientCoOrdinatorEmailId: element.clientCoOrdinatorEmailId,
          clientCoOrdinatorPhoneNo: element.clientCoOrdinatorPhoneNo
        });
      }
    });
  }
  // EDIT DATA
  edit() {
    const editdetails = {
      'clientContactsId': this.clientcontactid,
      'clientCoOrdinatorEmailId': this.addManagerForm.get('clientCoOrdinatorEmailId').value,
      'clientCoOrdinatorPhoneNo': this.addManagerForm.get('clientCoOrdinatorPhoneNo').value,
      'coOrdinatorFirstName': this.addManagerForm.get('coOrdinatorFirstName').value,
      'coOrdinatorLastName': this.addManagerForm.get('coOrdinatorLastName').value
    };
    console.log(editdetails);
    this._jobpostingService.editManager(editdetails).subscribe(res => {
      console.log(res);
      this.getManagerList();
      this._notificationsService.showSuccessNotif('Success', 'Manager Updated Successfully');
    }, error => {
      console.log(error);
      this._notificationsService.showSuccessNotif('Failed', 'To Update');
    });
  }
}
