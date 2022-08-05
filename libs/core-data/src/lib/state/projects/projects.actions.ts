import {Action, createAction, props} from "@ngrx/store";
import {Project} from "@workshop/core-data";
import {Update} from "@ngrx/entity";

export enum ProjectsActionsTypes {
  select = 'Projects [select]',
  create = 'Projects [create]',
  update = 'Projects [update]',
  delete = 'Projects [delete]',
  load = 'Projects [load]'
}

export class ProjectActions implements Action {
  protected payload: any
  public type: string;
  public get project(): Project {
    return <Project>this.payload;
  }
  public get projects(): Project[] {
    return <Project[]>this.payload;
  }
  public get selectedProjectId(): string {
    return <string>this.payload;
  }

  public static Load(payload: Project[]) {
    const action = new ProjectActions()
    action.payload = payload
    action.type = ProjectsActionsTypes.load
    return action;
  }

  public static Select(payload?: string) {
    const action = new ProjectActions();
    action.payload = payload
    action.type = ProjectsActionsTypes.select
    return action
  }

  public static Create(payload: Project) {
    const action = new ProjectActions();
    action.payload = payload
    action.type = ProjectsActionsTypes.create
    return action
  }

  public static Update(payload: Project) {
    const action = new ProjectActions();
    action.payload = payload
    action.type = ProjectsActionsTypes.update
    return action
  }

  public static Delete(payload: Project) {
    const action = new ProjectActions();
    action.payload = payload
    action.type = ProjectsActionsTypes.delete
    return action
  }
}
