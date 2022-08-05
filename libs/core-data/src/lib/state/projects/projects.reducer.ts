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

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

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
    case ProjectsActionsTypes.load:
      return adapter.addMany(action.projects, state)
    case ProjectsActionsTypes.create:
      const project = action.project;
      project.id = (Math.max(...(<string[]>state.ids).map(it => Number.parseInt(it))) + 1).toString()
      return adapter.addOne(project, state)
    case ProjectsActionsTypes.update:
      const update: Update<Project> = {
        id: action.project.id,
        changes: action.project
      }

      return adapter.updateOne(update, state)
    case ProjectsActionsTypes.delete:
      return adapter.removeOne(action.selectedProjectId, state)
    default:
      return state;
  }
}
