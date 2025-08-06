// src/appwriteClient.js
import { Client, Databases,Query,ID } from 'appwrite';

// Create the Appwrite client
const client = new Client();

// Replace with your actual endpoint and project ID
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // or your self-hosted Appwrite URL
  .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

// Export the services you need
const db = new Databases(client);
const DATABASE_ID = import.meta.env.PUBLIC_APPWRITE_DATABASE_ID;
const CONTACT_COLLECTION_ID= import.meta.env.PUBLIC_APPWRITE_COLLECTION_ID;




export async function contactUsDB(formData){
const data={
    name:formData.name,
    email:formData.email,
    subject:formData.subject,
    message:formData.message
}

    try {
            const response = await db.createDocument(DATABASE_ID,CONTACT_COLLECTION_ID,ID.unique(),data)

            if (!response) {
                return {success:false,error:'Failed To Submit Server Error'}
            }

            console.log('submitted form');
            
            return {success:true}
    } catch (error) {
            return {success:false,error:`Catched Error ${error}`}
    }
}
