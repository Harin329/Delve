import React, { useEffect, useState } from 'react';
import '../App.css';
import { Layout, Input, Space, Row, Col, Button, Typography } from 'antd';
import back from '../assets/back.png'
import plus from '../assets/plus.png'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';

function PostStudyResults() {
    const { TextArea } = Input;
    const { Title } = Typography;

    const firebaseConfig = {
        apiKey: "AIzaSyCfzhkWjKe73Eb8Ojovc75dghbsDy-DU-E",
        authDomain: "nwhacks2022.firebaseapp.com",
        projectId: "nwhacks2022",
        storageBucket: "nwhacks2022.appspot.com",
        messagingSenderId: "1086232361678",
        appId: "1:1086232361678:web:347db725dcfd977a1eae9f"
    };

    const app = initializeApp(firebaseConfig);

    const storage = getStorage(app)
    const auth = getAuth();

    const [studyID, setStudyID] = useState('');
    const [studyTitle, setStudyTitle] = useState('');
    const [studyURL, setStudyURL] = useState('');
    const [studyAbstract, setStudyAbstract] = useState('');
    const [studyIntroduction, setStudyIntroduction] = useState('');
    const [studyMethods, setStudyMethods] = useState('');
    const [studyResults, setStudyResults] = useState('');
    const [studyDiscussion, setStudyDiscussion] = useState('');
    const [studyConclusion, setStudyConclusion] = useState('');
    const [isScientific, setIsScientific] = useState(true);
    const [image, setImage] = useState([]);

    useEffect(() => {
        setStudyID(window.location.pathname.split('/')[2]);
    }, [])


    const upload = () => {
        try {
            var config = {
                method: 'post',
                url: 'http://localhost:8000/results',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: 
                {
                    "study_id": studyID,
                    "title": studyTitle,
                    "researchers": [
                        auth.currentUser.uid,
                    ],
                    "abstract": studyAbstract,
                    "intro": studyIntroduction,
                    "results": studyResults,
                    "methods": studyMethods,
                    "discussion": studyDiscussion,
                    "conclusion": studyConclusion,
                    "link": studyURL
                  }
            };
            axios(config).then((res) => {
                const promise = [];
                image.forEach((im) => {
                    console.log(im);
                    if (im == null) {
                        return
                    }
                    const storageRef = ref(storage, `StudyResult/${studyID}/` + im.name)
                    promise.push(uploadBytes(storageRef, im))
                })

                Promise.all(promise).then(() => {
                    window.location.href = '/study/' + studyID;
                })
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Layout className='App' style={{ backgroundColor: 'white' }}>
            <img src={back} onClick={() => {
                window.location.href = '/'
            }} style={{
                position: 'absolute',
                left: 50,
                top: 50,
                height: 30,
                width: 30,
            }} />
            <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Row justify='start'>
                    <Title>Publish Your Results</Title>
                </Row>
                <Row>
                    <Title level={4}>Title</Title>
                </Row>
                <Row justify='start'>
                    <Col span={24}>
                        <Input size="large" placeholder="Enter your title here..." value={studyTitle} onChange={(text) => {
                            setStudyTitle(text.target.value)
                        }} bordered={false} style={{ marginLeft: -20, marginTop: -30, marginBottom: 30 }} />
                    </Col>
                </Row>
                <Row>
                    <Title level={4}>URL or PDF</Title>
                </Row>
                <Row justify='start'>
                    <Col span={24}>
                        <Input size="large" placeholder="Enter a category..." value={studyURL} onChange={(text) => {
                            setStudyURL(text.target.value)
                        }} bordered={false} style={{ marginLeft: -20, marginTop: -30, marginBottom: 30 }} />
                    </Col>
                </Row>
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
                <Row>
                    <Title level={4}>Abstract</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyAbstract} onChange={(text) => {
                        setStudyAbstract(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Introduction</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyIntroduction} onChange={(text) => {
                        setStudyIntroduction(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Methods</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyMethods} onChange={(text) => {
                        setStudyMethods(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Results</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyResults} onChange={(text) => {
                        setStudyResults(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Discussion</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyDiscussion} onChange={(text) => {
                        setStudyDiscussion(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Conclusion</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' value={studyConclusion} onChange={(text) => {
                        setStudyConclusion(text.target.value)
                    }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Upload Images</Title>
                </Row>
                <Row>
                    {image.map((imag) => {
                        const url = URL.createObjectURL(imag)
                        return (
                            <Col style={{ width: 200, height: 200, marginRight: 10 }} onClick={() => {
                                setImage(image.filter((r) => { return r !== imag }))
                            }}>
                                <Row justify='center'>
                                    <div style={{ backgroundColor: '#E8E8E8', height: 200, width: 200, borderRadius: 10 }} >
                                        <img src={url} style={{ height: 200, width: 200, borderRadius: 10, objectFit: 'cover' }} />
                                    </div>
                                </Row>
                            </Col>
                        )
                    })}
                    <Col style={{ width: 200, height: 200 }}>
                        <Row justify='center' onClick={() => {
                        }}>
                            <div style={{ backgroundColor: '#E8E8E8', height: 200, width: 200, borderRadius: 10 }} >
                                <input type="file" onChange={(e) => { setImage([...image, e.target.files[0]]) }} style={{ opacity: 0, position: 'absolute', left: 0, right: 0, bottom: 0, up: 0, width: '100%', height: '100%' }} />
                            </div>
                            <img src={plus} style={{
                                position: 'absolute',
                                right: -25,
                                top: 75,
                                height: 50,
                                width: 50,
                            }} />
                        </Row>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} onClick={upload}>Publish</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>
    );
}

export default PostStudyResults;