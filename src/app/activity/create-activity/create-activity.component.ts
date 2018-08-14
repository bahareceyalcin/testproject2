import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivityService } from '../../shared/activity.service';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {
  @ViewChild('startTimeInput') startTimeInputRef: ElementRef;
  @ViewChild('endTimeInput') endTimeInputRef: ElementRef;
  @ViewChild('aprCodeInput') aprCodeInputRef: ElementRef;
  @ViewChild('activityTypeInput') activityTypeInputRef: ElementRef;
  @ViewChild('activitySrcInput') activitySrcInputRef: ElementRef;
  @ViewChild('activityResultInput') activityResultInputRef: ElementRef;
  @ViewChild('hostInput') hostInputRef: ElementRef;
  @ViewChild('phoneInput') phoneInputRef: ElementRef;
  @ViewChild('notesInput') notesInputRef: ElementRef;

  aprs = [];
  actTypes = [];
  actSrcTypes = [];
  actResultTypes = [];
  newActivityForm: FormGroup;
  activities = new Array();

  constructor(private router: Router, private route: ActivatedRoute,private customerService:CustomerService, private activityService: ActivityService) {
    this.getAprs();
    this.getActivityTypes();
   }

  ngOnInit() {
    this.newActivityForm = new FormGroup({
      'startTime': new FormControl(),
      'endTime': new FormControl(),
      'apr': new FormControl(),
      'activityTypeName': new FormControl(),
      'actSrcType': new FormControl(),
      'actResultCode': new FormControl(),
      'hostName': new FormControl(),
      'phone': new FormControl(),
      'notes': new FormControl()
    });
  }
  changedAgr(val: any) {
    this.getActivitySourceTypes(val);
  }
  changedSrc(val: any) {
    this.getResultTypes(val);
  }
 
  getActivitySourceTypes(index: number) {

    this.activityService.getActivitySourceTypesByActivityType(index)
    .subscribe(
      (data) => {
        try {
          this.actSrcTypes = data['result'];
          this.getResultTypes(data['result'][0]['activityType']);
        } catch (exception) {
          this.actResultTypes = [];
        }
      },
      (error) => console.log(error)
    );
  }
  getResultTypes(index: number) {
    this.activityService.getActivityResultsByActivityType(index)
    .subscribe(
      data => {
        this.actResultTypes = data['result'];
        console.log(this.actResultTypes);
      },
      error => console.log(error)
    );
  }
  getAprs() {
    this.customerService.getCustomerAssign()
    .subscribe(
      (aprCodes: any[]) => {
        this.aprs = aprCodes['result'];
      },
      (error) => console.log(error)
    );
  }
  getActivityTypes() {
    this.activityService.getActivities('types').
    subscribe(
      (data) => {
        console.log(data);
        this.actTypes = data['result'];
        this.getActivitySourceTypes(data['result'][0]['activityType']);
      },
      (error) => console.log(error)
    );
  }
  onSubmit() {
    const startTime = this.startTimeInputRef.nativeElement.value;
    const endTime = this.endTimeInputRef.nativeElement.value;
    const aprCode = this.aprCodeInputRef.nativeElement.value;
    const activityType = this.activityTypeInputRef.nativeElement.value;
    const activitySrc = this.activitySrcInputRef.nativeElement.value;
    const activityResult = this.activityResultInputRef.nativeElement.value;
    const host = this.hostInputRef.nativeElement.value;
    const phone = this.phoneInputRef.nativeElement.value;
    const notes = this.notesInputRef.nativeElement.value;
    this.activityService.createActivity(startTime, endTime, 'ismail', host, notes, phone, activityType, activitySrc, activityResult, aprCode);
  }
  backActivity() {
    this.router.navigate(['/activities'], {relativeTo: this.route});
  }
}


