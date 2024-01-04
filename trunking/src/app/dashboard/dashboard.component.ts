import { Component, inject } from "@angular/core";
import { UserSessionService } from "../shared/services/user-session.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss"
})
export class DashboardComponent {
  userSessionService = inject(UserSessionService);
  user$ = this.userSessionService.user$;
}
