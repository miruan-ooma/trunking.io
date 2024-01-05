import { Routes } from "@angular/router";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(mod => mod.DashboardComponent),
    canActivate: [authGuard]
  },
  { path: "", redirectTo: "dashboard", pathMatch: "full" }
];
