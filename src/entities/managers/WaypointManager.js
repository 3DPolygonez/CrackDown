export class WaypointManager {
    #baseWaypoints;
    constructor(baseWaypoints){
        this.waypoints = baseWaypoints;
        this.previousWaypointIndex = 0;
        this.currentWaypointIndex = 0;
        this.#baseWaypoints = this.wayPoints;
    }
}