
export class Card {

    #value;
    #faceHidden;
    constructor(value) {
        this.#value = value;
        this.#faceHidden = true;
    }
    get value(){
        return this.#value
    }
    get faceHidden(){
        return this.#faceHidden;
    }
    toData(){
        return {
            value: this.#value,
            faceHidden : this.#faceHidden
        }
    }
    show(){
        this.#faceHidden = false;
    }
    hide(){
        this.#faceHidden = true;
    }
}