import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import usersRouter from './routes/users';
import coursesRouter from './routes/courses';
import sessionsRouter from './routes/sessions';
import gradesRouter from './routes/grades';
import activitiesRouter from './routes/activities';
const app = new Hono();
app.use('*', cors({
    origin: '*',
    credentials: true
}));
app.use('*', logger());
app.get('/', (c) => {
    return c.json({
        message: 'Universidad Backend API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            courses: '/api/courses',
            sessions: '/api/sessions',
            grades: '/api/grades',
            activities: '/api/activities'
        }
    });
});
app.route('/api/users', usersRouter);
app.route('/api/courses', coursesRouter);
app.route('/api/sessions', sessionsRouter);
app.route('/api/grades', gradesRouter);
app.route('/api/activities', activitiesRouter);
app.route('/api/auth', usersRouter);
const port = parseInt(process.env.PORT || '3001');
console.log(`Server running on port ${port}`);
export default {
    port,
    fetch: app.fetch
};
