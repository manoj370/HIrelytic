
import { ResumedetailsComponent } from './resumedetails.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';
import { SimpleTinyComponent } from './simpletiny.component';
import { AppModule } from '../app.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        AppModule
    ],
    declarations: [ResumedetailsComponent,FileSelectDirective,SimpleTinyComponent]
})
export class ResumeDetailsModule { }
