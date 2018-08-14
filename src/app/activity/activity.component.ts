import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private userService:UserService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let isToken: boolean = this.userService.checkToken();
    if (!isToken) {
      this.router.navigate(['/login'], {relativeTo: this.route});
    }
  }
}
