import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss"
})
export class AuthComponent {
  @HostBinding("class") class = "container container_centered";
}
