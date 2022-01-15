import React from 'react';
import { Typography, Form, Input, Button, Checkbox, Row } from 'antd';
import Column from 'antd/lib/table/Column';

import researcher from '../assets/researcher.png'
import participant from '../assets/participant.png'

const { Title, Paragraph, Text, Link } = Typography;

function ChoiceOnboard() {
    return(
        <div style={{
            display: 'flex',
            flexDirection: Row,
            backgroundColor: 'beige',
            justifyContent: "space-evenly",
        }}>
            <div 
                name="Researcher"
                style={{
                    backgroundColor: 'Green',
                    height: '100%',
                }}
            >
                <img 
                    src={participant} 
                    alt="my image"
                    style={{
                        widht: 100,
                        height: 100,
                        borderRadius: '50%',
                }}/>
                <Title> Researcher </Title>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'white',
                    align: 'center',
                }}
            >
                <img 
                    src={researcher} 
                    alt="my image"
                    style={{
                        widht: 100,
                        height: 100,
                        borderRadius: '50%',
                }}/>
                <Title> Participant </Title>
            </div>
        </div>

    )
}

export default ChoiceOnboard;