import React, {useState} from 'react';
import '../App.css';
import { Button, Typography, Layout, Input, List, Card, Row } from 'antd';

import { useNavigate } from 'react-router-dom';
import back from "../assets/back.png"
import participant from "../assets/researcher.png"

import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const { Title, Paragraph, Text, Link } = Typography;

function Profile() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

    const auth = getAuth();
    const user = auth.currentUser;

    const [userID,SetUserID] = useState(user.uid);
    const [data, setData] = useState([]);
    const [UserResearcher, setUserResearcher] = useState(false);

    const navigate = useNavigate();
    const backnav = () => {
        navigate(-1)
    }

    const getAllStudies = (UserResearcher, userID) => {
        try {
            const config = {
                method: 'get',
                url: 'http://localhost:8000/study/open/',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    user_id: userID, 
                    is_researcher: UserResearcher,
                }
            };
            axios(config).then((res) => {
                console.log(res.data);
                setData([...res.data]);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Layout className='App'>
            <Layout style={{
                backgroundColor: "#FFFFFF",
            }}>
                <Button style={{
                            position: 'absolute',
                            backgroundColor: "#FFFFFF",
                            borderColor: "#FFFFFF",
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
                <Content style={{
                    width: '80%',
                    alignSelf: "center",
                    paddingTop: "2%",
                }}>
                       
                    <div style={{
                        marginLeft: 20,
                    }}>
                        <Row style={{
                            fontSize: 60,
                            fontWeight: 600,
                        }}> 
                            Hello Amy
                        </Row>
                        <Row style={{
                            fontSize: 20,
                        }}>
                            Here are your studies...
                        </Row>
                    </div>
                    
                    <List
                        style={{ padding: '20px' }}
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item style={{
                                
                            }}>
                                <div style={{ 
                                    padding: 5, 
                                    height: 200,
                                    marginTop: 20, 
                                    borderRadius: '20px', 
                                    position: 'relative' }}>
                                        <img src={participant} style={{
                                            backgroundColor: 'green', 
                                            width: '100%', 
                                            height: '100%', 
                                            borderRadius: '20px'}}></img>
                                        <h1 style={{
                                            position: 'absolute', 
                                            bottom: 10, 
                                            left: 20}}> 
                                        {item.title}</h1>
                                </div>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Profile;