import { ID } from "appwrite";
import { databases, Query } from "./appwrite/appwrite";
import collections from "./appwrite/collections";

export const createLocation = async (payload, updateData) => {
  try {
    const response = (await updateData)
      ? databases.updateDocument(
          collections["locations"]?.databaseId,
          collections["locations"]?.collectionId,
          payload.$id, // Let Appwrite generate a unique ID
          payload,
        )
      : databases.createDocument(
          collections["locations"]?.databaseId,
          collections["locations"]?.collectionId,
          ID.unique(), // Let Appwrite generate a unique ID
          payload,
        );
    return { response }; // Return an object with the response
  } catch (error) {
    return { error: error.message || error }; // Return the error message
  }
};

export const fetchAllLocations = async ({
  limit = 10,
  offset = 0,
  search = "",
} = {}) => {
  try {
    const queries = [Query.limit(limit), Query.offset(offset)];
    if (search) {
      queries.push(Query.search("name", search)); // Replace "name" with the field to search
    }
    const response = await databases.listDocuments(
      collections["locations"]?.databaseId,
      collections["locations"]?.collectionId,
      // [
      //   Query.search("name",search)
      // ]
    );

    return { response }; // Return response
  } catch (error) {
    return { error: error.message || error }; // Return error
  }
};
// Create a new service document
export const createService = async (payload, updateData) => {
  try {
    const response = (await updateData)
      ? databases.updateDocument(
          collections["services"]?.databaseId,
          collections["services"]?.collectionId,
          payload.$id, // Let Appwrite generate a unique ID
          payload,
        )
      : databases.createDocument(
          collections["services"]?.databaseId,
          collections["services"]?.collectionId,
          ID.unique(), // Let Appwrite generate a unique ID
          payload,
        );
    return { response }; // Return an object with the response
  } catch (error) {
    return { error: error.message || error }; // Return the error message
  }
};
// Fetch all services with optional pagination and search
export const fetchAllServices = async ({
  limit = 10,
  offset = 0,
  search = "",
  filters = {}, // Filters object for dynamic querying
} = {}) => {
  try {
    // Initialize the base queries for limit and offset
    const queries = [Query.limit(limit), Query.offset(offset)];

    // Add search query if provided
    if (search) {
      queries.push(Query.search("name", search)); // Adjust field name as per your schema
    }
    // if(filters){
    // queries[2] = Query?.equal(
    //   Object.keys(filters)[0],
    //   Object.values(filters)[0],
    // );}

    // Fetch documents using Appwrite's databases.listDocuments method
    const response = await databases.listDocuments(
      collections["services"]?.databaseId,
      collections["services"]?.collectionId,
      queries, // Pass the constructed queries
    );

    return { response }; // Return the response object
  } catch (error) {
    return { error: error.message || error }; // Handle errors gracefully
  }
};

export const createBooking = async (payload, updateData) => {
  try {
    let response;
    if (updateData) {
      // Update the document if `updateData` is true
      response = await databases.updateDocument(
        collections["bookings"]?.databaseId,
        collections["bookings"]?.collectionId,
        payload.$id, // Use the existing $id to update the document
        payload
      );
    } else {
      // Create a new document if `updateData` is false
      response = await databases.createDocument(
        collections["bookings"]?.databaseId,
        collections["bookings"]?.collectionId,
        ID.unique(), // Let Appwrite generate a unique ID
        payload
      );
    }
    return response; // Return the response directly
  } catch (error) {
    console.error("Error in bookings:", error);
    return { error: error.message || error }; // Return the error message
  }
};

export const createBookingServices = async (payload, updateData) => {
  try {
    let response;
    if (updateData) {
      // Update the document if `updateData` is true
      response = await databases.updateDocument(
        collections["bookingServices"]?.databaseId,
        collections["bookingServices"]?.collectionId,
        payload.$id, // Use the existing $id to update the document
        payload
      );
    } else {
      // Create a new document if `updateData` is false
      response = await databases.createDocument(
        collections["bookingServices"]?.databaseId,
        collections["bookingServices"]?.collectionId,
        ID.unique(), // Let Appwrite generate a unique ID
        payload
      );
    }
    return response; // Return the response directly
  } catch (error) {
    console.error("Error in createBookingServices:", error);
    return { error: error.message || error }; // Return the error message
  }
};

// Service function to fetch booking services by bookingId
export const fetchBookingServicesByBookingId = async (bookingId) => {
  try {
    const response = await databases.listDocuments(
      collections["bookingServices"].databaseId,
      collections["bookingServices"].collectionId,
      [
        Query.equal("bookings", bookingId) // Assuming 'bookingId' is a field in your document
      ]
    );
    return response.documents; // Return an array of booking services
  } catch (error) {
    console.error("Error fetching booking services by bookingId:", error);
    throw error; // Throw error to handle it in the component
  }
};

export const fetchBookingServicesByUserId = async (userId) => {
  try {
    const response = await databases.listDocuments(
      collections["bookings"].databaseId,
      collections["bookings"].collectionId,
      [
        Query.equal("userId", userId) // Assuming 'bookingId' is a field in your document
      ]
    );
    return response.documents; // Return an array of booking services
  } catch (error) {
    console.error("Error fetching booking services by bookingId:", error);
    throw error; // Throw error to handle it in the component
  }
};


export const fetchAllBookings = async ({
  limit = 10,
  offset = 0,
  search = "",
} = {}) => {
  try {
    const queries = [Query.limit(limit), Query.offset(offset)];
    if (search) {
      queries.push(Query.search("name", search)); // Adjust the field if needed
    }
    const response = await databases.listDocuments(
      collections["bookings"]?.databaseId,
      collections["bookings"]?.collectionId,
      queries, // Pass the queries
    );
    return { response }; // Return response
  } catch (error) {
    return { error: error.message || error }; // Return error
  }
};

// In your api.js
export const fetchAllEmployees = async ({
  limit = 10,
  offset = 0,
  search = "",
} = {}) => {
  try {
    const queries = [Query.limit(limit), Query.offset(offset)];
    if (search) {
      queries.push(Query.search("first_name", search)); // You can modify the search query as needed
    }
    const response = await databases.listDocuments(
      collections["employees"]?.databaseId,
      collections["employees"]?.collectionId,
      queries,
    );

    return { response }; // Return response
  } catch (error) {
    return { error: error.message || error }; // Return error
  }
};
export const createEmployee = async (payload, updateData) => {
  try {
    const response = (await updateData)
      ? databases.updateDocument(
          collections["employees"]?.databaseId,
          collections["employees"]?.collectionId,
          payload.$id, // Let Appwrite generate a unique ID
          payload,
        )
      : databases.createDocument(
          collections["employees"]?.databaseId,
          collections["employees"]?.collectionId,
          ID.unique(), // Let Appwrite generate a unique ID
          payload,
        );
    return { response };
  } catch (error) {
    return { error: error.message || error };
  }
};


export const createUsers = async (payload, updateData) => {
  try {
    const response = (await updateData)
      ? databases.updateDocument(
          collections["users"]?.databaseId,
          collections["users"]?.collectionId,
          payload.userId, // Let Appwrite generate a unique ID
          payload,
        )
      : databases.createDocument(
          collections["users"]?.databaseId,
          collections["users"]?.collectionId,
          ID.unique(), // Let Appwrite generate a unique ID
          payload,
        );
    return { response }; // Return an object with the response
  } catch (error) {
    return { error: error.message || error }; // Return the error message
  }
};