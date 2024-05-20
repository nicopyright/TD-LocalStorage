import {Card} from "./card.js";

export class Memory{
    #cards;
    #firstCard = null;
    #saveGameCallback;
    constructor(saveGameCallback) {
        this.#cards = [];
        this.#saveGameCallback = saveGameCallback;
    }

    newGame(pairNumber){
        this.#cards = [];
        for(let i = 0; i < 2*pairNumber ;i++){
            const card = new Card(0x1F90C+(i-i%2)/2);
            this.#cards.splice(Math.floor(Math.random()*(this.getCardsNumber()+1)),0,card);
        }
    }
    getCardsNumber(){
        return this.#cards.length;
    }

    getCard(index){
        return this.#cards[index];
    }
    toData(){
         const data = {
             cards : []
         }
         for(const card of this.#cards){
             data.cards.push(card.toData());
         }
         return data;
    }

    fromData(data){
        this.#cards = [];
        for(const cardData of data.cards){
            const card = new Card(cardData.value);
            if (!cardData.faceHidden) {
                card.show();
            }
            this.#cards.push(card);
        }
    }
    showCard(index) {
        if (this.#cards[index].faceHidden === false) {
            return;
        }

        this.#cards[index].show();

        if (!this.#firstCard) {
            this.#firstCard = this.#cards[index];
        } else {
            if (this.#firstCard.value === this.#cards[index].value) {
                this.#firstCard = null;
                this.#saveGameCallback();

            } else {
                setTimeout(() => {
                    this.#firstCard.hide();
                    this.#cards[index].hide();
                    this.#firstCard = null;
                }, 1);
            }
        }
        if (this.#cards.every(card => card.faceHidden === false)) {
            this.newGame(this.getCardsNumber()/2);
        }
    }
}