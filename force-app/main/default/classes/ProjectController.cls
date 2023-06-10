public with sharing class ProjectController {
  @AuraEnabled(cacheable=true)
  public static ProjectDataWrapper getPagedProjects(
    Integer pageNumber,
    Integer pageSize
  ) {
    Integer offset = (pageNumber - 1) * pageSize;
    List<Project__c> projects = [
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
      LIMIT :pageSize
      OFFSET :offset
    ];
    Integer totalProjects = [SELECT COUNT() FROM Project__c];
    return new ProjectDataWrapper(projects, totalProjects);
  }

  @AuraEnabled(Cacheable=true)
  public static List<Project__c> getProjects() {
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
      LIMIT 10
    ];
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

  public class ProjectDataWrapper {
    @AuraEnabled
    public List<Project__c> projects { get; set; }
    @AuraEnabled
    public Integer totalProjects { get; set; }

    public ProjectDataWrapper(
      List<Project__c> projects,
      Integer totalProjects
    ) {
      this.projects = projects;
      this.totalProjects = totalProjects;
    }
  }
}
