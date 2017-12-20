export class Task {
    constructor(private id: number, private text: string, private done: boolean = false) {
        this.id = id;
        this.text = text;
        this.done = done;
    }

    changeStatus() {
        this.done = !this.done;
    }

    getStatus() {
        return this.done;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    changeText(newText) {
        this.text = newText;
    }
}