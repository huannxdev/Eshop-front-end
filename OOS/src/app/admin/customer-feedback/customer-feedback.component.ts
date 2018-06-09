import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackModel} from '../models/Feedback';
import { Router } from '@angular/router';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {

  listFeedback: FeedbackModel[];
  id : string;

  feedDel = new FeedbackModel; // bien feedback can delete
  constructor( private feedbackService: FeedbackService,
    private router: Router,
    private spinnerService: SpinnerService) { }
    
  ngOnInit() {
    this.getlistFeedback();
  }

  getlistFeedback() {
    this.spinnerService.startLoadingSpinner();
    this.feedbackService.get().subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.listFeedback = data;
      // reverse sort
      this.listFeedback.sort((a,b)=>{
        return 1; //reverse the array
      })
    })
  }
  getFeed(feedback :FeedbackModel)
  {
    this.feedbackService.getFeed(feedback);
  }
  
  // delete() {  
  //   this.spinnerService.startLoadingSpinner();
  //   this.feedbackService.delete(this.feedDel).subscribe(data => {
  //     this.spinnerService.turnOffSpinner();
  //     this.getlistFeedback();
  //   });
  // }
  setId(id){
    this.id = id; 
  }

  delete(){
    this.spinnerService.startLoadingSpinner();
    this.feedbackService.delete(this.id).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.getlistFeedback();
    });

}
}


