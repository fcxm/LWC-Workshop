public with sharing class LWCAccountHandler {
    public LWCAccountHandler() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        List<Account> result = null;
        try{
            result = [SELECT Id, Name, Type,Phone fROM Account where Name!=null and Phone != null];
        }
        catch (Exception ex) {
            //handle exception
        }
        return result;
    }
    

}