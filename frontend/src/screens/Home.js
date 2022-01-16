import React, { useState } from 'react';
import '../App.css';
import { Layout, Input, List, Card, Row, Divider, Anchor, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Logo from '../assets/logo.png'
import SearchImg from '../assets/search.png'
import Filter from '../assets/filter.png'
import { Link } from 'react-router-dom';

function Home() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

    const [userResearcher, setUserResearcher] = useState(true);
    const [currentSection, setCurrentSection] = useState('All');

    const onSearch = value => console.log(value);

    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        }
    ];

    return (
        <Row align='middle' className='App' style={{ backgroundColor: '#438151', height: '100vh', paddingLeft: 10, paddingRight: 10 }}>
            <Col span={2} style={{ backgroundColor: '#438151', marginBottom: '21%' }}>
                <Row align='middle' style={{ marginBottom: 29 }} className='sideButtonsNormal'>
                    <img
                        src={Logo}
                        alt="Delve Logo"
                        style={{
                            width: '50%',
                            objectFit: 'contain',
                        }} />
                </Row>
                <Row>
                    <Link to={"/profile/1"} className='sideButtonsNormal'> My Studies</Link>
                </Row>
                {userResearcher ? (<Row>
                    <Link to={"/postStudy"} className='sideButtonsNormal'> Post a Study</Link>
                </Row>) : null}
                <Row style={{ marginTop: 100 }} className={currentSection === 'All' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('All');
                }}>
                    All
                </Row>
                <Row className={currentSection === 'Clinical Trials' ? 'sideButtons' : 'sideButtonsNormal'} onClick={() => {
                    setCurrentSection('Clinical Trials');
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
                        <Input bordered={false} size="large" prefix={<img
                            src={SearchImg}
                            alt="Search"
                            style={{
                                width: '16px',
                                objectFit: 'contain',
                            }} />} style={{ backgroundColor: '#E1E1E1', borderRadius: 20, width: '95%' }} />
                        <img
                            src={SearchImg}
                            alt="Search"
                            style={{
                                width: '50px',
                                backgroundColor: '#438151',
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
                    <Row style={{ maxHeight: '85vh', overflow: 'auto', paddingTop: '2%', marginTop: 10 }} className='noScroll'>
                        <InfiniteScroll
                            dataLength={data.length}
                        >
                            <List
                                grid={{ column: 4 }}
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item style={{ padding: 5 }}>
                                        <Card title={item.title}>Card content</Card>
                                    </List.Item>
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