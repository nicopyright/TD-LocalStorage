import { Notifier } from "../patterns/notifier.js";
import { Card } from "../models/card.js";
import {Memory} from "../models/memory.js";

export class ControllerMemory extends Notifier
{
    #memory
    constructor()
    {
        super();
        this.#memory = new Memory(() => this.saveGame());
    }
    get memory(){
        return this.#memory
    }
    newGame(){
        this.#memory.newGame(10);
        this.saveGame();
    }
    saveGame(){
        const data = JSON.stringify(this.#memory.toData());
        localStorage.setItem("memory", data);
    }
    loadGame(){
        const jsonData = localStorage.getItem("memory");
        if(jsonData === null){
            return false;
        }
        const data = JSON.parse(jsonData);
        this.#memory.fromData(data);

    }
    start(){
        if(this.loadGame() === false){
            this.newGame();
        }
        this.notify();
    }
    showCard(index){
        this.#memory.showCard(index);
        this.notify();
    }
}
