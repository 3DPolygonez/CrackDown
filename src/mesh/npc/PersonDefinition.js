export class PersonDefinition {
    constructor(properties = {}) {
        this.baseTexturePath = properties.baseTexturePath || "./resources/textures/person/soldier";

        this.includeHead = properties.includeHead != undefined ? properties.includeHead : true;
        this.includeFace = properties.includeFace != undefined ? properties.includeFace : true;
        this.includeChest = properties.includeChest != undefined ? properties.includeChest : true;
        this.includeRightArm = properties.includeRightArm != undefined ? properties.includeRightArm : true;
        this.includeRightForeArm = properties.includeRightForeArm != undefined ? properties.includeRightForeArm : true;
        this.includeRightHand = properties.includeRightHand != undefined ? properties.includeRightHand : true;
        this.includeLeftArm = properties.includeLeftArm != undefined ? properties.includeLeftArm : true;
        this.includeLeftForeArm = properties.includeLeftForeArm != undefined ? properties.includeLeftForeArm : true;
        this.includeLeftHand = properties.includeLeftHand != undefined ? properties.includeLeftHand : true;
        this.includeWaist = properties.includeWaist != undefined ? properties.includeWaist : true;
        this.includeRightLeg = properties.includeRightLeg != undefined ? properties.includeRightLeg : true;
        this.includeLeftLeg = properties.includeLeftLeg != undefined ? properties.includeLeftLeg : true;

        this.headWidth = properties.headWidth || 12;
        this.headHeight = properties.headHeight || 12;
        this.headDepth = properties.headDepth || 12;
        this.headPositionY = properties.headPositionY || 26;
        this.headPositionZ = properties.headPositionZ || 2;

        this.faceWidth = properties.faceWidth || 10;
        this.faceHeight = properties.faceHeight || 10;
        this.faceDepth = properties.faceDepth || 10;
        this.facePositionY = properties.facePositionY || 25;
        this.facePositionZ = properties.facePositionZ || 2;

        this.chestWidth = properties.chestWidth || 16;
        this.chestHeight = properties.chestHeight || 6;
        this.chestDepth = properties.chestDepth || 10;
        this.chestPositionY = properties.chestPositionY || 16;
        this.chestPositionZ = properties.chestPositionZ || 0;

        this.waistWidth = properties.waistWidth || 10;
        this.waistHeight = properties.waistHeight || 4;
        this.waistDepth = properties.waistDepth || 10;
        this.waistPositionY = properties.waistPositionY || 11;
        this.waistPositionZ = properties.waistPositionZ || 0;

        this.rightArmWidth = properties.rightArmWidth || 6;
        this.rightArmHeight = properties.rightArmHeight || 4;
        this.rightArmDepth = properties.rightArmDepth || 6;
        this.rightArmPositionY = properties.rightArmPositionY || 19;
        this.rightArmPositionZ = properties.rightArmPositionZ || 0;
        this.rightArmPositionX = properties.rightArmPositionX || -11;

        this.rightForeArmWidth = properties.rightForeArmWidth || 6;
        this.rightForeArmHeight = properties.rightForeArmHeight || 4;
        this.rightForeArmDepth = properties.rightForeArmDepth || 6;
        this.rightForeArmPositionY = properties.rightForeArmPositionY || 15;
        this.rightForeArmPositionZ = properties.rightForeArmPositionZ || 0;
        this.rightForeArmPositionX = properties.rightForeArmPositionX || -11;

        this.rightHandWidth = properties.rightHandWidth || 6;
        this.rightHandHeight = properties.rightHandHeight || 3;
        this.rightHandDepth = properties.rightHandDepth || 6;

        this.leftArmWidth = properties.leftArmWidth || 6;
        this.leftArmHeight = properties.leftArmHeight || 4;
        this.leftArmDepth = properties.leftArmDepth || 6;
        this.leftArmPositionY = properties.leftArmPositionY || 19;
        this.leftArmPositionZ = properties.leftArmPositionZ || 0;
        this.leftArmPositionX = properties.leftArmPositionX || 11;

        this.leftForeArmWidth = properties.leftForeArmWidth || 6;
        this.leftForeArmHeight = properties.leftForeArmHeight || 4;
        this.leftForeArmDepth = properties.leftForeArmDepth || 6;
        this.leftForeArmPositionY = properties.leftForeArmPositionY || 15;
        this.leftForeArmPositionZ = properties.leftForeArmPositionZ || 0;
        this.leftForeArmPositionX = properties.leftForeArmPositionX || 11;

        this.leftHandWidth = properties.leftHandWidth || 6;
        this.leftHandHeight = properties.leftHandHeight || 3;
        this.leftHandDepth = properties.leftHandDepth || 6;

        this.rightLegWidth = properties.rightLegWidth || 4;
        this.rightLegHeight = properties.rightLegHeight || 9;
        this.rightLegDepth = properties.rightLegDepth || 4;
        this.rightLegPositionY = properties.rightLegPositionY || 9.5;
        this.rightLegPositionZ = properties.rightLegPositionZ || 0;
        this.rightLegPositionX = properties.rightLegPositionX || -5;

        this.leftLegWidth = properties.leftLegWidth || 4;
        this.leftLegHeight = properties.leftLegHeight || 9;
        this.leftLegDepth = properties.leftLegDepth || 4;
        this.leftLegPositionY = properties.leftLegPositionY || 9.5;
        this.leftLegPositionZ = properties.leftLegPositionZ || 0;
        this.leftLegPositionX = properties.leftLegPositionX || 5;

        this.scale = properties.scale || 0.025;
    }
}