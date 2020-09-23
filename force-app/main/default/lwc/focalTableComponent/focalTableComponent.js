import { LightningElement,track,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ID_FIELD from '@salesforce/schema/Account.Id';
import getAccountList from '@salesforce/apex/LWCAccountHandler.getAccountList';

export default class FocalTableComponent extends LightningElement {

    @track columns = [{'label':'Id', 'fieldName':'Id'},
                        {'label':'Name', 'fieldName':'Name', 'editable': true},
                        {'label':'Phone', 'fieldName':'Phone'},
                        {'label':'Action', 'fieldName': 'Edit'}];

    @track accounts;
    @api recordLimit;
    @track inlineEdit = false;
    @track accName;
    @track recId;
    @track accPhone;
    wiredAccountsResult;

    @wire(getAccountList,{recordLimit:'$recordLimit'})
    handleAccounts(acc, error) {
        this.wiredAccountsResult = acc;
        this.accounts = acc.data;
        console.log("acconts->" + JSON.stringify(this.accounts));

    }

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
                console.log("updated-->" + recordInput);
                return refreshApex(this.wiredAccountsResult);
            })
            .catch(error => {
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
    }
    onNameChange(event) {
        var nameText = event.target.value;
        this.accName = nameText;
        console.log("nameText->" + this.accName + "recId->" + this.recId);
    }
    onPhoneChange(event) {
        var phoneText = event.target.value;
        this.accPhone = phoneText;
        console.log("phoneText->" + this.accPhone);
    }
}