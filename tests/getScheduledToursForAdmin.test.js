const getScheduledToursForAdmin = require('../controllers/getScheduledToursForAdmin');

describe('getScheduledToursForAdmin', () => {

    // TEST FOR VALID INPUTS
    test('should return a list of scheduled tours for valid adminId', () => {
        const adminId = 'U000';

        const result = getScheduledToursForAdmin(adminId);

        expect(result).toEqual([
            { tourId: '93cab38f-b985-4aa6-872c-4cc87df2cbfc', propertyId: 'PRO0001', userId: 'U001', timeSlot: '2024-06-14T10:00:00Z' },
            { tourId: '82543f55-e1db-4193-9265-5e96a973a733', propertyId: 'PRO0002', userId: 'U002', timeSlot: '2024-06-14T11:00:00Z' },
        ]);
    });

    // TEST FOR INVALID INPUTS
    test('should throw an error for missing adminId', () => {
        expect(() => getScheduledToursForAdmin(null)).toThrow('Invalid input');

        const invalidInputs = [

            // checking missing fields, empty strings, invalid formats, out of adminId range
            { adminId: null },
            { adminId: '' },
            { adminId: 'user!@#' },
            { adminId: 'U010' }
        ];

        invalidInputs.forEach(input => {
            expect(() => getScheduledToursForAdmin(input.adminId)).toThrow('Invalid input');
        });
    });

    // TEST FOR EGDE CASES
    test('should throws error when adminId has leading or trailing spaces', () => {
        
        const adminIdWithSpaces = ' U001 ';

        expect(() => getScheduledToursForAdmin(adminIdWithSpaces)).toThrow('Invalid input');
    });
});
