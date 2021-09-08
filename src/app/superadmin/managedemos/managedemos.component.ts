import { Component, OnInit } from '@angular/core';
import { RequestDemoService } from '../../services/request-demo.service';
import { NotificationMessageService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewServiceService } from '../../services/new-service.service';

@Component({
  selector: 'app-managedemos',
  templateUrl: './managedemos.component.html',
  styleUrls: ['./managedemos.component.css']
})
export class ManagedemosComponent implements OnInit {
  demoData: any = [];
  GridApi: any;
  searchvalue: any;
  totalPages: any;
  changePage: any;
  countryList: any;

  constructor(
    private _reqdemo: RequestDemoService,
    private newService: NewServiceService,
    private _notifService: NotificationMessageService,
    private spin: NgxSpinnerService
  ) {}
  demoColumnDefs = [
    {
      headerName: 'Name',
      field: 'requesterName',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Email Id',
      field: 'requesterEmailId',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Phone',
      field: 'contactNumber',
      width: 120,
      unSortIcon: true
    },
    {
      headerName: 'Company Name',
      field: 'tenantName',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Company Size',
      field: 'tenantSize',
      width: 150,
      unSortIcon: true
    },

    { headerName: 'Country', field: 'country', width: 120, unSortIcon: true },
    {
      headerName: 'Requested Date',
      field: 'createdDate',
      width: 140,
      unSortIcon: true
    }
    // { headerName: 'Status', field: 'demoStatus', width: 140, unSortIcon: true },
  ];
  ngOnInit() {
    this.getAllCountries();
  }
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }

  onBtNextag() {
    this.GridApi.paginationGoToNextPage();
  }

  onBtPreviousag() {
    this.GridApi.paginationGoToPreviousPage();
  }
  onPaginationChanged() {
    if (this.GridApi) {
      this.totalPages = this.GridApi.paginationGetTotalPages();
      this.changePage = this.GridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePage);
    }
  }
  getRequestDemo() {
    this.spin.show();
    this._reqdemo.getViewRequestDemo().subscribe(res => {
      this.spin.hide();
      this.demoData = res;
      console.log('request demo', res);
    });
  }
  quickSearch() {
    this.GridApi.setQuickFilter(this.searchvalue);
  }
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.demoData);
      this.getRequestDemo();

      this.demoData.forEach(element => {
        this.countryList.forEach(country => {
          if (element.country === country.countryId) {
            element.country = country.countryName;
          }
        });
      });
      console.log(this.countryList, 'countrylist');
    });
  }
}
