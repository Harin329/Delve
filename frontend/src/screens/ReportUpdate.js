import React, { useState, useEffect } from 'react';
import '../App.css';
import { Layout, Input, Typography, Col, Row, Button } from 'antd';
import { getAuth } from "firebase/auth";
import back from "../assets/back.png"
import axios from 'axios';
import Thanks from '../assets/thanks.png'
import { getStorage, ref, uploadBytes } from "firebase/storage";

function ReportUpdate() {
    const { Title } = Typography;
    const { Content } = Layout;
    const { TextArea } = Input;

    const [update, setUpdate] = useState("");
    const [image, setImage] = useState([]);
    const [studyID, setStudyID] = useState("");

    const [thankYou, setThankYou] = useState(false);
    const storage = getStorage()
    const auth = getAuth();

    useEffect(() => {
        const ID = window.location.pathname.split('/')[2];
        setStudyID(ID);
    }, [])

    const upload = () => {
        try {
            var config = {
                method: 'post',
                url: 'http://delve.harinwu.com:8000/study/' + studyID + '/update',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:
                {
                    "creator": auth.currentUser.uid,
                    "description": update,
                    "created_at": Date.now(),
                }
            };
            axios(config).then((res) => {
                console.log(res)
                const promise = [];
                image.forEach((im) => {
                    console.log(im);
                    if (im == null) {
                        return
                    }
                    const storageRef = ref(storage, `Update/${studyID}/${res.data._id}` + im.name)
                    promise.push(uploadBytes(storageRef, im))
                })

                Promise.all(promise).then(() => {
                    setThankYou(true)
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch (e) {
            console.log(e);
        }
    }

    if (thankYou) {
        return (
            <div>
                <img src={back} onClick={() => {
                    window.location.href = '/study/' + studyID;
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
                            <Title level={3}>Now wait to hear back from the team.</Title>
                        </Row>
                        <Row style={{ marginTop: 30 }}>
                            <Col span={2}>
                                <Button type="primary" style={{ backgroundColor: '#528C6F', width: 150, borderRadius: 20 }} onClick={() => {
                                    window.location.href = '/study/' + studyID;
                                }}>Okay!</Button>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>

        )
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
                    paddingTop: "5%",
                }}>
                    <Row>
                        <Title>
                            Give us your update!
                        </Title>
                    </Row>
                    <Row justify='space-between' style={{ height: '40vh' }}>
                        <Col span={12}>
                            <TextArea rows={4} placeholder='Start typing...' value={update} onChange={(text) => {
                                setUpdate(text.target.value)
                            }} bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30, height: '100%', borderRadius: 10 }} />

                        </Col>
                        <Col span={11}>
                            <Row justify='center' onClick={() => {
                            }}>
                                <div style={{ backgroundColor: '#C8DAD1', height: '40vh', width: '100%', borderRadius: 10 }} >
                                    <input type="file" onChange={(e) => { setImage([...image, e.target.files[0]]) }} style={{ opacity: 0, position: 'absolute', left: 0, right: 0, bottom: 0, up: 0, width: '100%', height: '100%' }} />
                                </div>
                                <Typography style={{
                                    position: 'absolute',
                                    top: '20vh',
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }} >
                                    Upload a file
                                </Typography>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
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
                    </Row>
                    <Row justify='end' style={{ marginTop: 30 }}>
                        <Col span={2}>
                            <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }} onClick={upload}>Submit</Button>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ReportUpdate;