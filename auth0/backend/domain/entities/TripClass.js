class TripClass {
    constructor({ id, date, name, duration, initialLocation, finalLocation, modeTransport, userId }) {
      this.id = id || crypto.randomUUID();
      this.name = name;
      this.date = date;
      this.duration = duration;
      this.initialLocation = typeof initialLocation === 'string' ? JSON.parse(initialLocation) : initialLocation;
      this.finalLocation = typeof finalLocation === 'string' ? JSON.parse(finalLocation) : finalLocation;
      this.modeTransport = modeTransport;
      this.userId = userId;
    }
  }
  
  // Load the class methods onto the schema
export default TripClass; 