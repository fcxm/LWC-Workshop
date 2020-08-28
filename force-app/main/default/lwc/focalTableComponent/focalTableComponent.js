import { LightningElement, track, api, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountHandler.getAccountList';

export default class FocalTableComponent extends LightningElement {
    @track inlineEdit = false;
    @track accounts;
    @wire(getAccountList) 
    handleAccounts(acc,error){
        this.accounts = acc.data;
    }
    @track columns = [
        { 'label': 'Id', 'fieldName': 'Id' },
        { 'label': 'Name', 'fieldName': 'Name' },
        { 'label': 'Phone', 'fieldName': 'Phone'},
        { 'label': 'Edit', 'fieldName': 'Edit' }
    ];
    
   /* connectedCallback(){
      console.log("length->"+this.accounts.length);
      for(var i=0; i < this.accounts.length; i++){
          this.accounts[i]['editable']= 'false';
      }
    } */
    handeleditaccount(event){
        var editvalue=event.detail.rowId;
        console.log("editvalue->"+editvalue);
        for(var i=0;i<this.accounts.length;i++){
            if(this.accounts[i].Id==editvalue){
                this.inlineEdit=true;
                console.log("accounts-->"+JSON.stringify(this.accounts[i]));
                break;
            }
        }
    }
    handleSave(){
        
    }

    /*handlevalue(event){
            console.log("event->"+JSON.stringify(event.detail));
            this.accounts =event.detail.temp;
    }*/
    closeNameBox(event){
        console.log("close");
        this.inlineEdit = false;
    }
    onIdChange(event){
        var idText = event.target.value;
        console.log("idText->"+idText);
    }
    onNameChange(event){
        var nameText = event.target.value;
        console.log("nameText->"+nameText);
        for(var i=0; i<this.accounts;i++ ){
            this.accounts[i].Name = nameText;
        }
      /*  let element = this.accounts.find(ele  => ele.Id === event.target.dataset.id);
        console.log("element->"+JSON.stringify(element));
        element.Name = nameText;
       // this.accounts = [...this.accounts];
        console.log(JSON.stringify(this.accounts)); */
    }
    onPhoneChange(event){
        var phoneText = event.target.value;
        console.log("phoneText->"+phoneText);
    }


}