import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserSessionService } from "../shared/services/user-session.service";
import { map, tap } from "rxjs";
import { views } from "../../core/views";

export const authGuard: CanActivateFn = () => {
  const userSessionService = inject(UserSessionService);
  const router = inject(Router);
  return userSessionService.user$.pipe(
    map(user => !!user),
    tap(user => !user && router.navigateByUrl(views.LOGIN))
  );
};
