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
            alignItems: 'center',
            height: '100vh',
        }}>
            <div 
                name="Researcher"
                style={{
                    backgroundColor: 'white',
                    width: '30%',
                    height: 700,
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
                        height: 280,
                        width: 280,
                        borderRadius: "50%",
                        marginBottom: 30,
                        marginTop: "15%",
                    }}/>
                <Title> Participant </Title>
                <h2 style={{
                        textAlign: 'center',
                        marginLeft: 40,
                        marginRight: 40,
                }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel eros non velit auctor aliquet.
                    </h2>
                    <Button type="primary" shape="round" size={'large'}
                        style={{
                            marginTop: 20,
                            paddingRight: 70,
                            paddingLeft: 70,
                        }}>
                        SELECT
                    </Button>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'white',
                    width: '30%',
                    height: 700,
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
                            height: 280,
                            width: 280,
                            marginTop: "15%",
                            borderRadius: "50%",
                            marginBottom: 30,
                    }}/>
                    <Title> Researcher </Title>
                    <h2 style={{
                        textAlign: 'center',
                        marginLeft: 40,
                        marginRight: 40,
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel eros non velit auctor aliquet.
                    </h2>
                    <Button type="primary" shape="round" size={'large'}
                        style={{
                            marginTop: 20,
                            paddingRight: 70,
                            paddingLeft: 70,
                        }}>
                        SELECT
                    </Button>
            </div>
        </div>

    )
}

export default ChoiceOnboard;
