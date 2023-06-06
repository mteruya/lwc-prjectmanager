public with sharing class ProjectController {

    @AuraEnabled(Cacheable=true)
    public static List<Project__c>  getProjects() {
        return [
            SELECT
            Id,
            Name,
            Account_Name__r.Name,
            Opportunity_Name__r.Name,
            Start_Date__c,
            End_Date__c,
            Hours_Worked_To_Date__c,
            Total_Hours__c
        FROM Project__c
        ORDER BY LastModifiedDate DESC
        LIMIT 10];
    }
    @AuraEnabled(Cacheable=true)
    public static Project__c getProjectBiId(Id project_Id) {
        return [
            SELECT
                Id,
                Name,
                Account_Name__r.Name,
                Opportunity_Name__r.Name,
                Start_Date__c,
                End_Date__c,
                Hours_Worked_To_Date__c,
                Total_Hours__c
            FROM Project__c
            WHERE Id = :project_Id
        ];
    }

}