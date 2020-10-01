import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ID_FIELD from '@salesforce/schema/Account.Id';
import getAccountList from '@salesforce/apex/LWCAccountHandler.getAccountList';

export default class FocalTableComponent extends LightningElement {
    @track inlineEdit = false;
    @track accounts;
    @api recordLimit;
    @track accName;
    @track recId;
    @track accPhone;
    wiredAccountsResult;
    @wire(getAccountList,{recordLimit:'$recordLimit'})
    handleAccounts(acc, error) {
        /* var tempacconts = JSON.parse(JSON.stringify(acc));
         for(var i=0; i <tempacconts.length; i++){
             tempacconts[i]['editable']= 'false';
         }
         console.log("tempaccount-->"+JSON.stringify(tempacconts)); */
        this.wiredAccountsResult = acc;
        this.accounts = acc.data;
        console.log("acconts->" + JSON.stringify(this.accounts));

    }
    @track columns = [
        { 'label': 'Id', 'fieldName': 'Id' },
        { 'label': 'Name', 'fieldName': 'Name' },
        { 'label': 'Phone', 'fieldName': 'Phone' },
        { 'label': 'Edit', 'fieldName': 'Edit' }
    ];

    /* connectedCallback(){
       console.log("length->"+this.accounts.length);
       for(var i=0; i < this.accounts.length; i++){
           this.accounts[i]['editable']= 'false';
       }
     } */
    handeleditaccount(event) {
        var editvalue = event.detail.rowId;
        console.log("editvalue->" + editvalue);
        this.recId = editvalue;
        var tempacc = JSON.parse(JSON.stringify(this.accounts));
        for (var i = 0; i < tempacc.length; i++) {
            if (tempacc[i].Id == editvalue) {
                tempacc[i].Editable = true;
                console.log("accounts-->" + JSON.stringify(tempacc[i]));
                this.accounts = tempacc;
                break;
            }
        }
    }
    handleSave(event) {
        console.log(this.accName + "--save--" + this.accPhone + "acconutid->" + this.recId);
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recId;
        fields[NAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='Name']").value;
        fields[PHONE_FIELD.fieldApiName] = this.template.querySelector("[data-field='Phone']").value;
        console.log("fields->" + JSON.stringify(fields));
        const recordInput = { fields };
        console.log("recordInput->" + JSON.stringify(recordInput));

        updateRecord(recordInput)
            .then(() => {
                /* this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Success',
                         message: 'Account updated',
                         variant: 'success'
                     })
                 ); */
                console.log("updated-->" + recordInput);
                return refreshApex(this.wiredAccountsResult);
            })
            .catch(error => {
                /* this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Error creating record',
                         message: error.body.message,
                         variant: 'error'
                     })
                 ); */
                console.log("error-->" + error);
            });

    }
    handleCancel(event) {
        var tempacc = JSON.parse(JSON.stringify(this.accounts));
        for (var i = 0; i < tempacc.length; i++) {
            if (tempacc[i].Id == this.recId) {
                tempacc[i].Editable = '';
                console.log("accounts-->" + JSON.stringify(tempacc[i]));
                this.accounts = tempacc;
                break;
            }
        }
        //this.inlineEdit = false;
    }
    onNameChange(event) {
        var nameText = event.target.value;
        this.accName = nameText;
        //this.recId = event.target.dataset.id
        console.log("nameText->" + this.accName + "recId->" + this.recId);
    }
    onPhoneChange(event) {
        var phoneText = event.target.value;
        this.accPhone = phoneText;
        //this.recId = event.target.dataset.id
        console.log("phoneText->" + this.accPhone);
    }


}