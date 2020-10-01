/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-01-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   08-23-2020   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LWCAccountHandler {
  public static final integer defaultLimit = 10;
    public static Account insertNewAccount (String accName){
        Account b=new Account();
        b.Name=accName;
        try {
    
    // Insert the account 
    insert b;
    return b;        
} catch (DMLException e) {
   return null;
}
        
    }
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountList (String recordLimit){
        List<Account> result = null;
        List<Object> lstOfAcconuts = new list<Object>();
        Integer limitnum = convertstrtoint(recordLimit);
        try{
            result= [Select Id, Name, Phone from Account WHERE Name != null AND Phone != null Limit:limitnum];
           /* for (Account r : result) {
                lstOfAcconuts.add(new Map<String, Object> {
                'Id' => r.Id,
                'Name' => r.Name,
                'Phone' => r.Phone
                //'Editable' => 'false'
                });
            } */
        }catch(Exception ex){

        }
        return result;
    }
    @AuraEnabled
    public static void saveAccounts(Account accRecord){
            
            update accRecord;
    }
    
    private static Integer convertstrtoint(String a){
        try{
            return Integer.valueOf(a);
        }
        catch(Exception ex){
            return defaultLimit;
        }
    }

}