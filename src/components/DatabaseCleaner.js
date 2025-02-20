import React from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const DatabaseCleaner = () => {
  const deleteAllData = async () => {
    const collections = ['users', 'meetings', 'clients']; // Add any other collection names here
    
    try {
      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        const deletePromises = querySnapshot.docs.map(document => 
          deleteDoc(doc(db, collectionName, document.id))
        );
        
        await Promise.all(deletePromises);
        console.log(`Deleted all documents in ${collectionName}`);
      }
      
      toast.success('Database cleared successfully');
    } catch (error) {
      console.error('Error clearing database:', error);
      toast.error('Failed to clear database');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={deleteAllData}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Clear Test Data
      </button>
    </div>
  );
};

export default DatabaseCleaner;