import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {
  readonly host = 'https://wstest.guvenvarlik.com.tr/api';
  isLogin = false;
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }
    checkLogin(username: string, pw: string) {
      const url = this.host + '/auth/token';
      const body = {
          userId: username,
          password: pw
        };
        let options = { headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        }) };
        return this.httpClient.post(url, body).
        pipe();
    }
    checkToken(): boolean {
        let obj = String(localStorage.getItem('token'));
        if (obj !== '' && obj !== String(null)) {
            let obje = JSON.parse(obj);
            let expireTime = this.cStringToDate(obje['expiresAt']);
            let currentDate = new Date();
            if (expireTime > currentDate) {
                return obje['token'];
            }
            this.removeCookie();
        }
        this.isLogin = false;
        return false;
    }
    setCookie(srcKey: string, srcValue: any) {
    localStorage.setItem(srcKey, srcValue);
        this.isLogin = true;
    }
    removeCookie() {
    localStorage.removeItem('token');
        this.isLogin = false;
    }
    getToken(): string {
        let obj = String(localStorage.getItem('token'));
        if (obj !== '' && obj !== String(null)) {
            let obje = JSON.parse(obj);
            let expireTime = this.cStringToDate(obje['expiresAt']);
            let currentDate = new Date();
            console.log(expireTime);
            if (expireTime > currentDate) {
                return obje['token'];
            }
            this.removeCookie();
        }
        return 'notOk';
    }
    cStringToDate(date: string): Date {
        console.log(date);
        let splitedBySpace = date.split(' ');
        let splitedByDot = splitedBySpace[0].split('.');

        let index = 0;
        splitedByDot.forEach(function(item) {
            if (item.length === 1) {
                splitedByDot[index] = '0' + item;
            }
            index++;
        });

        let dateF = splitedByDot[2] + '-' + splitedByDot[1] + '-' + splitedByDot[0] + 'T' + splitedBySpace[1];
        return new Date(dateF);
    }
}
