public  with sharing class LWCAccountHandler {
    public static final integer defaultLimit = 10;
    public  LWCAccountHandler(){
    }
    
    @auraEnabled (cacheable = true)
    public static list<Account> getAccounts(String recordLimit){
        List<Account> result =null;
        Integer lmt = convertstrtoint(recordLimit);
        try{
            //my business 
            result = [select Id, Name, Phone from Account where Name !=null and Phone != null limit :lmt];
        }
        catch(Exception ex){
            
        }
        return result;  
    }
    
    private static Integer convertstrtoint(String a){
        try{
            return Integer.valueOf(a);
        }
        catch(Exception ex){
            system.debug('catch exception ' +ex);
            return defaultLimit;
        }
    }
    public static Account insertNewAccount (String accName){
        Account b=new Account();
        b.Name=accName;
        try {
            insert b;
            return b;        
        } catch (DMLException e) {
            return null;
        } 
    }
    @AuraEnabled
    public static void saveAccounts(Account accRecord){
        
        update accRecord;
    }
}