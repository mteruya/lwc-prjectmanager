import { api,LightningElement,wire } from 'lwc';
import getTimesheetByProjectId from  '@salesforce/apex/TimesheetController.getTimesheetByProjectId';
import { CurrentPageReference } from 'lightning/navigation';

export default class TimesheetList extends LightningElement {
    @api projectId;

    timesheets;

    @wire(getTimesheetByProjectId, { projectId: '$projectId' })
    wiredProjects({ error, data }) {
      if (data) {
        this.timesheets = data;
      } else if (error) {
        console.error('Error retrieving Timesheets:', error);
      }
    }


}