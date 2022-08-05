import {Action} from "@ngrx/store";
import {Project} from "@workshop/core-data";

export enum ProjectsActionsTypes {
  select = 'Projects [select]',
  create = 'Projects [create]',
  update = 'Projects [update]',
  delete = 'Projects [delete]'
}

export class ProjectActions implements Action {
  protected payload: Project | string
  public type: string;
  public get project(): Project {
    return <Project>this.payload;
  }
  public get selectedProjectId(): string {
    return <string>this.payload;
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
