import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';;
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewServiceService } from '../../services/new-service.service';
import { NotificationMessageService } from '../../services/notification.service';

@Component({
  selector: 'app-clientcreation',
  templateUrl: './clientcreation.component.html',
  styleUrls: ['./clientcreation.component.css']
})
export class ClientcreationComponent implements OnInit {
  @ViewChild('addManagerBtn') addManagerBtn: ElementRef;
  @ViewChild('assignClientBtn') assignClientBtn: ElementRef;
  getClientName: any;
  GridApi: any;
  searchvalue: any;
  gridOptions: any;
  hideAddManager: boolean;
  hideViewManager: boolean;
  disableAssignClientToUser: boolean;
  disableEditClient: boolean;
  disableViewClient: boolean;
  rowSelectedId: any;
  statuses: any;
  rowHeight: any;
  disabledChangeStatus: boolean;

  public pageid: any = 0;
  public rowid: any = 15;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responsePageCount: number;
  pageCount: number = 1;
  totalCount: any;
  constructor(private newService: NewServiceService, private router: Router,
    private _notificationsService: NotificationMessageService, private fb: FormBuilder,
    private spin: NgxSpinnerService) {
    this.rowHeight = 30;

  }

  ngOnInit() {
    this.gridOptions = {
      animateRows: true,
      enableColResize: true,
      columnDefs: this.columnDefsToViewClients,
      rowData: null,
      // rowHeight: 35,
      headerHeight: 35,
    };
    this.getClientNames();
  }
  // grid headers

  columnDefsToViewClients = [
    { headerName: 'Client Name', unSortIcon: true, headerClass: 'ctHeader', field: 'clientName', width: 200,rowSelection: 'single' },
    { headerName: 'First Name', unSortIcon: true, headerClass: 'ctHeader', field: 'personFirstName', width: 250 },
    { headerName: 'Last Name', unSortIcon: true, headerClass: 'ctHeader', field: 'personLastName', width: 230 },
    { headerName: 'Email', unSortIcon: true, headerClass: 'ctHeader', field: 'emailId', width: 250 },
    { headerName: 'Phone', unSortIcon: true, headerClass: 'ctHeader', field: 'contactNumber', width: 200 },
    {
      headerName: 'Status', headerClass: 'ctHeader', field: 'status', width: 200,unSortIcon:true,
      cellClassRules: {
        'rag-green-active': function (params) {
          return params.value === 'Active';
        },
        'rag-amber-inactive': function (params) {
          return params.value === 'InActive';
        },
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + "</span>";
      }
    },
    {
      headerName: 'Action', width: 180, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fa fa-eye viewIcon"   data-toggle="modal"  data-target="#viewModal" ></span>';
      }

    },
  ]

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // Get Client Names api
  getClientNames() {
    this.newService.getClientsWithPagiantion(sessionStorage.getItem('tenantId'), this.pageid, this.rowid).subscribe(res => {
      this.getClientName = res;
      console.log('getclientname', this.getClientName);
      this.totalCount = this.getClientName[0].jobCount;
      this.responsePageCount = this.getClientName[0].pageCount;
      this.getClientName.forEach(element => {
        if (element.status === 1) {
          element.status = 'Active';
        } else {
          element.status = 'InActive';
        }
      });
    },
      error => {
        console.log(error);
      });

  }
  // For Grid Purpose
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    }
  }
  // onSelection Changed selecting the id we will naviagate to view client

  public onSelectionChanged(event) {
    console.log(event, 'eventData');
    const selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      this.hideAddManager = false;
      this.hideViewManager = false;
      this.disableAssignClientToUser = false;
      this.disableEditClient = false;
      this.disableViewClient = false;
      this.rowSelectedId = selectedRows[0].clientId;
      this.statuses = selectedRows[0].status;
      this.disabledChangeStatus = false;
      this.router.navigate(['./viewClient', { id: this.rowSelectedId, status: this.statuses }]);
    } else {
      this.hideAddManager = true;
      this.hideViewManager = true;
      this.disableAssignClientToUser = true;
      this.disableEditClient = true;
      this.disableViewClient = true;
      this.disabledChangeStatus = true;
    }

  }
  // searching in the grid
  quickSearch() {
    this.GridApi.setQuickFilter(this.searchvalue);
  }
  // For Paginations
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
    this.getClientName = [];
    this.pageid = this.pageid + 1;
    this.getClientNames();
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.getClientName = [];
    this.pageid = this.pageid - 1;
    this.getClientNames();
  }
  editStatus(event: any) {
    console.log(event.data);
    this.rowSelectedId = event.data.clientId;
    this.statuses = event.data.status
    this.router.navigate(['/manage-clients/viewClient', { id: this.rowSelectedId, status: this.statuses }]);
  }
  newClient()
  {
    console.log('test')
    this.router.navigate(['/manage-clients/addClient']);
  }
}




