import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
  host = 'https://wstest.guvenvarlik.com.tr/api';
  token: string = null;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  options;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    let token = userService.getToken();
    this.headers = this.headers.append('Authorization', 'Bearer ' + token);
    this.options = { headers: this.headers };
  }
  getActivitySourceTypesByActivityType(activityType: number) {
    return this.http.get(this.host + '/activities/' + 'sources/?activityType=' + activityType, this.options).
    pipe();
  }
  getActivityResultsByActivityType(activityType: number) {
    return this.http.get(this.host + '/activities/' + 'results/?activityType=' + activityType, this.options).
    pipe();
  } 
  getTypes(area: string, ownerTypes?: boolean) {
    let typeStatus: string = ownerTypes === true ? '/ownerTypes/' : '/types/';
    return this.http.get(this.host + '/' + area + '/' + typeStatus, this.options).
    pipe();
  }
  getActivities(area: string) {
    return this.http.get(this.host + '/activities/' + area, this.options).
    pipe();
  }
  createActivity(
    startTime: string,
    endTime: string,
    firstRecUser: string,
    firstHostName: string,
    notes: string,
    phone: string,
    actType: number,
    actSrcType: number,
    actResultType: number,
    aprCode: string) {
      const body = {
        startTime: startTime,
        endTime: endTime,
        firstRecUser: firstRecUser,
        firstHostName: firstHostName,
        notes: notes,
        phone: phone,
        actType: actType,
        actSrcType: actSrcType,
        actResultType: actResultType,
        aprCode: aprCode
      };
    this.http.post(this.host + '/activities/', body, this.options).
     subscribe(
      (data) => console.log(data['result']),
      (err) => console.log('err')
    );
  }
}