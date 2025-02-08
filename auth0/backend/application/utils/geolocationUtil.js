import fs from 'fs'; 
import TripClass from '../../domain/entities/TripClass';
import transportationModes from '../../domain/enums/enumModeTransportation';

let locations = []

const sampleLocation1 = {
    latitude: 37.7749,
    longitutde: -122.4194, 

}

const sampleLocation2 = { 
    latitude: 37.7790, 
    longitutde: -122.4195,
}

//add id to the parameters of the function
const getUserCurrentLocation = async () => {
    try {
        return {
            ...sampleLocation1, 
            timestamp: Date.now()
            
        };
      } catch (error) {
        console.error("Error getting the user location", error);
        throw error; // Re-throw the error to be handled by the calling function if needed
      }
}



const createTripFromLocations = async (initialLocation, finalLocation) => { 

    const userId = 12345; 
    const date = Date.now(); 
    const duration = finalLocation.timestamp - initialLocation.timestamp; 
    const tripId = 123456;

    try {
        const tripInitialLocation = {
            latitude: initialLocation.latitude, 
            longitude: intialLocation.longitude
        }
        const tripFinalLocation = {
            latitude: initialLocation.latitude, 
            longitude: intialLocation.longitude
        }
        
        const serializedInitialLocation = JSON.stringify(tripInitialLocation);

        const serializedFinalLocation = JSON.stringify(tripFinalLocation); 

        const tripS3 = new TripClass(
            userId, 
            date, 
            duration, 
            serializedInitialLocation, 
            serializedFinalLocation, 
            transportationModes.BIKE,
            userId
        )

        return JSON.stringify(tripS3);

      } catch (error) {
        console.error("Error creating the trip", error);
        throw error; // Re-throw the error to be handled by the calling function if needed
      }

    
}


export { getUserCurrentLocation, createTripFromLocations }