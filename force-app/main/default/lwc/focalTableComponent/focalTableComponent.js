import { LightningElement,track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/LWCAccountHandler.getAccounts';

export default class FocalTableComponent extends LightningElement {

//accounts
@track accounts;

@track columns = [{'label':'Id','fieldName':'Id'},
                    {'label':'Name','fieldName':'Name'},
                    {'label':'Phone','fieldName':'Phone'},
                    {'label':'Edit','fieldName':'Edit'}];

@wire(getAccounts)
        handleAccounts(accounts,error){
                        this.accounts = accounts.data;
                  } 

                    handleAccount(event){
                        console.log('Account after edited');
                        var evalue =  event.detail.rowId;
                        console.log('evalue '+evalue);
                        console.log('this.account[i].Id ?? '+JSON.stringify(this.accounts));
                        var obj = JSON.stringify(this.accounts);
                        console.log('obj value '+JSON.parse(obj));
                         
                        for(var i = 0 ; i<this.accounts.length;i++){
                           
                           console.log('Inside for loop == '+JSON.stringify(this.accounts[i].Id));
                           
                            if(JSON.stringify(this.accounts[i].Id) === evalue){
                                console.log('Account  '+JSON.stringify(this.accounts[i].Id));
                            }else{
                                console.log('There is no Record ');
                            }

                        }

                        

                    }




                    






}