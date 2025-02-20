import { db } from '../config/firebase';
import { collection, getDocs, deleteDoc, query, where, Timestamp, doc } from 'firebase/firestore';

export const deleteDatabase = {
  async cleanupOldRecords(daysOld = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      
      const collections = ['events', 'notifications', 'activityLogs'];
      
      for (const collectionName of collections) {
        const q = query(
          collection(db, collectionName),
          where('createdAt', '<', Timestamp.fromDate(cutoffDate))
        );
        
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      }
      
      return true;
    } catch (error) {
      console.error('Error cleaning up old records:', error);
      throw error;
    }
  },

  async cleanupOrphanedRecords() {
    try {
      // Clean up orphaned events (events with no associated client)
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const clientsSnapshot = await getDocs(collection(db, 'clients'));
      
      const clientIds = new Set(clientsSnapshot.docs.map(doc => doc.id));
      const orphanedEventDeletions = eventsSnapshot.docs
        .filter(doc => doc.data().clientId && !clientIds.has(doc.data().clientId))
        .map(doc => deleteDoc(doc.ref));
      
      await Promise.all(orphanedEventDeletions);
      
      return true;
    } catch (error) {
      console.error('Error cleaning up orphaned records:', error);
      throw error;
    }
  },

  async cleanupDuplicates(collectionName, field) {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Group records by the specified field
      const grouped = records.reduce((acc, record) => {
        const key = record[field];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(record);
        return acc;
      }, {});
      
      // For each group with more than one record, keep the newest and delete others
      const deletionPromises = [];
      for (const key in grouped) {
        if (grouped[key].length > 1) {
          // Sort by createdAt and keep the newest
          const sorted = grouped[key].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          
          // Delete all but the first (newest) record
          for (let i = 1; i < sorted.length; i++) {
            deletionPromises.push(deleteDoc(doc(db, collectionName, sorted[i].id)));
          }
        }
      }
      
      await Promise.all(deletionPromises);
      return true;
    } catch (error) {
      console.error('Error cleaning up duplicates:', error);
      throw error;
    }
  },

  async validateDataIntegrity() {
    try {
      const issues = [];
      const collections = ['clients', 'events', 'notifications'];
      
      for (const collectionName of collections) {
        const snapshot = await getDocs(collection(db, collectionName));
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          
          // Check for required fields
          if (!data.createdAt || !data.updatedAt) {
            issues.push({
              collection: collectionName,
              documentId: doc.id,
              issue: 'Missing timestamp fields'
            });
          }
          
          // Check for valid dates
          if (data.createdAt && isNaN(new Date(data.createdAt).getTime())) {
            issues.push({
              collection: collectionName,
              documentId: doc.id,
              issue: 'Invalid createdAt date'
            });
          }
          
          // Check for empty required fields
          if (collectionName === 'clients' && (!data.name || !data.email)) {
            issues.push({
              collection: collectionName,
              documentId: doc.id,
              issue: 'Missing required fields'
            });
          }
        });
      }
      
      return issues;
    } catch (error) {
      console.error('Error validating data integrity:', error);
      throw error;
    }
  }
};

export const deleteCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(db, collectionName, document.id))
    );
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error(`Error deleting collection ${collectionName}:`, error);
    throw error;
  }
};

export const deleteMultipleCollections = async (collectionNames) => {
  try {
    const deletePromises = collectionNames.map(name => deleteCollection(name));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error('Error deleting multiple collections:', error);
    throw error;
  }
};

export default {
  deleteCollection,
  deleteMultipleCollections
};