import { LightningElement, wire, track } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getPagedProjects from "@salesforce/apex/ProjectController.getPagedProjects";
import addProjectForm from "c/addProjectForm";
import timesheetList from "c/timesheetList";

const PAGE_SIZE = 10;
const actions = [{ label: "Timesheet", name: "timeSheet" }];
const COLUMNS = [
  { label: "Project Name", fieldName: "Name", type: "text" },
  { label: "Description", fieldName: "Total_Hours__c", type: "text" },
  // { label:'Type', fieldName:'ProjectType__c', type:'Picklist'},
  { label: "Start Date", fieldName: "Start_Date__c", type: "text" },
  { label: "Total Hours", fieldName: "Total_Hours__c", type: "text" },
  // { label:'Account', fieldName:'Account__r.Name', type:'text'},
  // { label:'Opportunity', fieldName:'Opportunity__r.Name', type:'text'},
  // Add more columns as needed
  {
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];

export default class ProjectList extends LightningElement {
  selectedProjectId;
  columns = COLUMNS;

  @track projects;
  @track currentPage = 1;
  @track totalProjects = 0;

  @wire(getPagedProjects, { pageNumber: "$currentPage", pageSize: PAGE_SIZE })
  wiredProjects({ error, data }) {
    console.log(data);
    if (data) {
      this.projects = data.projects;
    } else if (error) {
      console.log("error", error);
    }
  }

  handleProjectClick(event) {
    this.selectedProjectId = event.currentTarget.dataset.id;
  }

  // Method to refresh the projects list after a new project is added
  refreshProjects() {
    console.log("refresh");
    return refreshApex(this.wiredProjects);
  }

  // Modal
  openModal() {
    addProjectForm.open().then((result) => {
      console.log(result);
      if (result === "success") {
        this.refreshProjects();
      }
    });
  }

  // Modal
  openTimesheetModal() {
    timesheetList.open({ projectId: this.selectedProjectId }).then((result) => {
      console.log(result);
      if (result === "success") {
        this.refreshProjects();
      }
    });
  }
  get isFirstPage() {
    return this.currentPage === 1;
  }

  get isLastPage() {
    return Math.ceil(this.totalProjects / PAGE_SIZE) === this.currentPage;
  }

  goToFirstPage() {
    this.currentPage = 1;
  }

  goToPreviousPage() {
    this.currentPage--;
  }

  goToNextPage() {
    this.currentPage++;
  }

  goToLastPage() {
    this.currentPage = Math.ceil(this.totalProjects / PAGE_SIZE);
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "edit":
        this.viewDetails(row);
        break;
      case "view":
        this.viewDetails(row);
        break;
      case "timeSheet":
        this.selectedProjectId = row.Id;
        this.openTimesheetModal();
        break;
      default:
    }
  }
  viewDetails(row) {
    this.record = row;
  }
}
