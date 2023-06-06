import { LightningElement, wire,track  } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getProjects from '@salesforce/apex/ProjectController.getProjects';
import addProjectForm from 'c/addProjectForm';

export default class ProjectList extends LightningElement {
  selectedProjectId;
  @track  showModal = false;

  @track projects;


  @wire(getProjects)
  wiredProjects
//   ({ error, data }) {
//     if (data) {
//       this.projects = data;
      
//     } else if (error) {
//       console.error('Error retrieving projects:', error);
//     }
//   }
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
    //this.showModal = true;
    addProjectForm.open().then((result) => {
        console.log(result);
        if(result==="success"){
            this.refreshProjects();
        }
        
    });
  }

}
