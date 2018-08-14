import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/activity.service';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-activity',
  templateUrl: './index-activity.component.html',
  styleUrls: ['./index-activity.component.css']
})
export class IndexActivityComponent implements OnInit {
  popup = document.getElementsByClassName('popup') as HTMLCollectionOf<HTMLElement>;
  modal = document.getElementsByClassName('modal') as HTMLCollectionOf<HTMLElement>;
  activityTypes = ['initial'];
  orjActivityTypes = [];
  srcTypes = [];
  actResults = [];
  oldDom: string = null;
  popupName: string = null;
  popupMode: string = null;
  activitySourceName: string = null;
  constructor(private activityService: ActivityService, private userService: UserService,
    private router: Router, private route: ActivatedRoute) { 
      this.getActivityTypes();
    }

  ngOnInit() {
    let isToken: boolean = this.userService.checkToken();
    console.log(isToken);
    if (!isToken) {
      this.router.navigate(['/login'], {relativeTo: this.route});
    }
  } 
  getActivityTypes() {
    this.activityService.getActivities('types').
    subscribe(
      (data) => {
        console.log(data['result']);
        this.activityTypes = data['result'];
        this.orjActivityTypes = data['result'];
      },
      (error) => console.log(error)
    );
  }
  setDom(dom: string) {
    this.activitySourceName = this.activityTypes[dom].activityTypeName;
    document.getElementById(dom).classList.add('in');
  }
  remDom(dom: string) {
    document.getElementById(dom).classList.remove('in');
  }
  openOptions(dom: string) {
    if (this.oldDom == null) {
      this.oldDom = dom;
      this.setDom(dom);
    } else {
      if (this.oldDom === dom) {
        this.remDom(dom);
        this.oldDom = null;
      } else {
        this.remDom(this.oldDom);
        this.oldDom = dom;
        this.setDom(dom);
      }
    }
  }
  getActivitySourceTypes(event, index: number) {
    this.popupName = 'Activity Source Types';
    this.popupMode = 'sourceTypes';

    this.activityService.getActivitySourceTypesByActivityType(index)
    .subscribe(
      (data) => {
        this.srcTypes = data['result'];
        this.popup[0].style.display = 'contents';
        this.modal[0].classList.add('show');
      },
      (error) => console.log(error)
    );
  }
  getActivityResults(event, index: number) {
    this.popupName = 'Activity Results';
    this.popupMode = 'activityResults';

    this.activityService.getActivityResultsByActivityType(index)
    .subscribe(
      data => {
        this.actResults = data['result'];
        this.popup[0].style.display = 'contents';
        this.modal[0].classList.add('show');
      },
      error => console.log(error)
    );
  }
  closePopUp() {
    this.srcTypes = [];
    this.actResults = [];
    this.modal[0].classList.remove('show');
    this.popup[0].style.display = 'none';
  }
  newActivity() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }   





}
