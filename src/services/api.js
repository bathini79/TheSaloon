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
    queries[2] = Query?.equal(
      Object.keys(filters)[0],
      Object.values(filters)[0],
    );

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
    const response = (await updateData)
      ? databases.updateDocument(
          collections["bookings"]?.databaseId,
          collections["bookings"]?.collectionId,
          payload.$id, // Let Appwrite generate a unique ID
          payload,
        )
      : databases.createDocument(
          collections["bookings"]?.databaseId,
          collections["bookings"]?.collectionId,
          ID.unique(), // Let Appwrite generate a unique ID
          payload,
        );
    return { response }; // Return an object with the response
  } catch (error) {
    return { error: error.message || error }; // Return the error message
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
