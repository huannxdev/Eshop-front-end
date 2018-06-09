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

  listUsers: Array<Object>;

  userDel = new UserModel;

  //for paging
  itemCount: number;
  pageSize: number = 10;
  page: number = 1;

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

  get(id) {
    this.userService.getById(id).subscribe(data => {
      this.userDel = data;
    })
  }

  getUsersList() {
    this.spinnerService.startLoadingSpinner();

    this.userService.get("", this.email, this.phone).subscribe(data => {
      this.spinnerService.turnOffSpinner();

      this.listUsers = data.items;
      this.itemCount = data.totalItemCount;

      // reverse sort
      this.listUsers.sort((a, b) => {
        return 1; //reverse the array
      })
    })
  }

  searchUser() {
    this.getUsersList();
  }

  refresh() {
    this.pageSize = 10;
    this.page = 1;

    this.email = "";
    this.phone = "";
    this.getUsersList();
  }

  delete() {
    this.spinnerService.startLoadingSpinner();

    this.userService.delete(this.userDel).subscribe(data => {
      this.spinnerService.turnOffSpinner();
      this.getUsersList();
    });
  }

  getUser(user: UserModel) {
    this.userService.getUser(user);
  }

  getPage(page: number) {
      this.page = page;
      this.getUsersList();
  }

  getPageSize(pageSize: number) {
      this.pageSize = pageSize;
      this.getUsersList();
  }
}
