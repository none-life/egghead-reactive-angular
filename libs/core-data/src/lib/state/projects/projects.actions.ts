import {Action} from "@ngrx/store";
import {Project} from "@workshop/core-data";

export enum ProjectsActionsTypes {
  select = 'Projects [select]',
  create = 'Projects [create]',
  didCreate = 'Projects [didCreate]',
  update = 'Projects [update]',
  didUpdate = 'Projects [didUpdate]',
  delete = 'Projects [delete]',
  didDelete = 'Projects [didDelete]',
  load = 'Projects [load]',
  didLoad = 'Projects [didLoad]'
}

export class ProjectActions implements Action {
  public readonly type: string
  private constructor(
    type: ProjectsActionsTypes,
    protected readonly payload?: any
  ) {
    this.type = type.toString()
  }

  public get project(): Project {
    return <Project>this.payload;
  }
  public get projects(): Project[] {
    return <Project[]>this.payload;
  }
  public get selectedProjectId(): string {
    return <string>this.payload;
  }

  public static Load() {
    return new ProjectActions(ProjectsActionsTypes.load)
  }

  public static Select(payload?: string) {
    return new ProjectActions(ProjectsActionsTypes.select, payload)
  }

  public static Create(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.create, payload)
  }

  public static Update(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.update, payload)
  }

  public static Delete(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.delete, payload)
  }

  public static didLoad(payload: Project[]) {
    return new ProjectActions(ProjectsActionsTypes.didLoad, payload)
  }

  public static didCreate(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.didCreate, payload)
  }

  public static didUpdate(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.didUpdate, payload)
  }

  public static didDelete(payload: Project) {
    return new ProjectActions(ProjectsActionsTypes.didDelete, payload)
  }
}
