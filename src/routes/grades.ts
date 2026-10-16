import { Hono } from 'hono';
import { mockGrades } from '../services/data';
import { Grade } from '../types';

const gradesRouter = new Hono();

gradesRouter.get('/', (c) => {
  return c.json(mockGrades);
});

gradesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const grade = mockGrades.find(g => g.id === id);

  if (!grade) {
    return c.json({ error: 'Grade not found' }, 404);
  }

  return c.json(grade);
});

gradesRouter.post('/', async (c) => {
  const data = await c.req.json();

  const newGrade: Grade = {
    id: String(mockGrades.length + 1),
    ...data
  };

  mockGrades.push(newGrade);
  return c.json(newGrade, 201);
});

gradesRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const gradeIndex = mockGrades.findIndex(g => g.id === id);

  if (gradeIndex === -1) {
    return c.json({ error: 'Grade not found' }, 404);
  }

  const updateData = await c.req.json();
  mockGrades[gradeIndex] = { ...mockGrades[gradeIndex], ...updateData };

  return c.json(mockGrades[gradeIndex]);
});

gradesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  const gradeIndex = mockGrades.findIndex(g => g.id === id);

  if (gradeIndex === -1) {
    return c.json({ error: 'Grade not found' }, 404);
  }

  mockGrades.splice(gradeIndex, 1);
  return c.json({ message: 'Grade deleted successfully' });
});

export default gradesRouter;
