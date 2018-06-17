import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user';
import { SpinnerService } from '../../../shared/services/spinner.service';

@Component({
  selector: 'app-overview-users',
  templateUrl: './overview-users.component.html',
  styleUrls: ['./overview-users.component.css']
})
export class OverviewUsersComponent implements OnInit {

  listUsers: Array<UserModel>;

  userDel = new UserModel;
  currentId: string;

  //for paging
  itemCount: number;

  //for searching
  email: string = "";
  phone: string = "";

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  get(id: string){
    this.currentId = id;
  }

  getUsersList() {
    this.spinnerService.startLoadingSpinner();

    this.userService.get("", this.email, this.phone).subscribe(data => {
      this.spinnerService.turnOffSpinner();

      this.listUsers = data;
      this.itemCount = this.listUsers.length;
    })
  }

  searchUser() {
    this.getUsersList();
  }

  refresh() {
    this.email = "";
    this.phone = "";
    this.getUsersList();
  }

  delete() {
    this.spinnerService.startLoadingSpinner();

    this.userService.delete(this.currentId).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.getUsersList();
    });
  }

  getUser(user: UserModel) {
    this.userService.getUser(user);
  }
}
