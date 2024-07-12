import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";

interface Char {
    char: string;
    isCorrect: boolean | null;
}

@Component({
    selector: "app-main",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {
    wordsStr =
        "depression community computer management lake shirt platform method sample mud";

    words = signal<Char[][]>([]);

    wordIdx = 0;
    charIdx = 0;
    maxWordIdx = 0;

    ngOnInit() {
        this.words.set(
            this.wordsStr
                .split(" ")
                .map((word) =>
                    word.split("").map((char) => ({ char, isCorrect: null })),
                ),
        );
        this.maxWordIdx = this.words().length;
    }

    onType(e: KeyboardEvent) {
        console.log(e);

        const maxCharIdx = this.words()[this.wordIdx].length - 1;

        const key = e.key;
        const char = this.words()[this.wordIdx][this.charIdx];

        console.log({ key, char: char.char });

        if (key === "Backspace" && this.charIdx === 0 && this.wordIdx === 0) {
            return;
        }

        this.words.update((words) => {
            const newVal = key === "Backspace" ? null : key === char.char;
            words[this.wordIdx][this.charIdx].isCorrect = newVal;
            return structuredClone(words);
        });

        if (key === "Backspace") {
            if (this.charIdx > 0) {
                this.charIdx--;
            } else {
                this.wordIdx--;
                this.charIdx = this.words()[this.wordIdx].length - 1;
            }
            this.words.update((words) => {
                const newVal = key === "Backspace" ? null : key === char.char;
                words[this.wordIdx][this.charIdx].isCorrect = newVal;
                return structuredClone(words);
            });
            return;
        }
        if (this.charIdx === maxCharIdx) {
            this.charIdx = 0;
            this.wordIdx++;
            return;
        }

        this.charIdx++;
    }
}
