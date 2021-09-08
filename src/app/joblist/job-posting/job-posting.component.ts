import { Component, AfterViewInit, EventEmitter, OnDestroy, Input, Output, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; //This is for Model driven form form
import { JobPosting } from '../../models/jobposting';
import { NewServiceService } from '../../services/new-service.service';
import { NotificationMessageService } from '../../services/notification.service';
import { JobPostingService } from '../../services/jobposting.service';
import { UserService } from '../../services/user.service';
import { TenantService } from '../../services/tenant.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


declare var jquery: any;
declare var $: any;
declare var swal: any;
export class PageModel {
  content: string;
}
export class Request {
  userId: any;
}
export class TenantData {
  tenantId: any;
}
@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit, OnDestroy {
  @ViewChild('parent', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @Input() typed: any;
  @Output() clicked = new EventEmitter<string>();
  subscribe: Subject<any> = new Subject<any>();

  label: any = {};
  page: PageModel;
  request: any = {};
  tenantdataList: any = {};
  clientList: any = {};
  hiringManagerList: any = {};
  sampledata: any = {};
  model: any = {};
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownLocation = [];
  DesignationList: any = [];
  skills: any[];
  jobposting: JobPosting = new JobPosting();

  skillset: String;
  _ref: any;
  firstform: boolean;
  messageforMax: string;
  public qualificationList = [];
  messageforMaxfLAG: boolean = false;
  secondform: boolean;
  skillform: boolean;
  messageforMaxSalaryFlag: boolean = false;
  messageforMinSalaryFlag: boolean = false;
  items: any;
  skillitems: any;
  tenantId: any;
  private flatpickr;
  // min_experience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // max_experience = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  types = ['Java', 'Hibernate', 'SQL', 'Spring', '.Net'];
  type: any;
  jobList: any;
  error: boolean;
  errorMsg: String;
  FunctionalAreaList: any = [];
  DepartmentList: any = [];
  email: any;
  jobStatus = [{ "id": 1, "label": "open" }, { "id": 2, "label": "closed" }];
  jobPostForm: any;

  private userRoles: string;
  step = 0;
  getClientName: any;
  allVendorsNames: any;
  selectedVendorId: string;
  // clientId: any;
  getManagerName: any = [];
  managerId: string;
  clientIds: any;
  hiringManagername: any;
  clientContactIdsss: any;
  getLocation: any = [];
  dropdownLocationn: any = [];
  dropdownQualification: any = [];
  name: any;
  dropdownQual: any = [];
  dropdownSettingss: {};
  public postbutton: boolean = true;
  hideTextBox: boolean = false;
  referralBooleanValue: boolean;
  setStep(index: number) {
    this.step = index;
  }


  constructor(private newService: NewServiceService,
    public toastr: ToastrManager, private _notificationsService: NotificationMessageService,
    private router: Router, private sample: JobPostingService,
    private spin: NgxSpinnerService, private _cfr: ComponentFactoryResolver,
    private _jobpostingService: JobPostingService,
    private userService: UserService,
    private tenantService: TenantService) {

  }


  event: any;

  ChangingValue(event) {
    this.event = event;
  }
  ngOnInit() {
    this.getQualificationList();
    this.getLocations();
    // this.getAllVendorNames();
    this.getClientNames();
    // this.getManagerList();

    let id = sessionStorage.getItem('tenantId');;
    this.tenantId = id;
    this.jobposting.grade = '';
    this.jobposting.jobFunctionalArea = '';
    this.jobposting.department = '';
    this.jobposting.designation = '';
    this.jobposting.currency = '';

    // this.jobposting.client.clientId=this.clientId;
    // this.jobposting.hiringManager.clientContactsId= this.managerId;
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'B.E/B.Tech' },
    //   { item_id: 2, item_text: 'MCA' },
    //   { item_id: 3, item_text: 'MBA' },
    //   { item_id: 4, item_text: 'M.Sc' },
    //   { item_id: 5, item_text: 'B.Sc' },
    //   { item_id: 6, item_text: 'B.Com' },
    //   { item_id: 7, item_text: 'M.Tech' },
    //   { item_id: 8, item_text: 'Any Degree' },
    // ];

    // this.dropdownLocation = [
    //   { item_id: 1, item_text: 'Bengaluru' },
    //   { item_id: 2, item_text: 'Hyderabad' },
    //   { item_id: 3, item_text: 'Chennai' },
    //   { item_id: 4, item_text: 'Gurgaon' },
    //   { item_id: 5, item_text: 'Mumbai' },
    //   { item_id: 6, item_text: 'Delhi' },
    //   { item_id: 7, item_text: 'Surat' },
    //   { item_id: 8, item_text: 'Pune' },
    //   { item_id: 9, item_text: 'Chandigarh' },
    //   { item_id: 10, item_text: 'Kolkata' },
    //   { item_id: 11, item_text: ' Jamshedpur ' },
    //   { item_id: 12, item_text: 'Lucknow' },
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.dropdownSettingss = {
      singleSelection: false,
      idField: 'qualificationId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.userRoles = sessionStorage.getItem('userRoles');

    this.jobPostForm = new FormGroup({
      jobTitle: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      // jobDesc: new FormControl("", Validators.compose([Validators.required,Validators.maxLength(4000),Validators.pattern(/^[a-zA-Z 0-9-,./\n:;@#$&*]*$/)])),
      jobDesc: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      functionalArea: new FormControl(""),
      noOfOpenings: new FormControl("", Validators.required),
      department: new FormControl(""),
      jobDesig: new FormControl(""),
      jobPostEmail: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      Location: new FormControl("", Validators.required),
      minExp: new FormControl("", Validators.required),
      maxExp: new FormControl("", Validators.required),
      jobPostSkills: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobPostPrimarySkill: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobPostQualification: new FormControl("", Validators.required),
      clientname: new FormControl("", Validators.required),
      hiringManager: new FormControl("", Validators.compose([Validators.required,])),
      aboutCompany: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobContactPhone: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      maxNoticePeriod: new FormControl(""),
      jobCurrency: new FormControl(""),
      minSalary: new FormControl(""),
      maxSalary: new FormControl(""),
      jobEmpMode: new FormControl("", Validators.required),
      refereeAmount: new FormControl(""),

    });

    this.jobposting.jobContactToEmail = sessionStorage.getItem('EmailId');

    //console.log(this.jobposting.aboutCompany)
    this.request.userId = sessionStorage.getItem('userId')
    this.tenantdataList.tenantId = sessionStorage.getItem('tenantId');

    this.page = new PageModel();
    this.firstform = true;
    this.GetDataInputValues();

    console.log("QUALIFACTION  " + this.dropdownList)


  }
  ngAfterViewInit() {
    $('#summernote').summernote();
    $('#summernote_air').summernote({
      airMode: true
    });
    $('[data-provide="markdown"]').markdown({ autofocus: false, savable: false });
  }
  GetDataInputValues() {
    this.userService.getFuncionalArea().forEach(area => {
      for (const e of area) {
        this.FunctionalAreaList.push({ label: e.functionalName.toString(), value: e.functionalAreaId });
      }
    });
    this.userService.getDepartment().forEach(area => {
      for (const e of area) {
        this.DepartmentList.push({ label: e.departmentName.toString(), value: e.departmentId });
      }
    });

    this.userService.getDesignation().forEach(area => {
      for (const e of area) {
        this.DesignationList.push({ label: e.designationName.toString(), value: e.designationId });
      }
    });
  }
  ValidateEmail(mail) {
    let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(mail)) {
      return true;
    } else {
      return false;
    }
  }

  nextStep() {
    //console.log(this.model.location)
    this.firstform = false;
    this.secondform = true;

    //alert("sdfgvd")
    //this.router.navigate(['./userDetails']);
  }
  // addComponent() {
  //   //console.log(JSON.stringify(this.sampledata));
  //   //console.log(this.type);
  //   this.skillform = true;
  //   var comp = this._cfr.resolveComponentFactory(JobSkillComponent);
  //   var expComponent = this.viewContainerRef.createComponent(comp);
  //   expComponent.instance._ref = expComponent;
  // }
  clear() {
    this.viewContainerRef.clear();
  }

  callType(value: any) {
    this.sampledata.skillname = value;
    //console.log(this.sampledata.skillname)
    this.clicked.emit(value)
    //let a=(value)
    //this.type.push(value);
  }
  calType(value: any) {
    this.sampledata.years = value;
    this.type = value;
  }
  previousStep() {
    this.firstform = true;
    this.secondform = false;
  }
  Selected(value: any) {
    //console.log(value);
    this.model.location = value
  }
  prepareObj() {
    console.log(JSON.stringify(this.jobPostForm.get('Location').value));
    this.jobposting.user.userId = sessionStorage.getItem('userId');
    this.jobposting.organization.tenantId = sessionStorage.getItem('tenantId');
    this.jobposting.aboutCompany = this.jobPostForm.get('aboutCompany').value;
    this.jobposting.jobTitle = this.jobPostForm.get('jobTitle').value;
    this.jobposting.primarySkill = this.jobPostForm.get('jobPostPrimarySkill').value;
    this.jobposting.jobDescription = this.jobPostForm.get('jobDesc').value;
    this.jobposting.jobFunctionalArea = this.jobPostForm.get('functionalArea').value;
    this.jobposting.noOfOpenings = this.jobPostForm.get('noOfOpenings').value;
    this.jobposting.department = this.jobPostForm.get('department').value;
    this.jobposting.minJobExperience = this.jobPostForm.get('minExp').value;
    this.jobposting.maxJobExperience = this.jobPostForm.get('maxExp').value;
    this.jobposting.jobMinQualification = JSON.stringify(this.jobPostForm.get('jobPostQualification').value);
    this.jobposting.jobContactToEmail = this.jobPostForm.get('jobPostEmail').value;
    this.jobposting.jobContactPhone = this.jobPostForm.get('jobContactPhone').value;
    this.jobposting.designation = this.jobPostForm.get('jobDesig').value;
    this.jobposting.skills = this.jobPostForm.get('jobPostSkills').value;
    this.jobposting.maxNoticePeriod = this.jobPostForm.get('maxNoticePeriod').value;
    this.jobposting.minSalary = this.jobPostForm.get('minSalary').value;
    this.jobposting.maxSalary = this.jobPostForm.get('maxSalary').value;
    this.jobposting.jobLocation = JSON.stringify(this.jobPostForm.get('Location').value);
    this.jobposting.currency = this.jobPostForm.get('jobCurrency').value;
    this.jobposting.clientName = this.jobPostForm.get('clientname').value;
    this.jobposting.referral = this.referralBooleanValue;
    this.jobposting.referralAmount = this.jobPostForm.get('refereeAmount').value;
    this.jobposting.client.clientId = this.clientIds;
    this.jobposting.hiringManager = this.hiringManagerList;

  }

  // Post Job Api
  post() {
    debugger
    this.spin.show();
    this.postbutton = false;
    this.hiringManagerList.clientContactsId = this.managerId;
    console.log(this.hiringManagerList.clientContactsId, 'lucky');
    this.prepareObj();
    console.log(this.prepareObj);
    this._jobpostingService.addJob(this.jobposting)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.spin.hide();
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'Job Posted Successfully');
        this.router.navigate(['./manageJobs/all']);

      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Failed', 'Failed to post job');
      }
      );

  }
  keyPress(event: any) {
    console.log("jobevent", event);
    const pattern = /^[0-9.]*$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  numberanddot(event: any) {
    const pattern = /^[0-9.,]+$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  alphabet(event: any) {
    const pattern = /^[A-Za-z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  changeFunctional(data: any) {
    console.log(data);

  }
  chkMinValidatn() {
    if (Number(this.jobposting.maxJobExperience) < Number(this.jobposting.minJobExperience)) {
      this.messageforMaxfLAG = true;
    } else {
      this.messageforMaxfLAG = false;
    }
  }
  checkValidatin() {
    if (Number(this.jobposting.maxJobExperience) < Number(this.jobposting.minJobExperience)) {
      this.messageforMaxfLAG = true;

    } else {
      this.messageforMaxfLAG = false;
    }
  }
  checkValidationSal() {

    if (Number(this.jobposting.maxSalary) < Number(this.jobposting.minSalary)) {
      this.messageforMaxSalaryFlag = true;
    } else if (Number(this.jobposting.minSalary) > Number(this.jobposting.maxSalary)) {
      this.messageforMinSalaryFlag = true;
    } else {
      this.messageforMaxSalaryFlag = false;
      this.messageforMinSalaryFlag = false;
    }
  }

  getClientNames() {
    this.newService.getClientss(sessionStorage.getItem('tenantId'))
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.getClientName = res;
        console.log('getclientname', this.getClientName);
      }, error => {
        console.log(error);
      }
      );
  }
  backToManageJobs() {
    this.router.navigate(['/manageJobs/all']);
  }
  // On check uncheck publish job
  onPublishChange(event) {
    console.log(event, 'event');
  }

  // on change of vendor name
  onVendorNameChange(vendorId: string) {
    console.log(vendorId, 'vendorId');
    this.selectedVendorId = vendorId;
  }
  getClient(clientId) {
    this.clientIds = clientId;
    this._jobpostingService.getListOfManagers(clientId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.getManagerName = result;
        console.log(result, 'managerList')
        console.log(this.getManagerName[0].coOrdinatorFirstName, 'COORDINATOR FIRST NAME');
        this.hiringManagername = this.getManagerName[0].coOrdinatorFirstName;
        this.clientContactIdsss = this.getManagerName[0].clientContactsId;
        console.log(this.clientContactIdsss, 'CLIENTCONTACTIDS');
      }, error => {
        console.log(error);
      });
  }
  getManagerId(clientContactsId) {
    console.log(clientContactsId, 'clientContactsId');
    this.managerId = clientContactsId;
  }
  getLocations() {
    this._jobpostingService.getLocation()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        console.log(res);
        this.dropdownLocationn = res;
      }, error => {
        console.log(error);
      })
  }
  getQualificationList() {
    this._jobpostingService.qualificationlist()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.dropdownQualification = res;
      }, error => {
        console.log(error);
      });
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
  refereecheck(event) {
    console.log(event);
    this.referralBooleanValue = event.target.checked;
    if (event.target.checked === true) {
      console.log('true');
      this.hideTextBox = true;
    } else {
      console.log('false');
      this.hideTextBox = false;
    }
  }
}
