import React from 'react';
import { Typography, Form, Input, Button, Checkbox, Row } from 'antd';
import Column from 'antd/lib/table/Column';


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
                }}
            >
                <Title> Researcher </Title>
            </div>
            <div 
                name="Participant"
                style={{
                    backgroundColor: 'black',
                }}
            >
                <button><img src="../assets/researcher.png" alt="my image"/></button>
            </div>
        </div>

    )
}

export default ChoiceOnboard;