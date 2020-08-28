import { LightningElement,track,wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/LWCAccountHandler.getAccounts'

export default class FocalTableComponent extends LightningElement {

@track columns = [{'label':'Id','fieldName':'Id'},
                        {'label':'Name','fieldName':'Name'},
                        {'label':'Phone','fieldName':'Phone'},
                        {'label':'Edit','fieldName':'Edit'}];

    @track accounts;
    /* = [
        {"Name":"Phani","Phone":"19191919191","Id":"Acc_101"},
        {"Id":"Acc_101","Name":"Sammeta","Phone":"223344556611"},
        {"Id":"Acc_101","Name":"Kumar","Phone":"9988776655"}
    ]; */

    @wire(getAllAccounts)
        handleAccounts(accounts,error){
            this.accounts = accounts.data;
        }
    rowevent(event){
        console.log(JSON.stringify(event.detail));
        alert(event.detail.acc);
        alert(event.detail.acc.Id);
        alert(event.detail.acc.Name);
        alert(event.detail.acc.Phone);
    }

}