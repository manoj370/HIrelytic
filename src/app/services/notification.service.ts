import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  constructor( private _notificationService: NotificationsService) { }

       // To Show success Notif.
       showSuccessNotif(title: string, description: string) {
        return this._notificationService.success(title, description, {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
      // To Show Error Notif.
      showErrorNotif(title: string, description: string) {
        return this._notificationService.error(title, description, {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
       // To Show Warning Notif.
       showWarnNotif(title: string, description: string) {
        return this._notificationService.warn(title, description, {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
}
