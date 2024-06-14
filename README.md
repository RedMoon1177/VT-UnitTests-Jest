# Assumptions
Data Model
- Tour
    - tourId: string - UUIDV4 (a valid UUID: the 8-4-4-4-12 format ) // install: npm i uuid
    - propertyId: string - format: "PROxxxx" where x = [0,9] // the system can manage up to 10000 properties
    - userId: string - format: "Uxxx" where x = [0,9]
        // Saving the first 10 Ids for Admin accounts: U000, U001,...,U009
        // From U010 to U999 for Client User accounts
    - timeSlot: Datetime - format: "YYYY-MM-DDTHH:MM:SSZ"
        // For example:  '2024-06-14T10:00:00Z' represents June 14, 2024, at 10:00 AM UTC.