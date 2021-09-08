
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, Form } from '@angular/forms';
// import { JobPostingService } from '../services/jobposting.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Session } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { clientCreationModel, addressIdModel } from '../../newModels/clientcreation';
import { AssignClientToUser } from '../../models/assignclienttouser';
import { createManager } from '../../models/createManager';
import { NewServiceService } from '../../services/new-service.service';
import { TenantService } from '../../services/tenant.service';
import { NotificationMessageService } from '../../services/notification.service';
import { VendorService } from '../../services/vendor.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  @ViewChild('addManagerBtn') addManagerBtn: ElementRef;
  @ViewChild('assignClientBtn') assignClientBtn: ElementRef;
  clientCreationForm: FormGroup;
  public clientcreationObj: clientCreationModel;
  public assignToClientObj: AssignClientToUser;
  public createManagerObj: createManager = new createManager(); addManagerForm: FormGroup;
  tenantId: any;
  managerList: any;
  getManagerName: any;
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
  clientNameCheck: any;
  ;
  countryList: any;
  stateList: any;
  countries = [
    { code: "US", name: "United States of America" },
    { code: "IN", name: "India" },
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
  clientIds: any[];
  userIds: any[];
  public disabledChangeStatus: boolean = true;
  disabledAssignClient: boolean = true;
  constructor(private router: Router, private newService: NewServiceService, 
    private _UserService: UserService, private _TenantService: TenantService,
     private _notificationsService: NotificationMessageService, private fb: FormBuilder, 
    
    private spin: NgxSpinnerService, private _VendorService: VendorService, ) {

    this.clientcreationObj = new clientCreationModel();
    this.assignToClientObj = new AssignClientToUser();
    let tentId = sessionStorage.getItem('tenantId');
    


    this.createForm();
  }

  ngOnInit() {
    this.getAllCountries();
    this.gridOptions = {
      animateRows: true,
      enableColResize: true,
      columnDefs: this.columnDefsToViewClients,
      rowData: null,
      rowHeight: 35,
      headerHeight: 35,

    }
  }

  columnDefsToViewClients = [
    { headerName: 'Client Name', headerClass: 'ctHeader', field: 'clientName', minWidth: 100, width: 200, checkboxSelection: true, rowSelection: 'single' },
    { headerName: 'First Name', headerClass: 'ctHeader', field: 'personFirstName', minWidth: 100, width: 250 },
    { headerName: 'Last Name', headerClass: 'ctHeader', field: 'personLastName', minWidth: 100, width: 230 },
    { headerName: 'Email Id', headerClass: 'ctHeader', field: 'emailId', minWidth: 100, width: 250 },
    { headerName: 'Phone Number', headerClass: 'ctHeader', field: 'contactNumber', minWidth: 100, width: 200 },
    {
      headerName: 'Status', headerClass: 'ctHeader', field: 'status', minWidth: 100, width: 200,
      cellStyle: function (element) {
        if (element.value == 'Active') {
          return { color: 'green' }
        }
        else if (element.value == 'InActive') {
          return { color: 'red' }
        }
        else {
          return null;
        }

      }
    },


  ]

  createForm() {
    this.clientCreationForm = this.fb.group({
      addresses: this.fb.array([this.fb.group({
        line1: ['', Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./:;@#$&*]*$/)])],
        line2: ['', Validators.compose([Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./:;@#$&*]*$/)])],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
        landmark: [''],
        zipCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])]
      })]),

      clientName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z0-9 ]*$/)])),
      personFirstName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      personLastName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      emailId: new FormControl(null, [Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+.[a-zA-Z-.]+(com)+$'), Validators.email])]),
      contactNumber: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+[0-9]+')])),
      designation: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(75), Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
    });
  }
  setAddresses(addresses: addressIdModel[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.clientCreationForm.setControl('addresses', addressFormArray);
  }
  get addresses(): FormArray {

    return this.clientCreationForm.get('addresses') as FormArray;
  };
  keyPress(event: any) {
    const pattern = /^[^-\s][a-zA-Z ]*$/;

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
    //this.addresses.push(this.fb.group(new addressIdModel()));
    let control = <FormArray>this.clientCreationForm.controls.addresses;
    control.push(
      this.fb.group({
        // line1: [null,Validators.required],
        // line2: [''],
        // country: ['',Validators.required],
        // state: ['',Validators.required],
        // city: ['',Validators.required],
        // landmark: [''],
        // zipCode: ['',Validators.required]
        line1: ['', Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./@#$&* ]*$/)])],
        line2: ['', Validators.compose([Validators.maxLength(250), Validators.pattern(/^[^-\s][a-zA-Z 0-9-,./@#$&* ]*$/)])],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
        landmark: [''],
        zipCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])]
      })
    )
  }
  removeAddress(i) {
    let control = <FormArray>this.clientCreationForm.controls.addresses;
    control.removeAt(i);
  }

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
    // this.router.navigate(['./manageClients'])
  }


  // Create Client
  onSubmit() {

    this.prepareSaveClientObj();
    this.newService.addClient(this.clientcreationObj).subscribe(res => {
      console.log("clientDetails", res);
      this.clientDetails = res;
      this._notificationsService.showSuccessNotif("Client creation", "success");
      this.clientCreationForm.reset();
      this.router.navigate(['/manage-clients/manageClients']);
    },
      error => {
        this._notificationsService.showErrorNotif('Client creation', 'Failed');
      }
    );
  }

  //to get all countries
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.countryList, 'countrylist');
    })
  }
  // on selecting a country
  onCountryChange(countryId: any) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      console.log(this.stateList, 'states');
    })
  }

  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
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
      this.rowSelectedId = selectedRows[0].clientId;
      this.disabledChangeStatus = false;
    }
    else {
      this.hideAddManager = true;
      this.hideViewManager = true;
      this.disableAssignClientToUser = true;
      this.disableEditClient = true;
      this.disabledChangeStatus = true;
    }
  }
  backToClients() {
    this.router.navigate(['/manage-clients/manageClients']);
  }

  // Check Client Name
  checkClientName(clientName: any) {
    debugger
    this._TenantService.checkClientName(clientName, sessionStorage.getItem('tenantId')).subscribe(res => {

      this.clientNameCheck = res
      console.log(this.clientNameCheck, 'this.clientNameCheck')
      if (this.clientNameCheck === true) {
        this._notificationsService.showWarnNotif('Warning', 'Client Already Exists')
        this.clientCreationForm.reset();

      }


    });
  }
}
