const isValidUserId = (userId) => {
    const userIdRegex = /^(U00\d|U0[1-9]\d|U\d{3})$/;
    return userIdRegex.test(userId);
};

const getScheduledToursForAdmin = (adminId) => {
    if (!adminId) {
        throw new Error('Invalid input');
    } else if (!isValidUserId(adminId)) {
        throw new Error('Invalid input');
    } else {
        const adminIdList = ['U000', 'U001', 'U002', 'U003', 'U004', 'U005', 'U006', 'U007', 'U008', 'U009'];
        if (!adminIdList.includes(adminId)) {
            throw new Error('Invalid input');
        }
    }

    // simulate fetching the scheduled virtual tours
    const tours = [
        { tourId: '93cab38f-b985-4aa6-872c-4cc87df2cbfc', propertyId: 'PRO0001', userId: 'U001', timeSlot: '2024-06-14T10:00:00Z' },
        { tourId: '82543f55-e1db-4193-9265-5e96a973a733', propertyId: 'PRO0002', userId: 'U002', timeSlot: '2024-06-14T11:00:00Z' },
    ];

    return tours;
};

module.exports = getScheduledToursForAdmin;