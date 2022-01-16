import React, {useState} from 'react';
import { Typography, Form, Input, Button, Checkbox, Row, Col } from 'antd';

import Column from 'antd/lib/table/Column';
import '../App.css';
import { useNavigate } from 'react-router-dom'; 

import researcher from '../assets/researcher.png'
import participant from '../assets/participant.png'
import back from '../assets/backwhite.png'

const { Title, Paragraph, Text, Link } = Typography;

function ChoiceOnboard() {

    const navigate = useNavigate();
    const backnav = () => {
      navigate(-1)
    }

    const researcherhandle = () => {
        SetUserResearcher(true)
        navigate("/")
    }
    

    const[UserResearcher, SetUserResearcher] = useState(false)

    return(
        <div>
            <Button style={{
                        position: 'absolute',
                        backgroundColor: "#528B6E",
                        borderColor: "#528B6E",
                        }}
                    onClick={backnav}> 
                <img src={back} style={{
                        position: 'absolute',
                        left: 50,
                        top: 50,
                        height: 40,
                        width: 40,
                    }}/> 
            </Button>     
            <div style={{
                display: 'flex',
                flexDirection: Row,
                backgroundColor: "#528B6E",
                justifyContent: "space-evenly",
                alignItems: 'center',
                height: '100vh',
            }}>
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
                        <Title style={{fontSize: 50,}}> Researcher </Title>
                        <h2 style={{
                            textAlign: 'center',
                            marginLeft: 60,
                            marginRight: 60,
                        }}>
                            I want to create studies to carry out academic or scientific research.
                        </h2>
                        <Button type="primary" shape="round" size={'large'}
                            style={{
                                marginTop: 30,
                                paddingTop: 12,
                                paddingBottom: 50,
                                paddingRight: 100,
                                paddingLeft: 100,
                                fontWeight: 400,
                                fontSize: 22,
                                backgroundColor: "#528B6E",
                            }}
                            onClick={researcherhandle}>
                            Select
                        </Button>
                </div>
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
                    <Title style={{fontSize: 50, }}> Participant </Title>
                    <h2 style={{
                            textAlign: 'center',
                            marginLeft: 80,
                            marginRight: 80,
                    }}>
                            I want to view and participate in studies and research performed by others.
                        </h2>
                        <Button type="primary" shape="round" size={'large'}
                            style={{
                                marginTop: 30,
                                paddingTop: 12,
                                paddingBottom: 50,
                                paddingRight: 100,
                                paddingLeft: 100,
                                fontWeight: 400,
                                fontSize: 22,
                                backgroundColor: "#528B6E",
                            }}
                            onClick={() => {navigate("/")}}>
                            Select
                        </Button>
                </div>
            </div>
        </div>

    )
}

export default ChoiceOnboard;
