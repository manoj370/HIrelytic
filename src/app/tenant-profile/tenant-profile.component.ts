import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationMessageService } from '../../app/services/notification.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UserService } from '../services/user.service';
// import { SidebarComponent } from '../../app/shared/sidebar/sidebar.component';
import { NewServiceService } from '../services/new-service.service';
import { HttpUrls } from '../../../src/app/shared/HttpUrls';
@Component({
  selector: 'app-tenant-profile',
  templateUrl: './tenant-profile.component.html',
  styleUrls: ['./tenant-profile.component.css']
})
export class TenantProfileComponent implements OnInit {
  selectedFiles: any;
  uploader: FileUploader;
  tenantProfileForm: any;
  profilePic: any;
  tenantprofilePic: any;
  configForm: FormGroup;
  userProfileForm: any;
  userProfilePicForm: any;
  selectedFile: File;
  userprofileDetails: any;
  filePath: any;
  filepathFlag: Boolean;
  tenanatFailPath: any;
  // clientCreationForm:FormGroup;
  // public clientcreationObj: clientCreationModel;
  @ViewChild('fileUploder') fileUploder: ElementRef;
  userName: string;
  countryList: any = [];
  stateList: any = [];
  UserFailPath: any;
  userProfilePicPath: string;
  countries = [
    { code: 'US', name: 'United States of America' },
    { code: 'IN', name: 'India' },
  ];
  countryCode = '+91';
  tenantLogoPath: any;
  profileTenantLogo: any;
  profile: any;
  username: any;
  profiledetails: any;
  privileges: any;
  authority: any;
  organisation: boolean;
  url: any;
  path: void;
  urlogo: string;
  urllogo: string;
  userDetails: any;
  countryId: any;
  show: boolean;
  showlogo: boolean;
  showuser: boolean;
  urlluser: string;
  tenantprofilePicuser: any
  test: any;
  updatebutton: boolean = true;
  profileadministration: boolean;
  usertest: any;
  resumeSettingForm: FormGroup;
  isresumevalid: number;
  resumeSettingResponse: any;
  isresumeemail: number;
  isresumepanNumber: number;
  isresumePhone: number;


