import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

class CalendarService {
  constructor() {
    this.collection = 'events';
  }

  async getEvents(userId, startDate, endDate) {
    try {
      const eventsRef = collection(db, this.collection);
      const q = query(
        eventsRef,
        where('userId', '==', userId),
        where('start', '>=', startDate),
        where('end', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async addEvent(eventData) {
    try {
      const docRef = await addDoc(collection(db, this.collection), {
        ...eventData,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  async updateEvent(eventId, eventData) {
    try {
      const eventRef = doc(db, this.collection, eventId);
      await updateDoc(eventRef, {
        ...eventData,
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      const eventRef = doc(db, this.collection, eventId);
      await deleteDoc(eventRef);
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

const calendarService = new CalendarService();

// Export the service object with named exports as well as default
export { calendarService };
export default calendarService;
