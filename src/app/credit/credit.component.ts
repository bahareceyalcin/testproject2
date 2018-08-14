import { Component} from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent {
  customers : string[] = [];
  credits = new Array();
  allcredits = [];
  constructor(private customerService: CustomerService) { 
    this.customerService.getCustomerAssign()
    .subscribe(
      (data: any[]) => {     
        console.log(data);   
        this.customers = data['result'];    
        console.log(this.customers);   
        for (const customer of this.customers) {
          this.customerService.getCustomerInfo(customer)
          .subscribe(
            (data: any[]) => {
              console.log(data);
              let tempCredits = data['result'][0]['custCreditInfo'];
              for (const credit of tempCredits) {
                this.credits.push(credit);
              }
            }
          ); 
        }  
        this.allcredits=this.credits;
      },
      (error) => console.log(error)
    ); 
   }
}
