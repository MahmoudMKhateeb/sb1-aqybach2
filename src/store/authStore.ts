import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/auth';
import { updateUser } from '../lib/db';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
  updatePoints: (userId: number, pointsChange: number) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      updatePoints: async (userId: number, pointsChange: number) => {
        set((state) => {
          if (!state.user) return state;
          
          const updatedUser = {
            ...state.user,
            points: (state.user.points || 0) + pointsChange
          };
          
          // Update the user in the database
          updateUser(userId, {
            points: updatedUser.points,
            quizzes_completed: updatedUser.quizzes_completed
          });
          
          return { user: updatedUser };
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);