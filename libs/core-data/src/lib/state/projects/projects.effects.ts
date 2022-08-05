import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {DataPersistence} from "@nrwl/nx";
import {ProjectsState} from "./projects.reducer";
import {ProjectActions, ProjectsActionsTypes} from "./projects.actions";
import {map, switchMap} from "rxjs/operators";
import {Project} from '../../projects/project.model'
import {ProjectsService} from '../../projects/projects.service'

@Injectable({providedIn: 'root'})
export class ProjectsEffects {
  @Effect()
  public readonly addProject$ = this.actions$.pipe(
    ofType(ProjectsActionsTypes.create),
    switchMap((action: ProjectActions) => this.projectService.create(action.project)),
    map((response: Project) => ProjectActions.didCreate(response))
  )

  @Effect()
  public readonly loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionsTypes.load),
    switchMap(() => this.projectService.all()),
    map((response: Project[]) => ProjectActions.didLoad(response))
  )

  @Effect()
  public readonly updateProject$ = this.actions$.pipe(
    ofType(ProjectsActionsTypes.update),
    switchMap((action: ProjectActions) => this.projectService.update(action.project)),
    map((response: Project) => ProjectActions.didUpdate(response))
  )

  @Effect()
  public readonly deleteProject$ = this.actions$.pipe(
    ofType(ProjectsActionsTypes.delete),
    switchMap((action: ProjectActions) => {
      return this.projectService.delete(action.project).pipe(
        map(() => ProjectActions.didDelete(action.project))
      )
    })
  )

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectService: ProjectsService
  ) {
  }
}
