import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user = new UserModel;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{
    var id = this.route.snapshot.paramMap.get("id");
    this.userService.getById(id).subscribe(user => this.user = user);
  }

  deleteUser(user: UserModel){
    this.userService.delete(user).subscribe( a => {
        this.router.navigateByUrl("admin/users");
    });
  }

  backClicked() {
    this.location.back();
  }
}
