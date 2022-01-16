import React from 'react';
import { Typography, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import logo from '../assets/logocolor.png'
import background from '../assets/landingpage.png'


const { Title, Paragraph, Text, Link } = Typography;

function LandingPage() {
    let navigate = useNavigate();

    const loginnav= () => {
        console.log("success");
        navigate('/login');
    }

    const signupnav = () => {
        console.log("success");
        navigate('/signup');
    }

    return (
    <div style={{
        width: '100vw',
        height: '100vh',
    }}>
        <img 
            src={background} 
            alt="my image"
            style={{
                height: '100vh',
                right: 0,
                objectFit: 'contain',
                position: 'absolute',
            }}/>
        <div style={{
            position: 'absolute',
            left: 200,
            top: 200,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <img 
            src={logo} 
            alt="my image"
            style={{
                height: 350,
                width: 350,
                objectFit: 'contain',
            }}/>
            <Title style={{
                    marginTop: "-8%",
                    fontSize: 40,
                    width: "55%",
                    fontFamily: "Roboto-Light",
                }}>Jump into, participate, and explore the world of information.</Title>
            <div>
            <Button shape="round" size={'small'}
                onClick={signupnav}
                style={{
                  marginTop: 50,
                  paddingRight: 80,
                  paddingLeft: 80,
                  paddingTop: 8,
                  paddingBottom: 40,
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'white',
                  backgroundColor: "#528B6E",
                  borderColor: "#528B6E",
                }}>
                Join In
            </Button>
            </div>
            <text
                onClick={loginnav}
                style={{
                marginTop: 40,
                fontSize: 18,
                color: 'black',
                fontWeight: 600,
            }}> <text style={{
                fontWeight: 200,
            }}>Already have an account?</text> Log in</text>
        </div>
       
    </div>
    )
}

export default LandingPage;