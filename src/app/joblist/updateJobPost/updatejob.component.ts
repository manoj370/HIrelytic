import { Component, OnInit } from '@angular/core';
import  {JobPostingService } from '../../services/jobposting.service';
import {Router} from '@angular/router';
import { JobPosting ,skills} from '../../models/jobposting';
@Component({
  selector: 'app-updatejob',
  templateUrl: './updatejob.component.html',
})
export class UpdateJoblistComponent implements OnInit 
{
  jobposting : JobPosting =new JobPosting();
  firstform : boolean;
  secondform : boolean;

constructor(private router: Router,private _jobpostingService :JobPostingService) { }

  ngOnInit() 
  {
      this.firstform=true;
  }

}