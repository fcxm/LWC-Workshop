import { LightningElement,track,api } from 'lwc';

export default class FocalRowComponent extends LightningElement {
    @api fieldValue;
    @api recordId;
    @api isEdit;
    connectedCallback(){
      //  console.log("rowData->"+JSON.stringify(this.acc));
      /*  var temp = this.rowdata;
        const rowDataEvent = new CustomEvent("rowvalues", {
            detail: { temp }
          });
          // Fire the custom event
          this.dispatchEvent(rowDataEvent); */
    }
    editRecord(event){
        console.log("-->"+this.recordId);
        var rowId = this.recordId;
        const rowDataEvent = new CustomEvent("editaccount", {
            detail: { rowId }
          });
          // Fire the custom event
          this.dispatchEvent(rowDataEvent);
       // console.log("-->"+JSON.stringify(this.fieldValue));

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