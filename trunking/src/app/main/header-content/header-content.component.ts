import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, map, shareReplay, startWith } from "rxjs";
import { textTitle } from "../constants";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header-content",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header-content.component.html",
  styleUrl: "./header-content.component.scss"
})
export class HeaderContentComponent {
  router = inject(Router);
  activatedRouterouter = inject(ActivatedRoute);
  texts$ = this.router.events.pipe(
    startWith(null),
    debounceTime(300),
    map(() => this.getText(this.router.url)),
    shareReplay(1)
  );

  private getText(url: string) {
    const key = url.split("/")[1];
    return textTitle[key as keyof typeof textTitle];
  }
}
