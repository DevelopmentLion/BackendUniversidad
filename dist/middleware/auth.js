import { SignJWT, jwtVerify } from 'jose';
export const authMiddleware = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'No token provided' }, 401);
    }
    const token = authHeader.substring(7);
    const JWT_SECRET = new TextEncoder().encode(c.env.JWT_SECRET || 'your-secret-key-change-in-production');
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        c.set('userId', payload.userId);
        c.set('userRole', payload.userRole);
        await next();
    }
    catch (error) {
        return c.json({ error: 'Invalid token' }, 401);
    }
};
export const requireRole = (allowedRoles) => {
    return async (c, next) => {
        const userRole = c.get('userRole');
        if (!allowedRoles.includes(userRole)) {
            return c.json({ error: 'Insufficient permissions' }, 403);
        }
        await next();
    };
};
export const generateToken = async (userId, userRole, env) => {
    const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-change-in-production');
    return await new SignJWT({ userId, userRole })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);
};
