import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Security extends Person {
    constructor(debugSystem, maxSpeed, definition = {}) {
        super(
            debugSystem,
            maxSpeed,
            new PersonDefinition(
            {
                baseTexturePath: "./resources/textures/person/security",
                includeHead: false,
                includeBackpack: true,
                ...definition
            }));
        this.name = "Security";
    }
}