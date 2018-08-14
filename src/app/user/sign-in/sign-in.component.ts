import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isErr = false;
  isToken: boolean = false;
  
  constructor(private router : Router, private userService:UserService) {this.isToken = this.userService.checkToken();  }
  
  ngOnInit() {
    
    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }
  onSubmit() {
    let username: string = this.loginForm.value['username'];
    let password: string = this.loginForm.value['password'];
    let loginRes = this.userService.checkLogin(username,password);
    loginRes.subscribe(
      data => {
          if (data['result'] != null) {
              this.isErr = false;
              let cookieObject = {
                  token: data['result']['access_token'],
                  expiresAt: data['result']['expires_in'],
              };

              this.userService.setCookie('token', JSON.stringify(cookieObject));
              window.location.href = '/';
              // redirect to index
          } 
          else {
            this.isErr = true;
          }
      });
    }
  }