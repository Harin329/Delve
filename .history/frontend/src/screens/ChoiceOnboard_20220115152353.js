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
                    backgroundColor: 'white',
                    width: '25%',
                    height: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: "10%",
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
                        marginTop: "30%"
                    }}/>
                <Title> Participant </Title>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'white',
                    width: '25%',
                    height: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: "10%",
                }}
            >
                    <img 
                        src={researcher} 
                        alt="my image"
                        style={{
                            height: 150,
                            width: 150,
                            marginTop: "10%",
                            borderRadius: "50%",
                            marginBottom: 30,
                    }}/>
                    <Title> Participant </Title>
                    <h2 style={{
                        textAlign: 'center',
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel eros non velit auctor aliquet.
                    </h2>
                    <Button type="primary" shape="round" size={'large'}
                        style={{
                            paddingRight: 50,
                            paddingLeft: 50,
                        }}>
                        SELECT
                    </Button>
            </div>
        </div>

    )
}

export default ChoiceOnboard;
