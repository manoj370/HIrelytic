import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import { NewServiceService } from '../services/new-service.service';
import { NotificationsService } from 'angular2-notifications';
import { RequestOptions } from '@angular/http';
import { NotificationMessageService } from '../services/notification.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationsService,
     private _notificationService: NotificationMessageService,
    private _ngSpinner: NgxSpinnerService, private router: Router,
    private newService: NewServiceService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const oauth2_client_id = sessionStorage.getItem('clientid');
    const oauth2_client_secret = sessionStorage.getItem('clientSecret');
    // console.log(oauth2_client_id);
    if (sessionStorage.getItem('access-token')) {
      if (req.url.includes(('/nextJobCode'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json'),
          responseType: 'text',
        });
      } else if (req.url.includes(('/jcrRequest/resumeToString'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'json',
        });
      } else if (req.url.includes(('create-setting'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'json',
        });

      } else if (req.url.includes(('/user'))) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
          responseType: 'json',
        });
      } else if (req.url.includes(('/assignClientToUser'))) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
          responseType: 'text',
        });

      } else if (req.url.includes(('/create-candidate-stage'))) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
          responseType: 'text',
        });

      }
      else if (req.url.includes(('/referreUploadCandidate'))) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
          responseType: 'text',
        });

      } 
      else if (req.url.includes(('/updateuserprofilepic')) || req.url.includes(('/uploadLogo'))
      || req.url.includes(('employee/uploadFile'))) {

        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'text',
        });
      } else if (req.url.includes(('digital/get-request-document'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'text',
        });
      }
      //downloadFile
      else if (req.url.includes(('/inviteVendor'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')),
          responseType: 'text',
        });
      }
      else if (req.url.includes(('/downloadFile'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')),
          responseType: 'text',
        });
      }
      else if (req.url.includes(('/candidateDataBase/send-mail-to-multiple-candidates'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')),
          responseType: 'text',
        });
      } else if (req.url.includes(('/get-request-documentsss'))) {

        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')),
          responseType: 'blob',
        });
      } else if (req.url.includes(('/jcrRequest'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'blob',
        });
      }  else if (req.url.includes(('/all-referred-resumes'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'json',
        });
      }
      else if (req.url.includes(('/get-list-modules'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Accept', 'application/json'),
          responseType: 'json',
        })

      } else if (req.url.includes(('/jobsReportDownload')) || req.url.includes(('/statusBasedJobsReportDownloadForAdmin')) || req.url.includes(('/statusBasedJobsReportDownload')) || req.url.includes(('/vendorHireRequestsDownload')) || req.url.includes(('/get-all-joined-candidates-download')) || req.url.includes(('/get-joined-candidates-download'))
        || req.url.includes(('/downloadVendorPaymentInformationForAdmin'))||req.url.includes(('/downloadVendorPaymentInformation'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/adminJoinesDownload'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/reportDocumentGenerator'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/adminRecruiterDownload'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/jobsReportDownloadForIndividual'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/openPositionsDownload'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/recruiterOpenPositionsDownload'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/recruiterJoinesDownload'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      }
      else if (req.url.includes(('/recruiterReportGenerator'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'blob'
        });
      } else if (req.url.includes(('/statesList'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
            .set('Content-Type', 'application/json').delete('Content-Type'),
          responseType: 'json'
        });
      } else {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        });
      }
    } else if (req.url.includes(('/getClientById'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/get-resume-status'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/change-profile-status'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/update-client'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/clientNameChecking'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/getManagers'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/clientStatus'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/get-user-by-authority'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/postAJob'))) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/reset-password'))) {
      req = req.clone({
        responseType: 'json',
      });
    } else if (req.url.includes(('/change-password'))) {
    } else if (req.url.includes(('/assignClientToUser'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'text',
      });
    } else if (req.url.includes(('/inviteUser'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'text',
      });
    }
    else if (req.url.includes(('/roles'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/createRoleByTenant'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/assignNewPrivilegesToRole'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    }
    else if (req.url.includes(('/get-all-joined-candidates'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/tenant-signup')) || (req.url.includes(('/requestForDemo'))) || (req.url.includes(('/activate')))) {
      req = req.clone({
        responseType: 'text',
      });
    } else if (req.url.includes(('/reSendEmail'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'text',
      });
    } else if (req.url.includes(('/candidateProfilesReportOfRecruiters'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'text',
      });
    } else if (req.url.includes(('/accountManagerReport'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'text',
      });
    } else if (req.url.includes(('/getRole'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/checkRoleName'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token'))
          .set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/approveHireRequest')) || (req.url.includes(('/rejectHireRequest'))) || (req.url.includes(('/onHoldHireRequest'))) || (req.url.includes(('/updateHireRequestStatus')))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    } else if (req.url.includes(('/hireRequest/tenant'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    }
    //createEmployee
    else if (req.url.includes(('getClients'))) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    }
    else if (req.url.includes(('/get-loggedin-user'))) {

      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access-token')).set('Content-Type', 'application/json'),
        responseType: 'json',
      });
    }
    else {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + btoa(oauth2_client_id + ':' + oauth2_client_secret)),
      });
    }


    return next.handle(req)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          // console.log(error, 'Error')
          if (error.status === 401) {
            // console.log(error);
            // Swal.fire({
            //   title: 'Unauthorized ',
            //   animation: false,
            //   customClass: {
            //     popup: 'animated tada'
            //   }
            // });
            this.router.navigate(['/login']);
            sessionStorage.removeItem('access-token');
            sessionStorage.removeItem('refresh_token');
            sessionStorage.removeItem('pic_logo');
            sessionStorage.removeItem('EmailId');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userRoles');
            sessionStorage.removeItem('Privileges');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('pic_profile_user');
            sessionStorage.removeItem('pic_profile');
            sessionStorage.removeItem('roleId');
          } else if (error.status === 403) {
            this._notificationService.showWarnNotif('Warning', 'You Do not Have Permission To Access');
            // this.notificationService.warn('Warning', 'You Do not Have Permission To Access');
            setTimeout(() => {
            }, 500);
          } else if (error.status === 400 || error.status === 404) {
            this._notificationService.showErrorNotif('Error', error.error.error_description);
            // this.notificationService.error('error', 'SomeThing went wrong please try again after some time');
            setTimeout(() => {
            }, 500);
            this._ngSpinner.hide();
          }
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this._ngSpinner.hide();
          return throwError(errorMessage);

        })
      );
  }
}

