import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ThemeSwitcherService {
    theme = signal("theme-monkeytype");

    setTheme(themeName: string) {
        this.theme.set(themeName);
    }
}
