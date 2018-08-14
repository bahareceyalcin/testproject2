import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-protocol-index',
  templateUrl: './protocol-index.component.html',
  styleUrls: ['./protocol-index.component.css']
})
export class ProtocolIndexComponent implements OnInit {
  @ViewChild('aprCodeInput') aprCodeInputRef: ElementRef;
  protocols = [];
  aprs = [];

  constructor(private customerService:CustomerService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAprs();
  }
  changedAgr(val: any) {
    this.selectedCustomergetProtocols(val);
  }
  selectedCustomergetProtocols(aprCode:string){
    this.customerService.getProtocols(aprCode)
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.protocols = data['result'];
        // this.modalType = 'protocols';
        // this.modalName='Protokoller';
        // this.modal[0].classList.add('in');
        // this.modal[0].style.display = 'block';
      },
      (error) => console.log(error)
    );  
  }
    getAprs() {
      this.customerService.getCustomerAssign()
      .subscribe(
        (aprCodes: any[]) => {
          this.aprs = aprCodes['result'];
          this.protocols = aprCodes['result'];

        },
        (error) => console.log(error)
      );
    }

}
