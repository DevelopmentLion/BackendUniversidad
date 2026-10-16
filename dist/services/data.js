export const mockUsers = [
    {
        id: '1',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@universidad.edu',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // SHA-256 hash of 'password123'
        role: 'student',
        phone: '+52 55 1234 5678',
        dateOfBirth: '2000-05-15',
        address: 'Calle Principal 123, Ciudad de México',
        bio: 'Estudiante de Ingeniería de Sistemas',
        language: 'es',
        timezone: 'America/Mexico_City',
        courses: 5,
        average: 8.5,
        joinedDate: '2023-08-15'
    },
    {
        id: '2',
        firstName: 'María',
        lastName: 'García',
        email: 'maria.garcia@universidad.edu',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        role: 'teacher',
        phone: '+52 55 8765 4321',
        dateOfBirth: '1985-03-20',
        address: 'Av. Reforma 456, Ciudad de México',
        bio: 'Profesora de Ciencias de la Computación',
        language: 'es',
        timezone: 'America/Mexico_City',
        courses: 3,
        average: 0,
        joinedDate: '2020-01-15'
    },
    {
        id: '3',
        firstName: 'Carlos',
        lastName: 'López',
        email: 'carlos.lopez@universidad.edu',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        role: 'teacher',
        phone: '+52 55 1111 2222',
        dateOfBirth: '1982-07-10',
        address: 'Calle 5 de Mayo 789, Ciudad de México',
        bio: 'Profesor de Estructuras de Datos',
        language: 'es',
        timezone: 'America/Mexico_City',
        courses: 2,
        average: 0,
        joinedDate: '2019-08-20'
    }
];
export const mockCourses = [
    {
        id: '1',
        code: 'CS101',
        name: 'Introducción a la Programación',
        credits: 4,
        instructor: 'Dr. María García',
        instructorTitle: 'Profesor Titular',
        schedule: 'Lunes y Miércoles 10:00-12:00',
        virtualRoom: 'Sala Virtual A',
        topics: 12,
        progress: 75,
        grade: 8.5,
        semester: '2024-1',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
    },
    {
        id: '2',
        code: 'CS201',
        name: 'Estructuras de Datos',
        credits: 4,
        instructor: 'Dr. Carlos López',
        instructorTitle: 'Profesor Asociado',
        schedule: 'Martes y Jueves 14:00-16:00',
        virtualRoom: 'Sala Virtual B',
        topics: 10,
        progress: 60,
        grade: 9.0,
        semester: '2024-1',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
    },
    {
        id: '3',
        code: 'CS301',
        name: 'Bases de Datos',
        credits: 3,
        instructor: 'Dra. Ana Martínez',
        instructorTitle: 'Profesor Titular',
        schedule: 'Viernes 09:00-12:00',
        virtualRoom: 'Sala Virtual C',
        topics: 8,
        progress: 50,
        grade: 8.0,
        semester: '2024-1',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400'
    }
];
export const mockSessions = [
    {
        id: '1',
        title: 'Clase: Arreglos y Listas',
        course: 'Estructuras de Datos',
        instructor: 'Dr. Carlos López',
        date: '2024-10-20',
        time: '14:00-16:00',
        type: 'class',
        status: 'upcoming',
        link: 'https://meet.google.com/abc-defg-hij'
    },
    {
        id: '2',
        title: 'Tutoría: Repaso SQL',
        course: 'Bases de Datos',
        instructor: 'Dra. Ana Martínez',
        date: '2024-10-21',
        time: '10:00-11:00',
        type: 'tutorship',
        status: 'upcoming',
        link: 'https://meet.google.com/xyz-uvwx-yz'
    },
    {
        id: '3',
        title: 'Examen Parcial',
        course: 'Introducción a la Programación',
        instructor: 'Dr. María García',
        date: '2024-10-15',
        time: '10:00-12:00',
        type: 'exam',
        status: 'completed'
    }
];
export const mockGrades = [
    {
        id: '1',
        course: 'Introducción a la Programación',
        code: 'CS101',
        credits: 4,
        midterm: 8.5,
        final: 8.5,
        average: 8.5,
        grade: 'A'
    },
    {
        id: '2',
        course: 'Estructuras de Datos',
        code: 'CS201',
        credits: 4,
        midterm: 9.0,
        final: 9.0,
        average: 9.0,
        grade: 'A'
    },
    {
        id: '3',
        course: 'Bases de Datos',
        code: 'CS301',
        credits: 3,
        midterm: 8.0,
        final: 8.0,
        average: 8.0,
        grade: 'B+'
    }
];
export const mockActivities = [
    {
        id: '1',
        title: 'Tarea 3: Implementación de Árboles',
        course: 'Estructuras de Datos',
        dueDate: '2024-10-25',
        status: 'pending'
    },
    {
        id: '2',
        title: 'Proyecto Final: Diseño de BD',
        course: 'Bases de Datos',
        dueDate: '2024-10-30',
        status: 'pending'
    },
    {
        id: '3',
        title: 'Quiz 2: Ciclos y Condicionales',
        course: 'Introducción a la Programación',
        dueDate: '2024-10-15',
        status: 'graded',
        grade: 9.5
    }
];
