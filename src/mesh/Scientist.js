import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Scientist extends Person {
    constructor(debugSystem, maxSpeed) {
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
                rightArmHeight: 10,
                rightArmDepth: 3,
                rightArmPositionX: -6.5,
                leftArmWidth: 3,
                leftArmHeight: 10,
                leftArmDepth: 3,
                leftArmPositionX: 6.5,
                rightLegWidth: 3,
                rightlegdepth: 3,
                rightLegPositionX: -3,
                leftLegWidth: 3,
                leftLegDepth: 3,
                leftLegPositionX: 3
            }));
    }
}