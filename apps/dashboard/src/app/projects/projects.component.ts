import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService, AppState, ProjectActions, initialProjects,
} from '@workshop/core-data';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";

const emptyProject = (): Project => {
  return {
    id: null,
    title: '',
    details: '',
    percentComplete: 0,
    approved: false,
    customerId: null
  }
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  project$: Observable<Project>;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<AppState>,
    private ns: NotificationsService
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map(it => it.entities),
      map(it => Object.keys(it).map((k => it[k])))
    );
    this.project$ = store.pipe(
      select('projects'),
      map(state => {
        return state.ids.includes(<string & number>state.selectedProjectId)
          ? state.entities[state.selectedProjectId]
          : emptyProject()
      })
    )
  }

  ngOnInit() {
    this.getCustomers();
    this.getProjects();
  }

  resetCurrentProject() {
    this.store.dispatch(ProjectActions.Select())
  }

  selectProject(project) {
    this.store.dispatch(ProjectActions.Select(project.id))
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(ProjectActions.Create(project))
    this.ns.emit('Project created!')
    this.resetCurrentProject()
  }

  updateProject(project) {
    this.store.dispatch(ProjectActions.Update(project))
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(ProjectActions.Delete(project))
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }

  private getProjects() {
    this.store.dispatch(ProjectActions.Load())
  }
}

