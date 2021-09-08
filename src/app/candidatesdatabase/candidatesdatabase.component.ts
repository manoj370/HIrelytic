import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NewServiceService } from '../services/new-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpUrls } from '../shared/HttpUrls';
import { getMaxListeners } from 'cluster';
import { NotificationMessageService } from '../services/notification.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-candidatesdatabase',
  templateUrl: './candidatesdatabase.component.html',
  styleUrls: ['./candidatesdatabase.component.css']
})
export class CandidatesdatabaseComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('closemodal') closemodal: ElementRef;
  GridApi: any;
  headerValue: any;
  employeesData: any = [];
  searchForm: FormGroup;
  disableNextButton = false;
  disablePreviousButton = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  candidateName = '<candidateName>';
  columnDefs = [
    {
      headerName: 'Name', field: 'Name', width: 120, rowSelection: 'multiple', minWidth: 70, unSortIcon: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    { headerName: 'Email', field: 'email_id', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Phone', field: 'phone_number', width: 80, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    {
      headerName: 'Experience', field: 'experience',
      width: 70, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    { headerName: 'Skills', field: 'skill', width: 80, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Location', field: 'current_location', width: 80, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    {
      headerName: 'Action', width: 60, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fa fa-eye viewIcon"  title="View"  data-toggle="modal"  data-target="#viewModal" ></span>';
      }
    },
  ];

  rolesList: any = [];
  type: any;
  fromdate: string;
  todate: string;
  selectedValue: string;
  searchvalue: any;
  public pageid: any = 0;
  public searchpageid: any = 0;
  public rowid: any = 15;
  databasedetails: any = [];
  downloadurl: string;
  resumeurl: any;
  name: any;
  emailid: any;
  phonenumber: any;
  experience: any;
  skills: any;
  currentlocation: any;
  resumepath: any;
  filename: any;
  emailTemplateForm: FormGroup;
  // tslint:disable-next-line: no-inferrable-types
  existemail: boolean = true;
  multipleEmailIds: any = [];
  // tslint:disable-next-line: no-inferrable-types
  sendEmailButton: boolean = true;
  checkboxvalue: any;
  templatedata: any = [];
  mailtemplateid: any;
  mailTemplateId: any;
  action: string;
  mailSubject: any;
  mailFrom: any;
  mailBody: any;
  templateName: any;
  toAddressMailIds: any = [];
  testdata: {};
  customizedMailbody: string;
  test: { mailbody: string; existingMail: string; templateName: string; sender: string; subject: string; yes: boolean; no: string; };
  mailbody: string;
  subject: string;
  customizedMailTemplateId: any;

  constructor(private newService: NewServiceService, private fb: FormBuilder,
    private _notificationsService: NotificationMessageService) { }
  ngOnInit() {
    this.getRolesList();
    this.defaultCandidatedatabase();
    this.searchForm = new FormGroup({
      searchinput: new FormControl('', Validators.required)
    });
    this.emailTemplateForm = this.fb.group({
      mailbody: new FormControl('', Validators.compose([Validators.required,
      Validators.minLength(25)])),
      existingMail: new FormControl(null),
      // templateName: new FormControl(''),
      templateName: new FormControl(''),
      sender: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      subject: new FormControl(''),
      yes: new FormControl(''),
      no: new FormControl(''),
    });
  }
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }
  // GET ROLES LIST
  getRolesList() {
    this.newService.getRolesList().subscribe(res => {
      console.log(res);
      this.rolesList = res;
    }, error => {
      console.log(error);
    });
  }
  defaultCandidatedatabase() {
    const userRoles = sessionStorage.getItem('userRoles');
    console.log(userRoles);
    if (userRoles === 'ADMIN') {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = '1 Year';
      this.searchvalue = '';
      this.type = '';
      this.candidatesDatabaseBasedOnSearch();
    }
  }
  public datePicker(event) {
    const roleName = sessionStorage.getItem('userRoles');
    console.log(event);
    if (event.startDate !== undefined) {
      const startDate = event.startDate._d;
      const endDate = event.endDate._d;
      this.fromdate = startDate.getFullYear().toString() + '-' + ('0' + (startDate.getMonth() + 1))
        .slice(-2) + '-' + ('0' + startDate.getDate().toString()).slice(-2);
      this.todate = endDate.getFullYear().toString() + '-' + ('0' + (endDate.getMonth() + 1))
        .slice(-2) + '-' + ('0' + endDate.getDate().toString()).slice(-2);
      this.selectedValue = 'notSelected';
      console.log(this.todate);
      console.log(this.fromdate);
      console.log(this.selectedValue);
      if (roleName === 'ADMIN') {
        this.candidateDatabaseOnAllTypes();
      } else {

      }
    }
  }
  dateOption(event) {
    console.log(event);
    const roleName = sessionStorage.getItem('userRoles');
    console.log(roleName);
    if ((event === '1 Month') || (event === '3 Months') || (event === '6 Months')) {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      if (roleName === 'ADMIN') {
        this.candidateDatabaseOnAllTypes();
      }
    } else if (event === 'Date Range') {
      console.log(event);
      this.datePicker(event);
    } else {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      this.type = '';
      this.searchvalue = '';
      this.candidatesDatabaseBasedOnSearch();
    }
  }
  // changeevent for roletype
  RoleType(event) {
    this.type = event;
    console.log(this.type);
    if (this.type === 'ALL') {
      this.type = '';
      this.candidatesDatabaseBasedOnSearch();
    } else {
      this.candidateDatabaseOnAllTypes();
    }

  }
  // Search
  searchinput() {
    this.searchvalue = this.searchForm.get('searchinput').value;
    console.log(this.searchvalue);
    this.candidateDatabaseOnAllTypes();
  }
  candidateDatabaseOnAllTypes() {
    console.log(this.type);
    console.log(this.searchvalue);
    if ((this.type !== '') && (this.searchvalue !== '')) {
      // this.candidatesDatabaseBasedOnSearch();
      this.candidatesDatabaseSearch();
    } else if ((this.type === '') && (this.searchvalue === '')) {
      this.candidatesDatabaseBasedOnSearch();
    } else if ((this.type !== '') && (this.searchvalue === '')) {
      this.candidatesDatabaseBasedOnSearch();
    } else if ((this.type === '') && (this.searchvalue !== '')) {
      // this.candidatesDatabaseBasedOnSearch();
      this.candidatesDatabaseSearch();
    }
  }
  // CANDIDATES DATABASE
  candidatesDatabaseBasedOnSearch() {
    console.log(this.type);
    console.log(this.searchvalue);
    console.log(this.selectedValue);
    console.log(this.type, this.pageid, this.rowid,
      this.fromdate, this.todate, this.selectedValue, this.searchvalue);
    this.newService.CandidatesDatabase(this.type, this.pageid, this.rowid,
      this.fromdate, this.todate, this.selectedValue, this.searchvalue).subscribe(res => {
        console.log(res);
        this.databasedetails = res;
        this.responsePageCount = this.databasedetails[0].PageCount;
        console.log(this.responsePageCount);
      }, error => {
        console.log(error);
      });
  }
  candidatesDatabaseSearch() {
    console.log(this.type);
    console.log(this.searchvalue);
    console.log(this.selectedValue);
    console.log(this.type, this.searchpageid, this.rowid,
      this.selectedValue, this.searchvalue);
    this.newService.CandidatesDatabaseSearch(this.type, this.searchpageid, this.rowid, this.searchvalue).subscribe(res => {
      console.log(res);
      this.databasedetails = res;
      this.responsePageCount = this.databasedetails[0].PageCount;
      console.log(this.responsePageCount);
    }, error => {
      console.log(error);
    });
  }
  // For Pagiantions
  onBtNext() {
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
    this.databasedetails = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    // this.pageid = this.pageid + 1;
    // this.candidateDatabaseOnAllTypes();
    if (this.searchvalue) {
      this.searchpageid = this.searchpageid + 1;
      this.candidatesDatabaseSearch();
    } else {
      this.pageid = this.pageid + 1;
      this.candidateDatabaseOnAllTypes();
    }

  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.databasedetails = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    // this.pageid = this.pageid - 1;
    // this.candidateDatabaseOnAllTypes();
    if (this.searchvalue) {
      this.searchpageid = this.searchpageid - 1;
      this.candidatesDatabaseSearch();
    } else {
      this.pageid = this.pageid - 1;
      this.candidateDatabaseOnAllTypes();
    }
  }
  // download resume
  onRowClicked(event) {
    console.log(event);
    this.name = event.data.Name;
    this.emailid = event.data.email_id;
    this.phonenumber = event.data.phone_number;
    this.experience = event.data.experience;
    this.skills = event.data.skill;
    this.currentlocation = event.data.current_location;
    this.resumepath = event.data.resume_path;
    this.filename = event.data.file_name;
  }

  resumedownload() {
    console.log(this.resumepath);
    console.log(this.filename);
    this.resumeurl = HttpUrls.DOWNLOAD_RESUME + '?path=' + this.resumepath + '/' + this.filename;
    console.log(this.resumeurl);
  }
  newEmail() {
    console.log('new Email');
    this.existemail = false;
    this.reset();
  }
  existingMail() {
    console.log('existing mail');
    this.existemail = true;
    this.reset();

  }
  reset() {
    console.log('reset');
    this.emailTemplateForm.reset();
  }
  onSelectionChanged(event) {
    const selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      this.sendEmailButton = false;
    } else {
      this.sendEmailButton = true;
    }
    for (let index = 0; index < selectedRows.length; index++) {
      const element = selectedRows[index].email_id;
      console.log(element);
      this.multipleEmailIds.push(element);
      console.log(this.multipleEmailIds);
    }
  }
  checkboxfunction(value) {
    // tslint:disable-next-line: no-debugger
    if (this.existemail === false) {
      if (value === 'yes') {
        this.checkboxvalue = 'CREATE';
        console.log(this.checkboxvalue);
      } else {
        this.checkboxvalue = 'NEGLECT';
        console.log(this.checkboxvalue);
      }
    } else {
      debugger
      if (((value === 'yes') && (this.mailbody !== this.emailTemplateForm.get('mailbody').value)) ||
        ((value === 'yes') && (this.subject !== this.emailTemplateForm.get('subject').value))) {
        console.log('there is change in data');
        this.checkboxvalue = 'UPDATE';
        console.log(this.checkboxvalue);
      } else {
        console.log('there is no change in data');
        this.checkboxvalue = 'NEGLECT';
        console.log(this.checkboxvalue);
      }
    }
  }
  getTemplateData() {
    this.newService.getTemplateNames().subscribe(res => {
      console.log(res);
      this.templatedata = res;
      this.templatedata.forEach(element => {
        this.mailbody = atob(element.customizedMailBody);
        this.subject = atob(element.mailSubject);
        console.log(this.subject);
      });
    }, error => {
      console.log(error);
    });
  }
  getTemplateId(name: any) {
    console.log(name);
    this.templatedata.forEach(element => {
      if (element.templateName === name) {
        console.log(element.templateName);
        console.log(element.customizedMailTemplateId);
        console.log(element.mailFrom);
        console.log(atob(element.customizedMailBody));
        this.customizedMailbody = atob(element.customizedMailBody);
        console.log(this.customizedMailbody);
        this.customizedMailTemplateId = element.customizedMailTemplateId;
        this.emailTemplateForm.patchValue({
          'sender': element.mailFrom,
          'subject': atob(element.mailSubject),
          'mailbody': this.customizedMailbody,
        });

      }
    });
  }

  sendMailTempalte() {
    const mailtemplateobj = {
      'customizedMailTemplateId': this.customizedMailTemplateId ? this.customizedMailTemplateId : null,
      'mailSubject': btoa(this.emailTemplateForm.get('subject').value),
      'mailFrom': this.emailTemplateForm.get('sender').value,
      'customizedMailBody': btoa(this.emailTemplateForm.get('mailbody').value),
      'templateName': this.emailTemplateForm.get('templateName').value ? this.emailTemplateForm.get('templateName').value : null,
      'toAddressMailIds': this.multipleEmailIds
    };
    console.log(mailtemplateobj);
    console.log(this.checkboxvalue);
    this.newService.postMailTemplate(this.checkboxvalue, mailtemplateobj).subscribe(res => {
      console.log(res);
      this._notificationsService.showSuccessNotif('Success', ' Mail Template Created Successfully');
      this.closemodal.nativeElement.click();
      this.emailTemplateForm.reset();
    }, error => {
      this._notificationsService.showErrorNotif('Failed', ' Mail Template Created Failed');
      console.log(error);
      this.closemodal.nativeElement.click();
      this.emailTemplateForm.reset();
    });
  }
}
