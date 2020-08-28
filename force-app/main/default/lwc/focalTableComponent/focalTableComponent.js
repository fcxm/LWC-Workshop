import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/LWCAccountHandler.getAccounts';
import id from '@salesforce/user/Id';
export default class FocalTableComponent extends LightningElement {

    @track columns = [
        {label: 'Id',fieldName: 'Id' },
        {label: 'Name',fieldName: 'Name' },

        {label: 'Phone',fieldName: 'Phone' },
        {label: 'Edit',fieldName: 'Edit' }
        
    
];
@track accounts;


@wire(getAccounts)
handleAccounts(accounts, error) {
    this.accounts= accounts.data;
}
handleeditaccount(event){
    var editvalue = event.detail.recId;
    console.log("editvalue---> "+ editvalue);
    for(var i=0; i<this.accounts.length;i++){
        if(this.accounts[i].Id == editvalue){
            console.log("accountslist--->"+ JSON.stringify(this.accounts[i]));
}
}
} 
}