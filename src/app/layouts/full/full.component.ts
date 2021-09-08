import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Helpers } from '../../helpers';
@Component({
    selector: 'page-wrapper',
    templateUrl: './full.component.html',
    // encapsulation: ViewEncapsulation.None,

})
export class FullComponent implements OnInit, AfterViewInit {

    color = 'defaultdark';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;

    public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router, public location: Location) { }

    ngOnInit() {
        // if (this.router.url === '/') {
        //     this.router.navigate(['/dashboard/dashboard1']);
        // }
    }
    ngAfterViewInit() {

        // initialize layout: handlers, menu ...
        // Helpers.initLayout();

    }
    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path === titlee) {
            return false;
        } else {
            return true;
        }
    }

}
