import { getPerformance } from 'firebase/performance';
import { getApp } from 'firebase/app';

export const initializePerformance = () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const app = getApp();
      getPerformance(app);
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }
};
