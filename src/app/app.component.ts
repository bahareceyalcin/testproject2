import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isToken: boolean = false;
  constructor(private userService: UserService,private router : Router) { 
  }
  ngOnInit() {
    this.isToken = this.userService.checkToken(); 
  }
  Logout(){
    localStorage.removeItem('token');
    window.location.href = '/login';
 
  }
}