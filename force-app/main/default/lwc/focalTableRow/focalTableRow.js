import { LightningElement,track,api } from 'lwc';

export default class FocalTableRow extends LightningElement {
    @api account;
    @api recordId;
    @api isEdit;
    connectedCallback(){
      
    }
    editRecord(event){
        console.log("-->"+this.recordId);
        var rowId = this.recordId;
        const rowDataEvent = new CustomEvent("editaccount", {
            detail: { rowId }
          });
          // Fire the custom event
          this.dispatchEvent(rowDataEvent);
       // console.log("-->"+JSON.stringify(this.account));

    }

    handleClick(event) {
        console.log("In HandleClick");
        const recId = event.target.name;
        this.rec2Id = event.currentTarget.name;
        console.log("Selected Account Id-->", recId);
        console.log("Selected Account Id rec2Id -->", this.rec2Id);
      //  this.open = true;
    }
}