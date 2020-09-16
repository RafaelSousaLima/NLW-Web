import React from 'react';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: string;
    id: number;
    name: string;
    subject: string; 
    user_id: number;
    whatsapp: string;
}

export interface TeacherItemProps {
    teacher: Teacher
}

// export default TeacherItemProps;