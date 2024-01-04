import { Injectable, inject } from "@angular/core";
import { ApiService } from "../../core/api.service";
import { HttpClient } from "@angular/common/http";
import { ApiAction } from "../../core/api-actions";
import { map, switchMap } from "rxjs";
import { TrunkingApiResponse, TrunkingAPINotEmptyArray, Role } from "../../core/context.model";
import { UserSessionService } from "../shared/services/user-session.service";
import { readCookie } from "../../core/helper";
import { Router } from "@angular/router";
import { views } from "../../core/views";
import { User } from "../shared/models/user.model";

export interface APISessionObject {
  SessionId: string;
  UserId: string;
  ParentUserId?: string;
  Roles: TrunkingAPINotEmptyArray<"Role", { Name: Role }>;
}

@Injectable({
  providedIn: "root"
})
export class AuthService extends ApiService {
  userSessionService = inject(UserSessionService);
  router = inject(Router);
  constructor(_http: HttpClient) {
    super(_http);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(obj: any) {
    this.makeRequest<TrunkingApiResponse>(ApiAction.SessionCreate, obj, { method: "POST" })
      .pipe(
        switchMap(res => {
          const session = res?.Context.Session as APISessionObject;
          return this.createSession(session);
        })
      )
      .subscribe(({ user, session }) => {
        this.handleSuccess(user, session);
      });
  }

  recreateSession() {
    if (document.cookie) {
      const sessionId: string | undefined = readCookie("sessionId"),
        userId: string | undefined = readCookie("userId");
      if (sessionId && userId) {
        this.recoverSession(sessionId, userId);
      }
    }
  }

  private recoverSession(sessionId: string, userId: string) {
    this.makeRequest(
      ApiAction.SessionRecreate,
      { SessionId: sessionId, UserId: userId },
      { method: "POST" }
    )
      .pipe(
        switchMap(res => {
          const session = res?.Context.Session as APISessionObject;
          return this.createSession(session);
        })
      )
      .subscribe(({ user, session }) => {
        this.handleSuccess(user, session);
      });
  }

  private createSession(session: APISessionObject) {
    return this.makeRequest<TrunkingApiResponse>(
      ApiAction.UserRead,
      {
        UserId: session.UserId,
        SessionId: session.SessionId
      },
      { method: "POST" }
    ).pipe(
      map(res => ({
        user: res.Result.UserRead,
        session
      }))
    );
  }

  private handleSuccess(user: User, session: APISessionObject) {
    this.userSessionService.updateUser(user);
    this.userSessionService.updateSession(session);
    this.router.navigateByUrl(views.DASHBOARD);
  }
}