  constructor(private _UserService: UserService,
    private _TenantService: TenantService, private _notificationsService: NotificationMessageService,
    public toastr: ToastrManager,
    private spin: NgxSpinnerService, private fb: FormBuilder,
    //  private global: GlobalValues,
     private newService: NewServiceService) {
    this.userProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      phoneNo: new FormControl('', Validators.compose([Validators.required, , Validators.maxLength(10), Validators.minLength(10)])),
      address1: new FormControl('', Validators.compose([Validators.required])),
      address2: new FormControl(''),
      state: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      ZipCode: new FormControl('', Validators.compose([Validators.required,
      Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])),
      country: new FormControl('', Validators.compose([Validators.required])),
      emailId: new FormControl('', Validators.compose([Validators.required])),
    });

    this.tenantProfileForm = new FormGroup({
      organisationName: new FormControl('', Validators.required),
      tenantUrl: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      // companyCode: new FormControl('', Validators.compose([Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      companyCode: new FormControl('', Validators.compose([Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      tenantGst: new FormControl('', Validators.required),
      tenantPhone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      address1: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      address2: new FormControl('', Validators.compose([Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      ZipCode: new FormControl('',
        Validators.compose([Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])),
      aboutCompany: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50)])),
    });
    this.resumeSettingForm = this.fb.group({
      email: [''],
      Phone: [''],
      pannumber: [''],
      resumeperiod: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      active: [''],
      Inactive: ['']
    });
  }
  public tenantId: any;
  tenantProfileDetails: any = [];
  public userRole: any;
  public userId: any;

  ngOnInit() {
    this.checkPrivileges();
    this.getUser();
    this.getIndividualUser();
    this.getTenantProfilePic();
    this.getProfilePicForUser();
    this.getLogo();
    this.userRole = sessionStorage.getItem('userRoles');
    this.userName = sessionStorage.getItem('userName');
    this.tenantId = sessionStorage.getItem('tenantId');
    this.userId = sessionStorage.getItem('userId');
    // this.getTenantProfileDetails();
    this.getConfigDetails();
    // this.getUserprofileDetails();
    this.getAllCountries();
    // this.showProfilePic();
    debugger
    // this._UserService.getAllCountries().subscribe(res => {
    //   console.log(res, 'countrieslist');
    //   res.forEach(element => {
    //     // console.log(element.countryId);
    //     if (this.userRole === 'ADMIN') {
    //       this.onCountryChange(this.tenantProfileDetails.organization.organizationAddress.country);
    //     } else {
    //       this.onCountryChange(this.userDetails.address.country);
    //     }
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // to get config details
  public getConfigDetails(): void {

    // this._TenantService.getConfig(this.tenantId).subscribe(data => {
    //   console.log('getConfigDetails', data)
    this.configForm = new FormGroup({
      // jobCodePrefix: new FormControl(data.codePreFix, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z_\-]+$/)])),
      // jobCodelength: new FormControl(data.lenth, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      // onlineQsn: new FormControl(data.onlineExamQuestionCount, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      // passingPercentage: new FormControl(data.onlineExamQualifyPer, Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      // isOnlineExam: new FormControl(data.onlineExam, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]))
      jobCodePrefix: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z_\-]+$/)])),
      jobCodelength: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      onlineQsn: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      passingPercentage: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
    });
    // });

  }
  // To update config details
  public updateConfigDetails(data: any): void {
    const configArray = {
      'tenantId': this.tenantId,
      'codePreFix': data.jobCodePrefix,
      'lenth': data.jobCodelength,
      'onlineExamQuestionCount': data.onlineQsn,
      'onlineExamQualifyPer': data.passingPercentage,
      'isOnlineExam': data.isOnlineExam,
    }
    // this._TenantService.updateConfig(configArray).subscribe(data => {
    //   this.getConfigDetails();
    //   this.spin.hide();

    //   this._notificationsService.showSuccessNotif(  'Success', 'Configuration Details updated successfully' );
    //   AppComponent.getNotification('Configuration Details updated successfully', 'Configuration Details Successful', 'Success '', new Date());

    // },

    // error => {
    //   this.spin.hide();
    //   this._notificationsService.showErrorNotif( 'Failed',  'Failed to update configuration details'  );
    //   AppComponent.getNotification('Failed to update configuration details', 'Failed to update configuration details', 'Failed '', new Date());
    // })

  }

  // To get user profile details
  public getUserprofileDetails(): void {
    // this._TenantService.getUserProfile(this.userId).subscribe(data => {
    //   console.log('userprofileDetails   :' + data)

    //   this.userprofileDetails = data.json()
    // if(data){

    // this.onCountryChange( this.userprofileDetails.country);

    // }
    console.log('getUserprofileDetails', this.userprofileDetails)


    // });
  }


  onFileChanged(event) {
    this.showuser = !this.showuser
    console.log('event file:' + event);
    this.filePath = event.target.files;
    if (this.filePath.length === 0) {

      return;
    }
    var mimeType = this.filePath[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   //this.message = 'Only images are supported.';
    //   return;
    // }
    console.log(mimeType);
    debugger
    if ((mimeType === "image/jpeg") || (mimeType === "image/jpg") || (mimeType === "image/png")) {
      var reader = new FileReader();
      //this.imagePath = this.filePath;
      reader.readAsDataURL(this.filePath[0]);
      reader.onload = (_event) => {
        this.tenantprofilePicuser = reader.result;
      }
    }
    else {
      this.getProfilePicForUser();
      this._notificationsService.showWarnNotif('Allows', 'Only jpeg,jpg,png format images');

    }


  }

  onTenantFileChanged(event) {
    this.show = !this.show
    console.log('event file:' + event.target.files);
    this.tenanatFailPath = event.target.files;
    if (this.tenanatFailPath.length === 0)
      return;

    var mimeType = this.tenanatFailPath[0].type;
    console.log(mimeType);
    debugger
    if ((mimeType === "image/jpeg") || (mimeType === "image/jpg") || (mimeType === "image/png")) {
      var reader = new FileReader();
      reader.readAsDataURL(this.tenanatFailPath[0]);
      reader.onload = (_event) => {
        this.tenantprofilePic = reader.result;
      }
    }
    else {
      this.getTenantProfilePic();
      this._notificationsService.showWarnNotif('Allows', 'Only jpeg,jpg,png format images');

    }
    // if (mimeType.match(/image\/*/) == null) {
    //   //this.message = 'Only images are supported.';
    //   return;
    // }


  }
  onTenantLogoFileChanged(event) {
    this.showlogo = !this.showlogo
    console.log('event file:' + event);
    this.tenantLogoPath = event.target.files;
    if (this.tenantLogoPath.length === 0)
      return;

    var mimeType = this.tenantLogoPath[0].type;

    if ((mimeType === "image/jpeg") || (mimeType === "image/jpg") || (mimeType === "image/png")) {
      var reader = new FileReader();
      //this.imagePath = this.filePath;
      reader.readAsDataURL(this.tenantLogoPath[0]);
      reader.onload = (_event) => {
        this.profileTenantLogo = reader.result;
      }
    }
    else {
      this.getLogo();
      this._notificationsService.showWarnNotif('Allows', 'Only jpeg,jpg,png format images');

    }

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    // var reader = new FileReader();
    // //this.imagePath = this.filePath;
    // reader.readAsDataURL(this.tenantLogoPath[0]);
    // reader.onload = (_event) => {
    //   this.profileTenantLogo = reader.result;
    // }
  }

  openModal() {
    this.fileUploder.nativeElement.click();
  }
  /* method to update tenant pic*/
  updateTenantProfilePic() {
    if (this.profileadministration === true) {
      var tenantFile = this.tenanatFailPath.item(0);

      this._TenantService.updateTenanatProfilePic(this.tenantId, tenantFile).subscribe(data => {
        console.log(data);
        let imageDetails;
        imageDetails = data
        this.path = imageDetails
        console.log(imageDetails, 'IMAGE DETAILS');
        if (data != null) {
          sessionStorage.setItem('pic_profile', imageDetails);

          this.getTenantProfilePic();
          console.log('TENANT fILE RESULT ' + data);
          this._notificationsService.showSuccessNotif('Success', 'Profile pic updated successfully');


        }
      }, error => {
        console.log(error);
      })
    }
    else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permission To Access');
    }

  }

  updateTenantLogo() {

    if (this.organisation === true) {
      var tenantFile = this.tenantLogoPath.item(0);
      this._TenantService.updateTenantLogo(this.tenantId, tenantFile).subscribe(data => {
        let logoDetails;
        logoDetails = data
        console.log(logoDetails, 'LOGO')
        if (data != null) {
          sessionStorage.setItem('pic_logo', logoDetails);
          this.getLogo();
          console.log('TENANTLOGO ' + data);
          this._notificationsService.showSuccessNotif('Success', 'Logo updated successfully');

        }
      })
    }
    else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permission To Access');

    }

  }
  /*  method to update profile pic*/
  updateUserProfilePic() {

    if (this.profileadministration === true) {
      var filefile = this.filePath.item(0);
      this._TenantService.updateUserProfilePic(this.userId, filefile).subscribe(data => {
        console.log(data);
        let imageDetails;
        imageDetails = data
        this.path = imageDetails
        if (data != null) {
          sessionStorage.setItem('pic_profile_user', imageDetails);
          this.getProfilePicForUser();
          console.log('TENANT fILE RESULT ' + data);
          this._notificationsService.showSuccessNotif('Success', 'User profile pic updated successfully');


        }
      }, error => {
        console.log(error);
      })
    }
    else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permission To Access');
    }


  }

  getTenantProfilePic() {
    this.show = false
    this.tenantprofilePic = sessionStorage.getItem('pic_profile');
    console.log(this.tenantprofilePic, 'profileee');
    this.url = HttpUrls.GET_PROFILE_PIC + '?path=' + this.tenantprofilePic
    console.log(this.url, 'this.url')
  }

  getProfilePicForUser() {
    this.showuser = false;
    this.tenantprofilePicuser = sessionStorage.getItem('pic_profile_user');
    this.urlluser = HttpUrls.GET_PROFILE_PIC + '?path=' + sessionStorage.getItem('pic_profile_user')
    console.log(this.urlluser, 'this.urluser')
  }
  getLogo() {
    this.showlogo = false;
    this.profileTenantLogo = sessionStorage.getItem('pic_logo')
    this.urllogo = HttpUrls.GET_TENANT_LOGO + '?path=' + this.profileTenantLogo
    console.log(this.urllogo, 'this.urllogo')
  }
  // showProfilePic() {

  //   //this.profilePic=sessionStorage.getItem('userprofilePic');
  //   //this.tenantprofilePic=sessionStorage.getItem('profilePic');

  // }
  //to get all countries
  public getAllCountries() {
    this._UserService.getAllCountries().subscribe(res => {
      console.log('countries', res)
      this.countryList = res;
    })
  }


  // For getting privileges userdetails and role getlogged in user details
  public getUser(): any {
    this.newService.getUserDetails().subscribe(result => {
      this.tenantProfileDetails = result;
      console.log(this.tenantProfileDetails, 'profiledetails');
      this.onCountryChange(this.tenantProfileDetails.organization.organizationAddress.country);
      this.tenantProfileForm.patchValue({
        organisationName: this.tenantProfileDetails.organization.orgName,
        tenantUrl: this.tenantProfileDetails.organization.url,
        tenantGst: this.tenantProfileDetails.organization.gstNumber,
        emailId: this.tenantProfileDetails.organization.emailId,
        companyCode: this.tenantProfileDetails.organization.orgId,
        tenantPhone: this.tenantProfileDetails.organization.phone,
        address1: this.tenantProfileDetails.organization.organizationAddress.line1,
        address2: this.tenantProfileDetails.organization.organizationAddress.line2,
        country: this.tenantProfileDetails.organization.organizationAddress.country,
        state: this.tenantProfileDetails.organization.organizationAddress.state,
        city: this.tenantProfileDetails.organization.organizationAddress.city,
        ZipCode: this.tenantProfileDetails.organization.organizationAddress.zipCode,
        aboutCompany: this.tenantProfileDetails.organization.aboutCompany
      });
    });
  }

  // To Get Individual User Detailss

  public getIndividualUser(): any {
    this.newService.getUserDetails().subscribe(result => {
      this.userDetails = result;
      console.log(this.userDetails, 'userDetails');
      this.onCountryChange(this.userDetails.address.country);
      this.userProfileForm.patchValue({
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        phoneNo: this.userDetails.phoneNumber,
        address1: this.userDetails.address.line1,
        address2: this.userDetails.address.line2,
        state: this.userDetails.address.state,
        city: this.userDetails.address.city,
        ZipCode: this.userDetails.address.zipCode,
        country: this.userDetails.address.country,
        emailId: this.userDetails.emailId
      });
    });

  }


  // on selecting a country
  onCountryChange(countryId: number) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      // console.log(this.stateList, 'states');
    }, error => {
      console.log(error);
    });
  }

  public checkPrivileges() {
    const privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(testing => {
        this.authority = testing.authorityName;
        console.log(this.authority, 'authoirithyName');
        if (this.authority === 'MANAGE MY ORGANIZATION') {
          this.organisation = true;
        } else if (this.authority === 'PROFILE ADMINISTRATION') {
          this.profileadministration = true;
        }
      });
    });
  }

  // Update Tenant Profile
  updateTenantProfile() {
    this.test =
    {
      'organisationName': this.tenantProfileDetails.organization.orgName,
      'tenantUrl': this.tenantProfileDetails.organization.url,
      'emailId': this.tenantProfileDetails.organization.emailId,
      'companyCode': this.tenantProfileDetails.organization.orgId,
      'tenantGst': this.tenantProfileDetails.organization.gstNumber,
      'tenantPhone': this.tenantProfileDetails.organization.phone,
      'address1': this.tenantProfileDetails.organization.organizationAddress.line1,
      'address2': this.tenantProfileDetails.organization.organizationAddress.line2,
      'country': this.tenantProfileDetails.organization.organizationAddress.country,
      'state': this.tenantProfileDetails.organization.organizationAddress.state,
      'city': this.tenantProfileDetails.organization.organizationAddress.city,
      'ZipCode': this.tenantProfileDetails.organization.organizationAddress.zipCode,
      'aboutCompany': this.tenantProfileDetails.organization.aboutCompany
    }

    console.log(this.test);
    console.log(this.tenantProfileForm.value);

    if (this.organisation === true) {

      if (JSON.stringify(this.tenantProfileForm.value) === JSON.stringify(this.test)) {
        console.log('There is no change in the data');
        this._notificationsService.showWarnNotif('Warning', 'There is no change in the data to Update');
      } else {
        console.log('There is change.....')
        this.spin.show();
        const tenantDetails = {
          'tenantId': sessionStorage.getItem('tenantId'),
          'orgId': this.tenantProfileForm.get('companyCode').value,
          'orgName': this.tenantProfileForm.get('organisationName').value,
          'address1': this.tenantProfileForm.get('address1').value,
          'address2': this.tenantProfileForm.get('address2').value,
          'aboutCompany': this.tenantProfileForm.get('aboutCompany').value,
          'city': this.tenantProfileForm.get('city').value,
          'country': this.tenantProfileForm.get('country').value,
          'state': this.tenantProfileForm.get('state').value,
          'pincode': this.tenantProfileForm.get('ZipCode').value,
          'emailId': this.tenantProfileForm.get('emailId').value,
          'phone': this.tenantProfileForm.get('tenantPhone').value,

        };

        this._TenantService.updateTenantProfile(tenantDetails).subscribe(() => {
          this.getUser();
          this.spin.hide();

          this._notificationsService.showSuccessNotif('Success', 'Tenant profile updated successfully');
        },
          error => {
            this.spin.hide();
            this._notificationsService.showErrorNotif('Failed', 'Failed to update tenant profile');

          });
      }
    } else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permssion to access');
    }
  }
  // Update User Profile
  public updateUserProfile(data: any): void {

    this.usertest =
    {

      'firstName': this.userDetails.firstName,
      'lastName': this.userDetails.lastName,
      'phoneNo': this.userDetails.phoneNumber,
      'address1': this.userDetails.address.line1,
      'address2': this.userDetails.address.line2,
      'state': this.userDetails.address.state,
      'city': this.userDetails.address.city,
      'ZipCode': this.userDetails.address.zipCode,
      'country': this.userDetails.organization.organizationAddress.country,
      'emailId': this.userDetails.emailId,
    }

    console.log(this.userProfileForm.value);
    console.log(this.usertest);

    if (this.profileadministration === true) {
      if (JSON.stringify(this.userProfileForm.value) === JSON.stringify(this.usertest)) {
        console.log('There is no change in the data');

        this._notificationsService.showWarnNotif('Warning', 'There is no change in the data to Update');
      }
      else {
        const userDetails = {
          'userId': this.userId,
          'firstName': data.firstName,
          'lastName': data.lastName,
          'phoneNumber': data.phoneNo,
          'emailId': data.emailId,
          'address': {
            'addressId': this.userDetails.address.addressId,
            'line1': data.address1,
            'landmark': '',
            'zipCode': data.ZipCode,
            'line2': data.address2,
            'city': data.city,
            'state': data.state,
            'country': data.country,

          },
        };
        debugger
        this._TenantService.updateProfile(userDetails).subscribe((data: any) => {
          console.log(data);
          this.getIndividualUser();
          this.spin.hide();

          this._notificationsService.showSuccessNotif('Success', 'User profile updated successfully');
        },
          error => {
            this.spin.hide();
            this._notificationsService.showErrorNotif('Failed', 'Failed to update user profile');
          });
      }
    }

    else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permission To Access');
    }
  }
  keyPressphone(event: any) {
    const pattern = /^[0-9.]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  handleChange(value) {
    if (value === 'yes') {
      console.log('true');
      this.isresumevalid = 1;
      console.log(this.isresumevalid);
    } else {
      console.log('false');
      this.isresumevalid = 0;
      console.log(this.isresumevalid);
    }
  }
  changeEmail(event) {
    if (event.target.checked === true) {
      this.isresumeemail = 1;
      console.log(this.isresumeemail);
    } else {
      this.isresumeemail = 0;
      console.log(this.isresumeemail);
    }
  }
  changePanNumber(event) {
    if (event.target.checked === true) {
      this.isresumepanNumber = 1;
      console.log(this.isresumepanNumber);
    } else {
      this.isresumepanNumber = 0;
      console.log(this.isresumepanNumber);
    }
  }
  changePhoneNumber(event) {
    if (event.target.checked === true) {
      this.isresumePhone = 1;
      console.log(this.isresumePhone);
    } else {
      this.isresumePhone = 0;
      console.log(this.isresumePhone);
    }
  }
  getResumeSettings() {
    console.log('test');
    this._TenantService.getResumeSettings().subscribe(res => {
      console.log(res);
      this.resumeSettingResponse = res;
      if (this.resumeSettingResponse.isResumeValidDurationActive === 1) {
        this.resumeSettingForm.patchValue({
          'active': this.resumeSettingResponse.isResumeValidDurationActive,
        });
      } else {
        this.resumeSettingForm.patchValue({
          'Inactive': this.resumeSettingResponse.isResumeValidDurationActive,
        });
      }
      this.resumeSettingForm.patchValue({
        'email': this.resumeSettingResponse.emailId,
        'Phone': this.resumeSettingResponse.phoneNumber,
        'pannumber': this.resumeSettingResponse.panNumber,
        'resumeperiod': this.resumeSettingResponse.resumeValidDuration,
        // 'active': this.resumeSettingResponse.isResumeValidDurationActive,
        // 'Inactive': this.resumeSettingResponse.isResumeValidDurationActive
      });
    }, error => {
      console.log(error);
    });
  }
  update() {
    const resumesettingdetails = {
      'emailId': this.isresumeemail,
      'phoneNumber': this.isresumePhone,
      'panNumber': this.isresumepanNumber,
      'resumeValidDuration': this.resumeSettingForm.get('resumeperiod').value,
      'isResumeValidDurationActive': this.isresumevalid,
      'tenantId': sessionStorage.getItem('tenantId')
    };
    console.log(resumesettingdetails);
    if (this.organisation === true) {
      this._TenantService.resumeConfigurationSettings(resumesettingdetails).subscribe(res => {
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'Resume Settings Updated Successfully');
        this.getResumeSettings();
      }, error => {
        console.log(error);
      });
    } else {
      this._notificationsService.showWarnNotif('Warning', 'You Dont Have Permission To Access');
    }
  }
}
