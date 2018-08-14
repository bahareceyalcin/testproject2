import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class CollectionService {
  host = 'https://wstest.guvenvarlik.com.tr/api';
  token: string = null;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  options;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }
  getCollections(beginDate, endDate) {
    this.token = this.userService.getToken();
    const url = this.host + '/collections';
    const body = {
      begDate: beginDate,
      endDate: endDate
    };
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + this.token);
    let options = { headers: headers };
    return this.http.post(url, body,options).
    pipe();
  }
  



}