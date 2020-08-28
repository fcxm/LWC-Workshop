/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-23-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   08-23-2020   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LWCAccountHandler {
    public LWCAccountHandler(){
        
    }
 @auraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
List<Account> result = null;
try{
    //get the result
result = [SELECT Id, Name, Phone from Account where Name !=Null ];
}catch(exception e){
   
    //Handle Exception
}
return result;
    }

}