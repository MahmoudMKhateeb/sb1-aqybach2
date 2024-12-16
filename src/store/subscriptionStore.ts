import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionState {
  isPremium: boolean;
  dailyQuestionsCount: number;
  lastQuestionDate: string;
  setPremium: (isPremium: boolean) => void;
  incrementDailyCount: () => boolean; // Returns true if under limit
  resetDailyCount: () => void;
  checkDailyReset: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      isPremium: false,
      dailyQuestionsCount: 0,
      lastQuestionDate: new Date().toDateString(),
      
      setPremium: (isPremium) => set({ isPremium }),
      
      incrementDailyCount: () => {
        const { isPremium, dailyQuestionsCount } = get();
        if (!isPremium && dailyQuestionsCount >= 15) {
          return false;
        }
        set(state => ({ dailyQuestionsCount: state.dailyQuestionsCount + 1 }));
        return true;
      },
      
      resetDailyCount: () => {
        set({
          dailyQuestionsCount: 0,
          lastQuestionDate: new Date().toDateString()
        });
      },
      
      checkDailyReset: () => {
        const { lastQuestionDate } = get();
        const today = new Date().toDateString();
        if (lastQuestionDate !== today) {
          get().resetDailyCount();
        }
      },
    }),
    {
      name: 'subscription-storage',
    }
  )
);