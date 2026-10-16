import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export type Variables = {
  userId: string;
  userRole: UserRole;
};

export const authMiddleware = async (c: Context<{ Variables: Variables }>, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No token provided' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; userRole: UserRole };
    c.set('userId', decoded.userId);
    c.set('userRole', decoded.userRole);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return async (c: Context<{ Variables: Variables }>, next: Next) => {
    const userRole = c.get('userRole');

    if (!allowedRoles.includes(userRole)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    await next();
  };
};

export const generateToken = (userId: string, userRole: UserRole): string => {
  return jwt.sign({ userId, userRole }, JWT_SECRET, { expiresIn: '24h' });
};
