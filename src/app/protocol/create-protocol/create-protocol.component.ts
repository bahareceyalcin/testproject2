import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { ActivityService } from '../../shared/activity.service';
import { ProtocolService } from '../../shared/protocol.service';

@Component({
  selector: 'app-create-protocol',
  templateUrl: './create-protocol.component.html',
  styleUrls: ['./create-protocol.component.css']
})
export class CreateProtocolComponent implements OnInit {
  @ViewChild('docDescInput') docDescInputRef: ElementRef;
  @ViewChild('currCodeInput') currCodeInputRef: ElementRef;
  @ViewChild('aprCodeInput') aprCodeInputRef: ElementRef;
  @ViewChild('firstRecUserInput') firstRecUserInputRef: ElementRef;
  @ViewChild('firstHostNameInput') firstHostNameInputRef: ElementRef;
  @ViewChild('creditsInput') creditsInputRef: ElementRef;
  @ViewChild('installmentsInput') installmentsInputRef: ElementRef;
  @ViewChild('dueDateInput') dueDateInputRef: ElementRef;
  @ViewChild('instAmountInput') instAmountInputRef: ElementRef;
  @ViewChild('notesInput') notesInputRef: ElementRef;

  aprs = [];
  newProtocolForm: FormGroup;
  protocols = new Array();

  constructor(private router: Router, private route: ActivatedRoute,private customerService:CustomerService, private activityService: ActivityService,private protocolService:ProtocolService) { 
    this.getAprs();
  }

  ngOnInit() {
    this.newProtocolForm = new FormGroup({
      'docDesc': new FormControl(),
      'currCode': new FormControl(),
      'aprCode': new FormControl(),
      'firstRecUser': new FormControl(),
      'firstHostName': new FormControl(),
      'credits': new FormControl(),
      'installments': new FormControl(),
      'dueDate': new FormControl(),
      'instAmount': new FormControl(),
      'notes': new FormControl()
    });
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
  onSubmit() {
    const docDesc = this.docDescInputRef.nativeElement.value;
    const currCode = this.currCodeInputRef.nativeElement.value;
    const aprCode = this.aprCodeInputRef.nativeElement.value;
    const firstRecUser = this.firstRecUserInputRef.nativeElement.value;
    const firstHostName = this.firstHostNameInputRef.nativeElement.value;
    const credits = this.creditsInputRef.nativeElement.value;
    const installments = this.installmentsInputRef.nativeElement.value;
    const dueDate = this.dueDateInputRef.nativeElement.value;
    const instAmount = this.instAmountInputRef.nativeElement.value;
    const notes = this.notesInputRef.nativeElement.value;
    this.protocolService.createProtocol(docDesc, currCode, aprCode, firstRecUser, firstHostName, credits, installments, dueDate, instAmount, notes);
  }
  backProtocols() {
    this.router.navigate(['/protocols'], {relativeTo: this.route});
  }

}
