public  with sharing class LWCAccountHandler {
    public  LWCAccountHandler(){
    }

    @auraEnabled (cacheable = true)
    public static list<Account> getAccounts(){
        List<Account> result =null;
        try{
                //my business 
                result = [select Id, Name, Phone from Account where Name !=null and Phone != null limit 20];
        }
        catch(Exception ex){

        }
        return result;
        
    }
}