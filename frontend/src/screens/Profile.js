import React, {useState, useEffect} from 'react';
import '../App.css';
import { Button, Typography, Layout, Input, List, Card, Row } from 'antd';

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

    const [userID,setUserID] = useState(user.uid);
    const [data, setData] = useState([]);
    const [userResearcher, setUserResearcher] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        try {
            var configUser = {
                method: 'get',
                url: 'http://localhost:8000/user/?user_id=' + userID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            };
            axios(configUser).then((userRes) => {
                console.log(userRes.data);
                setUserResearcher(userRes.data.is_researcher);
                setUserName(userRes.data.username);
                getAllStudies(userRes.data.is_researcher, userID)
            })
        } catch (e) {
            console.log(e);
        }
    }, [userID])

    const getAllStudies = (UserResearcher, userID) => {
        try {
            const config = {
                method: 'get',
                url: 'http://localhost:8000/study/?user_id=' + userID + '&is_researcher=' + UserResearcher,
                headers: {
                    'Content-Type': 'application/json'
                },
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
                <img src={back} onClick={() => {
                window.location.href = '/'
            }} style={{
                position: 'absolute',
                left: 50,
                top: 50,
                height: 30,
                width: 30,
            }} />
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
                            Hello {userName}
                        </Row>
                        <Row style={{
                            fontSize: 20,
                        }}>
                            Here are your studies...
                        </Row>
                    </div>
                    
                    <List
                        style={{ padding: '20px' }}
                        grid={{ gutter: 0, column: 6 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={() => {
                                window.location.href = '/study/' + item.study_id
                            }}>
                                <div style={{ 
                                    padding: 5, 
                                    height: 200,
                                    width: 200,
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