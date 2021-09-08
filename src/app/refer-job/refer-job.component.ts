// import { Data } from './../tenant-login/tenant-login.component';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { JobPostingService } from '../services/jobposting.service';
import { UserService } from '../services/user.service';
import { TenantService } from '../services/tenant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { User, Refer } from '../models/user';
import { JobReferences } from '../models/jobreferences';
import { JobPosting, skills } from '../models/jobposting';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { resume, hireRequest } from '../models/resume';
import { Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  GridApi,
  ColumnApi,
  GroupCellRenderer,
  GridOptions
} from 'ag-grid-community/main';
import { ToastrManager } from 'ng6-toastr-notifications';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ResumeDetailsModule } from '../resumedetails/resumedetails.module';
import { validateConfig } from '@angular/router/src/config';
import { userPrivileges } from '../models/privileges';
import { NotificationMessageService } from '../../app/services/notification.service';
import { AppComponent } from '../app.component';
import { Candidate } from '../../../src/app/models/candidate';
import { from } from 'rxjs';
import jsPDF from 'jspdf';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from '@angular/material';
import { Alert } from 'selenium-webdriver';
import { ReportsService } from '../services/reports.service';
import { HttpUrls } from '../shared/HttpUrls';
import { element } from 'protractor';
// import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker'
declare var jquery: any;
declare var $: any;
declare var swal: any;

declare var jquery: any;
declare var $: any;

export class TenantData {
  tenantId: any;
}
export class UserData {
  userId: any;
  firstName: any;
  phoneNumber: any;
  emailId: any;
  candidateId: any;
}
export class HireRequest {
  hirerequestId: any;
}

@Component({
  moduleId: module.id,
  selector: 'app-refer-job',
  templateUrl: './refer-job.component.html',
  styleUrls: ['./refer-job.component.css']
})
export class ReferJobComponent implements OnInit {
  showName = true;
  listOfNames = ['Vendor', 'Recruiter', 'Refeeral'];
  refferCandidate=false;
  pageResumeCount: any;
  searchJobInput: any;
  searchJobData: any;
  searchJobinput: any;
  currentDate: Date;
  getClientName: any;
  jobPostedToClient: any;
  AssignedStatus: any;
  userRoles: string;
  getClientJobsPerUser: any;
  sendInvitationCandiadte:any;
  role: string;
  [x: string]: any;
  public wow: any = [];
  public roleButton: boolean;
  @ViewChild('downloadBtn') downloadBtn: ElementRef;
  // @ViewChild('referJobBtn') referJobBtn:ElementRef;
  @ViewChild('uploadResumeBtn') uploadResumeBtn: ElementRef;
  @ViewChild('shortlistBtn') shortlistBtn: ElementRef;
  @ViewChild('discardBtn') discardBtn: ElementRef;
  @ViewChild('closeConfirmUploadModel') closeConfirmUploadModel: ElementRef;
  @ViewChild('closeConfirmModel') closeConfirmModel: ElementRef;
  @ViewChild('confirmBoxForUpload') confirmBoxForUpload: ElementRef;
  @ViewChild('confirmBoxProfile') confirmBoxProfile: ElementRef;
  @ViewChild('confirmBoxUpload') confirmBoxUpload: ElementRef;
  @ViewChild('confirmBoxUploadPan') confirmBoxUploadPan: ElementRef;
  @ViewChild('closeConfirmModelPan') closeConfirmModelPan: ElementRef;
  @ViewChild('closeProfileModel') closeProfileModel: ElementRef;
  @ViewChild('modalForDate') modalForDate: ElementRef;
  @ViewChild('modalForComment') modalForComment: ElementRef;
  userPrivilege: userPrivileges = new userPrivileges();
  jobReferencesList: any;
  public hirereqId: any;
  resumesData: any = [];
  rowDataResume: any = [];
  resumeDataPostSearch: any = [];
  jobList: any;
  formatedresume: any;
  jobs: JobPosting;
  jobposting: JobPosting = new JobPosting();
  firstform: boolean;
  display: boolean;
  viewResume: boolean;
  viewFullResume: boolean;
  uploaded: boolean;
  error: boolean;
  refferal=false;
  private viewdownFlag= false;
  private jsonObj: any = {};
  resumeHtmlData: any;
  errorMsg = '';
  model: any = {};
  id: any;
  abc: any = [];
  sem: any;
  public searchResumeFlag = false;
  loading: boolean;
  resumeStatus: any;
  resumeList: any = [];
  disableViewResume: boolean = true;
  disableUploadResume: boolean = true;
  disableJobrefer: boolean = true;
  disableShortlist: boolean = true;
  disableDiscard: boolean = true;
  options = 'upload';
  url = 'http://192.168.1.58:8088/app/jcrRequest';
  durl = 'http://192.168.1.58:8088/app/jcrRequest/download';
  //durl =`http://${this._window.location.hostname}:9090/jobplanet/myapp/jcrRequest/download`;
  resume: resume = new resume();
  candidate: any = {};
  request: TenantData = new TenantData();
  requestwo: TenantData = new TenantData();
  hire: HireRequest = new HireRequest();
  candidateUserId: UserData = new UserData();
  selectedFiles: any;
  selectedFormatedFile: any;
  public rowData: any;
  selectedRow: any;
  candidateId: any;
  uploadResumeForm: any;
  editResumeForm: any;
  referJobForm: any;
  userRole: string;
  gridOptions: any;
  private resumeActionDdl: boolean = true;
  private resumePath: string;
  private resumeId: string;
  private fileName: string;
  private formatedFileName: string;
  private formatedResumePath: string;
  private viewParameter: any;
  private showResumeModal: boolean = true;
  candidatesData: any = {};
  candidateData: any = {};
  hideEditResume: boolean = true;
  hideViewResume: boolean = true;
  hideviewFormated: boolean = true;
  hideDownloadFull: boolean = true;
  hideDownloadResume: boolean = true;
  hideShortlistResume: boolean = true;
  hideDiscardResume: boolean = true;
  hideResumesModal: boolean = false;
  private getAllPriv: any = [];
  private saveResumeForm: any;
  private showUploadResume: boolean = false;
  private referId: any;
  searchResumeForm: any;
  private searchedResumeData: any = [];
  saveResumeBtn: boolean = true;
  allResumeStatus: any = [];
  qualifications: any = [];
  specializations: any = [];
  disableSpecialisation: String;
  public GridApi: any;
  public rowSelectedId;
  gridApi: any;
  panExist: boolean;
  candidateOtherData: any;
  gridColumnApi: any;
  api: any;
  emailExist: boolean;
  myText: string;
  searchvalue: any;
  public orgUserId: any;
  public candidateObj: Candidate;
  hideSelectStatus: boolean = true;
  public pageid: number = 0;
  public pageidForResume: number = 0;
  public rowid: any = 15;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  disableNextResumeButton: boolean = false;
  disablePreviousResumeButton: boolean = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  pageCountResume: number = 1;
  responseResumePageCount: number = 0;
  searchForm: FormGroup;
  // datePickerConfg: Partial<BsDatepickerConfig>;
  selectedStatus: any;
  rowSelectStatus: any;
  date: any;
  resumeStatusValue: string;
  pageids: any = 0;
  resumeParsingData: any;
  errorMsgOnMOdal: string;
  Confirmdetails: string;

  public uploadResumeee: boolean;
  public viewResumeee: boolean;
  public viewAllresumes: boolean;
  vendorResumes = false;
  getallresumes = 'allResumes';

  public resumeDataaaaaa: any;
  pushresume: any = [];
  public showdownload = true;
  searchjobs: boolean = false;
  confirmProfileDetails: any;
  systemdate: any;
  statuscomment: any;

