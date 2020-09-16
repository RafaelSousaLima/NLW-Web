import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import PageHeaders from '../../components/PageHeaders';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');

    const [avatar, setAvatar] = useState('');

    const [whatsapp, setWhatsapp] = useState('');

    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');

    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
        scheduleItems.push();
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position ) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('/classes', {
            name,
            avatar, 
            whatsapp, 
            bio, 
            subject, 
            cost: Number(cost), 
            schedule: scheduleItems
        })
        .then(response => {
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(() => alert('Erro no cadastro'));
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeaders title="Que incrível que você quer dar aulas."
                description="O primero passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            label="Nome completo"
                            name="name"
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                        />

                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={e => { setAvatar(e.target.value) }}
                        />
                        <Input
                            label="WhatsApp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={e => { setWhatsapp(e.target.value) }}
                        />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={e => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            label="Matéria"
                            name="subject"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            options={[
                                { value: 'java', label: 'Java' },
                                { value: 'node', label: 'Node' },
                                { value: 'react', label: 'React' },
                                { value: 'kotlin', label: 'Kotlin' },
                                { value: 'cnet', label: 'C#' },
                            ]}
                        />
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>
                        {scheduleItems.map((item, index) => {
                            return (
                                <div key={item.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={item.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value) }
                                        options={[
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
                                        name="from"
                                        label="Das" 
                                        type="time" 
                                        value={item.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time" 
                                        value={item.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <fieldset>
                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante" />
                            Importante <br />
                            Preencha todos os dados
                        </p>
                            <button type="submit">
                                Salvar cadastro
                        </button>
                        </footer>
                    </fieldset>
                </form>
            </main>
        </div>
    );
}
export default TeacherForm;