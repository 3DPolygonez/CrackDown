import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Engineer extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            new PersonDefinition(
            {
                baseTexturePath: "./resources/textures/person/engineer"
            }));
    }
}