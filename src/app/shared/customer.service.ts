  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders} from '@angular/common/http';
  import { Response, RequestOptions, Http } from "@angular/http";
  import { Observable, pipe } from 'rxjs';
  import 'rxjs/add/operator/map';
  import { UserService } from '../shared/user.service';
  import { ActivatedRoute, Router } from '@angular/router';

  @Injectable()
  export class CustomerService {
    host = 'https://wstest.guvenvarlik.com.tr/api';
    token: string = null;
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    options;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {
      let token = userService.getToken();
      this.headers = this.headers.append('Authorization', 'Bearer ' + token);
      this.options = { headers: this.headers };
    }
    getCustomerAssign() {
        this.token = this.userService.getToken();
        const url = this.host + '/customers/assigned';
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + this.token);
        let options = { headers: headers };
        return this.http.get(url, options).
        pipe();
    }
    getContactInfo(aprCode:string){
      const url = this.host + '/customers/contactinfo';
      const body = {
        aprCodes: [
          aprCode
        ]
      };
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + this.token);

        let options = { headers: headers };
    return this.http.post(url, body,options).
    pipe();
    }
    getCustomerInfo(aprCode:string){
      const url = this.host + '/customers/info';
      const body = {
       
        aprCodes: [
          aprCode
        ]
      };
      console.log(this.token);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + this.token);

        let options = { headers: headers };
    return this.http.post(url, body,options).
    pipe();
    }
    getProtocols(aprCode:string){
      const url = this.host + '/customers/protocols';
      const body = {
        aprCodes: [
          aprCode
        ]
      };
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + this.token);

        let options = { headers: headers };
    return this.http.post(url, body,options).
    pipe();
    }
    getAssets(aprCode:string){
      const url = this.host + '/customers/assets';
      const body = {
        aprCodes: [
          aprCode
        ]
      };
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + this.token);

        let options = { headers: headers };
    return this.http.post(url, body,options).
    pipe();
    }
  }
