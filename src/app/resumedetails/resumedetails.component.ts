import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, ActivatedRoute } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { JobPostingService } from '../services/jobposting.service';
import { UserService } from '../services/user.service';
import { JobPosting, skills } from '../models/jobposting';
import { Tenant } from '../models/tenant';
import { Candidate } from '../models/candidate';
import { TenantFormList } from '../models/tenantform';
import { resume } from '../models/resume';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; //This is for Model driven form form
import { NotificationsService } from "angular2-notifications";
import { NotificationMessageService } from '../../app/services/notification.service';
import { IfStmt } from '@angular/compiler';
import { ToastrManager } from 'ng6-toastr-notifications';
const URL = 'http://localhost:3000/api/upload';
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
declare var jquery: any;
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-resumedetails',
  templateUrl: './resumedetails.component.html',
  styleUrls: ['./resumedetails.component.css']
})
export class ResumedetailsComponent implements OnInit {
  @ViewChild('closeConfirmModelPan') closeConfirmModelPan: ElementRef;
  gender = "male";
  tenantformdata: any = {};
  sample: any = {};
  candidate: any = {}
  selectedFiles: any;
  public location: string;
  request: TenantData = new TenantData();
  requestwo: TenantData = new TenantData();
  hire: HireRequest = new HireRequest();
  userRequest: UserData = new UserData();
  model: any = {};
  resume: resume = new resume();
  error: boolean;
  formatedresume: any;
  errorMsg = '';
  public loc: string;
  display: boolean;
  firstform: boolean;
  jobPostingList: any = [];
  job: any = [];
  options = "upload";
  candidatesData: any = {};
  candidateData: any = {};
  uploadResumeForm: any;
  public candidateObj: Candidate;

  referralIdd: any;
  referralDetails: any;
  refereeeId: any;
  referralCandidate: boolean
  errorMsgOnMOdal: string;
  emailId: any;
  hireRequestId: any;
  token: string;
  tenantId: any;
  candidateId: any;
  res: any;

  constructor(private _userService: UserService, private _jobpostingService: JobPostingService, private _notificationsService: NotificationsService, private jobservice: JobPostingService, private route: ActivatedRoute, private router: Router, private userService: UserService, private spin: NgxSpinnerService, private notification: NotificationMessageService, public toastr: ToastrManager, ) {

    this.candidateObj = new Candidate();



  }
  //public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  ngOnInit() {


    // this.candidateObj.educationalQualification = '';
    // console.log(window.location.href, 'Referral URL');
    // this.route.queryParams.subscribe(params => {
    //   console.log(params, 'PARAMS')
    //   this.referralIdd = params['referralHistoryId']
    //   this.refereeeId = params['refereeId']
    //   console.log('REFERALIDD', this.referralIdd)
      debugger
      // this._userService.getReferralMailId(this.referralIdd).subscribe(res => {
      //  console.log(res,'REFERRAL RESPONSE');
      //  sessionStorage.setItem('ReferralStatus', res._body);
      //  if(res._body==="YOU ARE APPLIED FOR THIS JOB")
      //  {

      //   console.log("YOU ARE APPLIED FOR THIS JOB")
      //   this.router.navigate(['/appliedjob']);
      //   this.notification.showWarnNotif('Warning','Already Applied for this job')
      //  }else if(res._body==="OPEN"){
      //   console.log("OPEN")
      //  }
      //  else if(res._body==="THE JOB HAS BEEN CLOSED"){
      //   console.log("THE JOB HAS BEEN CLOSED")
      //   this.router.navigate(['/closedjob']);
      //   this.notification.showWarnNotif('Warning','The job has been closed')
      //  }

      // });


    // });



