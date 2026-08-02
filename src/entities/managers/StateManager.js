export class StateManager {
    constructor(statesArray, initialStatename, onChange = null) {
        this.onChange = onChange; // Keep a reference to the owner's notifier
        this.states = new Map();
        // Index the array of states into a Map for O(1) lookups
        statesArray.forEach((state) => {
            this.states.set(state.name, state);
        });
        this.lastEvent = null; // Initialize lastEvent to null
        this.current = this.states.get(initialStatename);
        if (!this.current) throw new Error("Invalid initial state");
        if (this.current.onEnter) this.current.onEnter();
    }

    transition(event, args) {
        //  what we need to do here is determine where if this
        //  is the same event as the last one, do we want to ignore it?  
        //  or do we want to allow it to transition again?  
        //  for now, let's ignore it if it's the same event as the last one
        if (this.lastEvent === event) return false;

        const nextStateName = this.current.transitions?.[event];
        if (!nextStateName) return false;
        if (this.current.name === nextStateName) return false;
        
        const nextState = this.states.get(nextStateName);
        if (!nextState) return false;

        if (this.current.onExit) this.current.onExit();
        
        const previousStateName = this.current.name;
        this.current = nextState;
        this.lastEvent = event;
        
        if (this.current.onEnter) this.current.onEnter();
        
        // NOTIFY OWNER: Fire callback with details about the shift
        if (this.onChange) {
            this.onChange({
                from: previousStateName,
                to: this.current.name,
                trigger: event,
                args: args ? args : null
            });
        }

        return true;
    }
}