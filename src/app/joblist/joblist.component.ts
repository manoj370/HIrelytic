import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ɵConsole, OnDestroy } from '@angular/core';
import { JobPostingService } from '../services/jobposting.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { JobPosting, skills } from '../models/jobposting';
import { assign, hire } from '../models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; //This is for Model driven form form
import { RequrementDetails } from '../models/jobreferences';
import { GridApi, ColumnApi, GroupCellRenderer, GridOptions } from 'ag-grid-community/main';
import { ToastrManager } from 'ng6-toastr-notifications';
import { userPrivileges } from '../models/privileges';
import { TenantService } from '../services/tenant.service';
// import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';
import { NotificationMessageService } from '../../app/services/notification.service';
import { AppComponent } from '../app.component';
// import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { HttpClient } from '@angular/common/http';
import { Unassign } from '../models/unassign';
import { ReportsService } from '../services/reports.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ReferedLevel } from '../models/referjob';
import { Subject } from 'rxjs';
declare var jquery: any;
declare var $: any;
declare var swal: any;
import { takeUntil } from 'rxjs/operators';

export class items {
  display: any;
}
export class dropdownList {
  id: any;
  itemName: any;
}
export class unassignDropdown {
  id: any;
  itemName: any;
}
export class dropdownListVendor {
  id: any;
  itemName: any;
}
@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('assignJobBtn') assignJobBtn: ElementRef;
  @ViewChild('updateBtn') updateBtn: ElementRef;
  @ViewChild('referJobBtn') referJobBtn: ElementRef;
  @ViewChild('referJob') referJob: ElementRef;
  @ViewChild('approveBtn') approveBtn: ElementRef;
  @ViewChild('rejectBtn') rejectBtn: ElementRef;
  @ViewChild('flatpickrEl', { read: ElementRef }) flatpickrEl: ElementRef;
  @ViewChild('closeConfirmModel') closeConfirmModel: ElementRef;
  public UnassignObj: Unassign = new Unassign();
  subscribe: Subject<any> = new Subject<any>();


  dropdownListQualification = [];
  selectedItems1 = [];
  // dropdownSettings = {};
  userPrivilege: userPrivileges = new userPrivileges();
  public rowDataAssignTo: any;
  myData: RequrementDetails[];
  selectedJobDetails: any;
  jobList: any;
  dropdownLocation = [];
  public assignToFlag: boolean;
  jobs: JobPosting;
  skills: any[];
  referJobForm: FormGroup;
  model: any = {};
  error: boolean;
  loading: boolean;
  jobposting: JobPosting = new JobPosting();
  emaildata: assign = new assign();
  hirer: hire = new hire();
  firstform: boolean;
  viewform: boolean;
  display: boolean;
  public hirereqId: any;
  items: any = [];
  order: string = 'createdTime';
  id: any;
  abcde: any = [];
  hireid: any;
  private flatpickr;
  public hirerequestId;
  assignemail: any = [];
  locLevel = ['Level-1', 'Level-2', 'Level-3']
  locQualification = ['BE/B.Tech', 'B.Com', 'M.Tech', 'MCA', 'Any Degree']
  locstatus = ['Open', 'Closed'];
  location = ['Bengaluru', 'Hyderabad', 'Chennai', 'Gurgaon', 'Mumbai', 'Delhi', 'Surat', 'Pune', 'Chandigarh', 'Kolkata'];
  locType = ['Internal', 'External'];
  locPayRole = ['Permanent', 'Contract', 'Contract-to-hire']
  dropdownList: any;
  selectedItems = [];
  selectedItemsForUnassigined = [];
  dropdownSettings = {};
  assigntoDropdownSettings = {};
  FunctionalAreaList: any = [];
  DesignationList: any = [];
  DepartmentList: any = [];
  ClientList: any = [];
  request: dropdownList;
  itemName = [];
  list: any;
  selectedRow: any;
  hireRequestId: any;
  public rowData: any;
  disableAssignJob: boolean = true;
  disableViewJob: boolean = true;
  disableApproveJob: boolean = true;
  disableRejectJob: boolean = true;
  disableHoldJob: boolean = true;
  disableCloseJob: boolean = true;
  disableEditJob: boolean = true;
  disableDeleteJob: boolean = true;
  disableReferJob: boolean = true;
  rejectCommentBtn: boolean = true;
  gridOptions: any;
  userRoles: any;
  selectedJobs: any = [];
  jobPostedOn: any;
  editJobForm: any;
  GridApi: any;
  columnApi: any
  private defaultColDef;
  private frameworkComponents;
  private CustomDateComponent;
  private assignJobForm: any;
  private getAllPriv: any = [];
  private viewQual: any = [];
  private viewLoc: any = [];
  private multipleHireRequestIds: any = [];
  public rowSelectedId;
  myText: string;
  api: any;
  searchvalue: any;
  selectedVendorId: string;
  allVendorsNames: any;
  private vendorJobForm: any;
  dropdownListVendors: any = [];
  dropdownListVendor: { id: number; name: string; }[];
  assignVendorDropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; noDataAvailablePlaceholderText: string; };


  assignVendorIds: any = [];
  publishJobTovendor: any;

  pagination: any;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;

  disableUnassignJob: boolean = true;
  rowSelectHireRequestId: any;
  hireRequestIdsObj: any[];
  userIds: any[];
  assignIds: any[];
  unassignIserId: any;
  unassignDropdown: any;
  unassigntoDropdownSettings: {};
  unassignJobForm: FormGroup;
  unassignJobFormVendor: FormGroup;
  UnassignUserIds: any = [];
  searchForm: FormGroup;
  searchJobinput: any;
  searchJobData: any;
  getClientName: any;
  managerId: any;
  clientListForManager: any = {};
  hiringManagerList: any = {};
  clientIds: any;
  getManagerName: any;
  jobPostedToClient: any;
  clients: any;
  clientId: any;
  getManagerlist: any;
  pageids: any = 0;
  privilege: any = [];
  priviliegeButton: boolean;
  tentId: string;
  userId: string;
  clientContactId: any;
  updateJobObject: any;
  rejectModalForm: FormGroup;
  onHoldModalForm: FormGroup;
  onCloseModalForm: FormGroup;
  viewjob: any = [];
  public refered: ReferedLevel = new ReferedLevel();
  referjob: any = [];
  referformdetails: any;
  datee: string;
  privileges: any = [];
  authority: any;
  postJob: boolean;
  public pageid: any = 0;
  public rowid: any = 15;
  responsePageCount: number;
  pageCount: number = 1;
  approveJob: boolean;
  rejectJob: boolean;
  holdJob: boolean;
  obj: any;
  comments: any;
  closeJob: boolean;
  viewJob: boolean;
  editJob: boolean;
  jobpostingg: any;
  job: any = [];
  dropdownLocationn: any = [];
  dropdownQualification: any = [];
  assignunassignJob: boolean = false;
  dropdownListRecruiter: any = [];
  rowClassRules: any;
  gridApi: any;
  gridColumnApi: any;
  messageforMaxSalaryFlag: boolean = false;
  messageforMinSalaryFlag: boolean = false;
  messageforMaxExp: boolean = false;
  messageforMinExp: boolean = false;
  rowHeight: any;
  searchjobs: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  vendorIds: any;
  clientJobs = false;
  allJobs = false;
  manageVendors = false;
  manageJobs = false;
  getalljobs = 'alljobs';
  totalCount: any;
  updateclientid: any
  rowDataAssignToVendors: any = [];
  selectedItemsForUnassiginedVendors = [];
  UnassignUserIdsVendors: any = [];
  searchjobsaccountmanager: boolean;
  //   public  gridApi;
  //   public gridColumnApi;
  //   public getRowHeight;
  //  public offsetHeight:any;
  constructor(private http: HttpClient, private _userService: UserService,
    private _TenantService: TenantService, private _notificationsService: NotificationMessageService,
    public toastr: ToastrManager, private router: Router,
    private _jobpostingService: JobPostingService, private userService: UserService,
    private spin: NgxSpinnerService, private ReportsService: ReportsService) {
    this.rowHeight = 30;

    this.rowClassRules = {
      'sick-days-warning': function (params) {
        return params.node.rowIndex % 2 !== 0;
      }

    };

    this.defaultColDef = { filter: true };
    this.rejectModalForm = new FormGroup({
      rejectCmntTextarea: new FormControl('', Validators.required)
    });
    this.onHoldModalForm = new FormGroup({
      onHoldCmntTextarea: new FormControl('', Validators.required)
    })
    this.onCloseModalForm = new FormGroup({
      onCloseCmntTextarea: new FormControl('', Validators.required)
    })
    this.editJobForm = new FormGroup({
      jobCode: new FormControl(''),
      jobTitle: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobDesc: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(4000), Validators.pattern(/^[^-\s]/)])),
      functionalArea: new FormControl(''),
      noOfOpenings: new FormControl('', [Validators.required, Validators.pattern(/^[^-\s]/)]),
      department: new FormControl(''),
      jobDesig: new FormControl(''),
      jobPostEmail: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      Location: new FormControl('', Validators.required),
      minExp: new FormControl('', Validators.required),
      maxExp: new FormControl('', Validators.required),
      jobPostSkills: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobPostPrimarySkill: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s]/)])),
      jobPostQualification: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      hiringManager: new FormControl('', Validators.required),
      aboutCompany: new FormControl('', Validators.required),
      jobContactPhone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      maxNoticePeriod: new FormControl(''),
      jobCurrency: new FormControl(''),
      minSalary: new FormControl(''),
      maxSalary: new FormControl(''),
      jobEmpMode: new FormControl('', Validators.required),

    });
    this.assignJobForm = new FormGroup({
      recNames: new FormControl('', Validators.required),
    });
    this.unassignJobForm = new FormGroup({
      unassignRecNames: new FormControl('', Validators.required),

    });
    this.unassignJobFormVendor = new FormGroup({
      unassignvendorNames: new FormControl('', Validators.required),

    });
    this.vendorJobForm = new FormGroup({
      vendorNames: new FormControl('', Validators.required),
    });
    this.searchForm = new FormGroup({
      searchinput: new FormControl('', Validators.required),
    });
    this.referJobForm = new FormGroup({

      candidateName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      candidateEmail: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),

    });
    // this.rowClassRules = {
    //   'sick-days-warning': function (params) {
    //     const numSickDays = params.data.hireRequestStatus;
    //     return numSickDays === 'CLOSED';
    //   },
    //   'sick-days-breach': 'data.hireRequestStatus === "ONHOLD"'
    // };
  }
  // List Of  Jobs Table
  columnDefs = [

    {
      headerName: 'Job Title', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'jobTitle', width: 150,
      rowSelection: 'multiple', unSortIcon: true, checkboxSelection: true
    },

    {
      headerName: 'Positions', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'noOfOpenings', width: 130,
      rowSelection: 'multiple', unSortIcon: true
    },
//referralAmount
    { headerName: ' Client Name', field: 'clientName', width: 200, unSortIcon: true, cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' } },
    { headerName: ' Hiring Manager', field: 'hiringManager', unSortIcon: true, width: 200, cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' } },
    { headerName: ' Posted By', field: 'jobContactToEmail', width: 200, unSortIcon: true },
    {
      headerName: 'Status', field: 'hireRequestStatus', width: 200, unSortIcon: true,
      cellClassRules: {
        'rag-green-outer': function (params) {
          return params.value === 'ASSIGNED';
        },
        'rag-amber-outer': function (params) {
          return params.value === 'ONHOLD';
        },
        'rag-red-outer': function (params) {
          return params.value === 'REJECTED';
        },
        'rag-green-closed': function (params) {
          return params.value === 'CLOSED';
        },
        'rag-amber-open': function (params) {
          return params.value === 'OPEN';
        },
        'rag-red-pending': function (params) {
          return params.value === 'PENDINGFORAPPROVAL';
        },
        // APPROVED
        'rag-black-unassign': function (params) {
          return params.value === 'UNASSIGNED';
        },
        'rag-black-approved': function (params) {
          return params.value === 'APPROVED';
        },
        'rag-black-open': function (params) {
          return params.value === 'Open';
        }
        //Open
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + "</span>";
      }
    },
    {
      headerName: 'Posted',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'createdDate', width: 130, unSortIcon: true
    },
    {
      headerName: 'Refferal Amount',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'referralAmount', width: 170, unSortIcon: true
    },
    {
      headerName: '', width: 60, cellRenderer: function () {
        return '<span class="editIcon"><i class="fa fa-eye viewIcon"  title="View&Edit"  data-toggle="modal"  data-target="#editJobModal" ></span>';
      }

    },


  ];


  JobPostedToClientcolumnDefs = [

    { headerName: 'Created Time', headerClass: 'ctHeader', field: 'createdTime', minWidth: 100, width: 200, unSortIcon: true },
    { headerName: 'Job Title', field: 'jobTitle', width: 250, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    { headerName: 'No Of Positions', field: 'noOfOpenings', width: 150, rowSelection: 'multiple', minWidth: 130, unSortIcon: true },
    { headerName: 'Posted By', field: 'createdBy', width: 120, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    { headerName: ' Client Name', field: 'clientName', width: 120, rowSelection: 'multiple', minWidth: 120, unSortIcon: true },
    { headerName: ' Hiring Manager', field: 'hiringManager', width: 140, rowSelection: 'multiple', minWidth: 140, unSortIcon: true },
    { headerName: 'Status', field: 'status', width: 120, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    { headerName: 'Email Id', field: 'jobContactToEmail', width: 240, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    // {headerName: 'Department', field: 'department',width:170, rowSelection: 'multiple' },
    { headerName: 'Phone Number', field: 'jobContactPhone', width: 200, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    // {headerName: 'Assigned To',cellRenderer: this.ageCellRendererFunc,width:180 , cellStyle: { cursor: 'pointer' } }

  ];
  rowSelection = 'multiple';
  autoGroupColumnDef = {
    headerName: 'Posted On date',
    field: 'createdTime',
    width: 180,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { checkbox: true }
  };

  columnDefsAssignTo = [
    { headerName: 'First Name', field: 'firstName', width: 500, rowSelection: 'multiple', minWidth: 100, unSortIcon: true },
    { headerName: 'Last Name', field: 'lastName', width: 500, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    // { headerName: 'Email Id', field: 'emailId', width: 200, rowSelection: 'multiple', minWidth: 80 },
    // { headerName: 'Phone Number', field: 'phoneNumber', width: 160, rowSelection: 'multiple', minWidth: 80 },
  ];
  columnDefsAssignToVendors = [
    { headerName: 'Vendor Name', field: 'vendorName', width: 500, rowSelection: 'multiple', minWidth: 100, unSortIcon: true },
    { headerName: 'Email Id', field: 'emailId', width: 500, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    { headerName: 'Phone Number', field: 'phoneNumber', width: 500, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
    { headerName: 'Contact Person', field: 'contactPerson', width: 500, rowSelection: 'multiple', minWidth: 80, unSortIcon: true },
  ];

  ngOnInit() {
    this.listOfRecruiters();
    // this.getJobDetails();
    this.getLocations();
    this.getQualificationList();
    // this.getListOfRecruitersAssignToJob();
    console.log(sessionStorage.getItem('tenantId'));
    this._jobpostingService
      .getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
      .pipe(takeUntil(this.subscribe))
      .subscribe(Data => {
        debugger
        console.log(Data);
        this.jobList = Data;
        this.rowData = Data;
        this.responsePageCount = this.jobList[0].pageCount;
        this.totalCount = this.jobList[0].jobCount;
        console.log(this.rowData, 'this.jobList');

        if (this.jobList.length === 0) {
          this.disablePreviousButton = true;
          this.disableNextButton = true;
        }
        if (this.jobList.status === 'Open') {
          this.disableReferJob = true;
        }


      }, error => {
        console.log(error);
      })

    this.getPrivilege();
    // console.log('UserRoles', sessionStorage.getItem('userRoles'));
    // console.log(this.GridApi, 'this.gridapi')
    this.getAllVendorNames();
    this.getClientNames();
    this.getManagersList(this.clientId);

    this.model.refereeId = localStorage.getItem('userId');

    this.assigntoDropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 15,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'No data found',
    };
    this.unassigntoDropdownSettings = {
      // singleSelection: false,
      // idField: 'unAssignId',
      // textField: 'firstName',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 10,
      // allowSearchFilter: true,
      // noDataAvailablePlaceholderText: 'No data found',
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'No data found',
    };
    this.assignVendorDropdownSettings = {
      singleSelection: false,
      idField: 'vendorId',
      textField: 'vendorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'No data found',
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };



    this.userRoles = sessionStorage.getItem('userRoles');

    this.gridOptions = {
      animateRows: true,
      rowData: null,
      columnDefs: this.columnDefs,
      enableColResize: true,
      rowHeight: 35,
      // headerHeight: 35,

      paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
      },

      paginationPageSize: 10,
      pagination: true,
    }
    // this.gridOptions.rowStyle = { color: 'red' };

    // this.gridOptions.getRowStyle = function (params) {
    //   if (params.node.rowIndex % 2 === 0) {
    //     return { background: '#F8F8F8' }
    //   }
    // };



    var gridOptionsAssignTo = {
      rowData: null,
      columnDefsAssignTo: this.columnDefs,
      enableColResize: true,
      rowHeight: 35,
      // headerHeight: 35,
      paginationPageSize: 10,
      pagination: true,

    }
    // this.gridOptions.rowStyle = { background: 'red' };





    this.assignToFlag = false;
    // this.dropdownList = JSON.parse(sessionStorage.getItem('roleUsers'));
    // this.dropdownListVendors = this.allVendorsNames;
    //this.assignTo(this.hirerequestId);
    //this.unassignDropdown1= this.unassignDropdown;
    console.log(this.unassignDropdown, 'dropdown1')
    console.log(this.dropdownList);

    this.display = true;
    if (this.userRoles === 'ADMIN') {
      this.id = sessionStorage.getItem('tenantId');
    } else {
      this.id = sessionStorage.getItem('userId');
    }

    this.getAllJobList();
    this.spin.show();

    this.GetDataInputValues();


  }

  ngAfterViewInit() { }
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
        // console.log("fdsgpjufd9pg", this.DesignationList)
      }
    });
    // this.userService.getClients(sessionStorage.getItem('tenantId')).forEach(area => {

    //   for (const e of area) {
    //     this.ClientList.push({ label: e.clientName.toString(), value: e.clientId });
    //     console.log('gffffffffff', this.ClientList)

    //   }
    // });

  }
  assignJobPosting(e) {
    this.selectedItems = null;
    console.log(this.dropdownList)
    $('#myModal').modal({ backdrop: 'static' }, 'show');
    $('#myModal').show();
    console.log(this.selectedRow);
    this.hireid = this.selectedRow.data.hirerequestId;
    console.log(e);
  }
  AssignedEmailSubmit() {
    this.assignIds = [];
    this.spin.show();
    console.log(this.selectedItems)
    this.selectedItems.forEach(element => {
      this.assignIds.push(element.userId);

    });

    this.emaildata.hireRequestIds = this.multipleHireRequestIds;
    this.emaildata.setOfUserIds = this.assignIds;
    console.log(this.emaildata);
    this.userService.submitEmail(this.emaildata)
      .pipe(takeUntil(this.subscribe))
      .subscribe(e => {
        this.multipleHireRequestIds = [];
        console.log(e)
        this.spin.hide();
        this.getAllJobList();
        this._notificationsService.showSuccessNotif('Success', 'Job Assigned Successfully');
        this.disableAssignJob = true;
        this.disableApproveJob = true;
        this.disableRejectJob = true;
        this.disableHoldJob = true;
        this.disableCloseJob = true;
        this.disableDeleteJob = true;
        this.disableEditJob = true;
        this.disableViewJob = true;
        this.disableUnassignJob = true;
        this.closeModal();
        // $("#myModal").hide();
        this.selectedJobs = [];
        this.assignJobForm.reset();
      },

        error => {
          this.spin.hide();
          this._notificationsService.showErrorNotif('Failed', 'Failed to assign job');
          this.closeModal();
          this.selectedJobs = [];
          this.assignJobForm.reset();
        }

      )
  }

  UnassignedJob() {
    this.spin.show();
    console.log(this.selectedItemsForUnassigined, 'this.selectedItemsForUnassigined')
    this.selectedItemsForUnassigined.forEach(element => {
      this.UnassignUserIds.push(element.userId);
    });
    this.UnassignObj.setOfUserIds = this.UnassignUserIds;
    this.UnassignObj.hireRequestIds.push(this.rowSelectHireRequestId);
    return this._TenantService.UnassignedJobsToRecruiters(this.UnassignObj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.multipleHireRequestIds = [];
        this.spin.hide();
        this.getAllJobList();
        this._notificationsService.showSuccessNotif('Success', 'Job Un Assigned Successfully');
        // setTimeout(() => {
        //   this.assignJobBtn.nativeElement.click();
        // }, 2000);
        this.closeModal();

        // $("#myModal").hide();
        this.selectedJobs = [];
        this.unassignJobForm.reset();
      },

        error => {
          this.spin.hide();
          this._notificationsService.showErrorNotif('Failed', 'Failed to Unassign job');
          this.closeModal();
          this.selectedJobs = [];
          this.unassignJobForm.reset();
        }

      )
  }

  UnassignedJobVendors() {
    this.spin.show();
    console.log(this.selectedItemsForUnassiginedVendors, 'this.selectedItemsForUnassiginedVendors')
    this.selectedItemsForUnassiginedVendors.forEach(element => {
      this.UnassignUserIdsVendors.push(element.vendorId);
    });
    this.UnassignObj.setOfUserIds = this.UnassignUserIdsVendors;
    this.UnassignObj.hireRequestIds.push(this.rowSelectHireRequestId);
    console.log(this.UnassignObj);
    return this._TenantService.UnassignedJobsToVendors(this.UnassignObj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        console.log(result);
        this.multipleHireRequestIds = [];
        this.spin.hide();
        this.getAllJobList();
        this._notificationsService.showSuccessNotif('Success', 'Job Un Assigned To VendorSuccessfully');
        this.closeModal();
        this.selectedJobs = [];
        this.unassignJobFormVendor.reset();
      },
        error => {
          this.spin.hide();
          this._notificationsService.showErrorNotif('Failed', 'Failed to Unassign job to Vendor');
          this.closeModal();
          this.selectedJobs = [];
          this.unassignJobFormVendor.reset();
        }
      );
  }
  getListOfRecruitersAssignToJob() {
    this._jobpostingService.getListOfRecruitersAssignedToJob(this.hireid)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        console.log(res);
        this.rowDataAssignTo = res;
      });
  }
  getListOfVendorsAssignToJob() {
    if (this.manageVendors === true) {
      this._jobpostingService.getListOfVendorsAssignedToJob(this.hireid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          console.log(res);
          this.rowDataAssignToVendors = res;
        });
    }

  }
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

    this.rowData = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    debugger
    if (this.getalljobs !== 'alljobs') {
      this._jobpostingService.ClientJobs(this.pageid, this.rowid).takeUntil(this.destroy$).subscribe(res => {
        this.rowData = res;
        this.totalCount = this.jobList[0].jobCount;
      }, error => {
        console.log(error);
      })
    } else if (this.getalljobs === 'alljobs') {
      this._jobpostingService.getJobList(this.id, this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          this.rowData = res;
          this.totalCount = this.jobList[0].jobCount;
        }, error => {
          console.log(error);
        });
    }

  }
  onBtPrevious() {

    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    }
    else {
      this.disablePreviousButton = false;
    }
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid - 1;

    this.rowData = [];
    debugger
    if (this.getalljobs !== 'alljobs') {
      this._jobpostingService.ClientJobs(this.pageid, this.rowid).takeUntil(this.destroy$).subscribe(res => {
        this.rowData = res;
        this.totalCount = this.jobList[0].jobCount;
      }, error => {
        console.log(error);
      })
    } else if (this.getalljobs === 'alljobs') {
      this._jobpostingService.getJobList(this.id, this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          this.rowData = res;
          this.totalCount = this.jobList[0].jobCount;
        }, error => {
          console.log(error);
        });
    }

  }
  editJobPosting(update: JobPosting) {
    //console.log(update)
    this.display = false;
    this.firstform = true;

  }
  viewJobPosting() {
    //console.log(view)
    this.display = false;
    this.viewform = true;

    // console.log(this.jobposting.skills.display)
    //console.log(this.jobposting)
  }
  listpage() {
    this.firstform = false;
    this.display = true;
  }
  viewpage() {
    this.viewform = false;
    this.display = true;
  }

  // deleteJobPosting(hireRequestId: string) {
  //   this._jobpostingService.deleteJob(hireRequestId).subscribe(e => {
  //     swal('Job Deleted', 'Successfully', 'success');

  //   })
  // }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // getSelectedRows() {
  //   const selectedRow = this.gridApi.getSelectedRows();
  //   console.log(selectedRow); 
  // }
  onJobPostRowClick(event: any) {
    const selectedData = this.gridApi.getSelectedRows();
    console.log(selectedData);
    this.clientId = selectedData[0].clientId;
    if (selectedData !== undefined) {

      this.clientContactId = selectedData[0].clientContactId;
      this.hireid = selectedData[0].hirerequestId;
      this.getManagersList(selectedData[0].clientId);
      if (this.assignunassignJob === true) {
        this.getListOfRecruitersAssignToJob();
        this.getListOfVendorsAssignToJob();
      }
      this.abcde = [];
      console.log(selectedData[0], 'strfdstgdry')
      if (selectedData.length > 0) {
        selectedData.forEach(element => {
          console.log(element.hirerequestId);
          this.multipleHireRequestIds.push(element.hirerequestId);
        });
        this.hirereqId = selectedData[0].hirerequestId;
        // this.assignTo(selectedData[0].hirerequestId);
        this.jobposting = selectedData[0];
        this.disableAssignJob = false;
        this.disableApproveJob = false;
        this.disableRejectJob = false;
        this.disableHoldJob = false;
        this.disableCloseJob = false;
        this.disableDeleteJob = false;
        this.disableEditJob = false;
        this.disableViewJob = false;
        this.disableUnassignJob = true;

        if (selectedData[0].hireRequestStatus === 'APPROVED') {
          this.disableAssignJob = false;
          this.disableReferJob = false;

        } else if (selectedData[0].hireRequestStatus === 'OPEN') {
          this.disableAssignJob = true;
          this.disableReferJob = true;
        }
        if (selectedData[0].hireRequestStatus === 'ASSIGNED') {
          this.disableApproveJob = true;
          this.disableReferJob = false;
          this.disableUnassignJob = false;
        }
        if (selectedData[0].hireRequestStatus === 'REJECTED') {
          this.disableRejectJob = true;
        }
        if (selectedData[0].hireRequestStatus === 'ONHOLD') {
          this.disableHoldJob = true;
        }
        if (selectedData[0].hireRequestStatus === 'CLOSED') {
          this.disableCloseJob = true;
        }

      } else {
        this.multipleHireRequestIds.splice(this.multipleHireRequestIds.indexOf(selectedData[0].hirerequestId), 1);
        this.disableEditJob = true;
        this.disableViewJob = true;
        console.log(this.multipleHireRequestIds.toString(), 'event1');
      }
    }

  }


  // onEditClickBtn() {
  //   console.log(this.getClientName);
  //   console.log(this.jobposting.client, 'this.jobposting.client');

  //   this.getManagersList(this.jobposting.client);
  // }
  editOnJobPostClick(event: any) {
    this.jobposting = event.data;
    this.jobposting.skills = JSON.parse(event.data.skills);
  }
  cellClick(data: any) {
    console.log(data, 'cellclk');

    if (data.colDef.headerName == 'Assigned To') {
      // this.assignTo(data.data.hirerequestId);
      this.assignToFlag = true;
      this.display = false;
    }
  }
  //To Route to Job list page from assign to page
  backToJobList() {
    this.assignToFlag = false;
    this.display = true;
    this.selectedRow = [];
  }
  test(data: any) {
    console.log('evenet', data);
  }
  showSuccess() {
    this.toastr.successToastr('This is success toast.:', 'Success!', { animate: 'slideFromTop', newestOnTop: true });
  }
  onPageSizeChanged(event) {
    console.log(event);
    this.gridOptions.api.paginationSetPageSize(event);
  }
  private ageCellRendererFunc(params) {

    return '<i class="material-icons">person</i>';

  }
  referJobEvent() {
    this.referJobForm.reset();
  }
  getPrivilege() {

    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        console.log(this.authority, 'authoirithyName');
        debugger
        if (this.authority === 'MANAGE JOB POSTING') {
          this.postJob = true;
          this.closeJob = true;
          this.holdJob = true;
          this.editJob = true;
        } else if (this.authority === 'JOB POST APPROVAL') {
          this.approveJob = true;
        } else if (this.authority === 'JOB POST REJECT') {
          this.rejectJob = true;
        } else if (this.authority === 'JOB POST ONHOLD') {
          this.holdJob = true;
        } else if (this.authority === 'VIEW JOB') {
          this.viewJob = true;
        } else if (this.authority === 'MANAGE RECRUITERS') {
          this.assignunassignJob = true;
        }
        else if (this.authority === 'JOBS ASSIGNED') {
          this.searchjobs = true;
        }
        else if (this.authority === 'MANAGE CLIENT JOBS') {
          this.clientJobs = true;
          this.allJobs = true;
        }
        else if (this.authority === 'MANAGE VENDORS') {
          this.manageVendors = true;
        }
      });
    });


  }
  onViewClickBtn() {
    console.log('this.jobposting.jobMinQualification', this.jobposting.jobMinQualification);
  }
  private closeModal(): void {
    this.referJobBtn.nativeElement.click();
    this.referJob.nativeElement.click();
    this.assignJobBtn.nativeElement.click();
    this.updateBtn.nativeElement.click();
    this.approveBtn.nativeElement.click();
    this.rejectBtn.nativeElement.click();
    // this.unassignBtn.nativeElement.click();
  }

  // Approve Job Method
  approveSelectedJob() {
    this.spin.show();

    this._jobpostingService.approveJobAfterSelection(this.multipleHireRequestIds, sessionStorage.getItem('userId'), status, this.comments, this.obj).subscribe(res => {
      console.log(res);
      this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(Data => {
          this.spin.hide();
          this.jobList = Data;
          this.rowData = Data;
          console.log(this.jobList);
          this._notificationsService.showSuccessNotif('', 'Job Approved Successfully');
          this.closeModal();
          this.multipleHireRequestIds = [];
        });
    },

      error => {
        console.log(error);
        this._notificationsService.showSuccessNotif('', 'Job Approved Failed');
        this.closeModal();
        this.multipleHireRequestIds = [];
      });
  }

  /*For Rejecting Job*/
  rejectSelectedJob(rejectComments: string) {
    this.spin.show();

    this._jobpostingService.rejectJobAfterSelection(this.multipleHireRequestIds, sessionStorage.getItem('userId'), status, rejectComments, this.obj).subscribe(res => {

      console.log(res);
      this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(Data => {
          this.spin.hide();
          this.jobList = Data;
          this.rowData = Data;
          console.log(this.jobList);
          this._notificationsService.showSuccessNotif('', 'Job Rejected Successfully');
          this.closeModal();
          this.multipleHireRequestIds = [];
        });
    },

      error => {
        console.log(error);
        this._notificationsService.showErrorNotif('', 'Job Rejected Failed');
        this.closeModal();
        this.multipleHireRequestIds = [];
      });
  }
  // For Holding job Method
  onHoldSelectedJob(onHoldComments: string) {

    this.spin.show();

    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        console.log(this.authority, 'authoirithyName');
        debugger
        if (this.authority == 'JOB POST ONHOLD') {
          this._jobpostingService.onHoldAfterSelection(this.multipleHireRequestIds, sessionStorage.getItem('userId'), status, onHoldComments, this.obj).subscribe(res => {

            console.log(res);
            this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
              .pipe(takeUntil(this.subscribe))
              .subscribe(Data => {
                this.spin.hide();
                this.jobList = Data;
                this.rowData = Data;
                console.log(this.jobList);
                this._notificationsService.showSuccessNotif('', 'Job On Hold Successfully');
                this.closeModal();
                this.multipleHireRequestIds = [];
              });
          },

            error => {
              console.log(error);
              this._notificationsService.showErrorNotif('', 'Job On Hold Failed');
              this.closeModal();
              this.multipleHireRequestIds = [];
            });
        }
        else if (this.authority == 'MANAGE JOB POSTING') {
          this._jobpostingService.onHoldAfterprivilegeSelection(this.multipleHireRequestIds, sessionStorage.getItem('userId'), status, onHoldComments, this.obj).subscribe(res => {

            console.log(res);
            this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
              .pipe(takeUntil(this.subscribe))
              .subscribe(Data => {
                this.spin.hide();
                this.jobList = Data;
                this.rowData = Data;
                console.log(this.jobList);
                this._notificationsService.showSuccessNotif('', 'Job On Hold Successfully');
                this.closeModal();
                this.multipleHireRequestIds = [];
              });
          },

            error => {
              console.log(error);
              this._notificationsService.showErrorNotif('', 'Job On Hold Failed');
              this.closeModal();
              this.multipleHireRequestIds = [];
            });
        }
      });
    });



  }



  addNewpost() {
    this.router.navigate(['./manageJobs/newPosting']);
  }

  // For Closing JOb Method
  closeSelectedJob(onCloseComments: string) {
    this.spin.show();

    this._jobpostingService.closeAfterSelection(this.multipleHireRequestIds, sessionStorage.getItem('userId'), status, onCloseComments, this.obj).subscribe(res => {

      console.log(res);
      this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(Data => {
          this.spin.hide();
          this.jobList = Data;
          this.rowData = Data;
          console.log(this.jobList);
          this._notificationsService.showSuccessNotif('', 'Job Closed Successfully');
          this.closeModal();
          this.multipleHireRequestIds = [];
        });
    },

      error => {
        console.log(error);
        this._notificationsService.showErrorNotif('', 'Job  Closed Failed');
        this.closeModal();
        this.multipleHireRequestIds = [];
      });
  }


  getAllJobList(): void {
    this._jobpostingService.getJobList(sessionStorage.getItem('tenantId'), this.pageid, this.rowid)
      .pipe(takeUntil(this.subscribe))
      .subscribe(Data => {
        this.spin.hide();
        this.jobList = Data;
        this.rowData = Data;
        console.log(this.jobList, 'this.jobList');

        this.jobList.forEach(element => {
          if (element.hireRequestStatus === 'APPROVED') {
            element.status = 'APPROVED';
          } else if (element.hireRequestStatus === 'ASSIGNED') {
            element.status = 'ASSIGNED';
          } else if (element.hireRequestStatus === 'ON_HOLD') {
            element.status = 'ONHOLD';
          } else if (element.hireRequestStatus === 'CLOSE') {
            element.status = 'CLOSE';
          } else if (element.hireRequestStatus === 'Open') {
            element.status = 'Open';
          }
        });
      });
  }
  public onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows, 'selectedRows');
    let unassignIserId = selectedRows.userId;
    if (selectedRows.length === 1) {
      this.rowSelectedId = selectedRows[0].id;
      this.rowSelectHireRequestId = selectedRows[0].hirerequestId;
      this.disableEditJob = false;
      this.disableViewJob = false;
      this.disableApproveJob = false;
      this.disableRejectJob = false;
      this.disableHoldJob = false;
      this.disableReferJob = false;
      //  if(selectedRows.status == "ASSIGNED"){
      //     this.disableUnassignJob=false;
      //  }


      // this.disableAssignJob=false;

    } else if (selectedRows.length > 1) {
      this.disableEditJob = true;
      this.disableViewJob = true;
      this.disableApproveJob = false;
      this.disableRejectJob = false;

      this.disableHoldJob = false
      this.disableReferJob = true;

    } else {
      this.disableEditJob = true;
      this.disableViewJob = true;
      this.disableApproveJob = true;
      this.disableAssignJob = true;
      this.disableRejectJob = true;
      this.disableReferJob = true;
      this.disableHoldJob = true;
      this.disableCloseJob = true;
    }
    selectedRows.forEach(element => {
      if (element.hireRequestStatus === 'PENDINGFORAPPROVAL') {
        this.disableApproveJob = false;
        this.disableRejectJob = false;
        this.disableHoldJob = true;
        this.disableCloseJob = true;
        this.disableAssignJob = true;
        this.disableReferJob = true;
        //  this.disableEditJob = true;
      } else if (element.hireRequestStatus === 'APPROVED') {
        this.disableApproveJob = true;
        this.disableRejectJob = false;
        this.disableHoldJob = false;
        this.disableCloseJob = true;
        this.disableAssignJob = false;
        this.disableReferJob = false;
      } else if (element.hireRequestStatus === 'ASSIGNED') {

        this.disableApproveJob = true;
        this.disableRejectJob = true;
        this.disableHoldJob = false;
        this.disableCloseJob = false;
        this.disableAssignJob = false;
        this.disableReferJob = false;
        // this.disableEditJob = true;
        // this.disableEditJob = false;
      }
      else if (element.hireRequestStatus === 'REJECTED') {
        this.disableApproveJob = true;
        this.disableRejectJob = true;
        this.disableHoldJob = true;
        this.disableCloseJob = true;
        this.disableAssignJob = true;
        this.disableReferJob = true;
        this.disableEditJob = true;
      } else if (element.hireRequestStatus === 'ONHOLD') {
        this.disableApproveJob = false;
        this.disableRejectJob = false;
        this.disableHoldJob = true;
        this.disableCloseJob = true;
        this.disableAssignJob = true;
        this.disableReferJob = true;
      } else if (element.hireRequestStatus === 'CLOSED') {
        this.disableApproveJob = true;
        this.disableRejectJob = true;
        this.disableHoldJob = true;
        this.disableCloseJob = true;
        this.disableAssignJob = true;
        this.disableReferJob = true;
        this.disableEditJob = true;
        this.disableViewJob = false;
      }

    });


  }

  searchinput() {
    const formModel = this.searchForm.value;
    this.searchJobinput = formModel.searchinput;
    console.log(this.searchJobinput);
  }
  //To Search Jobs  ""
  searchJobList() {
    debugger
    if (this.userRoles === 'ADMIN') {
      if (this.searchinput.length == null) {
        this._jobpostingService.getJobList(this.id, this.rowid, this.pageid).subscribe(Data => {
          this.rowData = Data;
          console.log(this.rowData, 'Result');
        });
      } else {
        this.searchinput();
        this._jobpostingService.searchAllJobs(sessionStorage.getItem('tenantId'), this.searchJobinput, this.pageids, this.rowid)
          .pipe(takeUntil(this.subscribe))
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          })
      }
    }
    else if (this.userRoles === 'Account Manager') {
      this.searchjobsaccountmanager = true;
      if (this.searchinput.length == null) {
        this._jobpostingService.getJobList(this.id, this.rowid, this.pageid).subscribe(Data => {
          this.rowData = Data;
          console.log(this.rowData, 'Result');
        }, error => {
          console.log(error);
        });

      } else {
        this.searchinput();
        this._jobpostingService.searchJobsAccountManger(this.searchJobinput, this.pageids, this.rowid).subscribe(res => {
          this.searchJobData = res;
          this.rowData = this.searchJobData;
          console.log(this.rowData, 'result');
        });
      }
    }
    else if (this.userRoles === 'VENDOR') {
      const formModel = this.searchForm.value;
      this.searchJobinput = formModel.searchinput;
      console.log(this.searchJobinput);
      console.log(this.searchJobinput.length);


      if (this.searchJobinput.length == 0) {
        this._jobpostingService.getJobList(this.id, this.rowid, this.pageid).subscribe(Data => {
          this.rowData = Data;
          console.log(this.rowData, 'Result');
        });
      }
      else {
        this.searchinput();
        this._jobpostingService.vendorSearch(this.searchJobinput, this.pageids, this.rowid).subscribe(res => {
          this.searchJobData = res;
          this.rowData = this.searchJobData;
          console.log(this.rowData, 'result');
        })
      }
    }

    else {
      this.searchjobs = true;
      if (this.searchinput.length == null) {
        this._jobpostingService.getJobList(this.id, this.rowid, this.pageid)
          .pipe(takeUntil(this.subscribe))
          .subscribe(Data => {
            this.rowData = Data;
            console.log(this.rowData, 'Result');
          }, error => {
            console.log(error);
          });

      } else {
        this.searchinput();
        this._jobpostingService.searchAllJobss(this.searchJobinput, this.pageids, this.rowid)
          .pipe(takeUntil(this.subscribe))
          .subscribe(res => {
            this.searchJobData = res;
            this.rowData = this.searchJobData;
            console.log(this.rowData, 'result');
          });
      }
    }
  }
  // Get avalable vendor names
  getAllVendorNames() {
    if (this.manageVendors === true) {
      this._jobpostingService.getAllVendors(sessionStorage.getItem('tenantId')).takeUntil(this.destroy$).subscribe(res => {
        console.log(res, 'response for all vedors');
        this.dropdownListVendors = res;
        this.dropdownListVendors.forEach(element => {
          console.log(element.vendorId);
        });
      }, error => {
        console.log(error);
      })
    }

  }
  // On check uncheck publish job
  onPublishChange(event) {
    console.log(event, 'event')
  }

  // on change of vendor name
  onVendorNameChange(vendorId: string) {
    console.log(vendorId, 'vendorId')
    this.selectedVendorId = vendorId;
  }

  generatePDF() {
    const doc = new jsPDF('p', 'mm', [1500, 1500]);
    doc.autoTable({ html: '#reportAdmin-table' });
    doc.save('report.pdf');

  }
  /*export to excel */

  uri = 'data:application/vnd.ms-excel;base64,';
  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'

  base64(s: any) {
    return window.btoa(s);
  }
  format(s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    })
  }
  tableToExcel(temp, worksheetName) {
    var table = temp,
      ctx = { worksheet: worksheetName, table: table },
      href = this.uri + this.base64(this.format(this.template, ctx));
    return href;
  };
  public exportexcel(selectedformat: any) {

    this.myText = 'All Jobs Details';
    var template = '<table>', thead = '', tbody = '', caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApi.getDataAsCsv().split('\n')[0].split(',');
    var aa = this.GridApi.getDataAsCsv().split('\n').slice(1);
    var header = array.map(function (name, index) {
      var count = 0;
      aa.map(function (str, ia) {
        str.split(',').map(function (value, i) {
          if (value.length == 2 && (index == i)) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });



    var indexes = header.map(function (value, index) {
      if (!value) { return index; }
    }).filter(function (value) {
      if (value !== undefined) { return value; }
    });

    var body = aa.map(function (str) {
      return str.split(',').map(function (value: any, index) {
        if (indexes.indexOf(index) !== -1) {
          value = false;
        }
        return value;
      })
    }).map(function (arr) {
      return arr.filter(function (name) { return name; })
    });

    header = header.filter(function (value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function (arr) {
      finalRes.push(arr);
    });


    finalRes.map(function (row, index) {
      var tBodyRow = '';
      row.map(function (name, i) {
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
      var exportHref = this.tableToExcel(template + caption + thead + tbody + '</table>', 'AllJobs');
      var a = document.createElement('a');
      a.download = 'AllJobsDetails';
      a.href = exportHref;
      setTimeout(function () {
        a.click();
      }, 100);
    }







    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApi.getDataAsCsv().split('\n')[0].split(',');
      var aa = this.GridApi.getDataAsCsv().split('\n').slice(1);
      var header = array.map(function (name, index) {
        var count = 0;
        aa.map(function (str, ia) {
          str.split(',').map(function (value, i) {
            if (value.length == 2 && (index == i)) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });


      var indexes = header.map(function (value, index) {
        if (!value) { return index; }
      }).filter(function (value) {
        if (value !== undefined) { return value; }
      });

      var body = aa.map(function (str) {
        return str.split(',').map(function (value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        })
      }).map(function (arr) {
        return arr.filter(function (name) { return name; })
      });

      header = header.filter(function (value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function (arr) {
        finalRes.push(arr);
      });



      finalRes.map(function (row, index) {
        var rowData = {};
        row.map(function (name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          }
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function (obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }


      })

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
        addPageContent: function (data) {
          doc.text('All Jobs Details', 150, 10);
        }
      });
      doc.save('AllJobsDetails');
    }

  }


  no() {
    this.closeConfirmModel.nativeElement.click();
  }
  debugger
  getClientNames() {
    debugger
    this._jobpostingService.getClients(sessionStorage.getItem('tenantId'))
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.getClientName = res;
        console.log('getclientname', this.getClientName);
      }, error => {
        console.log(error);
      });

  }
  getClient(clientId) {
    debugger
    this.clientIds = clientId
    this.jobposting.client = clientId;
    this._jobpostingService.getListOfManagers(clientId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.getManagerName = result;
        console.log('managerList', this.getManagerName);

      })
  }
  getManagersList(clientId) {
    this._jobpostingService.getListOfManagers(clientId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.getManagerName = result;
        console.log('managerList', this.getManagerName);
      })
  }
  getManagerId(clientContactsId) {
    this.managerId = clientContactsId;
    this.clientContactId = clientContactsId;
  }
  getClientId(clientId) {
    this.clientIds = clientId;
  }


  downloadExcelReportJobsReport() {
    let date: Date = new Date();
    this.datee = date.getFullYear().toString() + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodExcelReportJobReport(this.tentId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {

          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'JobsReportExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();

        });
    }
    else if (this.userRoles === 'VENDOR') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodExcelReportJobReport(this.tentId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {

          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'vendorJobsExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();

        });
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this.ReportsService.downlaodExcelReportJobReport(this.tentId, this.userId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {

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
    debugger
    let date: Date = new Date();

    this.datee = date.getFullYear().toString()
      + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' + ('0' + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodPdfJobReport(this.tentId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'jobReport.pdf' + ' ' + this.datee + '.pdf';
          document.body.appendChild(a);
          a.click();

        });

    }
    else if (this.userRoles === 'VENDOR') {
      this.tentId = sessionStorage.getItem('tenantId');
      this.ReportsService.downlaodPdfJobReport(this.tentId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          const blob = res;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'vendorJobsReport.pdf' + '' + this.datee + '.pdf';
          document.body.appendChild(a);
          a.click();
        });
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this.ReportsService.downlaodPdfJobReport(this.tentId, this.userId)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          const blob = res;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'jobReportUser.pdf' + '' + this.datee + '.pdf';
          document.body.appendChild(a);
          a.click();
        });
    }
  }
  viewClick(event: any) {
    console.log(event, 'VIEW EVENT');
    console.log(event.data, 'VIEW EVENT DATA')
    this.viewjob = event.data;
    console.log(this.viewjob, 'VIEW JOB DATA')
  }
  referClick(event: any) {
    this.referjob = event.data.hirerequestId;
    console.log(this.referjob, 'refer Job DATA')
    console.log(event.data.status, 'STATUS DATA')
    if (event.data.status === 'Open') {
      this.closeModal();
    }
  }
  referForm() {
    this.referJobForm.reset();
  }
  holdform() {
    this.onHoldModalForm.reset();
  }
  closeform() {
    this.onCloseModalForm.reset();
  }
  rejectform() {
    this.rejectModalForm.reset();
  }
  getLocations() {
    this._jobpostingService.getLocation()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.dropdownLocationn = res;
        console.log(this.dropdownLocationn, 'LOCATION');
      }, error => {
        console.log(error);
      });
  }
  getQualificationList() {
    this._jobpostingService.qualificationlist()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.dropdownQualification = res;
        console.log(this.dropdownQualification, 'Qualification');
      }, error => {
        console.log(error);
      });
  }
  listOfRecruiters() {
    this._jobpostingService.getListOfRecruiters()
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.dropdownListRecruiter = res;
        console.log(this.dropdownListRecruiter, 'recruiters');
      }, error => {
        console.log(error);
      });
  }

  checkValidationSal() {
    if (Number(this.editJobForm.get('maxSalary').value) < Number(this.editJobForm.get('minSalary').value)) {
      this.messageforMaxSalaryFlag = true;
    } else if (Number(this.editJobForm.get('minSalary').value) > Number(this.editJobForm.get('maxSalary').value)) {
      this.messageforMinSalaryFlag = true;
    } else {
      this.messageforMaxSalaryFlag = false;
      this.messageforMinSalaryFlag = false;
    }
  }
  checkValidationExp() {
    if (Number(this.editJobForm.get('maxExp').value) < Number(this.editJobForm.get('minExp').value)) {
      this.messageforMaxExp = true;
    } else if (Number(this.editJobForm.get('minExp').value) > Number(this.editJobForm.get('maxExp').value)) {
      this.messageforMinExp = true;
    } else {
      this.messageforMaxExp = false;
      this.messageforMinExp = false;
    }

  }
  clearValidations() {
    this.assignJobForm.reset();
  }
  // For Unsunscribing the api 
  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
  // Assign Job To Vendors
  AssignedToVendor() {
    this.assignVendorIds = [];
    this.vendorIds.forEach(element => {
      this.assignVendorIds.push(element.vendorId);
    });
    var publishJobObject = {
      'hireRequestIds': this.multipleHireRequestIds,
      'setOfUserIds': this.assignVendorIds,
      'loggedInUserId': sessionStorage.getItem('userId')
    }
    this.spin.show();
    debugger
    this._jobpostingService.publishJobToVendor(publishJobObject).subscribe(res => {
      console.log(res, 'publishToVendor');
      this.publishJobTovendor = res;
      if (this.publishJobTovendor !== null) {
        this.publishJobTovendor.forEach(element => {
          if (element.startsWith("ASSIGNEDSUCCESFULLYTO")) {
            this.spin.hide();
            this.getAllJobList();
            this._notificationsService.showSuccessNotif('Success', 'Job Assigned Successfully');
            this.closeModal();
            $("#myModal").hide();
            setTimeout(() => {
              this.router.navigate(['./manageJobs/all']);
            }, 1500);
          }
          else {
            this.spin.hide();
            this._notificationsService.showWarnNotif('Warning', 'Already Assigned Successfully');
          }
        });
      }
      else {
        this.spin.hide();
        this._notificationsService.showErrorNotif('Failed', 'Failed to Assign job');
      }
    }, error => {
      console.log(error);
    }),
      this.closeModal();
    this.vendorIds = [];
  }

  // Client jobs
  clientJobS() {
    this._jobpostingService.ClientJobs(this.pageid, this.rowid).takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      this.rowData = res;
      this.responsePageCount = this.rowData[0].pageCount;
    }, error => {
      console.log(error);
    })
  }
  // All Jobs
  allJobss() {
    // this.clientJobs = false;
    console.log(this.getalljobs);
    this._jobpostingService.getJobList(this.id, this.pageid, this.rowid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.rowData = res;
        this.responsePageCount = this.rowData[0].pageCount;
        console.log(this.rowData)
      }, error => {
        console.log(error);
      });
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }
  jobEdit(event) {
    console.log(event.data.hirerequestId);
    console.log(event.data.hireRequestStatus);

    this.updateclientid = event.data.clientId;
    console.log(this.updateclientid);
    // for getting view job details
    this._jobpostingService.getJobDetails(event.data.hirerequestId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        this.jobpostingg = res;
        console.log(this.jobpostingg, 'jobdetails');

        console.log(this.jobpostingg.department, 'department');
        console.log(this.jobpostingg.clientName, 'clientName');
        this.editJobForm.patchValue({
          jobCode: this.jobpostingg.jobCode,
          jobTitle: this.jobpostingg.jobTitle,
          jobDesc: this.jobpostingg.jobDescription,
          jobPostEmail: this.jobpostingg.jobContactToEmail,
          jobContactPhone: this.jobpostingg.jobContactPhone,
          noOfOpenings: this.jobpostingg.noOfOpenings,
          minExp: this.jobpostingg.minJobExperience,
          maxExp: this.jobpostingg.maxJobExperience,
          jobPostSkills: this.jobpostingg.skills,
          jobPostPrimarySkill: this.jobpostingg.primarySkill,
          aboutCompany: this.jobpostingg.aboutCompany,
          minSalary: this.jobpostingg.minSalary,
          maxSalary: this.jobpostingg.maxSalary,
          maxNoticePeriod: this.jobpostingg.maxNoticePeriod,
          Location: this.jobpostingg.jobLocation != null ? JSON.parse(this.jobpostingg.jobLocation) : 'Not Available',
          jobPostQualification: this.jobpostingg.jobMinQualification != null ? JSON.parse(this.jobpostingg.jobMinQualification) : 'Not Available',
          jobEmpMode: this.jobpostingg.grade,
          clientName: this.jobpostingg.clientId != null ? this.jobpostingg.clientId : 'Not Available',
          hiringManager: this.jobpostingg.clientContactId != null ? this.jobpostingg.clientContactId : 'Not Available',
          functionalArea: this.jobpostingg.jobFunctionalArea != null ? this.jobpostingg.jobFunctionalArea : 'Not Available',
          department: this.jobpostingg.department != null ? this.jobpostingg.department : 'Not Available',
          jobDesig: this.jobpostingg.designation != null ? this.jobpostingg.designation : 'Not Available',
          jobCurrency: this.jobpostingg.currency != null ? this.jobpostingg.currency : 'Not Available',

        })

      }, error => {
        console.log(error);
      });
  }
  update() {
    console.log();
    debugger
    console.log(this.updateclientid);
    console.log(this.jobpostingg.hirerequestId);
    console.log(this.editJobForm.value.clientName);

    if (this.updateclientid !== this.editJobForm.value.clientName) {
      console.log('there is change in the data');
      this.jobpostingg.client = this.editJobForm.value.clientName;
    }
    else {
      console.log('there is no change in the data');
      this.jobpostingg.client = this.updateclientid;
    }

    this.updateJobObject = {

      'hirerequestId': this.jobpostingg.hirerequestId,

      'jobTitle': this.editJobForm.get('jobTitle').value,
      'jobDescription': this.editJobForm.get('jobDesc').value,
      'primarySkill': this.editJobForm.get('jobPostPrimarySkill').value,
      'jobContactToEmail': this.editJobForm.get('jobPostEmail').value,
      'jobContactPhone': this.editJobForm.get('jobContactPhone').value,
      'jobLocation': JSON.stringify(this.editJobForm.get('Location').value),
      'noOfOpenings': this.editJobForm.get('noOfOpenings').value,
      'grade': this.editJobForm.get('jobEmpMode').value,
      'minJobExperience': this.editJobForm.get('minExp').value,
      'maxJobExperience': this.editJobForm.get('maxExp').value,
      'jobMinQualification': JSON.stringify(this.editJobForm.get('jobPostQualification').value),
      'skills': this.editJobForm.get('jobPostSkills').value,
      'hiringManager': {
        'clientContactsId': this.clientContactId,
      },
      'client': {
        'clientId': this.jobpostingg.client
      },
      'aboutCompany': this.editJobForm.get('aboutCompany').value,
      'jobFunctionalArea': this.editJobForm.get('functionalArea').value,
      'department': this.editJobForm.get('department').value,
      'designation': this.editJobForm.get('jobDesig').value,
      'currency': this.editJobForm.get('jobCurrency').value,
      'maxNoticePeriod': this.editJobForm.get('maxNoticePeriod').value,
      'minSalary': this.editJobForm.get('minSalary').value,
      'maxSalary': this.editJobForm.get('maxSalary').value,

    }

    console.log(this.updateJobObject);
    this._jobpostingService.updateJobList(this.updateJobObject)
      .pipe(takeUntil(this.subscribe))
      .subscribe(e => {
        this._notificationsService.showSuccessNotif('Success', 'Job updated successfully');
        AppComponent.getNotification('Job updated successfully.', 'JobUpdated Successfully', 'Success "', new Date());
        this.closeModal();
        this._jobpostingService.getJobList(this.id, this.pageid, this.rowid).subscribe(Data => {
          this.spin.hide();
          this.jobList = Data;
          this.rowData = Data;
        });
        this.firstform = false;
        this.display = true;

      },

        error => {
          this.spin.hide();

          this._notificationsService.showErrorNotif('Failed', 'Failed to update job');
          AppComponent.getNotification('Failed to update job.', 'JobUpdated Failed', 'Failed "', new Date());
          this.closeModal();
        })
    this.getAllJobList();
  }
}
