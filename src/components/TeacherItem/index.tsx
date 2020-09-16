import React from 'react';

import { TeacherItemProps } from '../../interfaces/Teachers/';

import whatsAppImg from '../../assets/images/icons/whatsapp.svg'

import './style.css'
import api from '../../services/api';

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} 
                    alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
    <strong>{teacher.cost}</strong>
                </p>
                <a target="_blank" href={`https://wa.me/${teacher.whatsapp}`} onClick={createNewConnection}>
                    <img src={whatsAppImg} alt="WhatsApp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;