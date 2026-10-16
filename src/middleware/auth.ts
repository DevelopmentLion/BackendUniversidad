import { Context, Next } from 'hono';
import { SignJWT, jwtVerify } from 'jose';
import { UserRole } from '../types';

export type Variables = {
  userId: string;
  userRole: UserRole;
};

export type Env = {
  JWT_SECRET: string;
};

export type AppContext = Context<{ Variables: Variables; Bindings: Env }>;

export const authMiddleware = async (c: AppContext, next: Next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No token provided' }, 401);
  }

  const token = authHeader.substring(7);
  const JWT_SECRET = new TextEncoder().encode(c.env.JWT_SECRET || 'your-secret-key-change-in-production');

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    c.set('userId', payload.userId as string);
    c.set('userRole', payload.userRole as UserRole);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return async (c: AppContext, next: Next) => {
    const userRole = c.get('userRole');

    if (!allowedRoles.includes(userRole)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    await next();
  };
};

export const generateToken = async (userId: string, userRole: UserRole, env: Env): Promise<string> => {
  const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-change-in-production');
  return await new SignJWT({ userId, userRole })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
};
