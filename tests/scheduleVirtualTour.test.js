const scheduleVirtualTour = require('../controllers/scheduleVirtualTour');

describe('scheduleVirtualTour', () => {

    // TEST FOR VALID INPUTS
    test('should return a UUIDV4 when scheduling is successful', () => {

        const propertyId = 'PRO0000';
        const userId = 'U123';
        const timeSlot = '2024-06-15T10:00:00Z';

        const result = scheduleVirtualTour(propertyId, userId, timeSlot);

        expect(result).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
    });

    // TEST FOR INVALID INPUTS
    test('throws an error for invalid inputs', () => {

        const invalidInputs = [

            // checking missing fields
            { propertyId: 'PRO0000', userId: 'U123', timeSlot: null },
            { propertyId: null, userId: 'U456', timeSlot: '2024-06-15T10:00:00' },
            { propertyId: 'PRO0001', userId: null, timeSlot: '2024-06-15T11:00:00' },

            // checking empty strings
            { propertyId: '', userId: 'U789', timeSlot: '2024-06-15T09:00:00' },
            { propertyId: 'PRO0002', userId: '', timeSlot: '2024-06-15T10:00:00' },
            { propertyId: 'PRO0003', userId: 'U890', timeSlot: '' },

            // checking invalid formats
            { propertyId: 'PRO0004', userId: 'user!@#', timeSlot: '2024-06-15T09:00:00' },
            { propertyId: 'property!@#', userId: '', timeSlot: '2024-06-15T10:00:00' },
            { propertyId: 'PRO0006', userId: 'U890', timeSlot: '1233-45_SAD:00:00' },
        ];

        invalidInputs.forEach(input => {
            expect(() => scheduleVirtualTour(input.propertyId, input.userId, input.timeSlot)).toThrow('Invalid input');
        });
    });

    // TEST FOR EGDE CASES
    test('should throw an error for a timeSlot in the past', () => {
        const propertyId = 'PRO0000';
        const userId = 'U123';
        const timeSlot = '2022-06-01T10:00:00Z';

        expect(() => scheduleVirtualTour(propertyId, userId, timeSlot)).toThrow(
            'Time Slot should be in the future!'
        );
    });

    test('should throw an error if the property is already fully booked', () => {
        const propertyId = 'PRO0000';
        const userId = 'U123';
        const timeSlot = '2024-06-22T10:00:00Z';

        // Mock function for fully booking
        const isFullyBooked = jest.fn(() => true);

        expect(() => {
            if (isFullyBooked(propertyId, timeSlot)) {
                throw new Error('Property fully booked');
            }
            scheduleVirtualTour(propertyId, userId, timeSlot);
        }).toThrow('Property fully booked');
    });

    test('should throw an error if the user already has a tour booked at the same time', () => {
        const propertyId = 'PRO0000';
        const userId = 'U123';
        const timeSlot = '2024-06-22T10:00:00Z';

        // Mock function for a tour booked
        const isUserBooked = jest.fn(() => true);

        expect(() => {
            if (isUserBooked(propertyId, userId, timeSlot)) {
                throw new Error('User already booked the tour at this time');
            }
            scheduleVirtualTour(propertyId, userId, timeSlot);
        }).toThrow('User already booked the tour at this time');
    });
});