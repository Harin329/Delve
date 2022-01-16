import React from 'react';
import { Typography, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import '../App.css';

import logo from '../assets/logocolor.png'


const { Title, Paragraph, Text, Link } = Typography;

function LandingPage() {
    return (
    <div class="diagonalcontainer">
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            width: "34%",
            marginLeft: 130,
            marginTop: 110,
        }}>

            <img 
                src={logo} 
                alt="my image"
                style={{
                    paddingTop: "20%",
                    height: 350,
                    width: 350,
                    objectFit: 'contain'
                }}/>
                <Title style={{
                    fontSize: 40,
                    width: "100%" 
                }}>Jump into, participate, and explore the world of information.</Title>
            <div></div>
            <button type="primary" htmlType="submit" shape="round" size={'small'}
                style={{
                    
                    alignSelf: 'center',
                    borderRadius: 50,
                  marginTop: 50,
                  paddingRight: 80,
                  paddingLeft: 80,
                  paddingTop: 11,
                  paddingBottom: 13,
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'white',
                  backgroundColor: "#528B6E",
                  borderColor: "#528B6E",
                }}>
                Join In
            </button>
            <text
                onClick={() => {console.log('success')}}
                style={{
                marginTop: 40,
                fontSize: 20,
                alignSelf: 'center',
                color: 'black',
                fontWeight: 400,
            }}> Already have an account? Log in</text>
            <div></div>
        </div>
        <div></div>
      </div>
    )
}

export default LandingPage;