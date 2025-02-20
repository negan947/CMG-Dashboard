import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';

class ClientService {
  constructor() {
    this.collection = 'clients';
  }

  async getClients(filters = {}) {
    try {
      const clientsRef = collection(db, this.collection);
      let q = clientsRef;

      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  async getClientById(clientId) {
    try {
      const clientRef = doc(db, this.collection, clientId);
      const clientDoc = await getDoc(clientRef);
      
      if (!clientDoc.exists()) {
        throw new Error('Client not found');
      }

      return {
        id: clientDoc.id,
        ...clientDoc.data()
      };
    } catch (error) {
      console.error('Error fetching client:', error);
      throw error;
    }
  }

  async createClient(clientData) {
    try {
      const docRef = await addDoc(collection(db, this.collection), {
        ...clientData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }

  async updateClient(clientId, clientData) {
    try {
      const clientRef = doc(db, this.collection, clientId);
      await updateDoc(clientRef, {
        ...clientData,
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }

  async deleteClient(clientId) {
    try {
      const clientRef = doc(db, this.collection, clientId);
      await deleteDoc(clientRef);
      return true;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }

  async searchClients(searchTerm) {
    try {
      const clientsRef = collection(db, this.collection);
      const q = query(
        clientsRef,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error searching clients:', error);
      throw error;
    }
  }
}

// Export the service object with named exports as well as default
export const clientService = new ClientService();
export default clientService;
