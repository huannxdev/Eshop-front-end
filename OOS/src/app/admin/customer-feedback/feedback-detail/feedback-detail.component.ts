import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StringDecoder } from 'string_decoder';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackModel} from '../../models/Feedback';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService) { }

    public feed = new FeedbackModel();
    public id: string;

  ngOnInit() {
    let params: any = this.activatedRoute.snapshot.params;
    this.id = params.id;
    this.getById(this.id);
  }

  getById(id) {
    this.spinnerService.startLoadingSpinner();
    this.feedbackService.getById(id).subscribe(feedback => {
      this.feed = feedback;
      this.feed.Status = true;
      this.feedbackService.putProduct(this.feed); 
      this.spinnerService.turnOffSpinner();
    });
  }
}

