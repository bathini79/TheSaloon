// src/appwrite.js
import { Client, Account, Databases, Storage,Query,Permission } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Replace with your Appwrite server URL
  .setProject(import.meta.env.VITE_PROJECT_ID);     // Replace with your project ID

// Export services
export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export { client,Query,Permission };