import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import Select from '../../components/Select';
import PageHeaders from '../../components/PageHeaders';

import TeacherItem from '../../components/TeacherItem';

import { Teacher } from '../../interfaces/Teachers/';
import Input from '../../components/Input';

import './style.css';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTheachers(e: FormEvent) {
        e.preventDefault();

        const teacherData = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(teacherData.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeaders title="Que incrivél que você quer dar aulas" >
                <form id="search-teachers" onSubmit={searchTheachers}>
                    <Select 
                        label="Matéria" 
                        name="subject" 
                        value={subject} 
                        onChange={e => setSubject(e.target.value)}
                        options = {[
                            {value: 'java', label: 'Java'},
                            {value: 'node', label: 'Node'},
                            {value: 'react', label: 'React'},
                            {value: 'kotlin', label: 'Kotlin'},
                            {value: 'cnet', label: 'C#'},
                        ]}
                    />
                    
                    <Select 
                        label="Dia da semana" 
                        name="week_day" 
                        value={week_day} 
                        onChange={e => setWeekDay(e.target.value)}
                        options = {[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda'},
                            {value: '2', label: 'Terça'},
                            {value: '3', label: 'Quarta'},
                            {value: '4', label: 'Quinta'},
                            {value: '5', label: 'Sexta'},
                            {value: '6', label: 'Sábado'},
                        ]}
                    />

                    <Input 
                        label="Hora" 
                        name="time" 
                        type="time" 
                        value={time} 
                        onChange={e => setTime(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeaders>
            <main>
                {teachers.map( (teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}></TeacherItem>
                })}
            </main>
        </div>
    );
};

export default TeacherList;