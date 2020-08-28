public class LWCAccountHandler {
    public LWCAccountHandler() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> result=null;
        try {
    
            result = [Select Id, Name, Phone from Account where Name !=null and phone !=null limit 10];
        } catch (Exception ex) {

            //handle exception
        }
        return result;
                
    }
               
}