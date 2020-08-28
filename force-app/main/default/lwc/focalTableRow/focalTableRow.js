import { LightningElement,api } from 'lwc';

export default class FocalTableRow extends LightningElement {
    @api account;
    @api recordId;
    @api isEdit;

    editRecord(event){
console.log('data-->'+this.recordId);
var recId = this.recordId;
const rowDataEvent = new CustomEvent("editaccount",{
detail:{recId}
});
this.dispatchEvent(rowDataEvent);
    }
}