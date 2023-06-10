import { api, wire } from "lwc";
import getTimesheetByProjectId from "@salesforce/apex/TimesheetController.getTimesheetByProjectId";
import LightningModal from "lightning/modal";
export default class TimesheetList extends LightningModal {
  @api projectId;

  timesheets;

  @wire(getTimesheetByProjectId, { projectId: "$projectId" })
  wiredProjects({ error, data }) {
    if (data) {
      this.timesheets = data;
    } else if (error) {
      console.error("Error retrieving Timesheets:", error);
    }
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent("closeModal"));
  }
}
