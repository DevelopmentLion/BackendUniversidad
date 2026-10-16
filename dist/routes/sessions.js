import { Hono } from 'hono';
import { mockSessions } from '../services/data';
const sessionsRouter = new Hono();
sessionsRouter.get('/', (c) => {
    const status = c.req.query('status');
    if (status) {
        const filteredSessions = mockSessions.filter(s => s.status === status);
        return c.json(filteredSessions);
    }
    return c.json(mockSessions);
});
sessionsRouter.get('/:id', (c) => {
    const id = c.req.param('id');
    const session = mockSessions.find(s => s.id === id);
    if (!session) {
        return c.json({ error: 'Session not found' }, 404);
    }
    return c.json(session);
});
sessionsRouter.post('/', async (c) => {
    const data = await c.req.json();
    const newSession = {
        id: String(mockSessions.length + 1),
        ...data
    };
    mockSessions.push(newSession);
    return c.json(newSession, 201);
});
sessionsRouter.put('/:id', async (c) => {
    const id = c.req.param('id');
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) {
        return c.json({ error: 'Session not found' }, 404);
    }
    const updateData = await c.req.json();
    mockSessions[sessionIndex] = { ...mockSessions[sessionIndex], ...updateData };
    return c.json(mockSessions[sessionIndex]);
});
sessionsRouter.delete('/:id', (c) => {
    const id = c.req.param('id');
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) {
        return c.json({ error: 'Session not found' }, 404);
    }
    mockSessions.splice(sessionIndex, 1);
    return c.json({ message: 'Session deleted successfully' });
});
export default sessionsRouter;
