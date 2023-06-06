public with sharing class TimesheetController {


    @AuraEnabled(Cacheable=true)
    public static List<Timesheet__C>  getTimesheetByProjectId(Id projectId) {
        return [
            SELECT
            Id,
            Name,
            Consultant__r.Name,
            Task_Date__c,
            Total_Hours__c,
            Task_Description__c
        FROM
            Timesheet__c
        WHERE Project_Name__c = :projectId
        ];
    }
}