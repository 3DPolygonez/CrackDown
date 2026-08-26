import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Scientist extends Person {
    constructor(debugSystem, maxSpeed, definition = {}) {
        super(
            debugSystem,
            maxSpeed,
            new PersonDefinition(
            {
                baseTexturePath: "./resources/textures/person/scientist",
                faceWidth: 8,
                facedepth: 8,
                facePositionZ: 1,
                chestWidth: 10,
                chestDepth: 6,
                waistHeight: 8,
                waistWidth: 10,
                waistDepth: 6,
                waistPositionY: 10,
                waistPositionZ: -0.5,
                rightArmWidth: 3,
                rightArmDepth: 3,
                rightArmPositionX: -6.5,
                rightForeArmWidth: 3,
                rightForeArmDepth: 3,
                rightHandWidth: 2,
                rightHandDepth: 3,
                leftArmWidth: 3,
                leftArmDepth: 3,
                leftArmPositionX: 6.5,
                leftForeArmWidth: 3,
                leftForeArmDepth: 3,
                leftHandWidth: 2,
                leftHandDepth: 3,
                rightLegWidth: 3,
                rightlegdepth: 3,
                rightLegPositionX: -3,
                leftLegWidth: 3,
                leftLegDepth: 3,
                leftLegPositionX: 3,
                ...definition
            }));
        this.name = "Scientist";
    }
}