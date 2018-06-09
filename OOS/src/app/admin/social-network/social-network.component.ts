import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../shared/services/spinner.service';
import { SocialNetworkModel } from '../models/SocialNetworkModel';
import { SocialNetworkService } from '../services/socialnetwork.service';


@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent implements OnInit {

  socialnetwork =new  SocialNetworkModel();

  constructor(private spinnerService: SpinnerService,private socialnetworkService:SocialNetworkService ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.spinnerService.startLoadingSpinner();
    this.socialnetworkService.get().subscribe(data => {
      this.socialnetwork = data;
      console.log(this.socialnetwork);
      this.spinnerService.turnOffSpinner();
    });
  }

  save() {
    this.spinnerService.startLoadingSpinner();
    this.socialnetworkService.edit(this.socialnetwork).subscribe(res => {
      this.spinnerService.turnOffSpinner();
    });
  }
}
