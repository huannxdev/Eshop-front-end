import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { ToasterService } from 'angular2-toaster';

import { AccountService } from '../../services/account.service';
import { GenderType, CreateUserModel } from '../../models/user/create-user/create-user';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { UserModel } from '../../models/user/user';


@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  username: string
  user: UserModel
  public genderEnum = GenderType
  listGender: any
  listCountry = new Array<string>();
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };


  constructor(private ss: AccountService, private spinnerService: SpinnerService, private toasterService: ToasterService) {
    this.listCountry.push("VietNam")
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    // this.selDate = event.date;
    this.user.DateOfBirth = new Date(event.date.year,event.date.month,event.date.day);

  }

  ngOnInit() {
    this.getProfile();
    this.getStatus();
  }

  getProfile() {
    this.username = this.ss.currentUser.getValue().UserName
    this.ss.getByUserName(this.username).subscribe(data => {
      this.user = data
      this.user.Gender += 1;
      if (data.DateOfBirth != null) {
        var date = data.DateOfBirth;
        this.selDate = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        };
      }
      else {
        this.selDate = null;
      }

    }
    )
  }

  getStatus() {
    this.listGender = Object.keys(this.genderEnum).filter(Number);
  }

  update() {
    this.spinnerService.startLoadingSpinner()
    var updateUser = Object.assign({}, this.user);
    updateUser.Gender -= 1;
    this.ss.put(this.user.Id,updateUser).subscribe(data => {
      this.spinnerService.turnOffSpinner()
      this.toasterService.pop("success", "success", "You have successfully updated your profile");
    })
  }

}
