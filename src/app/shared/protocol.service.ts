import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProtocolService {
  host = 'https://wstest.guvenvarlik.com.tr/api';
  token: string = null;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  options;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    let token = userService.getToken();
    this.headers = this.headers.append('Authorization', 'Bearer ' + token);
    this.options = { headers: this.headers };
  }
 
  createProtocol(
    docDesc: string,
    currCode: string,
    aprCode: string,
    firstRecUser: string,
    firstHostName: string,
    credits: string,
    installments: number,
    dueDate: number,
    instAmount: number,
    notes: string) {
      const body = {
        docDesc: docDesc,
        currCode: currCode,
        aprCode: aprCode,
        firstRecUser: firstRecUser,
        firstHostName: firstHostName,
        credits: credits,
        installments: installments,
        dueDate: dueDate,
        instAmount: instAmount,
        notes: notes
      };
    this.http.post(this.host + '/protocols/', body, this.options).
     subscribe(
      (data) => console.log(data['result']),
      (err) => console.log('err')
    );
  }
}
