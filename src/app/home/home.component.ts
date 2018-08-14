import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { CustomerService } from '../shared/customer.service';
import { CollectionService } from '../shared/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numCustomer : number;
  numCredits : number;
  numCollection : number;
  numAsset : number;
  numLawtask : number;
  numLawsuit : number;
  numLawcase : number;
  customers : string[] = [];
  credits = new Array();
  tempCredits = [];
  allcredits :any;
  constructor(private router: Router,private collectionService:CollectionService,private customerService:CustomerService, private userService : UserService ,  private route: ActivatedRoute) { }

  ngOnInit() {  
    let isToken: boolean = this.userService.checkToken();
    if (!isToken) {
      this.router.navigate(['/login'], {relativeTo: this.route});
    } 
    this.customerService.getCustomerAssign()
    .subscribe(
      (data: any[]) => {
        this.numCustomer = data['result'].length;
      }
    ); 
    this.collectionService.getCollections('2017-01-01', '2018-06-01')
    .subscribe(
      (data: any[]) => {
        this.numCollection = data['result'].length;
      }
    );  

    this.customerService.getCustomerAssign()
    .subscribe(
      (data: any[]) => {       
        this.customers = data['result'];      
        for (const customer of this.customers) {
          this.customerService.getCustomerInfo(customer)
          .subscribe(
            (data: any[]) => {
              let tempCredits = data['result'][0]['custCreditInfo'];
              for (const credit of tempCredits) {
                    this.credits.push(credit);
                this.allcredits=this.credits;
                this.numCredits=this.allcredits.length;
                console.log(this.numAsset);
              }
            }
          ); 
        }      
      },
      (error) => console.log(error)
    ); 
    this.customerService.getCustomerAssign()
    .subscribe(
      (data: any[]) => {     
        console.log(data);   
        this.customers = data['result'];    
        console.log(this.customers);   
        for (const customer of this.customers) {
          this.customerService.getAssets(customer)
          .subscribe(
            (data: any[]) => {
              console.log(data);
              let tempCredits = data['result'];
              console.log(tempCredits);
              for (const credit of tempCredits) {
                this.credits.push(credit);
                this.allcredits=this.credits;
                this.numAsset=this.allcredits.length;
                console.log(this.numAsset);
              }
            }
          ); 
        }  
      
      },
      (error) => console.log(error)
    ); 





}
}
