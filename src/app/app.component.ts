import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeSwitcherService } from "@core/services/theme-switcher.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    private themeSwitcher = inject(ThemeSwitcherService);
    theme = this.themeSwitcher.theme;
}
