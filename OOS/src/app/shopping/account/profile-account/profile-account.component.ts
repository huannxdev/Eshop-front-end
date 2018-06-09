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
  idUser: string
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
    this.user.dateOfBirth = event.date.month + "/" + event.date.day + "/" + event.date.year

  }

  ngOnInit() {
    this.getProfile();
    this.getStatus();
  }

  getProfile() {
    this.idUser = this.ss.currentUser.getValue().Id
    this.ss.getById(this.idUser).subscribe(data => {
      this.user = data
      this.user.gender += 1;
      if (data.dateOfBirth != null) {
        var date = new Date(data.dateOfBirth)
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
    updateUser.gender -= 1;
    this.ss.put(this.idUser,updateUser).subscribe(data => {
      this.spinnerService.turnOffSpinner()
      this.toasterService.pop("success", "success", "You have successfully updated your profile");
    })
  }

}
