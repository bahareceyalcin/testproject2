import { Component } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent{
  customers : string[] = [];
  oldAccordion: any;
  customerInfos: any;
  assets: any;

  constructor(private customerService:CustomerService) {
    this.customerService.getCustomerAssign()
    .subscribe(
      (data: any[]) => {        
        this.customers = data['result'];        
      },
      (error) => console.log(error)
    ); 
   }
  selectedCustomergetCustomerInfos(event, aprCode : string, index : number){            
    if(this.oldAccordion != index) {
      this.customerService.getAssets(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.assets = data['result'];
          this.setAccordion(index);  
        },
        (error) => console.log(error)
      );  
    } else {
      this.setAccordion(index);
    } 
  }
  setClass(index) {
    this.oldAccordion = index;
    document.getElementById(index).classList.add('in');
  }  
  removeClass() {   
    document.getElementById(this.oldAccordion).classList.remove('in');
  }
  setAccordion(index) {
    if (this.oldAccordion != null) {       
      this.removeClass();      
      if(this.oldAccordion == index) {                    
        this.assets.length = 0;
        this.oldAccordion = null;          
      } else {
        this.setClass(index);
      }    
    } else {     
      this.setClass(index);
    }
  }
}
