import React from 'react';
import { Typography, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import '../App.css';

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
            height: "100%",
        }}>
            <div 
                name="Researcher"
                style={{
                    backgroundColor: 'Green',
                    width: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img 
                    src={participant} 
                    alt="my image"
                    style={{
                        height: 150,
                        width: 150,
                        borderRadius: "50%",
                        marginBottom: 30,
                    }}/>
                <Title> Participant </Title>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'white',
                    width: '35%',
                    height: 700,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: "20%",
                }}
            >
                    <img 
                        src={researcher} 
                        alt="my image"
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: "50%",
                            marginBottom: 30,
                    }}/>
                    <Title> Participant </Title>
            </div>
        </div>

    )
}

export default ChoiceOnboard;
