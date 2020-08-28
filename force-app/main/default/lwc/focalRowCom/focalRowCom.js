import { LightningElement ,api} from 'lwc';

export default class FocalRowCom extends LightningElement {

    @api acc;
    clickedButtonLabel;
    @api isEdit = false;

    handleClick(event) {
        const rowevent = new CustomEvent("editaccount",{
            detail:this.acc
        });
        this.dispatchEvent(rowevent);
    }
}