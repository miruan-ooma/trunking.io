import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { APISessionObject } from "../../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class UserSessionService {
  user_$ = new BehaviorSubject<User | null>(null);
  session_$ = new BehaviorSubject<APISessionObject | null>(null);
  constructor() {}

  get user$() {
    return this.user_$.asObservable();
  }

  get session$() {
    return this.session_$.asObservable();
  }

  updateUser(user: User) {
    this.user_$.next(user);
  }

  updateSession(session: APISessionObject) {
    this.session_$.next(session);
  }
}
