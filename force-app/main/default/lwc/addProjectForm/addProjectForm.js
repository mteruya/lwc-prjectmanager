import { track } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import LightningModal from "lightning/modal";

export default class addProjectForm extends LightningModal {
  @track projectRecord = {};

  handleFieldChange(e) {
    this.projectRecord[e.currentTarget.fieldName] = e.target.value;
  }

  handleCancel() {
    this.close("canceled");
  }
  handleSuccess(event) {
    console.log(event);
    // this.dispatchEvent(
    //   new ShowToastEvent({
    //     title: 'Success',
    //     message: 'Project created successfully',
    //     variant: 'success',
    //   })
    // );
    // Dispatch an event to notify the parent component to refresh the project list
    //this.dispatchEvent(new CustomEvent('refresh'));
    this.close("success");
  }

  handleError(error) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Error",
        message: error.body.message,
        variant: "error"
      })
    );
  }
  handleSubmit(event) {
    event.preventDefault();

    const fields = event.detail.fields;
    fields.Account__c = this.projectRecord.Account__c;
    fields.Opportunity__c = this.projectRecord.Opportunity__c;
    fields.ProjectType__c = this.projectRecord.ProjectType__c;
    fields.Start_Date__c = this.projectRecord.Start_Date__c;
    fields.Total_Hours__c = this.projectRecord.Total_Hours__c;
    fields.Project_Description__c = this.projectRecord.Project_Description__c;

    createRecord({ apiName: "Project__c", fields })
      .then((result) => {
        this.resetForm();
        this.handleSuccess(result);
      })
      .catch((error) => {
        console.log(error);
        this.handleError(error);
      });
  }

  resetForm() {
    const inputFields = this.template.querySelectorAll("lightning-input-field");
    if (inputFields) {
      inputFields.forEach((field) => {
        field.reset();
      });
    }
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent("closeModal"));
  }
}
