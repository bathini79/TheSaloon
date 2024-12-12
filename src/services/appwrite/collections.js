const collections = {
    users:{
      collectionId:import.meta.env.VITE_COLLECTION_USERS_ID,
        databaseId:import.meta.env.VITE_DATABASE_ID
    },
      services: {
        collectionId: import.meta.env.VITE_COLLECTION_SERVICES_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
      },
      locations: {
        collectionId: import.meta.env.VITE_COLLECTION_LOCATIONS_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
      },
      employees: {
        collectionId: import.meta.env.VITE_COLLECTION_EMPLOYEES_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
      },
      bookings: {
        collectionId: import.meta.env.VITE_COLLECTION_BOOKINGS_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
      },
      bookingServices: {
        collectionId: import.meta.env.VITE_COLLECTION_BOOKING_SERVICES_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
      }
}
export default collections