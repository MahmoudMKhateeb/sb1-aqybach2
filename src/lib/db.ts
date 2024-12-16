import { openDB } from 'idb';

const dbName = 'finplayDB';
const dbVersion = 1;

export const db = await openDB(dbName, dbVersion, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('users')) {
      const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      userStore.createIndex('email', 'email', { unique: true });
    }
  },
});

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = {
      ...userData,
      points: 0,
      quizzes_completed: 0,
      created_at: new Date().toISOString(),
    };
    const id = await db.add('users', user);
    const createdUser = await db.get('users', id);
    return createdUser;
  } catch (error) {
    if (error instanceof Error && error.name === 'ConstraintError') {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const emailIndex = store.index('email');
  return emailIndex.get(email);
}

export async function updateUser(id: number, data: Partial<{
  points: number;
  quizzes_completed: number;
}>) {
  const user = await db.get('users', id);
  if (!user) throw new Error('User not found');
  
  const updatedUser = { ...user, ...data };
  await db.put('users', updatedUser);
  return updatedUser;
}