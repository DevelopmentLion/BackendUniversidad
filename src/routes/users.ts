import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { mockUsers } from '../services/data';
import { User, AuthResponse } from '../types';
import { generateToken, authMiddleware, Variables } from '../middleware/auth';

const usersRouter = new Hono<{ Variables: Variables }>();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  language: z.string().default('es'),
  timezone: z.string().default('America/Mexico_City')
});

usersRouter.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  const user = mockUsers.find(u => u.email === email);

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(user.id);

  const response: AuthResponse = {
    token,
    user: userWithoutPassword
  };

  return c.json(response);
});

usersRouter.post('/register', zValidator('json', registerSchema), async (c) => {
  const data = c.req.valid('json');

  const existingUser = mockUsers.find(u => u.email === data.email);

  if (existingUser) {
    return c.json({ error: 'Email already registered' }, 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser: User = {
    id: String(mockUsers.length + 1),
    ...data,
    password: hashedPassword,
    courses: 0,
    average: 0,
    joinedDate: new Date().toISOString().split('T')[0]
  };

  mockUsers.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  const token = generateToken(newUser.id);

  const response: AuthResponse = {
    token,
    user: userWithoutPassword
  };

  return c.json(response, 201);
});

usersRouter.get('/profile', authMiddleware, async (c) => {
  const userId = c.get('userId');

  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  const { password: _, ...userWithoutPassword } = user;
  return c.json(userWithoutPassword);
});

usersRouter.put('/profile', authMiddleware, async (c) => {
  const userId = c.get('userId');

  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const userIndex = mockUsers.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404);
  }

  const updateData = await c.req.json();
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };

  const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
  return c.json(userWithoutPassword);
});

export default usersRouter;
