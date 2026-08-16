import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Blank extends Person {
    constructor(debugSystem, maxSpeed, definition = {}) {
        super(
            debugSystem,
            maxSpeed,
            new PersonDefinition(
            {
                baseTexturePath: "./resources/textures/person/blank",
                ...definition
            }));
    }
}