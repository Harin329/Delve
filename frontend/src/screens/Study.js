import React, { useEffect, useState } from 'react';
import '../App.css';
import { Layout, Input, Space, Row, Col, Button, Typography } from 'antd';
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Thanks from '../assets/thanks.png'
import back from '../assets/back.png'
import backWhite from '../assets/backwhite.png'


function Study() {
    const { Title } = Typography;
    const [studyID, setStudyID] = useState('');
    const [studyTitle, setStudyTitle] = useState('');
    const [studyResearcher, setStudyResearcher] = useState('');
    const [studyDescription, setStudyDescription] = useState('');
    const [studyDirection, setStudyDirection] = useState('');
    const [participated, setParticipated] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [thankYou, setThankYou] = useState(false);
    const [images, setImages] = useState([]);
    const auth = getAuth();
    const storage = getStorage();

    useEffect(() => {
        const ID = window.location.pathname.split('/')[2];
        setStudyID(ID);

        getPreStudy(ID);
    }, [studyID])

    function getPreStudy(ID) {
        try {
            var config = {
                method: 'get',
                url: 'http://localhost:8000/study/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            };
            axios(config).then((res) => {
                const listRef = ref(storage, `Study/${ID}`);

                listAll(listRef)
                    .then((res) => {
                        console.log(res)
                        const img = []
                        const prom = [];
                        res.items.forEach((itemRef) => {
                            prom.push(getDownloadURL(itemRef));
                        });

                        Promise.all(prom).then((urls) => {
                            setImages(urls);
                        })
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                        console.log(error)
                    });

                console.log(res.data)
                setStudyTitle(res.data.title);
                setStudyDescription(res.data.description);
                setStudyDirection(res.data.direction);
                setRequirements(res.data.requirements.split(","));
                const userID = res.data.researchers[0];
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
                        setStudyResearcher(userRes.data.username);
                    })
                } catch (e) {
                    console.log(e);
                }

            })
        } catch (e) {
            console.log(e);
        }
    }

    const randomColors = ['#528C6F', '#5088BA', '#C37277', '#EFB943', '#8580CD']

    const upload = () => {
        try {
            var config = {
                method: 'post',
                url: 'http://localhost:8000/study/' + studyID + '/join?participant_id=' + auth.currentUser.uid,
                headers: {
                    'Content-Type': 'application/json'
                },
                data:
                {
                    "participant_id": auth.currentUser.uid,
                }
            };
            axios(config).then((res) => {
                console.log(res)
                setThankYou(true);
                setParticipated(true);
            })
        } catch (e) {
            console.log(e);
        }
    }

    if (thankYou) {
        return (
            <div>
                <img src={back} onClick={() => {
                    setThankYou(false);
                }} style={{
                    position: 'absolute',
                    left: 50,
                    top: 50,
                    height: 30,
                    width: 30,
                }} />
                <img src={Thanks} style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}></img>
                <div>
                    <Col style={{
                        position: 'absolute',
                        left: '10%',
                        top: '30%',
                        width: '30%',
                    }}>
                        <Row justify='start'>
                            <Title>Thank You!</Title>
                        </Row>
                        <Row justify='start'>
                            <Title level={3}>Now wait to hear back from {studyResearcher}.</Title>
                        </Row>
                        <Row style={{ marginTop: 30 }}>
                            <Col span={2}>
                                <Button type="primary" style={{ backgroundColor: '#528C6F', width: 150, borderRadius: 20 }} onClick={() => {
                                    setThankYou(false);
                                }}>Okay!</Button>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>

        )
    }

    return (
        <Layout className='App' style={{ backgroundColor: 'white' }}>
            <img src={backWhite} onClick={() => {
                setThankYou(false);
            }} style={{
                position: 'absolute',
                left: 50,
                top: 50,
                height: 30,
                width: 30,
                zIndex: 5,
            }} />
            <Row justify='start' align='middle' style={{ backgroundColor: "blue", height: '100vh', padding: '20%' }}>
                <img src={images[0]} style={{ position: 'absolute', height: '100vh', width: '100%', top: 0, left: 0, right: 0, bottom: 0 }}></img>
                <div style={{ position: 'absolute', height: '100vh', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.7 }}></div>
                <Col>
                    <Row justify='start'>
                        <Title style={{ color: 'white', fontSize: 70, textAlign: 'left'}}>{studyTitle}</Title>
                    </Row>
                    <Row justify='start'>
                        <Title level={3} style={{ color: 'white', fontSize: 40, }}>{studyResearcher}</Title>
                    </Row>
                </Col>
            </Row>
            <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                    {images[1] ? (<Col span={6}>
                        <img src={images[1]} style={{ width: 300, height: 300, borderRadius: '20px' }}></img>
                    </Col>) : null}
                    <Col span={18}>
                        <Row justify='start'>
                            <Title level={4}>Description</Title>
                        </Row>
                        <Row>
                            <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyDescription}</Typography>
                        </Row>
                    </Col>
                </Row>
                <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                    {images[2] ? (<Col span={6}>
                        <img src={images[2]} style={{ width: 300, height: 300, borderRadius: '20px' }}></img>
                    </Col>) : null}
                    <Col span={18}>
                        <Row justify='start'>
                            <Title level={4}>Direction</Title>
                        </Row>
                        <Row>
                            <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyDirection}</Typography>
                        </Row>
                    </Col>
                </Row>
                <Row justify='start'>
                    <Title level={4}>Requirements</Title>
                </Row>
                <Row justify='space-around' style={{ marginBottom: 30, marginTop: 10 }}>
                    {requirements.map((req, index) => {
                        return (
                            <Col style={{ width: 100, height: 100 }}>
                                <Row justify='center'>
                                    <Col>
                                        <Row justify='center'>
                                            <div style={{ backgroundColor: randomColors[index % 5], height: 80, width: 80, borderRadius: 80 }} />
                                        </Row>
                                        <Typography style={{ marginTop: 5 }}>{req}</Typography>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                </Row>
                <Row justify='center' style={{ marginTop: 30 }}>
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} disabled={participated} onClick={upload}>{participated ? "Joined" : "Participate"}</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>)
}

export default Study;