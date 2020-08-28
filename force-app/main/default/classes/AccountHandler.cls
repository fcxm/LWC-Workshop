public class AccountHandler {
    public static Account insertNewAccount (String accName){
        Account b=new Account();
        b.Name=accName;
        try {
    // This causes an exception because 
    //   the required Name field is not provided.
    
    // Insert the account 
    insert b;
    return b;        
} catch (DMLException e) {
   return null;
}
        
    }
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountList (){
        List<Account> result = null;
        try{
        result= [Select Id, Name, Phone from Account WHERE Name != null AND Phone != null LImit 10];
        }catch(Exception ex){

        }
        return result;
    }
    @AuraEnabled
    public static void saveAccounts(Account accRecord){
            
            update accRecord;
    }
}