import { ControllerMemory } from "../controllers/controller-memory.js";
import { ViewMemory } from "../views/view-memory.js";
import { Memory } from "../models/memory.js";

export class ApplicationMemory
{
    #controllerMemory;
    #viewMemory;

    constructor()
    {
        this.#initControllers();
        this.#initViews();
        this.#controllerMemory.start();
    }

    #initControllers()
    {
        this.#controllerMemory = new ControllerMemory();
    }

    #initViews()
    {
        this.#viewMemory = new ViewMemory(this.#controllerMemory);
    }

}