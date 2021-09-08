import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationMessageService } from '../../services/notification.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit, OnDestroy {
  rowData: any = [];
  GridApi: any;
  selectedTenantId: any;
  selectedStatus = false;
  disableActiveState = true;
  disableInactiveState = true;
  closeModal: any;
  gridOptions: any;
  getTenantStatusCount: any = [];
  searchvalue: any;
  getAllUnregisteredTenants: any = [];
  public disabledResendEmail = true;
  rowSelectedEmail: any;
  TenantResendInvitation: any;
  rowSelectedOrgName: any;
  gridApi: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  obj: any;
  requestId: any;
  totalPages: any;
  changePage: any;
  unregitotalPages: any;
  changeregiPage: any;
  constructor(private _TenantService: TenantService,
    private router: Router,
    private spin: NgxSpinnerService, private _notify: NotificationMessageService, private _UserService: UserService) { }

  columnDefs = [
    { headerName: 'Organisation Name', unSortIcon: true, field: 'orgName', width: 180, minWidth: 80, rowSelection: 'multiple', sort: "asc" },
    { headerName: 'Organisation Url', unSortIcon: true, field: 'url', width: 200, minWidth: 80 },
    { headerName: 'Email', unSortIcon: true, field: 'emailId', width: 200, minWidth: 80 },
    { headerName: 'Phone', unSortIcon: true, field: 'phone', width: 140, minWidth: 80 },
    { headerName: 'GST Number', unSortIcon: true, field: 'gstNumber', width: 140, minWidth: 80 },
    { headerName: 'City', unSortIcon: true, field: 'organizationAddress.city', width: 140, minWidth: 80 },
    {
      headerName: 'State', unSortIcon: true, field: 'organizationAddress.state', width: 140, minWidth: 80,
    },
    {
      headerName: 'Status', field: 'status', width: 200, unSortIcon: true,
      cellClassRules: {
        'rag-black-tenantPending': function (params) {
          return params.value === 'Pending';
        },
        'rag-green-active': function (params) {
          return params.value === 'Active';
        },
        'rag-amber-inactive': function (params) {
          return params.value === 'InActive';
        },
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    },
    {
      headerName: 'Action', width: 180, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#gridicon"></i> </span>';
      }
    },
  ];
  unregisteredTenantsColumnDefs = [
    {
      headerName: 'Organisation Name', field: 'invitee',  width: 500, nSortIcon: true,
    },
    { headerName: 'Email Id', field: 'emailId', width: 350, unSortIcon: true, },
    {
      headerName: 'Action', width: 100, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-redo-alt updateIcon" title="Resend Invitation"></i></span>';
      }
    },

  ];




  ngOnInit() {
    this.getOrganisationStatusCount();
    this.getTenants();
    this.getUnregisteredTenantsList();
    this.gridOptions = {
      animate: true,
      enableColResize: true,
      columnDefs: this.columnDefs,
      rowData: null,
      rowHeight: 35,
      headerHeight: 35,
    }
    this.gridOptions.rowStyle = { background: '#FFFFFF' };

    this.gridOptions.getRowStyle = function (params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' }
      }
    };
  }


  //GRID FOR ALL TENANTS
  public onGridReady(param): void {
    this.gridApi = param.api;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();

    }
  }

  onBtNextag() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPreviousag() {
    this.gridApi.paginationGoToPreviousPage();
  }
  onPaginationChanged() {
    if (this.gridApi) {
      this.totalPages = this.gridApi.paginationGetTotalPages();
      this.changePage = this.gridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePage);
    }
  }

  // GRID FOR UNREGISTERED TENATNS
  public onGridReadyUnregisteredTenants(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }

  onNext() {
    this.GridApi.paginationGoToNextPage();
  }

  onPrevious() {
    this.GridApi.paginationGoToPreviousPage();
  }
  onunregPaginationChanged() {
    if (this.GridApi) {
      this.unregitotalPages = this.GridApi.paginationGetTotalPages();
      this.changeregiPage = this.GridApi.paginationGetCurrentPage() + 1;
      console.log(this.changePage);
    }
  }

  public onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows[0]);
    if (selectedRows.length > 0) {
      this.selectedTenantId = selectedRows[0].tenantId;
      console.log(selectedRows[0].status);
      if (selectedRows[0].status === 'InActive') {
        this.disableActiveState = false;
        this.disableInactiveState = true;

      } else if (selectedRows[0].status === 'Active') {
        this.disableActiveState = true;
        this.disableInactiveState = false;

      } else if (selectedRows[0].status === 'Pending') {
        this.disableActiveState = false;
        this.disableInactiveState = false;
      }
    } else {
      this.disableActiveState = true;
      this.disableInactiveState = true;
    }
  }
  // Button Enabling and disabling  for resendMail
  public onSelectionChangedTenants() {

    let selectedRow = this.GridApi.getSelectedRows();
    console.log(selectedRow);
    if (selectedRow.length > 0) {
      this.requestId = selectedRow[0].requestId;
      this.disabledResendEmail = false;
    } else {
      this.disabledResendEmail = true;
    }
  }

  onRowClicked(event: any) {
    console.log('row', this.requestId = event.data.requestId);
    this.requestId = event.data.requestId;
    this.tenantResendInvitation();
  }
  // TO GET ALL TENANTS
  getTenants() {
    this._TenantService.getAllTenants().subscribe(res => {
      console.log('tenantLists', res);
      this.rowData = res;
      this.rowData.forEach(element => {
        if (element.status === 2) {
          element.status = 'Pending';
        } else if (element.status === 1) {

          element.status = 'Active';
        } else if (element.status === 0) {
          element.status = 'InActive';
        }

      });
    });

  }
  // TO GET ALL UNREGISTERED TENANTS LIST
  getUnregisteredTenantsList() {
    this._TenantService.getAllUnregisteredTenants().takeUntil(this.destroy$).subscribe(res => {
      this.getAllUnregisteredTenants = res;
      console.log('UnregisteredTenants', res);
    }, error => {
      console.log(error);
    });
  }
  // Resend Invitation for Unregistered Tenants
  tenantResendInvitation() {

    this._UserService.resendInvitationForUnregisteredTenants(this.requestId).subscribe(res => {

      this.TenantResendInvitation = res;
      console.log('Invitation', this.TenantResendInvitation);
      // if(res.status==200)
      // {
      this._notify.showSuccessNotif('Success', ' Resend Invitation sent successfully ');
      this.getUnregisteredTenantsList();
      // }
      // else{
      //   this._notify.showErrorNotif('Failed', 'Internal Sever error, Failed to Resend invitation ');
      // }
    }, error => {
      this._notify.showErrorNotif('Failed', 'Internal Sever error, Failed to Resend invitation ');
    });

  }
  // CHANGE TENANT STATUS
  changeTenantStatus(status: string) {
    this.spin.show();
    if (status === 'Activate') {
      this.selectedStatus = true;
    } else if (status === 'Deactivate') {
      this.selectedStatus = false;
    }
    this._TenantService.changeStatus(this.selectedTenantId, this.selectedStatus, this.obj).subscribe(res => {
      this.getTenants();
      this.getOrganisationStatusCount();
      this.spin.hide();
      this._notify.showSuccessNotif('Success', 'Tenant status update successfully')
    },

      error => {
        this.spin.hide();
        this._notify.showErrorNotif('Failed', 'Failed to update tenant status');
      });

  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchvalue);
    this.GridApi.setQuickFilter(this.searchvalue);

  }
  // Get Tenants Count
  getOrganisationStatusCount() {
    this._TenantService.getTenantStatusCount()
      .takeUntil(this.destroy$)
      .subscribe(res => {
        console.log(res);
        this.getTenantStatusCount = res[0];
      }, error => {
        console.log(error);
      })
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
  cellClick(event: any) {
    console.log(event.data);
    const selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows);
    this.router.navigate(['/superAdmin/updateSubscription', { id: event.data.tenantId, status: event.data.status }]);
    // this.router.navigate(['/updatetenants']);
  }
}
