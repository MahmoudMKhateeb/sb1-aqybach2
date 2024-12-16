import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from './db';

export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  quizzes_completed: number;
}

// Generate a secure session token
function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function register(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await createUser({ name, email, password: hashedPassword });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
      quizzes_completed: user.quizzes_completed,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Registration failed');
  }
}

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  const user = await getUserByEmail(email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  
  const token = generateToken();
  
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
      quizzes_completed: user.quizzes_completed,
    },
    token
  };
}