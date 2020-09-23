import { LightningElement,api } from 'lwc';

export default class FocalTableRow extends LightningElement {
    @api account;
    @api recordId;
    @api isEdit;
   
    editRecord(event){
console.log('data-->'+this.recordId);
var rowId = this.recordId;
const rowDataEvent = new CustomEvent("editaccount",{
detail:{rowId}
});
this.dispatchEvent(rowDataEvent);
    }
    handleClick(event) {
        console.log("In HandleClick");
        const recId = event.target.name;
        this.rec2Id = event.currentTarget.name;
        console.log("Selected Account Id-->", recId);
        console.log("Selected Account Id rec2Id -->", this.rec2Id);
     
    }
}