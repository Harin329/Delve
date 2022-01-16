import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button, Typography, Layout, List, Row } from 'antd';

import back from "../assets/back.png"
import participant from "../assets/researcher.png"

import axios from 'axios';
import { getAuth } from "firebase/auth";
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";


function Profile() {
    const { Content } = Layout;

    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;

    const [userID, setUserID] = useState(user.uid);
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
                var finalData = []

                res.data.forEach((study) => {
                    const listRef = ref(storage, `Study/${study.study_id}`);

                    list(listRef, { maxResults: 1 }).then((results) => {
                        if (results.items.length > 0) {
                            getDownloadURL(results.items[0]).then((url) => {
                                finalData.push({ ...study, url: url })
                            })
                        } else {
                            finalData.push({ ...study, url: '' })
                        }

                    })

                    
                })

                function delay(time) {
                    return new Promise(resolve => setTimeout(resolve, time));
                  }
                  
                delay(1000).then(() => {
                    console.log(finalData)
                    setData(finalData)
                });


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
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '20px',
                                        backgroundColor: 'black',
                                        position: 'absolute',
                                        opacity: 0.7
                                    }}></div>
                                    <img src={item.url} style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '20px',
                                        objectFit: 'cover',
                                    }}></img>
                                    <Typography style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 20,
                                        color: 'white',
                                        fontWeight: 'bold',
                                         textAlign: 'left'
                                    }}>
                                        {item.title}</Typography>
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