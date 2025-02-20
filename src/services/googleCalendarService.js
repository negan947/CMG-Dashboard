/* global gapi */
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '813647724091-at2mn9qkv5vgcsaci0uv6ub1li2d71bq.apps.googleusercontent.com';
const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
const BASE_URL = 'https://www.googleapis.com/calendar/v3';

class GoogleCalendarService {
  constructor() {
    this.isInitialized = false;
    this.isInitializing = false;
    this.initPromise = null;
    this.SCOPES = 'https://www.googleapis.com/auth/calendar';
    this.DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  }

  loadGapiScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi = window.gapi || {};
        console.log('GAPI script loaded');
        resolve(window.gapi);
      };
      script.onerror = () => {
        reject(new Error('Failed to load GAPI script'));
      };
      document.head.appendChild(script);
    });
  }

  waitForGapi() {
    return new Promise((resolve) => {
      if (window.gapi) {
        resolve(window.gapi);
        return;
      }

      const checkGapi = setInterval(() => {
        if (window.gapi) {
          clearInterval(checkGapi);
          resolve(window.gapi);
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGapi);
        if (!window.gapi) {
          throw new Error('Failed to load Google API');
        }
      }, 10000);
    });
  }

  async init() {
    if (this.isInitialized) {
      return;
    }

    if (this.isInitializing) {
      return this.initPromise;
    }

    this.isInitializing = true;
    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        await this.waitForGapi();
        
        await new Promise((res) => gapi.load('client:auth2', res));
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        });

        this.isInitialized = true;
        this.isInitializing = false;
        console.log('Google Calendar API initialized successfully');
        resolve();
      } catch (error) {
        this.isInitializing = false;
        console.error('Failed to initialize Google Calendar:', error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  async signIn(forceNewWindow = false) {
    try {
      await this.init();
      const googleAuth = gapi.auth2.getAuthInstance();
      
      let user;
      if (forceNewWindow) {
        user = await googleAuth.signIn({
          prompt: 'select_account'
        });
      } else {
        user = await googleAuth.signIn();
      }

      if (!user) {
        throw new Error('Sign in failed - no user returned');
      }

      const token = user.getAuthResponse().access_token;
      localStorage.setItem('googleAccessToken', token);
      console.log('Successfully signed in to Google Calendar');
      return user;
    } catch (error) {
      console.error('Error signing in to Google:', error);
      throw new Error(error.error || 'Failed to sign in to Google Calendar');
    }
  }

  async createEvent(event) {
    try {
      console.log('Starting to create calendar event...');
      await this.init();

      if (!this.isAuthorized()) {
        console.log('Not authorized, signing in...');
        await this.signIn();
      }

      console.log('Creating event with data:', event);
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        sendUpdates: 'all'
      });

      console.log('Event created successfully:', response.result);
      return response.result;
    } catch (error) {
      console.error('Error creating event:', error);
      
      if (error.status === 401) {
        console.log('Token expired, attempting refresh...');
        try {
          await this.refreshToken();
          console.log('Token refreshed, retrying event creation...');
          const response = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendUpdates: 'all'
          });
          return response.result;
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw new Error('Session expired. Please sign in again.');
        }
      }
      
      throw new Error(error.result?.error?.message || 'Failed to create calendar event');
    }
  }

  isAuthorized() {
    if (!this.isInitialized) return false;
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      return auth2.isSignedIn.get();
    } catch (error) {
      console.error('Error checking authorization:', error);
      return false;
    }
  }

  async refreshToken() {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        const user = auth2.currentUser.get();
        await user.reloadAuthResponse();
        const authResponse = user.getAuthResponse();
        localStorage.setItem('googleAccessToken', authResponse.access_token);
        console.log('Token refreshed successfully');
      } else {
        throw new Error('Not signed in');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      if (!this.isInitialized) {
        await this.init();
      }
      const auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
      localStorage.removeItem('googleAccessToken');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async initializeGoogleCalendar() {
    try {
      await gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      });

      return true;
    } catch (error) {
      console.error('Error initializing Google Calendar:', error);
      throw error;
    }
  }

  async listEvents(calendarId = 'primary', timeMin = new Date().toISOString()) {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: timeMin,
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      });

      return response.result.items;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async addEvent(event) {
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.result;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  async updateEvent(eventId, event) {
    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event
      });

      return response.result;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
      });

      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

const googleCalendarService = {
  async createEvent(eventData) {
    try {
      const response = await fetch(`${BASE_URL}/calendars/${CALENDAR_ID}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: eventData.title,
          description: eventData.description,
          start: {
            dateTime: eventData.startDate,
            timeZone: 'UTC'
          },
          end: {
            dateTime: eventData.endDate,
            timeZone: 'UTC'
          },
          attendees: eventData.attendees?.map(attendee => ({ email: attendee })),
          reminders: {
            useDefault: true
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create Google Calendar event');
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      throw error;
    }
  },

  async updateEvent(eventId, eventData) {
    try {
      const response = await fetch(`${BASE_URL}/calendars/${CALENDAR_ID}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: eventData.title,
          description: eventData.description,
          start: {
            dateTime: eventData.startDate,
            timeZone: 'UTC'
          },
          end: {
            dateTime: eventData.endDate,
            timeZone: 'UTC'
          },
          attendees: eventData.attendees?.map(attendee => ({ email: attendee }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update Google Calendar event');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating Google Calendar event:', error);
      throw error;
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = await fetch(`${BASE_URL}/calendars/${CALENDAR_ID}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete Google Calendar event');
      }

      return true;
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      throw error;
    }
  },

  async getEvents(timeMin, timeMax) {
    try {
      const params = new URLSearchParams({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const response = await fetch(`${BASE_URL}/calendars/${CALENDAR_ID}/events?${params}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Google Calendar events');
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  },

  async getEventById(eventId) {
    try {
      const response = await fetch(`${BASE_URL}/calendars/${CALENDAR_ID}/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Google Calendar event');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Google Calendar event:', error);
      throw error;
    }
  },

  async syncEvents(localEvents) {
    try {
      // Get all Google Calendar events for comparison
      const now = new Date();
      const oneMonthFromNow = new Date(now.setMonth(now.getMonth() + 1));
      const googleEvents = await this.getEvents(now, oneMonthFromNow);

      // Create maps for easy lookup
      const googleEventMap = new Map(googleEvents.map(event => [event.id, event]));
      const localEventMap = new Map(localEvents.map(event => [event.googleCalendarEventId, event]));

      // Create missing events in Google Calendar
      for (const localEvent of localEvents) {
        if (!localEvent.googleCalendarEventId || !googleEventMap.has(localEvent.googleCalendarEventId)) {
          await this.createEvent(localEvent);
        }
      }

      // Update existing events
      for (const [googleId, localEvent] of localEventMap) {
        if (googleEventMap.has(googleId)) {
          await this.updateEvent(googleId, localEvent);
        }
      }

      return true;
    } catch (error) {
      console.error('Error syncing events with Google Calendar:', error);
      throw error;
    }
  }
};

export { googleCalendarService };
export default new GoogleCalendarService();
