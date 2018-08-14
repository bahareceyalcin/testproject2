import { Component } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CollectionService } from '../shared/collection.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{
  customers : string[] = [];
  protocols : any[] = [];
  collections : any[] = [];
  contacts = [];
  contactInfosAddress = [];
  contactInfosPhones = [];
  customerInfos = [];
  customerInfo = [];
  credits = [];
  allcredits = [];
  assets = [];
  lawsuits = [];
  lawcases = [];
  lawtasks = [];
  aprCode : string;
  modal = document.getElementsByClassName('modal') as HTMLCollectionOf<HTMLElement>;
  modal2 = document.getElementsByClassName('popup') as HTMLCollectionOf<HTMLElement>;
  modalType : string = null;
  modalName : string = null;
  modalType2 : string = null;
  modalName2 : string = null;
  oldAccordion = null;
  additionalInfos = [];
  custRegInfos = [];
  lawService: any;
  lawsuitscredits=[];
  lawsuitsparties=[];
  lawcasesparties=[];
  lawcasescredits=[];
  lawtaskscredits=[];
  lawtasksparties=[];
 
    constructor(private customerService : CustomerService,private collectionService:CollectionService ) { 
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
        this.customerService.getCustomerInfo(aprCode)
        .subscribe(
          (data: any[]) => {
            this.customerInfos = data['result'][0];
            this.setAccordion(index);  
          },
          (error) => console.log(error)
        );  
      } else {
        this.setAccordion(index);
      } 
    }
    selectedCustomergetCustomerInfo(event, aprCode : string, index : number){            
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          this.customerInfo = data['result'][0];
          this.modalType = 'customerInfos';
          this.modalName='Borçlu Bilgileri';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        },
        (error) => console.log(error)
      );  
    }
    selectedCustomergetContactInfo(event,aprCode:string){
      this.customerService.getContactInfo(aprCode)
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.contacts = data['result'];
        this.contactInfosAddress = data['result'][0]['address'];
        this.contactInfosPhones = data['result'][0]['phones'];
        // this.modalType = 'contacts';
        // this.modalName='İletişim Bilgileri';
        // this.modal[0].classList.add('in');
        // this.modal[0].style.display = 'block';
      },
      (error) => console.log(error)
      );   
    }
    selectedCustomergetCustomerAdditionalInfo(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
       
          this.additionalInfos = data['result'][0]['custAdditionalInfo'];
          this.modalType2 = 'additionalInfos';
          this.modalName2='Ek Bilgiler'
          this.modal2[0].classList.add('in');
          this.modal2[0].style.display = 'block';
        }
      );
    }
    selectedCustomerRegInfo(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.custRegInfos = data['result'][0]['custRegInfo'];
          this.modalType2= 'custRegInfos';
          this.modalName2='Kimlik Bilgileri'
          this.modal2[0].classList.add('in');
          this.modal2[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetProtocols(event,aprCode:string){
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
    selectedCustomergetAssets(event,aprCode:string){
      this.customerService.getAssets(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.assets = data['result'];
          // this.modalType = 'assets';
          // this.modalName='Mal Varlıkları'
          // this.modal[0].classList.add('in');
          // this.modal[0].style.display = 'block';
        },
        (error) => console.log(error)
      );  
    }
    selectedCustomergetCollections(event,aprCode:string){
      this.collectionService.getCollections('2018-01-01','2018-06-01')
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.collections = data['result'];
          // this.modalType = 'collections';
          // this.modalName='Tahsilatlar'
          // this.modal[0].classList.add('in');
          // this.modal[0].style.display = 'block';
        },
        (error) => console.log(error)
      );  
    }
    selectedCustomergetCredits(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.credits = data['result'][0]['custCreditInfo'];
          // this.modalType = 'credits';
          // this.modalName='Krediler'
          // this.modal[0].classList.add('in');
          // this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetProtocolCredit(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.credits = data['result'][0]['custCreditInfo'];
          this.modalType = 'credits';
          this.modalName='Krediler'
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetProtocolInstallment(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.credits = data['result'][0]['installments'];
          this.modalType = 'installments';
          this.modalName='Ödemeler'
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetProtocolApproval(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.credits = data['result'][0]['approvals'];
          this.modalType = 'approvals';
          this.modalName='Onaylar'
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetLawSuits(event,aprCode:string){
      console.log(aprCode);
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          
          this.lawsuits = data['result'][0]['custLawSuitInfo'];
          // this.modalType = 'lawsuits';
          // this.modalName='İcra';
          // this.modal[0].classList.add('in');
          // this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetLawCases(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          this.lawcases = data['result'][0]['custLawCaseInfo'];
        //   this.modalType = 'lawcases';
        //   this.modalName='Dava';
        //   this.modal[0].classList.add('in');
        //   this.modal[0].style.display = 'block';
         }
      );
    }
    selectedCustomergetLawTasks(event,aprCode:string){
      this.customerService.getCustomerInfo(aprCode)
      .subscribe(
        (data: any[]) => {
          this.lawtasks = data['result'][0]['custLawTaskInfo'];
          // this.modalType = 'lawtasks';
          // this.modalName='Yasal İşlemler';
          // this.modal[0].classList.add('in');
          // this.modal[0].style.display = 'block';
        }
      );
    }   
    selectedCustomergetLawSuitsCredits(event,aprCode:string){
      console.log(aprCode);
      this.lawService.getLawSuits(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.lawsuitscredits = data['result'][0]['credits'];
          this.modalType = 'lawsuitscredits';
          this.modalName='İcra-Krediler';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetLawSuitsParties(event,aprCode:string){
      console.log(aprCode);
      this.lawService.getLawSuits(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.lawsuitsparties = data['result'][0]['parties'];
          this.modalType = 'lawsuitsparties';
          this.modalName='İcra-Taraflar';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetLawCasesCredits(event,aprCode:string){
      console.log(aprCode);
      this.lawService.getLawCases(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.lawcasescredits= data['result'][0]['credits'];
          this.modalType = 'lawcasescredits';
          this.modalName='Dava-Krediler';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    } 
    selectedCustomergetLawCasesParties(event,aprCode:string){
      this.lawService.getLawCases(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.lawcasesparties = data['result'][0]['parties'];
          this.modalType = 'lawcasesparties';
          this.modalName='Dava-Taraflar';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }
    selectedCustomergetLawTasksCredits(event,aprCode:string){
      this.lawService.getLawTasks(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          console.log(data['result']);
          this.lawtaskscredits = data['result'][0]['credits'];
          this.modalType = 'lawtaskscredits';
          this.modalName='Yasal İşlemler-Krediler'
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
    }   
    selectedCustomergetLawTasksParties(event,aprCode:string){
      this.lawService.getLawTasks(aprCode)
      .subscribe(
        (data: any[]) => {
          console.log(aprCode);
          this.lawtasksparties = data['result'][0]['parties'];
          this.modalType = 'lawtasksparties';
          this.modalName='Yasal İşlemler-Partiler';
          this.modal[0].classList.add('in');
          this.modal[0].style.display = 'block';
        }
      );
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
          this.customerInfos.length = 0;
          this.oldAccordion = null;          
        } else {
          this.setClass(index);
        }    
      } else {     
        this.setClass(index);
      }
    }
    closeModal() {
      this.protocols = [];
      this.modal[0].classList.remove('in');
      this.modal[0].style.display = 'none';
    }
    closeModal2() {
      this.protocols = [];
      this.modal2[0].classList.remove('in');
      this.modal2[0].style.display = 'none';
    }
}
