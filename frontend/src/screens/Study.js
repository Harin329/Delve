import React, { useEffect, useState } from 'react';
import '../App.css';
import { Layout, Input, Space, Row, Col, Button, Typography } from 'antd';
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import axios from 'axios';

import back from '../assets/back.png'
import backWhite from '../assets/backwhite.png'


function Study() {
    const { Title } = Typography;
    const [studyID, setStudyID] = useState('');
    const [studyTitle, setStudyTitle] = useState('');
    const [researchers, setResearchers] = useState([]);
    const [studyResearcher, setStudyResearcher] = useState('');
    const [studyDescription, setStudyDescription] = useState('');
    const [studyDirection, setStudyDirection] = useState('');
    const [participated, setParticipated] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [images, setImages] = useState([]);
    const auth = getAuth();
    const storage = getStorage();

    const [complete, setCompleted] = useState(false);
    const [studyURL, setStudyURL] = useState('');
    const [studyIntroduction, setStudyIntroduction] = useState('');
    const [studyAbstract, setStudyAbstract] = useState('');
    const [studyMethods, setStudyMethods] = useState('');
    const [studyResults, setStudyResults] = useState('');
    const [studyDiscussion, setStudyDiscussion] = useState('');
    const [studyConclusion, setStudyConclusion] = useState('');
    const [isScientific, setIsScientific] = useState(true);

    useEffect(() => {
        const ID = window.location.pathname.split('/')[2];
        setStudyID(ID);

        getResults(ID);
    }, [studyID])

    function getResults(ID) {
        try {
            var config = {
                method: 'get',
                url: 'http://delve.harinwu.com:8000/results/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            };
            axios(config).then((res) => {
                if (res.data) {
                    const listRef = ref(storage, `Study/${ID}`);
                    const listResultRef = ref(storage, `StudyResult/${ID}`);

                    listAll(listRef)
                        .then((res) => {
                            console.log(res)
                            const prom = [];
                            res.items.forEach((itemRef) => {
                                prom.push(getDownloadURL(itemRef));
                            });

                            Promise.all(prom).then((urls1) => {
                                listAll(listResultRef)
                                    .then((res) => {
                                        const prom2 = [];
                                        res.items.forEach((itemRef) => {
                                            prom2.push(getDownloadURL(itemRef));
                                        });

                                        Promise.all(prom2).then((urls2) => {
                                            setImages([...urls1, ...urls2]);
                                        })
                                    }).catch((error) => {
                                        // Uh-oh, an error occurred!
                                        console.log(error)
                                    });
                            })
                        }).catch((error) => {
                            // Uh-oh, an error occurred!
                            console.log(error)
                        });

                    console.log(res.data)
                    setStudyTitle(res.data.title);
                    setStudyURL(res.data.link);
                    setStudyAbstract(res.data.abstract);
                    setStudyIntroduction(res.data.intro);
                    setStudyResults(res.data.results);
                    setStudyMethods(res.data.methods);
                    setStudyDiscussion(res.data.discussion);
                    setStudyConclusion(res.data.conclusion);
                    setResearchers(res.data.researchers);
                    setCompleted(true);
                    const userID = res.data.researchers[0];
                    try {
                        var configUser = {
                            method: 'get',
                            url: 'http://delve.harinwu.com:8000/user/?user_id=' + userID,
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
                } else {
                    getPreStudy(ID);
                }

            })
        } catch (e) {
            console.log(e);
        }
    }

    function getPreStudy(ID) {
        try {
            var config = {
                method: 'get',
                url: 'http://delve.harinwu.com:8000/study/' + ID,
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
                setResearchers(res.data.researchers);
                setParticipated(res.data.participants.includes(auth.currentUser.uid));
                const userID = res.data.researchers[0];
                try {
                    var configUser = {
                        method: 'get',
                        url: 'http://delve.harinwu.com:8000/user/?user_id=' + userID,
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
        if (participated) {
            window.location.href = '/postUpdate/' + studyID
        } else {
            try {
                var config = {
                    method: 'post',
                    url: 'http://delve.harinwu.com:8000/study/' + studyID + '/join?participant_id=' + auth.currentUser.uid,
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
                    setParticipated(true);
                    window.location.href = '/postUpdate/' + studyID
                })
            } catch (e) {
                console.log(e);
            }
        }
    }

    if (complete) {
        return (
            <Layout className='App' style={{ backgroundColor: 'white' }}>
                <img src={backWhite} onClick={() => {
                    window.location.href = '/'
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
                            <Title style={{ color: 'white', fontSize: 70, textAlign: 'left' }}>{studyTitle}</Title>
                        </Row>
                        <Row justify='start'>
                            <Title level={3} style={{ color: 'white', fontSize: 40, }}>{studyResearcher}</Title>
                        </Row>
                    </Col>
                </Row>
                <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                    <Row justify='center'>
                        <Row style={{ backgroundColor: '#528C6F', width: '20%', padding: 5, borderRadius: 30 }}>
                            <Col span={12} className={isScientific ? 'selectedToggle' : 'unselectedToggle'} onClick={() => { setIsScientific(true) }}>
                                <Typography className={isScientific ? 'selectedToggleText' : 'unselectedToggleText'}>Scientific</Typography>
                            </Col>
                            <Col span={12} className={!isScientific ? 'selectedToggle' : 'unselectedToggle'} onClick={() => { setIsScientific(false) }}>
                                <Typography className={!isScientific ? 'selectedToggleText' : 'unselectedToggleText'}>Simplified</Typography>
                            </Col>
                        </Row>
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30, marginTop: 30 }}>
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Abstract</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyAbstract}</Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Introduction</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyIntroduction}</Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='center' align='top' style={{ marginBottom: 30 }}>
                        {images[1] ? (<Col span={24}>
                            <img src={images[1]} style={{ width: '100%', height: 300, borderRadius: '20px', objectFit: 'cover' }}></img>
                        </Col>) : null}
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                        {images[2] ? (<Col span={6}>
                            <img src={images[2]} style={{ width: 300, height: 300, borderRadius: '20px', objectFit: 'cover' }}></img>
                        </Col>) : null}
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Methods</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyMethods}</Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                        {images[3] ? (<Col span={6}>
                            <img src={images[3]} style={{ width: 300, height: 300, borderRadius: '20px', objectFit: 'cover' }}></img>
                        </Col>) : null}
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Results</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyResults}</Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                        {images[4] ? (<Col span={6}>
                            <img src={images[4]} style={{ width: 300, height: 300, borderRadius: '20px', objectFit: 'cover' }}></img>
                        </Col>) : null}
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Discussion</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyDiscussion}</Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify='start' align='top' style={{ marginBottom: 30 }}>
                        {images[5] ? (<Col span={6}>
                            <img src={images[5]} style={{ width: 300, height: 300, borderRadius: '20px', objectFit: 'cover' }}></img>
                        </Col>) : null}
                        <Col span={18}>
                            <Row justify='start'>
                                <Title level={4}>Conclusion</Title>
                            </Row>
                            <Row>
                                <Typography style={{ textAlign: 'start', fontSize: 18 }}>{studyConclusion}</Typography>
                            </Row>
                        </Col>
                    </Row>
                </Space>
            </Layout>)
    }

    return (
        <Layout className='App' style={{ backgroundColor: 'white' }}>
            <img src={backWhite} onClick={() => {
                window.location.href = '/'
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
                        <Title style={{ color: 'white', fontSize: 70, textAlign: 'left' }}>{studyTitle}</Title>
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
                {researchers.includes(auth.currentUser.uid) ? (
                        <Col span={2} style={{ marginRight: 20 }}>
                            <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} onClick={() => {
                                window.location.href = '/monitor/' + studyID;
                            }}>Monitor</Button>
                        </Col>) : null}
                    {researchers.includes(auth.currentUser.uid) ? (
                        <Col span={2} style={{ marginRight: 20 }}>
                            <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} onClick={() => {
                                window.location.href = '/postResults/' + studyID;
                            }}>Post Results</Button>
                        </Col>) : null}
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} onClick={upload}>{participated ? "Log Update" : "Participate"}</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>)
}

export default Study;