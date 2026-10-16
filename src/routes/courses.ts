import { Hono } from 'hono';
import { mockCourses } from '../services/data';
import { Course } from '../types';

const coursesRouter = new Hono();

coursesRouter.get('/', (c) => {
  return c.json(mockCourses);
});

coursesRouter.get('/:id', (c) => {
  const id = c.req.param('id');
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return c.json({ error: 'Course not found' }, 404);
  }

  return c.json(course);
});

coursesRouter.post('/', async (c) => {
  const data = await c.req.json();

  const newCourse: Course = {
    id: String(mockCourses.length + 1),
    ...data,
    topics: 0,
    progress: 0,
    grade: 0
  };

  mockCourses.push(newCourse);
  return c.json(newCourse, 201);
});

coursesRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const courseIndex = mockCourses.findIndex(c => c.id === id);

  if (courseIndex === -1) {
    return c.json({ error: 'Course not found' }, 404);
  }

  const updateData = await c.req.json();
  mockCourses[courseIndex] = { ...mockCourses[courseIndex], ...updateData };

  return c.json(mockCourses[courseIndex]);
});

coursesRouter.delete('/:id', (c) => {
  const id = c.req.param('id');
  const courseIndex = mockCourses.findIndex(c => c.id === id);

  if (courseIndex === -1) {
    return c.json({ error: 'Course not found' }, 404);
  }

  mockCourses.splice(courseIndex, 1);
  return c.json({ message: 'Course deleted successfully' });
});

export default coursesRouter;
