const { v4: uuidv4 } = require('uuid');

const isValidPropertyId = (propertyId) => {
    const propertyIdRegex = /^PRO\d{4}$/;
    return propertyIdRegex.test(propertyId);
};

const isValidUserId = (userId) => {
    const userIdRegex = /^(U00\d|U0[1-9]\d|U\d{3})$/;
    return userIdRegex.test(userId);
};

const isValidTimeSlot = (timeSlot) => {
    const timeSlotRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    return timeSlotRegex.test(timeSlot);
};

const scheduleVirtualTour = (propertyId, userId, timeSlot) => {

    // Check values: null, undefined, false, 0, NaN, ''
    if (!propertyId || !userId || !timeSlot) {
        throw new Error('Invalid input');
    } else {

        if (!isValidPropertyId(propertyId)) {
            throw new Error('Invalid input');
        }
        if (!isValidUserId(userId)) {
            throw new Error('Invalid input');
        }
        if (!isValidTimeSlot(timeSlot)) {
            throw new Error('Invalid input');
        } else {
            const currentTime = new Date();
            const tourTime = new Date(timeSlot);

            if (tourTime <= currentTime) {
                throw new Error('Time Slot should be in the future!');
            }
        }
    }

    return uuidv4();
}

module.exports = scheduleVirtualTour;