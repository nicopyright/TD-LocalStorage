import { Observer } from "../patterns/observer.js";

export class ViewMemory extends Observer
{
    #controllerMemory;

    constructor(controllerMemory)
    {
        super();

        this.#controllerMemory = controllerMemory;
        this.#controllerMemory.addObserver(this);
    }

    notify() {
        this.displayCards()
    }
    displayCard(card,i){
        const cards = document.getElementsByClassName("cards")[0];
        const div =document.createElement("div");
        div.classList.add("card");
        if(card.faceHidden){
            div.classList.add("hidden");
        }
        div.innerHTML = "<p>&#x" +  card.value.toString(16) + "</p>";
        cards.appendChild(div);
        div.addEventListener("click",() => this.#controllerMemory.showCard(i));
    }
    displayCards(){
        const cards = document.getElementsByClassName("cards")[0];
        while(cards.firstChild){
            cards.removeChild(cards.firstChild);
        }
        for(let i=0; i < this.#controllerMemory.memory.getCardsNumber(); i++){
            this.displayCard(this.#controllerMemory.memory.getCard(i),i)
        }
    }
}