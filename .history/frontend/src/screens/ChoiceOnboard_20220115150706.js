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
        }}>
            <div 
                name="Researcher"
                style={{
                    backgroundColor: 'Green',
                    width: '45%',
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
                        borderRadius: 50,
                    }}/>
                <Text> Participant </Text>
            </div>
            <div 
                name="Participant"x
                style={{
                    backgroundColor: 'white',
                    width: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                    <img 
                        src={researcher} 
                        alt="my image"
                        style={{
                            height: 300,
                            width: 300,
                            borderRadius: 50,
                    }}/>
                    <Text> Researcher </Text>
            </div>
        </div>

    )
}

export default ChoiceOnboard;
