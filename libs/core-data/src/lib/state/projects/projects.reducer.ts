import {Project} from '@workshop/core-data';
import {ProjectActions, ProjectsActionsTypes} from "./projects.actions";
import {createEntityAdapter, EntityAdapter, EntityState, Update} from "@ngrx/entity";

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId?: string
}

export const adapter: EntityAdapter<Project> = createEntityAdapter()
export const initialState: ProjectsState = adapter.getInitialState()

export function projectsReducer(
  state = initialState,
  action: ProjectActions
): ProjectsState {
  switch (action.type) {
    case ProjectsActionsTypes.select:
      const selectedProjectId = action.selectedProjectId;
      return {
        ...state,
        selectedProjectId
      }
    case ProjectsActionsTypes.didLoad:
      return adapter.addMany(action.projects, state)
    case ProjectsActionsTypes.didCreate:
      const project = action.project;
      return adapter.addOne(project, state)
    case ProjectsActionsTypes.didUpdate:
      return adapter.updateOne({id: action.project.id, changes: action.project}, state)
    case ProjectsActionsTypes.didDelete:
      return adapter.removeOne(action.project.id, state)
    default:
      return state;
  }
}
