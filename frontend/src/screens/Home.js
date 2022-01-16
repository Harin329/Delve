import React, { useEffect, useState } from 'react';
import '../App.css';
import { Layout, Input, List, Card, Row, Divider, Anchor, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Logo from '../assets/logo.png'
import SearchImg from '../assets/search.png'
import Filter from '../assets/filter.png'
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, list, ref } from "firebase/storage";
import axios from 'axios';

function Home() {
    const { Content } = Layout;

    const [userResearcher, setUserResearcher] = useState(true);
    const [currentSection, setCurrentSection] = useState('All');
    const [data, setData] = useState([]);
    const [studyImages, setStudyImages] = useState([]);
    const [profileImageURL, setUserImage] = useState('');

    const firebaseConfig = {
        apiKey: "AIzaSyCfzhkWjKe73Eb8Ojovc75dghbsDy-DU-E",
        authDomain: "nwhacks2022.firebaseapp.com",
        projectId: "nwhacks2022",
        storageBucket: "nwhacks2022.appspot.com",
        messagingSenderId: "1086232361678",
        appId: "1:1086232361678:web:347db725dcfd977a1eae9f"
    };

    const app = initializeApp(firebaseConfig);

    const storage = getStorage(app);
    const auth = getAuth();
    const storageRef = ref(storage, `User/${auth.currentUser.uid}.png`);
    

    const onSearch = value => console.log(value);

    useEffect(() => {
        getOpenStudies(currentSection);
    }, [currentSection]);

    useEffect(() => {
        getStudyImages();

        getDownloadURL(storageRef).then((url) => {
            setUserImage(url);
        })
    }, [data]);

    const getOpenStudies = (currentSection) => {
        try {
            const config = {
                method: 'get',
                url: 'http://localhost:8000/study/open/' + currentSection.toLowerCase(),
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

    const getStudyImages = () => {
        data.forEach((item) =>  {
            const listRef = ref(storage, `Study/${item.study_id}`);
            list(listRef, { maxResults: 1 }).then((res) => {
                if (res.items.length > 0) {
                    getDownloadURL(res.items[0]).then((url) => {
                        studyImages.push(url);
                        setStudyImages([...studyImages, url]);
                    })
                } else {
                    setStudyImages([...studyImages, '']);
                }
            })
        });

    }

    function imgError(ev) {
        ev.target.onerror = "";
        ev.target.src = "http://placekitten.com/100/100";
        return true;
    }

    function imgErrorDash(ev) {
        ev.target.onerror = "";
        ev.target.src = "https://via.placeholder.com/150"
        return true;
    }

    function heightCalc(index) {
        if (index % 9 == 0) {
            return '400px';
        } else if (index % 9 == 1) {
            return '250px';
        } else if (index % 9 == 2) {
            return '200px'
        } else if (index % 9 == 3) {
            return '200px'
        } else if (index % 9 == 4) {
            return '300px'
        } else if (index % 9 == 5) {
            return '250px'
        } else if (index % 9 == 6) {
            return '250px'
        } else if (index % 9 == 7) {
            return '300px'
        } else if (index % 9 == 8) {
            return '400px'
        }
    }

    function topCalc(index) {
        if (index % 9 == 0) {
            return 0;
        } else if (index % 9 == 1) {
            return 0;
        } else if (index % 9 == 2) {
            return 0
        } else if (index % 9 == 3) {
            return 0;
        } else if (index % 9 == 4) {
            return '-150px'
        } else if (index % 9 == 5) {
            return '-200px'
        } else if (index % 9 == 6) {
            return 0;
        } else if (index % 9 == 7) {
            return '-50px'
        } else if (index % 9 == 8) {
            return '-150px'
        }
    }

    return (
        <Row align='middle' className='App' style={{ backgroundColor: '#528C6F', height: '100vh', paddingLeft: 10, paddingRight: 10 }}>
            <Col span={2} style={{ backgroundColor: '#528C6F', marginBottom: '21%' }}>
                <Row align='middle' style={{ marginBottom: 29 }} className='sideButtonsNormal'>
                    <img
                        src={Logo}
                        alt="Delve Logo"
                        style={{
                            width: '70%',
                            objectFit: 'contain',
                        }} />
                </Row>
                <Row>
                    <Link to={`/profile/${auth.currentUser.uid}`} className='sideButtonsNormal'> My Studies</Link>
                </Row>
                {userResearcher ? (<Row>
                    <Link to={"/postStudy"} className='sideButtonsNormal'> Post a Study</Link>
                </Row>) : null}
                <Row style={{ marginTop: 100 }} className={currentSection === 'All' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('All');
                }}>
                    All
                </Row>
                <Row className={currentSection === 'Clinical' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Clinical');
                }}>
                    Clinical Trials
                </Row>
                <Row className={currentSection === 'Environmental' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Environmental');
                }}>
                    Environmental
                </Row>
                <Row className={currentSection === 'Civic' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Civic');
                }}>
                    Civic
                </Row>
                <Row className={currentSection === 'Psychology' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Psychology');
                }}>
                    Psychology
                </Row>
                <Row className={currentSection === 'Science' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Science');
                }}>
                    Science
                </Row>
            </Col>
            <Col span={22} style={{ borderRadius: '20px', backgroundColor: "white", height: '98vh' }}>
                <Content style={{ padding: '2%', paddingBottom: 0, borderRadius: '20px' }}>
                    <Row align='middle' justify='space-between'>
                        <Input bordered={false} size="large" placeholder='Search...' prefix={<img
                            src={SearchImg}
                            alt="Search"
                            style={{
                                width: '16px',
                                objectFit: 'contain',
                            }} />} style={{ backgroundColor: '#E1E1E1', borderRadius: 20, width: '95%' }} />
                        <img
                            src={profileImageURL}
                            alt="Search"
                            onError={imgError}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#528C6F',
                                objectFit: 'cover',
                                borderRadius: 50
                            }} />
                    </Row>
                    <Row justify='end' style={{ marginTop: 10, marginRight: 90 }}>
                        <img
                            src={Filter}
                            alt="Filter"
                            style={{
                                width: 70,
                                objectFit: 'contain',
                            }} />
                    </Row>
                    <Row style={{ maxHeight: '85vh', overflow: 'auto', paddingTop: '1%', marginTop: 20 }} className='noScroll'>
                        <InfiniteScroll
                            dataLength={data.length}
                        >
                            <List
                                grid={{ column: 3 }}
                                dataSource={[...data]}
                                renderItem={(item, index) => (
                                    <div style={{ padding: 5, height: heightCalc(index), marginTop: topCalc(index), borderRadius: '20px', position: 'relative' }}>
                                        <img src={studyImages[index]} onError={imgErrorDash} style={{backgroundColor: 'green', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px'}}></img>
                                        <h1 style={{position: 'absolute', zIndex: 5, bottom: 10, left: 20}}>{item.title}</h1>
                                    </div>
                                )}
                            />
                        </InfiniteScroll>
                    </Row>
                </Content>
            </Col>
        </Row>
    );
}

export default Home;