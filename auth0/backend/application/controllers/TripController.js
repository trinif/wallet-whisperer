import TripClass from '../../domain/entities/TripClass.js';
import { 
    createNewTrip, 
    getTripById, 
    getUserTrips, 
    updateTrip, 
    deleteTrip, 
    validateTripData 
} from '../services/TripServices.js';


const createTrip = async (req, res) => {
    try {
        const { 
            name, 
            date, 
            duration, 
            initialLocation, 
            finalLocation, 
            modeTransport 
        } = req.body;

        const userId = req.user.id; // Assuming user ID is set by auth middleware

        const tripData = {
            name,
            date,
            duration,
            initialLocation,
            finalLocation,
            modeTransport,
            userId
        };

        // Create new trip via service
        const newTrip = await createNewTrip(tripData);
        return res.status(201).json(newTrip);
    } catch (error) {
        console.error('Error creating trip:', error);
        return res.status(500).json({ 
            error: error.message || "Error creating trip" 
        });
    }
};

const getTripByTripId = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const userId = req.user.id; // Assuming user ID is set by auth middleware

        const trip = await getTripById(userId, tripId);
        
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        // Verify user owns this trip
        if (trip.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized access to trip" });
        }

        return res.status(200).json(trip);
    } catch (error) {
        console.error('Error getting trip:', error);
        return res.status(500).json({ 
            error: error.message || "Error retrieving trip" 
        });
    }
};

const getAllUserTrips = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is set by auth middleware
        const userTrips = await getUserTrips(userId);
        return res.status(200).json(userTrips);
    } catch (error) {
        console.error('Error getting user trips:', error);
        return res.status(500).json({ 
            error: error.message || "Error retrieving user trips" 
        });
    }
};

const updateTripById = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const userId = req.user.id; // Assuming user ID is set by auth middleware
        
        const updateData = {
            name: req.body.name,
            date: req.body.date,
            duration: req.body.duration,
            initialLocation: req.body.initialLocation,
            finalLocation: req.body.finalLocation,
            modeTransport: req.body.modeTransport
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        // Verify trip exists and belongs to user
        const existingTrip = await getTripById(userId, tripId);
        if (!existingTrip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        if (existingTrip.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized access to trip" });
        }

        const updatedTrip = await updateTrip(userId, tripId, updateData);
        return res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);
        return res.status(500).json({ 
            error: error.message || "Error updating trip" 
        });
    }
};

const deleteTripById = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const userId = req.user.id; // Assuming user ID is set by auth middleware

        // Verify trip exists and belongs to user
        const existingTrip = await getTripById(userId, tripId);
        if (!existingTrip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        if (existingTrip.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized access to trip" });
        }

        await deleteTrip(userId, tripId);
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting trip:', error);
        return res.status(500).json({ 
            error: error.message || "Error deleting trip" 
        });
    }
};

const searchTrips = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is set by auth middleware
        const { startDate, endDate, location } = req.query;

        const userTrips = await getUserTrips(userId);
        
        let filteredTrips = userTrips;

        // Filter by date range if provided
        if (startDate || endDate) {
            filteredTrips = filteredTrips.filter(trip => {
                const tripDate = new Date(trip.date);
                if (startDate && new Date(startDate) > tripDate) return false;
                if (endDate && new Date(endDate) < tripDate) return false;
                return true;
            });
        }

        // Filter by location if provided
        if (location) {
            const searchLocation = location.toLowerCase();
            filteredTrips = filteredTrips.filter(trip => {
                const initialLoc = JSON.stringify(trip.initialLocation).toLowerCase();
                const finalLoc = JSON.stringify(trip.finalLocation).toLowerCase();
                return initialLoc.includes(searchLocation) || finalLoc.includes(searchLocation);
            });
        }

        return res.status(200).json(filteredTrips);
    } catch (error) {
        console.error('Error searching trips:', error);
        return res.status(500).json({ 
            error: error.message || "Error searching trips" 
        });
    }
};

const getTripStats = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is set by auth middleware
        const userTrips = await getUserTrips(userId);

        const stats = {
            totalTrips: userTrips.length,
            totalDuration: userTrips.reduce((sum, trip) => sum + trip.duration, 0),
            transportModes: userTrips.reduce((modes, trip) => {
                modes[trip.modeTransport] = (modes[trip.modeTransport] || 0) + 1;
                return modes;
            }, {}),
            averageDuration: userTrips.length ? 
                userTrips.reduce((sum, trip) => sum + trip.duration, 0) / userTrips.length : 
                0
        };

        return res.status(200).json(stats);
    } catch (error) {
        console.error('Error getting trip stats:', error);
        return res.status(500).json({ 
            error: error.message || "Error retrieving trip statistics" 
        });
    }
};

export {
    createTrip,
    getTripByTripId,
    getAllUserTrips,
    updateTripById,
    deleteTripById,
    searchTrips,
    getTripStats
};