import {Project} from '@workshop/core-data';
import {ProjectActions, ProjectsActionsTypes} from "./projects.actions";

const initialProjects: Project[] = [
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

export interface ProjectsState {
  projects: Project[]
  selectedProjectId?: string
}

export const initialState: ProjectsState = {
  projects: initialProjects
}

export function projectsReducer(
  state = initialState,
  action: ProjectActions
): ProjectsState {
  let projects: Project[] = []

  switch (action.type) {
    case ProjectsActionsTypes.create:
      const project = action.project;
      project.id = (Math.max(...state.projects.map(it => Number.parseInt(it.id))) + 1).toString()

      projects = createProject(state.projects, project)
      return {
        ...state,
        projects
      }
    case ProjectsActionsTypes.select:
      return {
        ...state,
        selectedProjectId: action.selectedProjectId
      }
    case ProjectsActionsTypes.update:
      projects = updateProject(state.projects, action.project)
      return {
        ...state,
        projects
      }
    case ProjectsActionsTypes.delete:
      projects = deleteProject(state.projects, action.project)
      return {
        ...state,
        projects
      }
    default:
      return state;
  }
}
