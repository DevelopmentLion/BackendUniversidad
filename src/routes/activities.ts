import { Hono } from 'hono';
import { mockActivities } from '../services/data';
import { Activity } from '../types';

const activitiesRouter = new Hono();

activitiesRouter.get('/', (c) => {
  const status = c.req.query('status');
  
  if (status) {
    const filteredActivities = mockActivities.filter(a => a.status === status);
    return c.json(filteredActivities);
  }

  return c.json(mockActivities);
});

activitiesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const activity = mockActivities.find(a => a.id === id);

  if (!activity) {
    return c.json({ error: 'Activity not found' }, 404);
  }

  return c.json(activity);
});

activitiesRouter.post('/', async (c) => {
  const data = await c.req.json();

  const newActivity: Activity = {
    id: String(mockActivities.length + 1),
    ...data
  };

  mockActivities.push(newActivity);
  return c.json(newActivity, 201);
});

activitiesRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const activityIndex = mockActivities.findIndex(a => a.id === id);

  if (activityIndex === -1) {
    return c.json({ error: 'Activity not found' }, 404);
  }

  const updateData = await c.req.json();
  mockActivities[activityIndex] = { ...mockActivities[activityIndex], ...updateData };

  return c.json(mockActivities[activityIndex]);
});

activitiesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  const activityIndex = mockActivities.findIndex(a => a.id === id);

  if (activityIndex === -1) {
    return c.json({ error: 'Activity not found' }, 404);
  }

  mockActivities.splice(activityIndex, 1);
  return c.json({ message: 'Activity deleted successfully' });
});

export default activitiesRouter;
