// Function to get fare from backend
const getFare = async (pickup, destination, vehicleType) => {
    try {
        // Step 1: Get distance and time from frontend using OpenRouteService
        const { distance, duration } = await calculateDistanceAndTime(pickup, destination);

        // Step 2: Send the calculated distance, duration, and vehicleType to backend for fare calculation
        const response = await axios.post('/api/calculateFare', {
            vehicleType,
            distance,
            duration
        });

        return response.data.fare;
    } catch (error) {
        console.error("Error fetching fare:", error);
    }
};