  constructor(
    private _TenantService: TenantService,
    private _notificationsService: NotificationMessageService,
    public toastr: ToastrManager,
    private router: Router,
    @Inject(Window) private _window: Window,
    private spin: NgxSpinnerService,
    private http: Http,
    private route: ActivatedRoute,
    private _jobpostingService: JobPostingService,
    private _userService: UserService,
    private _tenantService: TenantService,
    private ReportsService: ReportsService
  ) {
    this.display = true;
    this.candidateObj = new Candidate();

    // Validations
this.sendInvitationCandiadte=new FormGroup({
  canEmailId: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)
    ])
  ),
})


    this.uploadResumeForm = new FormGroup({
      candidateName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      candidatePhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/)
        ])
      ),
      // candidateEmail: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      candidateEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)
        ])
      ),
      candidateLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      // currentCompany:new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,+@._\s#&()-/]*$/)])),
      currentCompany: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z0-9@[0-9:;,.+_\s#&%!$^()-/]*$/)
        ])
      ),
      prevCompany: new FormControl(''),
      // prevCompany:new FormControl("", Validators.pattern(/^[a-zA-Z0-9 ]*$/)),
      currentLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      prefLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      // designation:new FormControl("",  Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      currentCtc: new FormControl('', Validators.required),
      expectedCtc: new FormControl('', Validators.required),
      noticePeriod: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      ),
      qualification: new FormControl('', Validators.required),
      specialization: new FormControl(''),
      panNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)
        ])
      ),
      sourceType: new FormControl('', Validators.required),
      source: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      skill: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z 0-9;+#]*$/)
        ])
      ),
      experience: new FormControl('', Validators.required),
      resumefilename: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/)
        ])
      ),
      formatedresume: new FormControl(
        '',
        Validators.compose([
          Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/)
        ])
      ),
      uploadedBy: new FormControl('', Validators.compose([Validators.email]))
    });
    this.editResumeForm = new FormGroup({
      editCandidateName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      editCandidatePhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ),
      editCandidateEmail: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      editCandidateLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      editCurrentCompany: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z0-9@[0-9:;,.+_\s#&%!$^()-/]*$/)
        ])
      ),
      // editPrevCompany:new FormControl("", Validators.required),
      editPrevCompany: new FormControl(''),
      editCurrentLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      editPrefLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      // designation:new FormControl("",  Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      editCurrentCtc: new FormControl('', Validators.required),
      editExpectedCtc: new FormControl('', Validators.required),
      editNoticePeriod: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      ),
      editQualification: new FormControl('', Validators.required),
      editSpecialization: new FormControl(''),
      editPanNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)
        ])
      ),
      editSourceType: new FormControl('', Validators.required),
      editSource: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      editResumeSkills: new FormControl('', Validators.required),
      editExperience: new FormControl('', Validators.required)
    });

    this.referJobForm = new FormGroup({
      candidateName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      candidateEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        ])
      )
    });
    this.searchResumeForm = new FormGroup({
      location: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ),
      exp: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9. ]*$/)
        ])
      ),
      skill: new FormControl('', Validators.required)
    });
    this.searchForm = new FormGroup({
      searchinput: new FormControl('', Validators.required)
    });
  }
  columnDefs = [
    {
      headerName: 'Job Title',
      field: 'jobTitle',
      width: 120,
      unSortIcon: true,
      checkboxSelection: true
    },
    {
      headerName: 'Positions',
      field: 'noOfOpenings',
      width: 120,
      cellStyle: { textAlign: 'center' },
      unSortIcon: true
    },
    {
      headerName: ' Client',
      field: 'clientName',
      width: 120,
      unSortIcon: true
      // cellRenderer: function (params) {
      //   return '<span class="clientNameStyle">' + params.value + '</span>';
      // }
    },
    {
      headerName: ' Hiring Manager',
      field: 'hiringManager',
      width: 120,
      unSortIcon: true
    },
    {
      headerName: ' Posted By',
      field: 'jobContactToEmail',
      width: 120,
      unSortIcon: true
    },
    {
      headerName: ' Phone',
      field: 'jobContactPhone',
      width: 100,
      unSortIcon: true
    },
    // {
    //   headerName: ' Amount ',
    //   cellStyle: { textAlign: 'center' },
    //   field: 'referralAmount',
    //   width: 100
    // },
    {
      headerName: ' Applications ',
      cellStyle: { textAlign: 'center' },
      field: 'resumeCount',
      width: 100
    },
    {
      headerName: 'Posted',
      cellStyle: { textAlign: 'left' },
      headerClass: 'ctHeader',
      field: 'createdDate',
      width: 100,
      unSortIcon: true
    },
    {
      headerName: 'Status',
      field: 'hireRequestStatus',
      width: 220,
      rowSelection: 'multiple',
      cellClassRules: {
        'rag-green-outer': function(params) {
          return params.value === 'ASSIGNED';
        },
        'rag-amber-outer': function(params) {
          return params.value === 'ONHOLD';
        },
        'rag-red-outer': function(params) {
          return params.value === 'REJECTED';
        },
        'rag-green-closed': function(params) {
          return params.value === 'CLOSED';
        },
        'rag-amber-open': function(params) {
          return params.value === 'OPEN';
        },
        'rag-red-pending': function(params) {
          return params.value === 'PENDINGFORAPPROVAL';
        },
        'rag-black-approved': function(params) {
          return params.value === 'APPROVED';
        },
        'rag-black-unassign': function(params) {
          return params.value === 'UNASSIGNED';
        }
      },
      cellRenderer: function(params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    }
  ];

  columnDefsResume = [
    {
      headerName: 'Name',
      valueGetter: function(params) {
        return (
          params.data.resume.candidate.user.firstName +
          ' ' +
          params.data.resume.candidate.user.lastName
        );
      },
      checkboxSelection: true,
      unSortIcon: true
    },
    // {
    //   headerName: 'First Name', field: 'resume.candidate.user.firstName', width: 160, minWidth: 100, enableFilter: true,
    //   enableSorting: true, rowSelection: 'multiple', checkboxSelection: true
    // },
    // { headerName: 'Last Name', field: 'resume.candidate.user.lastName', width: 160, rowSelection: 'multiple', minWidth: 80 },
    {
      headerName: 'Email',
      field: 'resume.candidate.user.emailId',
      width: 170,
      rowSelection: 'multiple',
      minWidth: 80,
      unSortIcon: true
    },
    {
      headerName: 'Phone',
      field: 'resume.candidate.user.phoneNumber',
      width: 150,
      rowSelection: 'multiple',
      minWidth: 80,
      unSortIcon: true
    },
    // {headerName: 'Resume Details', field: 'jobContactToEmail',width:250, rowSelection: 'multiple'  },
    {
      headerName: 'Status',
      field: 'candidateProfileStatus',
      width: 150,
      rowSelection: 'multiple',
      minWidth: 80,
      unSortIcon: true
    },
    {
      headerName: 'Uploaded By',
      field: 'uploadedBy',
      width: 180,
      rowSelection: 'multiple',
      minWidth: 80,
      unSortIcon: true
    },
    {
      headerName: 'Comment',
      field: 'comment',
      width: 150,
      rowSelection: 'multiple',
      minWidth: 80,
      unSortIcon: true
    }
    // { headerName: 'Date', field: 'createdDate', width: 140, rowSelection: 'multiple', minWidth: 80 },
    // {
    //   headerName: 'Comment', width: 180, unSortIcon: true, cellRenderer: function () {
    //     return '<span class="editIcon"><i class="fa fa-info-circle"   container="body" placement="top" tooltip="See consumed leave type by consumption percentage/share." ></i> </span>';
    //   }

    // },
  ];
  columnDefsSearchResume = [
    {
      headerName: 'Candidate First Name',
      field: 'firstName',
      width: 160,
      minWidth: 100,
      enableFilter: true,
      enableSorting: true,
      rowSelection: 'multiple',
      checkboxSelection: true
    },
    {
      headerName: 'Candidate Last Name',
      field: 'lastName',
      width: 160,
      rowSelection: 'multiple',
      minWidth: 80
    },
    {
      headerName: 'Candidate Email',
      field: 'email',
      width: 170,
      rowSelection: 'multiple',
      minWidth: 80
    },
    {
      headerName: 'Phone Number',
      field: 'phone',
      width: 150,
      rowSelection: 'multiple',
      minWidth: 80
    }
    // {headerName: 'Resume Details', field: 'jobContactToEmail',width:250, rowSelection: 'multiple'  },
  ];

  ngOnInit() {
    console.log('UserRolesss', sessionStorage.getItem('userRoles'));

    this.checkPrivilege();
    this.dates();

    if(this.userRole !== 'EMPLOYEE'){
    this._jobpostingService
      .getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
      .subscribe(
        Data => {
          console.log(Data);
          this.jobList = Data;
          this.rowData = Data;
          this.responsePageCount = this.jobList[0].pageCount;
          console.log(this.responsePageCount, 'this.jobList');

          if (this.jobList.length === 0) {
            this.disablePreviousButton = true;
            this.disableNextButton = true;
          }
          if (this.jobList.status === 'Open') {
            this.disableReferJob = true;
          }
        },
        error => {
          console.log(error);
        }
      )} 
      else if(this.userRole === "EMPLOYEE"){
        this._userService.getEmployeeList(this.pageid, this.rowid).subscribe(
          (resumesList: any) => {
            console.log(resumesList);
        
            this.rowData = resumesList;
            this.responsePageCount = this.jobList[0].pageCount;
            console.log(this.responsePageCount, 'this.jobList');
  
            if (this.jobList.length === 0) {
              this.disablePreviousButton = true;
              this.disableNextButton = true;
            }
            if (this.jobList.status === 'Open') {
              this.disableReferJob = true;
            }
          },
          error => {
            console.log(error);
          }
        
         ) }
     

    this.getAllStatus();
    this.getPrivilege();
    this.getQualificationList();
    //this.getSpecializations(this.name);
    this.userRole = sessionStorage.getItem('userRoles');
    // console.log(JSON.parse((sessionStorage.getItem('Privileges')))
    // this.spin.show();
    this.gridOptions = {
      animateRows: true,
      paginationPageSize: 10,

      rowData: null,
      columnDefs: this.columnDefs,
      rowHeight: 35,
      headerHeight: 35,
      paginationNumberFormatter: function(params) {
        return '[' + params.value.toLocaleString() + ']';
      }
    };
    this.gridOptions.rowStyle = { background: '#FFFFFF' };

    this.gridOptions.getRowStyle = function(params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' };
      }
    };
    this.route.queryParams.subscribe(params => {
      this.request.tenantId = sessionStorage.getItem('tenantId');
      //this.requestwo.tenantId = "00dd0ebd9dc0463c9d0ebd9dc0b63c8d";
      //this.hire.hirerequestId = params['jobRequestId']
      this.candidateUserId.userId = this.candidateId;
      this.model.refereeId = sessionStorage.getItem('userId');
    });
  }
  // ngAfterViewInit() {
  //   $('#refer-job-table').DataTable({
  //     pageLength: 10,
  //   });
  // }
  selectFile(event) {
    this.saveResumeBtn = false;
  }

  selecetdValue(event: any) {
    console.log(event);
    if (event === 'Recruiter') {
      this.allResumess();
    } else if (event === 'Vendor') {
      this.vendorResumess();
    } else {
      this.refferalResumes();
      console.log('refferal');
    }
  }

  selectFileChange(event: any) {
    console.log(event);
    this.selectedFiles = event.target.files;

    this.file = event.target.files[0];
    console.log(this.file, 'FILEEE');

    this._TenantService.resumeParisng(this.file).subscribe(res => {
      this.resumeParsingData = res;
      console.log('resume', this.resumeParsingData);
      //  let a= this.resumeParsingData.Contact,
      // String b[]=a.split(" ");

      // this.resumeParsingData.Qualification.forEach(element => {
      //   console.log(element[0]);
      //   this.qualification=element[0];
      // });
      this.uploadResumeForm.patchValue({
        candidateName: this.resumeParsingData.First_Name,
        candidateLastName: this.resumeParsingData.Last_Name,
        candidatePhone: this.resumeParsingData.Contact,
        candidateEmail: this.resumeParsingData.Email,
        panNumber: this.resumeParsingData.Pan,
        skill: this.resumeParsingData.Skills.toString()
        // qualification: this.qualification,
      });
    });
  }
  onrefer(update: JobPosting) {
    this.resetValues();
    this.jobposting = this.selectedRow;
    $('#myModal').modal({ backdrop: 'static' }, 'show');
    $('#modal_Title').html('Refer a Job');
    $('#confirmBox').hide();

    $('#referJob').show();
    this.jobposting.tags = JSON.parse(update.tags);
    //console.log(this.jobposting.tags)
    //console.log(this.jobposting)
  }
  viewresume(view: any) {
    this.display = false;
    this.viewFullResume = false;
    this.viewResume = false;
    this.viewResume = true;
    //console.log(JSON.stringify('component - viewresume - ' + view));
    this._tenantService.viewresume(view, 15, 0).subscribe(e => {
      //console.log(e);
      this.jobReferencesList = e;
      this.jobReferencesList.forEach(element => {
        this.resumesData.push(element.resume);
      });
    });
  }
  getAlljoblist() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      //this.id = localStorage.getItem('tenantId')
      this._jobpostingService
        .getJobList(this.id, this.pageid, this.rowid)
        .subscribe(
          Data => {
            this.spin.hide();
            this.jobList = Data;
            this.rowData = Data;
            console.log('roDataJob', this.rowData);
            this.jobList.forEach(element => {
              if (element.status == 'APPROVED') {
                element.status = 'APPROVED';
              } else if (element.status == 'ASSIGNED') {
                element.status = 'ASSIGNED';
              } else if (element.status == 'ONHOLD') {
                element.status = 'ONHOLD';
              } else if (element.status == 'CLOSE') {
                element.status = 'CLOSE';
              } else if (element.status == 'Open') {
                element.status = 'Open';
              }
            });
          },

          error => {
            this.spin.hide();
            this.toastr.errorToastr(
              'Internal server error,unable to list jobs.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
    } else if (sessionStorage.getItem('userRoles') == 'Recruiter') {
      // this.spin.show();
      var recId = {
        recruiterId: sessionStorage.getItem('userId')
      };
      this._jobpostingService
        .getJobList(sessionStorage.getItem('userId'), this.rowid, this.pageid)
        .subscribe(
          Data => {
            this.spin.hide();
            this.jobList = Data;
            this.rowData = Data;
            this.rowDataResume = Data;
            console.log('forReruiter', this.rowData);
          },

          error => {
            this.spin.hide();
            this.toastr.errorToastr(
              'Internal server error,unable to list jobs.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
    } else if (sessionStorage.getItem('userRoles') == 'Vendor Recruitment') {
      this._jobpostingService
        .getJobList(sessionStorage.getItem('tenantId'), this.rowid, this.pageid)
        .subscribe(
          Data => {
            this.spin.hide();
            this.jobList = Data;
            this.rowData = Data;
            this.rowDataResume = Data;
          },

          error => {
            this.spin.hide();
            this.toastr.errorToastr(
              'Internal server error,unable to list jobs.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
    } else {
      // this.spin.show();
      this.id = sessionStorage.getItem('userId');
      this._jobpostingService
        .getJobList(this.id, this.rowid, this.pageid)
        .subscribe(
          Data => {
            this.spin.hide();
            this.jobList = Data;
            this.rowData = Data;
          },

          error => {
            this.spin.hide();
            this.toastr.errorToastr(
              'Internal server error,unable to list jobs.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
    }
  }

  viewResumeAfterSearchResume() {
    console.log(this.resumeId);
    console.log('resume Id', this.resumeId);
    this.spin.show();
    this.hideResumesModal = false;
    this.viewFullResume = true;
    debugger;
    this._tenantService.SearchResumeView(this.resumeId).subscribe(res => {
      console.log('resysnns', res);
      this.pushresume = res;
      console.log(this.pushresume.resume);
      if (this.pushresume.resume !== null) {
        console.log(this.pushresume.resume.resumePath);
        let path = this.pushresume.resume.resumePath;
        let fileName = this.pushresume.resume.fileName;
        this._tenantService.viewfullresume(path, fileName).subscribe(
          e => {
            console.log('viewfullresume data : ' + e);
            this.spin.hide();
            if (e) {
              this.resumeHtmlData = e;
              this.showResumeModal = true;
            } else {
              this.showResumeModal = false;
            }
          },
          error => {
            this.showResumeModal = false;
            this.spin.hide();
            this.toastr.errorToastr(
              'Unable to load resume1 details.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
      } else {
        this.showResumeModal = false;
        this.spin.hide();
        this.toastr.errorToastr('No Resume Found.', 'Failed!', {
          animate: 'slideFromTop',
          newestOnTop: true
        });
      }
    }),
      error => {
        this.showResumeModal = false;
        this.spin.hide();
        this.toastr.errorToastr('Unable to load resume2 details.', 'Failed!', {
          animate: 'slideFromTop',
          newestOnTop: true
        });
      };
  }

  downloadResumeAfterSearchResume() {
    this.spin.show();
    // this.hideResumesModal = false;
    // this.viewFullResume = true;
    // console.log(this.resumeId);
    // this._tenantService.SearchResumeView(this.resumeId).subscribe(res => {
    //   console.log("resysnns", res);
    //   this.pushresume = res;
    if (this.pushresume.resume !== null) {
      this.resumePath = this.pushresume.resume.resumePath;
      this.fileName = this.pushresume.resume.fileName;
      console.log(this.resumePath);
      console.log(this.fileName);

      this.searchurl =
        HttpUrls.DOWNLOAD_RESUME +
        '?path=' +
        this.resumePath +
        '/' +
        this.fileName;
      console.log(this.searchurl);
      this.toastr.successToastr(
        'Candidate Resume Downloaded Successfully',
        'Success!',
        { animate: 'slideFromBottom', newestOnTop: false }
      );
    }
    //   else {
    //     this.showResumeModal = false;
    //     this.spin.hide();
    //     this.toastr.errorToastr('Unable to load resume2 details.', 'Failed!', { animate: 'slideFromTop', newestOnTop: true });
    //   }
    // }), error => {

    //   this.showResumeModal = false;
    //   this.spin.hide();
    //   this.toastr.errorToastr('Unable to load resume2 details.', 'Failed!', { animate: 'slideFromTop', newestOnTop: true });

    // }
  }

  ondownload(data: any) {
    console.log('clicked');
    // this.spin.show();

    let date: Date = new Date();

    this.datee =
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' +
      ('0' + date.getDate().toString()).slice(-2);
    this._tenantService.ondownload(this.resumePath, this.fileName).subscribe(
      res => {
        console.log(res, 'download');
        data = res;
        this.spin.hide();
        this._notificationsService.showSuccessNotif(
          'Success',
          'Candidate resume downloaded successfully'
        );
        AppComponent.getNotification(
          'Candidate resume downloaded successfully',
          'Job Posted Successfully',
          'Success "',
          new Date()
        );
        this.closeModal();
      },
      error => {
        this.spin.hide();
        AppComponent.getNotification(
          'Unable to download the resume.',
          'Job Posting Failes',
          'Failed "',
          new Date()
        );
        this.closeModal();
      },
      () => {
        console.log('Completed file download.');
      }
    );
  }

  upload(hirereqId: any) {
    this.display = false;
    this.uploaded = true;
    this.hire.hirerequestId = hirereqId;
  }

  public uploadCompleted: boolean = true;

  preview() {
    this.candidateObj.educationalQualification = this.uploadResumeForm.get(
      'qualification'
    ).value;
  }
  postResume() {
    this.spin.show();
    this.uploadCompleted = true;
    this.candidateObj.hireRequestId = this.hireeeID;
    this._userService.verifyCandidate(this.candidateObj).subscribe(
      res => {
        this.spin.hide();
        console.log('PANNUMBERVERIFICATION', res);
        this.candidateUserId.candidateId = res.candidateId;

        console.log('candidate details', res);

        this.spin.hide();
        console.log('verifyCandiadteString', res);
        console.log('verifyCandiadteJson', res);
        console.log('PANNUMBERVERIFICATION', res);
        if (res) {
          debugger;
          if (res.comment === 'Candidate already exists') {
            this.spin.hide();
            this.loading = false;
            this.confirmBoxForUpload.nativeElement.click();
            this.closeConfirmModel.nativeElement.click();
          } else if (res.comment.startsWith('[newCandidateName')) {
            this.spin.hide();
            this.loading = false;
            this.Confirmdetails = res.comment;
            this.confirmBoxUploadPan.nativeElement.click();
            this.closeConfirmModelPan.nativeElement.click();
          } else if (res.comment == 'Profile has been Submitted') {
            // alert('Profile Has Been Submitted');
            this.confirmProfileDetails = res.comment;
            console.log(this.confirmProfileDetails);
            this.confirmBoxProfile.nativeElement.click();
            this.closeProfileModel.nativeElement.click();
          } else if (res.comment == 'You Have already Submitted this profile') {
            // alert('You Have already Submitted this profile');
            this.confirmBoxForUpload.nativeElement.click();
            this.closeConfirmModel.nativeElement.click();
          } else {
            // this.resume.resumeId = "";
            this.resume.candidate = this.candidateUserId;
            // this.resume.resumePath = "";
            // this.resume.resumeData = "";
            this.resume.organization = this.request;
            // this.resume.createdBy = sessionStorage.getItem('userId');
            // this.resume.uploadedBy = this.userRole === 'Vendor Recruitment' ? this.resume.uploadedBy : sessionStorage.getItem('tenantEmail');
            this.candidate.file = this.selectedFiles.item(0);
            if (
              this.selectedFormatedFile == null ||
              this.selectFormatedFile == undefined
            ) {
              this.formatedresume = ' ';
            } else {
              this.formatedresume = this.selectedFormatedFile.item(0);
            }
            this.model.resume = this.resume;
            this.model.organization = this.request;
            this.model.hireRequest = {
              hirerequestId: this.hireeeID
            };

            this.loading = true;
            this.spin.show();
            this._jobpostingService
              .resumeupload(
                this.formatedresume,
                this.candidate.file,
                this.model
              )
              .subscribe(
                e => {
                  this.spin.show();
                  console.log(sessionStorage.getItem(res.candidateId));
                  let canId = sessionStorage.getItem(res.candidateId);
                  this.spin.hide();
                  this.loading = false;
                  this.display = false;
                  this.firstform = true;

                  this._notificationsService.showSuccessNotif(
                    'Success',
                    'Candidate resume uploaded successfully.'
                  );
                  AppComponent.getNotification(
                    'Candidate resume uploaded successfully.',
                    'Job Posting Failes',
                    'success "',
                    new Date()
                  );
                  this.closeModal();
                  // this.getAlljoblist();
                  this.uploaded = false;
                  this.display = true;
                  this.error = false;
                  this.uploadResumeForm.reset();
                  this.uploadCompleted = true;
                  // this.getAlljoblist();
                },
                error => {
                  this.spin.hide();
                  this.toastr.errorToastr('Internal server error', 'Failed!', {
                    animate: 'slideFromTop',
                    newestOnTop: true
                  });
                  this.spin.hide();
                  this.uploadCompleted = true;
                }
              );
          }
        }
      },
      error => {
        console.log('error=>>>>>>', error._body);

        this.errorMsgOnMOdal = error._body;
        // this.toastr.warningToastr('Candidate Details does not Match', 'Warning!', { animate: 'slideFromTop', newestOnTop: true });
        this.spin.hide();
        // this.closeConfirmModelPan.nativeElement.click();

        this.uploadResumeForm.reset();
      }
    );

    // this.getAlljoblist();
  }
  yes() {
    this.resume.resumeId = '';
    this.resume.candidate = this.candidateUserId;
    this.resume.resumePath = '';

    this.resume.organization = this.request;
    // this.resume.createdBy = this.candidate.candidateUserId;

    this.candidate.file = this.selectedFiles.item(0);
    // this.model.referralId = "";
    // this.model.referralFee = "";
    this.model.resume = this.resume;
    this.model.organization = this.request;
    this.model.hireRequest = {
      hirerequestId: this.hireeeID
    };

    if (
      this.selectedFormatedFile == null ||
      this.selectFormatedFile == undefined
    ) {
      this.formatedresume = ' ';
    } else {
      this.formatedresume = this.selectedFormatedFile.item(0);
    }
    //console.log(this.model);
    //console.log(this.candidate.file);
    this._jobpostingService
      .updateresume(this.formatedresume, this.candidate.file, this.model)
      .subscribe(
        e => {
          console.log(e, 'overwrite');
          // $('#myModal').modal({ backdrop: "static" }, 'show');

          // $("#referJob").hide();
          // $("#confirmBox").hide();
          this.closeConfirmUploadModel.nativeElement.click();
          this.closeModal();
          this.spin.hide();
          this._notificationsService.showSuccessNotif(
            'Success',
            'Resume Updated Successfully'
          );
        },
        error => {
          this.closeConfirmUploadModel.nativeElement.click();
          this.closeModal();
          this.spin.hide();
          this._notificationsService.showErrorNotif(
            'Failed',
            'Failed to update resume'
          );
        }
      );
  }
  no() {
    // $('#myModal').modal({ backdrop: "static" }, 'show');

    // $("#referJob").hide();
    // $("#confirmBox").hide();
    this.closeConfirmUploadModel.nativeElement.click();
  }
  backPage() {
    // window.location.reload(true);
    this.viewResume = false;
    this.display = true;
    //  setTimeout(() => this.viewResume = true, 0);
  }
  doublebackPage() {
    this.viewFullResume = false;
    this.viewResume = true;
    window.location.reload(true);
  }
  backPage1() {
    this.uploaded = false;
    this.display = true;
  }

  resetValues() {
    this.model.candidateEmailId = null;
    this.model.candidateName = null;
  }
  viewResumeEvent() {
    // this.selectedRow.forEach(element=>{
    //   this.hirereqId.push(element.hirereqId)
    // });
    this.resumeStatusValue = '';
    this.rowDataResume = [];
    this.hideEditResume = true;
    this.hideViewResume = true;
    this.hideviewFormated = true;
    this.hideDownloadFull = true;
    this.hideDownloadResume = true;
    this.hideShortlistResume = true;
    this.hideDiscardResume = true;
    this.viewAllresumes = true;
    // this.spin.show();
    this._tenantService.viewresume(this.hireeeID, 0, 15).subscribe(
      e => {
        this.spin.hide();

        // this.wow = e.pageCount
        console.log(this.wow, 'fjsadklfdsjfkl');
        debugger;
        this.responseResumePageCount = e[0].pageCount;

        console.log(e, 'eeee');

        this.rowDataResume = [];
        this.jobReferencesList = e;
        console.log(this.jobReferencesList, 'tre');
        this.jobReferencesList.forEach(element => {
          console.log(element, 'element');
          this.resumeList = element;
          this.resumeList['candidateProfileStatus'] =
            element.candidateProfileStatus;
          //this.resumeList.push({'statusOfResume':'shortlist'});
          console.log(
            'this.resumeListttttt',
            this.resumeList['candidateProfileStatus']
          );
          console.log('this.resumeList', e);
          this.rowDataResume.push(this.resumeList);
        });
      },

      error => {
        this.spin.hide();
        this.toastr.errorToastr(
          'Internal server error, unable to list candidate resume.',
          'Failed!',
          { animate: 'slideFromTop', newestOnTop: true }
        );
      }
    );
  }
  uploadResumeEvent() {
    this.candidateObj = new Candidate();
    this.hire.hirerequestId = this.hirereqId;
    this.uploadResumeForm.reset();
    // this.uploadCompleted = false;
  }
  onJobReferRowClick(event) {
    const selecteddata = this.GridApi.getSelectedRows();
    console.log(selecteddata[0]);
    this.hireeeID = selecteddata[0].hirerequestId;
    this.AssignedStatus = selecteddata[0].hireRequestStatus;
    this.orgTemplateId=selecteddata[0].jobTitle
  }

  onResumeRowClick(data: any) {
    const resumedata = this.api.getSelectedRows();
    this.candidateObj = resumedata[0].resume.candidate;
    console.log(this.candidateObj);

    //     console.log('educqual', this.candidateObj.educationalQualification);
    this.candidateId = resumedata[0].resume.candidate.candidateId;
    console.log(this.candidateId);
    this.referId = resumedata[0].referralId;

    // console.log('CANDIDATEIDD', resumedata[0].resume.candidate.candidateId);

    this.resumePath = resumedata[0].resume.resumePath;
    // console.log('RESUMEPATH', this.resumePath);

    this.fileName = resumedata[0].resume.fileName;
    // console.log('FILENAME', this.fileName);

    this.formattedResumePath = resumedata[0].resume.formatResumePath;
    // console.log('FORMATTEDRESUMEPATH', this.formattedResumePath);

    this.formatedFileName = resumedata[0].resume.formatedFileName;
    // console.log('FORMATTEDFILEMNAME', this.formatedFileName);

    this._tenantService
      .getAllStatusCandidate(this.candidateId)
      .subscribe(res => {
        console.log('profilestatus', res);
        this.allResumeStatus = res;
      });
  }

  onClickUpdate() {
    this.getSpecializations(this.candidateObj.educationalQualification);
  }
  // this method is for list of resumes grid buttons enable and disable

  public onGridRead(params): void {
    this.api = params.api;
    this.api.sizeColumnsToFit();
    window.onresize = () => {
      this.api.sizeColumnsToFit();
    };
  }

  onPageSizeChanged(event) {
    console.log(event);
    this.gridOptions.api.paginationSetPageSize(event);
  }

  keyPress(event: any) {
    const pattern = /^[0-9.]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getPrivilege() {
    let privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        // console.log(this.authority, 'authoirithyName');
        debugger;
        if (this.authority === 'MANAGE CANDIDATES') {
          this.uploadResumeee = true;
          this.viewResumeee = true;
        } else if (this.authority === 'VIEW ALL RESUMES') {
          this.viewAllresumes = true;
        } else if (this.authority === 'JOBS ASSIGNED') {
          this.searchjobs = true;
        } else if (this.authority === 'MANAGE VENDOR RESUMES') {
          this.vendorResumes = true;
        } else if(this.authority === 'MANAGE REFERRAL RESUMES'){
          this.refferal=true;
        } else if(this.authority === 'REFERRAL JOBS'){
          this.refferCandidate=true;
        }
      });
    });
  }

  sendInvitation(){

    let obj={
      
        emailId: this.sendInvitationCandiadte.value.canEmailId,
        roleId: this.rowSelectedId,
        orgTemplateId:this.orgTemplateId        
    }
    console.log(obj)
    this._tenantService
      .sendInvi(obj)
      .subscribe(
        res => {
          this.spin.hide();

          this._notificationsService.showSuccessNotif(
            'Success',
            'Send Invitation Send Successfully'
          );
          // AppComponent.getNotification('Candidate resume downloaded successfully', 'Job Posted Successfully', 'Success "', new Date());
        },
        error => {
          this.spin.hide();

          this._notificationsService.showErrorNotif(
            'Failed',
            'Unable to download the  formatted resume.'
          );
          // AppComponent.getNotification('Unable to download the resume.', 'Job Posting Failes', 'Failed "', new Date());
        },
        () => {
          console.log('Completed file download.');
        }
      );
  }

  searchResume(data: any) {
    this.viewdownFlag = true;
    this.searchResumeFlag = true;
    this._userService.getResumeOnSearch(data).subscribe(res => {
      console.log('filteredSearch' + JSON.stringify(res));
      var stringfyData = JSON.stringify(res);
      var parseData = JSON.parse(stringfyData);
      var parsedData;
      parsedData = parseData['_body'];
      this.searchedResumeData = JSON.parse(parsedData);
      this.resumeDataPostSearch = this.searchedResumeData.hits.hits.map(
        data => {
          return data._source;
        }
      );
    });
  }

  // to save resume
  // saveResume() {
  //   // this.spin.show();
  //   this._userService.saveResume(this.selectedFiles.item(0)).subscribe(res => {

  private closeModal(): void {
    this.downloadBtn.nativeElement.click();
    //this.referJobBtn.nativeElement.click();
    this.uploadResumeBtn.nativeElement.click();
    this.shortlistBtn.nativeElement.click();
    this.discardBtn.nativeElement.click();
  }
  selectFormatedFile(event: any) {
    this.saveResumeBtn = false;
    this.selectedFormatedFile = event.target.files;
  }

  downloadFullresume() {
    console.log('clicked');
    // this.spin.show();
    this._tenantService
      .ondownload(this.formatedResumePath, this.formatedFileName)
      .subscribe(
        res => {
          this.spin.hide();

          this._notificationsService.showSuccessNotif(
            'Success',
            'Candidate formatted resume downloaded successfully'
          );
          // AppComponent.getNotification('Candidate resume downloaded successfully', 'Job Posted Successfully', 'Success "', new Date());
          this.closeModal();
        },
        error => {
          this.spin.hide();

          this._notificationsService.showErrorNotif(
            'Failed',
            'Unable to download the  formatted resume.'
          );
          // AppComponent.getNotification('Unable to download the resume.', 'Job Posting Failes', 'Failed "', new Date());
          this.closeModal();
        },
        () => {
          console.log('Completed file download.');
        }
      );
  }

  //To Check Resume Status
  onSelectStatus(selectedStatus: string) {
    this.rowSelectStatus = selectedStatus;
    console.log(this.rowSelectStatus);
    if (this.rowSelectStatus === 'RE_INSTATE') {
      console.log('true');
      const resumeStatus = {
        jobReferenceId: this.referId,
        candidateId: this.candidateId,
        resumeStatus: this.rowSelectStatus
      };
      console.log(resumeStatus);
      this._userService.changeStatus(resumeStatus).subscribe(
        e => {
          this.spin.hide();
          console.log(e.comment, 'status');
          this.statuscomment = e.comment;
          this.spin.hide();
          this.viewResumeEvent();
          this._notificationsService.showSuccessNotif(
            'success',
            'Candidate status changed to ' + this.rowSelectStatus
          );
        },
        error => {
          this.spin.hide();
          this._notificationsService.showErrorNotif(
            'Failed',
            'Internal server error ,unable to discard candidate'
          );
          this.closeModal();
        }
      );
    } else {
      this.modalForComment.nativeElement.click();
      let date = new Date();
      console.log(date);
      this.systemdate =
        date.getFullYear().toString() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate().toString()).slice(-2);
      console.log(this.systemdate);
    }
  }
  // FOR SUBMITTING THE COMMENTS WHEN CHANGING THE STATUS
  submitComment(commentValue: any) {
    console.log(commentValue);
    this.spin.show();
    var resumeStatus = {
      jobReferenceId: this.referId,
      candidateId: this.candidateId,
      resumeStatus: this.rowSelectStatus,
      modifiedDate: this.systemdate,
      comments: commentValue
    };
    console.log(resumeStatus);
    this._userService.changeStatus(resumeStatus).subscribe(
      e => {
        this.spin.hide();
        console.log(e.comment, 'status');
        this.statuscomment = e.comment;
        this.spin.hide();
        this.viewResumeEvent();
        commentValue.reset();
        this._notificationsService.showSuccessNotif(
          'success',
          'Candidate status changed to ' + this.rowSelectStatus
        );
      },

      error => {
        this.spin.hide();

        this._notificationsService.showErrorNotif(
          'Failed',
          'Internal server error ,unable to discard candidate'
        );

        this.closeModal();
      }
    );
  }
  // TO GET QUALIFICATION DETAILS
  getQualificationList() {
    this._TenantService.getQualifications().subscribe(res => {
      console.log(res);
      this.qualifications = res;
      this.qualifications.forEach(element => {
        // console.log(element.name);
        this.qualification = element.name;
        // console.log(this.qualification);
      });
    });
  }
  getAllStatus() {
    debugger;
    this._tenantService.getAllStatus().subscribe(res => {
      console.log('resumeCandidtaeStatus', res);
      this.allResumeStatus = res;
    });
  }
  //TO GET SEPCIALIZATION LIST
  getSpecializations(qualificationId: String) {
    this._TenantService
      .getSpecializationsList(qualificationId)
      .subscribe(res => {
        this.specializations = res;
        this.specializations.forEach(element => {
          console.log(element.name);
          this.specilaization = element.name;
        });
        if (this.specializations.length === 0) {
          this.disableSpecialisation = 'No Specializations Available';
        } else {
          this.disableSpecialisation =
            'Below are the Specializations for Selected Qualification';
        }
      });
  }
  public onSelectionChanged() {
    let selectedRows = this.GridApi.getSelectedRows();

    console.log(selectedRows, 'srows');
    if (selectedRows.length > 0) {
      if (selectedRows.length == 1) {
        this.rowSelectedId = selectedRows[0].hirerequestId;

        this.disableUploadResume = false;
        this.disableViewResume = false;
        this.uploadCompleted = true;
      } else {
        this.disableUploadResume = true;
        this.disableViewResume = true;
        this.uploadCompleted = false;
      }

      selectedRows.forEach(element => {
        if (
          element.hireRequestStatus === 'APPROVED' ||
          element.hireRequestStatus === 'ASSIGNED'
        ) {
          this.disableUploadResume = false;
          this.disableViewResume = false;
        } else if (element.hireRequestStatus === 'CLOSED') {
          this.disableUploadResume = true;
          this.disableViewResume = false;
        } else if (element.hireRequestStatus === 'UNASSIGNED') {
          this.disableUploadResume = true;
        } else {
          this.disableUploadResume = true;
          this.disableViewResume = true;
        }
      });
    } else {
      this.disableUploadResume = true;
      this.disableViewResume = true;
    }
  }
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }
  quickSearch() {
    this.GridApi.setQuickFilter(this.searchvalue);
  }
  // To Update candidate details
  postUpdatedResume() {
    // this.candidateObj.user.createdBy = sessionStorage.getItem('userId');
    this._TenantService.updateResumes(this.candidateObj).subscribe(
      result => {
        // console.log(result)
        console.log('updatedresume', result);
        this._notificationsService.showSuccessNotif(
          'success',
          'Candidate Resume Updated successfully'
        );
        AppComponent.getNotification(
          'Candidate Resume Updated successfully.',
          'Update Successful',
          'success "',
          new Date()
        );
        this.closeModal();
      },
      error => {
        this.spin.hide();

        this._notificationsService.showErrorNotif(
          'Failed',
          'Internal server error ,unable to Unable to Update candidate Resume'
        );
        AppComponent.getNotification(
          'Internal server error ,unable to Unable to Update candidate Resume.',
          'Update fails',
          'Failed "',
          new Date()
        );
        this.closeModal();
      }
    );
  }

  public onSelectionChanges() {
    const selectedRows = this.api.getSelectedRows();
    console.log(selectedRows.length);
    if (selectedRows.length >= 1) {
      this.resumedata = selectedRows[0].resumeId;
      console.log(this.resumedata, 'srows');
      if (selectedRows.length === 1) {
        this.rowSelectedId = selectedRows[0].resumeId;
        this.hideDownloadResume = false;
        this.hideViewResume = false;
      } else {
        this.hideDownloadResume = true;
        this.hideViewResume = true;
      }
      this._tenantService
        .SearchResumeView(this.rowSelectedId)
        .subscribe(res => {
          this.pushresume = res;
          console.log(this.pushresume.resume);
          if (this.pushresume.resume === null) {
            this.showdownload = true;
          } else {
            this.showdownload = false;
            this.showResumeModal = false;
          }
        });
      console.log(this.pushresume, 'res');
    } else {
      this.showdownload = true;
      this.hideDownloadResume = true;
    }
  }

  public onGridReadyforsearchResumes(param): void {
    this.gridApi = param.api;
    this.gridColumnApi = param.gridColumnApi;
  }

  onBtNext() {
    debugger;
    this.disablePreviousButton = false;
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

    this.rowData = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    this._jobpostingService
      .getJobList(this.id, this.pageid, this.rowid)
      .subscribe(res => {
        this.rowData = res;
      });
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.rowData = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid - 1;
    this._jobpostingService
      .getJobList(this.id, this.pageid, this.rowid)
      .subscribe(res => {
        this.rowData = res;
      });
  }
  onBtNextResume() {
    debugger;
    this.disablePreviousResumeButton = false;
    this.disableNextResumeButton = true;

    this.pageCountResume++;
    if (this.pageCountResume === this.responseResumePageCount) {
      this.disableNextResumeButton = true;
      this.disablePreviousResumeButton = false;
    } else if (this.pageCountResume >= this.responseResumePageCount) {
      this.pageCountResume--;
      this.disableNextResumeButton = false;
      this.disablePreviousResumeButton = true;
      this.pageidForResume = this.pageidForResume - 1;
    } else {
      this.disableNextResumeButton = false;
      this.disablePreviousResumeButton = false;
    }

    this.rowDataResume = [];
    this.pageidForResume = this.pageidForResume + 1;

    if (this.getallresumes !== 'allResumes') {
      this._TenantService
        .vendorResumes(this.hireeeID, this.pageid, this.rowid)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    } else if (this.getallresumes === 'allResumes') {
      this._tenantService
        .viewresume(this.hireeeID, this.pageidForResume, 15)
        .subscribe(
          res => {
            console.log(res);
            this.rowDataResume = res;
          },
          error => {
            console.log(error);
          }
        );
    }
    // use full code
    // this._tenantService.viewresume(this.hireeeID, this.pageidForResume, 15).subscribe(res => {

    //   this.rowDataResume = res;
    // })
  }

  onBtPreviousresume() {
    debugger;

    this.disableNextResumeButton = false;

    this.pageCountResume--;
    if (this.pageCountResume === 1) {
      this.disablePreviousResumeButton = true;
      this.disableNextResumeButton = false;
    } else if (this.pageCountResume <= this.responseResumePageCount) {
      this.disableNextResumeButton = true;
      this.disablePreviousResumeButton = false;
    } else {
      this.disablePreviousResumeButton = false;
    }
    this.rowDataResume = [];
    console.log('onPaginationPageLoaded', event);
    this.pageidForResume = this.pageidForResume - 1;

    if (this.getallresumes !== 'allResumes') {
      this._TenantService
        .vendorResumes(this.hireeeID, this.pageid, this.rowid)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    } else if (this.getallresumes === 'allResumes') {
      this._tenantService
        .viewresume(this.hireeeID, this.pageidForResume, 15)
        .subscribe(
          res => {
            console.log(res);
            this.rowDataResume = res;
          },
          error => {
            console.log(error);
          }
        );
    }
    // use full code
    // this._TenantService.viewresume(this.hireeeID, this.pageidForResume, 15).subscribe(res => {
    //   this.rowDataResume = res;
    // });
  }
  searchinput() {
    debugger;
    const formModel = this.searchForm.value;
    this.searchJobinput = formModel.searchinput;
  }
  //To Search Jobs
  searchJobList() {
    this.userRoles = sessionStorage.getItem('userRoles');
    debugger;
    if (this.userRoles == 'ADMIN') {
      if (this.searchinput.length == null) {
        this._jobpostingService
          .getJobList(this.id, this.rowid, this.pageid)
          .subscribe(Data => {
            this.rowData = Data;

            console.log(this.rowData, 'Result');
          });
      } else {
        this.searchinput();

        this._jobpostingService
          .searchAllJobs(
            sessionStorage.getItem('tenantId'),
            this.searchJobinput,
            this.pageids,
            this.rowid
          )
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          });
      }
    } else if (this.userRoles === 'Account Manager') {
      this.searchjobsaccountmanager = true;
      if (this.searchinput.length == null) {
        this._jobpostingService
          .getJobList(this.id, this.rowid, this.pageid)
          .subscribe(
            Data => {
              this.rowData = Data;
              console.log(this.rowData, 'Result');
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.searchinput();
        this._jobpostingService
          .searchJobsAccountManger(
            this.searchJobinput,
            this.pageids,
            this.rowid
          )
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          });
      }
    } else if (this.userRoles === 'VENDOR') {
      const formModel = this.searchForm.value;
      this.searchJobinput = formModel.searchinput;
      console.log(this.searchJobinput);
      console.log(this.searchJobinput.length);

      if (this.searchJobinput.length == 0) {
        this._jobpostingService
          .getJobList(this.id, this.rowid, this.pageid)
          .subscribe(Data => {
            this.rowData = Data;
            console.log(this.rowData, 'Result');
          });
      } else {
        this.searchinput();
        this._jobpostingService
          .vendorSearch(this.searchJobinput, this.pageids, this.rowid)
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          });
      }
    } else {
      this.searchjobs = true;
      if (this.searchinput.length == null) {
        this._jobpostingService
          .getJobList(this.id, this.rowid, this.pageid)
          .subscribe(Data => {
            this.rowData = Data;
            console.log(this.rowData, 'Result');
          });
      } else {
        this.searchinput();
        this._jobpostingService
          .searchAllJobss(this.searchJobinput, this.pageids, this.rowid)
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          });
      }
    }
  }

  // }
  postedbyme() {
    this._jobpostingService
      .getJobList(this.id, this.rowid, this.pageid)
      .subscribe(Data => {
        this.rowData = Data;

        console.log(this.rowData, 'Result');
      });
  }

  // Functionality for exporting data as PDF and .Doc

  uri = 'data:application/vnd.ms-excel;base64,';
  template =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

  base64(s: any) {
    return window.btoa(s);
  }
  format(s, c) {
    return s.replace(/{(\w+)}/g, function(m, p) {
      return c[p];
    });
  }
  tableToExcel(temp, worksheetName) {
    var table = temp,
      ctx = { worksheet: worksheetName, table: table },
      href = this.uri + this.base64(this.format(this.template, ctx));
    return href;
  }
  public exportexcel(selectedformat: any) {
    this.myText = 'All Jobs With Applications Details';
    var template = '<table>',
      thead = '',
      tbody = '',
      caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApi.getDataAsCsv()
      .split('\n')[0]
      .split(',');
    var aa = this.GridApi.getDataAsCsv()
      .split('\n')
      .slice(1);
    var header = array.map(function(name, index) {
      var count = 0;
      aa.map(function(str, ia) {
        str.split(',').map(function(value, i) {
          if (value.length == 2 && index == i) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });

    var indexes = header
      .map(function(value, index) {
        if (!value) {
          return index;
        }
      })
      .filter(function(value) {
        if (value !== undefined) {
          return value;
        }
      });

    var body = aa
      .map(function(str) {
        return str.split(',').map(function(value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        });
      })
      .map(function(arr) {
        return arr.filter(function(name) {
          return name;
        });
      });

    header = header.filter(function(value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function(arr) {
      finalRes.push(arr);
    });

    finalRes.map(function(row, index) {
      var tBodyRow = '';
      row.map(function(name, i) {
        name = name.substr(1, name.length - 2);
        name = name.replace('"', '');
        var str;
        if (index == 0) {
          str = '<th>' + name + '</th>';
          thead = thead.concat(str);
        } else {
          str = '<td>' + name + '</td>';
          tBodyRow = tBodyRow.concat(str);
        }
      });
      if (index == 0) {
        thead = '<thead><tr>' + thead + '</tr></thead>';
      } else {
        tbody = tbody.concat('<tr>' + tBodyRow + '</tr>');
      }
    });
    tbody = '<tbody>' + tbody + '</tbody>';
    if (selectedformat == 'Excel') {
      var exportHref = this.tableToExcel(
        template + caption + thead + tbody + '</table>',
        'AllJobs'
      );
      var a = document.createElement('a');
      a.download = 'AllJobsWithApplicationDetails';
      a.href = exportHref;
      setTimeout(function() {
        a.click();
      }, 100);
    }
    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApi.getDataAsCsv()
        .split('\n')[0]
        .split(',');
      var aa = this.GridApi.getDataAsCsv()
        .split('\n')
        .slice(1);
      var header = array.map(function(name, index) {
        var count = 0;
        aa.map(function(str, ia) {
          str.split(',').map(function(value, i) {
            if (value.length == 2 && index == i) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });

      var indexes = header
        .map(function(value, index) {
          if (!value) {
            return index;
          }
        })
        .filter(function(value) {
          if (value !== undefined) {
            return value;
          }
        });

      var body = aa
        .map(function(str) {
          return str.split(',').map(function(value: any, index) {
            if (indexes.indexOf(index) !== -1) {
              value = false;
            }
            return value;
          });
        })
        .map(function(arr) {
          return arr.filter(function(name) {
            return name;
          });
        });

      header = header.filter(function(value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function(arr) {
        finalRes.push(arr);
      });

      finalRes.map(function(row, index) {
        var rowData = {};
        row.map(function(name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          };
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function(obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }
      });

      // Only pt supported (not mm or in)
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 15,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
      });

      doc.autoTable(columns, rows, {
        styles: { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function(data) {
          doc.text('All Jobs With Application Details', 150, 10);
        }
      });
      doc.save('AllJobsWithApplicationsDetails');
    }
  }
  dates() {
    let date = new Date();
    this.currentDate = new Date(
      date.getFullYear().toString() +
        '-' +
        ('0' + date.getMonth().toString()) +
        '-' +
        ('0' + date.getDate().toString()).slice(-2)
    );
    console.log(this.currentDate, 'hsgfiusfg7d');
  }
  public checkPrivilege() {
    debugger;
    this.userRole = sessionStorage.getItem('userRoles');
    this.role = sessionStorage.getItem('privilege');
    console.log(this.role);
    if (this.role == 'client Jobs' && this.userRole != 'ADMIN') {
      this.roleButton = true;
    } 
  }

  Formclose() {
    this.searchResumeForm.reset();
    this.searchResumeFlag = false;
    this.viewdownFlag = false;
  }
  downloadExcelReportJobsReport() {
    debugger;
    let date: Date = new Date();

    this.datee =
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' +
      ('0' + date.getDate().toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodExcelReportJobReport(this.tentId).subscribe(
        res => {
          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'JobsReportExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();
        }
      );
    } else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this.ReportsService.downlaodExcelReportJobReport(
        this.tentId,
        this.userId
      ).subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'JobsReportExcelUser.xls' + '' + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      });
    }
  }
  downloadJobReportPdf(candidate: any) {
    let date: Date = new Date();
    this.datee =
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' +
      ('0' + date.getDate().toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodPdfJobReport(this.tentId).subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'jobReport.pdf' + ' ' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      });
    } else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this.ReportsService.downlaodPdfJobReport(
        this.tentId,
        this.userId
      ).subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'jobReportUser.pdf' + ' ' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      });
    }
  }

  resumedownload() {
    debugger;
    this.spin.show();
    this.resumurl =
      HttpUrls.DOWNLOAD_RESUME +
      '?path=' +
      this.resumePath +
      '/' +
      this.fileName;
    this.spin.hide();
    console.log(this.resumurl);
    this.toastr.successToastr(
      'Candidate Resume Downloaded Successfully',
      'Success!',
      { animate: 'slideFromBottom', newestOnTop: false }
    );
  }
  viewfullresume() {
    this.spin.show();
    this.hideResumesModal = false;
    this.viewFullResume = true;
    this._tenantService
      .viewfullresume(this.resumePath, this.fileName)
      .subscribe(
        e => {
          console.log('viewfullresume data : ' + e);
          this.spin.hide();
          if (e) {
            this.resumeHtmlData = e;
            this.showResumeModal = true;
          } else {
            this.showResumeModal = false;
          }
        },
        error => {
          this.showResumeModal = false;
          this.spin.hide();
          this.toastr.errorToastr('Unable to load resume details.', 'Failed!', {
            animate: 'slideFromTop',
            newestOnTop: true
          });
        }
      );
  }

  public onSelectChanged() {
    let selectedRow = this.api.getSelectedRows();
    this.resumeDataaaaaa = selectedRow;
    console.log(this.resumeDataaaaaa.length, 'srows');
    if (this.resumeDataaaaaa.length > 0) {
      if (this.resumeDataaaaaa[0].resume.formatResumePath === null) {
        this.showName = false;
      } else {
        this.showName = true;
      }
      if (this.resumeDataaaaaa.length === 1) {
        if (this.AssignedStatus === 'UNASSIGNED') {
          this.hideEditResume = true;
          this.hideSelectStatus = true;
          this.hideDownloadResume = false;
          this.hideDownloadFull = false;

          this.hideViewResume = false;
          this.hideviewFormated = false;
        } else if (this.AssignedStatus === 'CLOSE') {
          this.hideEditResume = true;
          this.hideSelectStatus = true;
          this.hideDownloadResume = false;
          this.hideDownloadFull = false;

          this.hideViewResume = false;
          this.hideviewFormated = false;
        } else {
          this.rowSelectedId = selectedRow[0].id;
          this.hideDownloadResume = false;
          this.hideDownloadFull = false;
          this.hideViewResume = false;
          this.hideviewFormated = false;
          this.hideEditResume = false;
          this.hideSelectStatus = false;
        }
      } else {
        this.hideDownloadResume = true;
        this.hideDownloadFull = true;
        this.hideViewResume = true;
        this.hideviewFormated = true;
        this.hideEditResume = true;
        this.hideSelectStatus = true;
      }
    } else {
      this.hideDownloadResume = true;
      this.hideDownloadFull = true;
      this.hideViewResume = true;
      this.hideviewFormated = true;
      this.hideEditResume = true;
      this.hideSelectStatus = true;
    }
  }

  resumedownloadd() {
    this.spin.show();
    if (this.resumeDataaaaaa[0].resume.formatResumePath === null) {
      console.log(this.viewdownFlag);
      this.toastr.infoToastr(
        'No Formatted resume for this candidate.',
        'Info!',
        { animate: 'slideFromTop', newestOnTop: true }
      );
      this.spin.hide();
    } else {
      this.showName = true;
      this.resumurll =
        HttpUrls.DOWNLOAD_FORMATTED_RESUME +
        '?path=' +
        this.resumeDataaaaaa[0].resume.formatResumePath +
        '/' +
        this.resumeDataaaaaa[0].resume.formatedFileName;
      console.log(this.resumurll);
      this.toastr.successToastr(
        'Candidate Formatted Resume Downloaded Successfully',
        'Success!',
        { animate: 'slideFromBottom', newestOnTop: false }
      );
    }
  }

  viewFormatedfullresume() {
    console.log(this.resumeDataaaaaa[0].resume.formatResumePath, 'srows');
    console.log(this.resumeDataaaaaa[0], 'srows');
    this.spin.show();
    if (this.resumeDataaaaaa[0].resume.formatResumePath !== null) {
      console.log(this.showResumeModal);
      this._tenantService
        .viewFormattedResume(
          this.resumeDataaaaaa[0].resume.formatResumePath,
          this.resumeDataaaaaa[0].resume.formatedFileName
        )
        .subscribe(
          e => {
            console.log('viewfullresume dataaaaa : ' + e);
            this.viewFullResume = true;
            this.spin.hide();
            if (this.resumeDataaaaaa[0].resume.formatResumePath !== null) {
              this.resumeHtmlData = e;
              this.showResumeModal = true;
            } else {
              this.showResumeModal = false;
            }
          },
          error => {
            this.showResumeModal = false;
            this.spin.hide();
            this.toastr.errorToastr(
              'Unable to load resume details.',
              'Failed!',
              { animate: 'slideFromTop', newestOnTop: true }
            );
          }
        );
    } else {
      this.showName = false;
      this.viewFullResume = false;
      this.showResumeModal = false;
      this.toastr.infoToastr(
        'No Formatted resume for this candidate.',
        'Info!',
        { animate: 'slideFromTop', newestOnTop: true }
      );
      this.spin.hide();
      console.log(this.formatedFileName);
    }
  }
  // vendor Resumes
  vendorResumess() {
    debugger;
    if (this.vendorResumes === true) {
      this._TenantService
        .vendorResumes(this.hireeeID, this.pageid, this.rowid)
        .subscribe(
          res => {
            console.log(res);
            this.rowDataResume = res;
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  // all resumes
  allResumess() {
    debugger;
    this._tenantService
      .viewresume(this.hireeeID, this.pageidForResume, 15)
      .subscribe(
        res => {
          console.log(res);
          this.rowDataResume = res;
        },
        error => {
          console.log(error);
        }
      );
  }
  refferalResumes(){
    this._tenantService
    .getAllRefferalList(this.hireeeID, this.pageidForResume, 15)
    .subscribe((refferalCV:any) => {
        console.log(refferalCV);
        this.rowDataResume = refferalCV;
      },
      error => {
        console.log(error);
      }
    );
  }
  // REINSTATE STATUS
  // reInstateStatus() {
  //   this._tenantService.reInstateStatus().subscribe(res => {
  //     console.log(res);
  //     this.allResumeStatus = res;
  //     for (let index = 0; index < this.allResumeStatus.length; index++) {
  //       const element = this.allResumeStatus[index].resumeStatus;
  //       console.log(element);
  //       this.allResumeStatus.push(element);
  //     }

  //     // this.allResumeStatus.push()
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  clearValidations() {
    console.log('test');
    this.uploadResumeForm.controls['resumefilename'].reset();
  }
}
