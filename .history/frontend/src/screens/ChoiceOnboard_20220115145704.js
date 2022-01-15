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
                    width: '25%',
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
                }}/>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'white',
                    width: '25%',
                }}
            >
                    <img 
                        src={researcher} 
                        alt="my image"
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 50,
                    }}/>
            </div>
        </div>

    )
}

export default ChoiceOnboard;