    this.uploadResumeForm = new FormGroup({

      candidateName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      candidatePhone: new FormControl("", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      candidateEmail: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)])),
      candidateLastName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      currentCompany: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,+@._\s#&()-/]*$/)])),
      prevCompany: new FormControl("", Validators.pattern(/^[a-zA-Z ]*$/)),
      currentLocation: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      prefLocation: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      designation: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      currentCtc: new FormControl("", Validators.required),
      expectedCtc: new FormControl("", Validators.required),
      noticePeriod: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      qualification: new FormControl("", Validators.required),
      panNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)])),
      uploadResume: new FormControl("", Validators.required)
    });
    this.display = true;
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.emailId = atob(params['emailId']);
      this.hireRequestId=atob( params['job']);
      this.tenantId=atob( params['oid']);
      this.token = atob( params['tkn']);
     // this.token = "786d30c5-0a1f-42ba-ab03-1cace511b274";
      this.refereeeId = atob( params['user']);
      console.log(this.hireRequestId);
      console.log(this.emailId );
      console.log(this.token );
      console.log(this.refereeeId );
      sessionStorage.setItem('access-token',this.token);
      // this.request.tenantId = params['tenantId'];
      // //this.requestwo.tenantId = "00dd0ebd9dc0463c9d0ebd9dc0b63c8d";
      // this.hire.hirerequestId = params['jobRequestId']
      // //this.candidateUserId.userId = params['refereeId']
      // this.model.refereeId = params['refereeId']
      // this.candidateObj.user.emailId = params['email']
      // this.candidateObj.user.firstName = params['candidateName']

    });

    // this.jobservice.getJobDetails(this.hire.hirerequestId).subscribe(e=>{
    //   this.jobPostingList=e;
    //   this.job=e;
    //   console.log(' this.job', this.job)
    //  // this.loc= this.job.jobLocation;
    //   // var locationArray=[];
    //   // locationArray=JSON.parse(this.job.jobLocation);
    //   e["keyLoc"]=JSON.parse(this.job.jobLocation);
    //   return;
    //  // this.location=JSON.parse(this.loc);

    //   //console.log("Location:   "+JSON.stringify(this.location))
    // })


  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    //console.log(this.selectedFiles)
  }
  jobdesc() {
    $('#myModal').modal({ backdrop: "static" }, 'show');
    $("#modal_Title").html(this.job.jobTitle);
    $("#confirmBox").hide();
    $("#viewJobDescription").show();
  }
  upload() {
    const candidateObj =
    {
      'currentCTC': this.uploadResumeForm.get('currentCtc').value,
      "currentCompany": this.uploadResumeForm.get('currentCompany').value,
      "currentLocation": this.uploadResumeForm.get('currentLocation').value,
      "educationalQualification": this.uploadResumeForm.get('qualification').value,
      "expectedCTC": this.uploadResumeForm.get('expectedCtc').value,
      "experience": "null",
      "hireRequestId": this.hireRequestId,
      "noticePeriod": this.uploadResumeForm.get('noticePeriod').value,
      "preferredLocation": this.uploadResumeForm.get('prefLocation').value,
      "previousCompany": this.uploadResumeForm.get('prevCompany').value,
      "skill": "null",
      "source": "null",
      "sourceType": "null",
      "specialization": "null",
      "user": {
        "emailId": this.emailId ,
        "firstName": this.uploadResumeForm.get('candidateName').value,
        "lastName": this.uploadResumeForm.get('candidateLastName').value,
        "panNumber": this.uploadResumeForm.get('panNumber').value,
        "phoneNumber": this.uploadResumeForm.get('candidatePhone').value
      }
    }
    this._userService.verifyCandidate(this.candidateObj).subscribe(res => {
      this.spin.hide();
      console.log('verifyCandiadteString',JSON.parse(res));
      this.res=JSON.parse(res);
      this.candidateId=  this.res.candidateId;
      console.log('candidateId', this.candidateId);

      if (res) {
        this.userRequest.candidateId = res.candidateId;
        if (res.exists === true) {
          this.spin.hide();
        }
        else {
          // this.resume.resumeId = "";
          // this.resume.candidate = this.userRequest;
          // this.resume.resumePath = "";
          // this.resume.organization = this.tenantId;
          // this.resume.createdBy = this.refereeeId;
          this.candidate.file = this.selectedFiles.item(0);
          //  if(this.selectedFormatedFile == null || this.selectFormatedFile == undefined)
          //  {
          //    this.formatedresume = ' ';
          //  }else{
          //    this.formatedresume = this.selectedFormatedFile.item(0);
          //  }

          // this.model.referralId = this.refereeeId;
          // this.model.referralFee = "";
          // this.model.resume = this.resume;
          // this.model.tenant =  this.tenantId;
          // this.model.hireRequest = this.hireRequestId;

          //this.model.hireRequest = this.hirereqId;
          //console.log(this.model);
          //console.log(this.candidate.file);

          //  if (this.candidate.file> 0) {
          // this.uploaded=true;

         this.model ={
            refereeId:this.refereeeId,
            resume:{
                      candidate:{
                                candidateId:this.candidateId
                                },
                    organization:{
                      tenantId: this.tenantId
                    }
            },
            organization:{
              tenantId: this.tenantId
            },
            hireRequest:{
              hirerequestId: this.hireRequestId
            }
          }
          
          

          this._jobpostingService.resumeupload(this.formatedresume, this.candidate.file,   this.model).subscribe(e => {
            debugger
            console.log(sessionStorage.getItem(res.candidateId));
            let canId = sessionStorage.getItem(res.candidateId);

            this.spin.hide();

            this.notification.showSuccessNotif('Success', 'Candidate resume uploaded successfully.');

            this.uploadResumeForm.reset();
            this.router.navigate(['/home']);
          },
          );




          // }
        }
      }
    },
      error => {
        alert(error);
        console.log('error=>>>>>>', error._body)

        this.errorMsgOnMOdal = error._body;
        this.toastr.warningToastr('Candidate Details does not Match', 'Warning!', { animate: 'slideFromTop', newestOnTop: true });
        this.spin.hide();
        // sessionStorage.clear();
        // this.uploadCompleted = true;
        // this.confirmBoxUploadPan.nativeElement.click();
        this.closeConfirmModelPan.nativeElement.click();

        // this.uploadResumeForm.reset();
      },
    );
  }
  keyPress(event: any) {

    const pattern = /^[0-9.]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  yes() {
    this.resume.resumeId = "";
    this.resume.user = this.userRequest.candidateId;
    this.resume.resumePath = "";
    // this.resume.resumeData = "";
    this.resume.organization = this.request;
    this.resume.createdBy = sessionStorage.getItem('userId');
    //console.log(this.resume);
    this.candidate.file = this.selectedFiles.item(0);
    this.model.referralId = "";
    this.model.referralFee = "";
    this.model.resume = this.resume;
    this.model.tenant = this.request;
    this.model.hireRequest = this.hire;
    //console.log(this.model);
    //console.log(this.candidate.file);
    this.spin.show();
    // this.jobservice.updateresume(this.candidate.file, this.model).subscribe(e => {
    //   //console.log(e)
    //   if(e)
    //     {
    //       this.spin.hide();
    //       swal('Resume Updated...', 'Successfully', 'success')
    //        //$('#myModal').hide();
    //        this.display = false;
    //       this.firstform = true;
    //        $('#myModal').modal('hide');
    //     }
    // });
  }
  no() {
    window.location.reload(true);
  }


}
