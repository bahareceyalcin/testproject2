import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class LawService {
  host = 'https://wstest.guvenvarlik.com.tr/api';
  token: string = null;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  options;
  aprCode:string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    
  }
  getLawSuits(aprCode:string){
    this.token = this.userService.getToken();
    console.log('ssfs'+this.token);
    const url = this.host + '/legal/lawsuits';
    console.log('ssfs'+url);
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



  getLawCases(aprCode:string) {
    this.token = this.userService.getToken();
    const url = this.host + '/legal/lawcases';
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
  getLawTasks(aprCode:string) {
    this.token = this.userService.getToken();
    const url = this.host + '/legal/lawtasks';
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