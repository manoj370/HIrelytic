import { Injectable } from '@angular/core';
import { HttpUrls } from '../shared/HttpUrls';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DataclientService } from './dataclient.service';
import { NgxPageScrollDirective } from 'ngx-page-scroll';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  viewVendors: any[];

  constructor(private _Http: Http, private dataClient: DataclientService) { }


  inviteVendor(formdata) {
    debugger
    return this.dataClient.post(HttpUrls.INVITE_VENDOR, formdata);
  }
  addVendor(formdata) {

    return this.dataClient.post(HttpUrls.CREATE_VENDOR, formdata);
  }
  getListOfVendors(tenantId, rowid, pageid) {
    debugger
    return this.dataClient.get(HttpUrls.GET_LIST_OF_VENDORS + '?tenantId=' + tenantId + '&rows=' + rowid + '&pages=' + pageid);
  }

  updateEditVendor(formdata) {
    return this.dataClient.update(HttpUrls.UPDATE_VENDOR, formdata);
  }
  updateVendorStatus(formdata) {

    return this.dataClient.post<any>(HttpUrls.CHANGE_VENDOR_STATUS, formdata);
  }

  // vendor details by vendor id
  getViewOfVendor(vendorId) {
    debugger
    return this.dataClient.get(HttpUrls.GET_VIEW_OF_VENDORS + '?vendorId=' + vendorId);
  }
  // SETTING PAYMENT FOR VENDOR

  vendorPaymentSetting(formdata) {

    return this.dataClient.post<any>(HttpUrls.VENDOR_PAYMENT_SETTING, formdata);
  }
  // GET PAYMENT POLICIES LIST
  getPaymentPoliciesList() {
    return this.dataClient.get(HttpUrls.VENDOR_PAYMENT_LIST);
  }
  // update payment policy
  updatePaymentPolicy(formdata) {
    return this.dataClient.update<any>(HttpUrls.VENDOR_UPDATE_PAYMENT_POLICY, formdata);
  }
  // Assign Payment policy to vendor
  assignPaymentPolicy(formdata) {
    return this.dataClient.update<any>(HttpUrls.ASSIGN_PAYMENT_POLICY_TO_VENDOR, formdata);
  }
  // My Payment List (Vendor)
  vendorPaymentList(settingId) {
    return this.dataClient.get(HttpUrls.LIST_OF_VENDORS_BASED_ON_SETTING_ID + '?settingId=' + settingId);
  }
  paymentDetailsBasedonVendorId(vendorId, pageid, rowid) {
    return this.dataClient.get(HttpUrls.PAYMENT_DETAILS_BASED_ON_VENDOR_ID +
      '?vendorId=' + vendorId + '&page=' + pageid + '&rows=' + rowid);
  }
  downloadPaymentPdf(vendorId) {
    return this.dataClient.get(HttpUrls.VENDOR_PAYMENTDETAILS_ADMIN_PDF +
      '?vendorId=' + vendorId + '&fileName=' + 'paymentdetails' + '&extension=' + '.pdf');
  }
  downloadPaymentExcel(vendorId) {
    return this.dataClient.get(HttpUrls.VENDOR_PAYMENTDETAILS_ADMIN_EXCEL +
      '?vendorId=' + vendorId + '&fileName=' + 'paymentdetails' + '&extension=' + '.xls');
  }
  // VENODR PAYMENT STATUS
  getVendorPaymentStatus() {
    return this.dataClient.get(HttpUrls.VENDOR_PAYMENT_STATUS);
  }
  // CHANGE VENDOR PAYMENT STATUS
  changeVendorPaymentStatus(paymentId, paymentStatus) {
    return this.dataClient.get(HttpUrls.CHANGE_VENDOR_PAYMENT_STATUS +
      '?paymentId=' + paymentId + '&paymentStatus=' + paymentStatus);
  }
  listOfVendors() {
    return this.dataClient.get(HttpUrls.LIST_OF_VENDORS_ADMIN_DASHBOARD +
      '?tenantId=' + sessionStorage.getItem('tenantId'));
  }
  // vendorAdminDashboard
  vendorAdminDashboard(fromdate, todate, selectoption) {
    return this.dataClient.get(HttpUrls.VENDORS_ADMIN_DASHBOARD +
      '?fromDate=' + fromdate + '&toDate=' + todate + '&selectOption=' + selectoption);
  }
  // Individual vendor statistics for vendor dashboard
  vendorStatisticsAdminDashboard(vendorId, fromdate, todate, selectoption) {
    return this.dataClient.get(HttpUrls.INDIVIDUAL_VENODR_STATISTICS_ADMIN_DASHBOARD + '?vendorId=' + vendorId +
      '&fromDate=' + fromdate + '&toDate=' + todate + '&selectOption=' + selectoption);
  }
}
