import { LightningElement, track, api, wire } from 'lwc';
import getAccountList from '@salesforce/apex/LWCAccountHandler.getAccounts';

export default class FocalTableComponent extends LightningElement {
    @wire(getAccountList) 
    handleAccounts(accounts,error){
        this.accounts = accounts.data;
    }
    @track columns = [
        { 'label': 'Id', 'fieldName': 'Id' },
        { 'label': 'Name', 'fieldName': 'Name' },
        { 'label': 'Phone', 'fieldName': 'Phone' },
        { 'label': 'Edit', 'fieldName': 'Edit' }
    ];
    @track accounts;

    handeleditaccount(event){
        var editvalue=event.detail.rowId;
        console.log("editvalue->"+editvalue);
        for(var i=0;i<this.accounts.length;i++){
            if(this.accounts[i].Id==editvalue){
                console.log("accounts-->"+JSON.stringify(this.accounts[i]));
                break;
            }
        }
    }

    handlevalue(event){
            console.log("event->"+JSON.stringify(event.detail));
            this.accounts =event.detail.temp;
    }

}