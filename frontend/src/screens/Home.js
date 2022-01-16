import React, { useState } from 'react';
import '../App.css';
import { Layout, Input, List, Card, Row, Divider, Anchor, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

    const [userResearcher, setUserResearcher] = useState(true);

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
        <Row align='middle' className='App' style={{ backgroundColor: 'gray', height: '100vh', paddingLeft: 10, paddingRight: 10 }}>
            <Col span={2} style={{ backgroundColor: 'gray' }}>
                <Row align='middle' style={{ marginBottom: 80 }}>
                    Delve
                </Row>
                <Row className='sideButtons'>
                    My Studies
                </Row>
                {userResearcher ? (<Row className='sideButtons'>
                    Post a Study
                </Row>) : null}
                {userResearcher ? (<Row className='sideButtons'>
                    Post Results
                </Row>) : null}
                <Row style={{ marginTop: 100 }} className='sideButtons'>
                    All
                </Row>
                <Row className='sideButtons'>
                    Clinical Trials
                </Row>
                <Row className='sideButtons'>
                    Environmental
                </Row>
                <Row className='sideButtons'>
                    Civic
                </Row>
                <Row className='sideButtons'>
                    Psychology
                </Row>
                <Row className='sideButtons'>
                    Science
                </Row>
            </Col>
            <Col span={22} style={{ borderRadius: '20px', backgroundColor: "white", height: '98vh' }}>
                <Content style={{ padding: '2%', paddingBottom: 0, borderRadius: '20px' }}>
                    <Row align='middle' justify='center'>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: '100%' }} />
                    </Row>
                    <Row style={{ maxHeight: '90vh', overflow: 'auto', paddingTop: '3%', marginTop: 10 }} className='noScroll'>
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