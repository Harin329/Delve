import React from 'react';
import '../App.css';
import { Layout, Input, Space, Card, Row, Col } from 'antd';

function PostStudy() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

    const onSearch = value => console.log(value);

    return (
        <Layout className='App'>
            <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%'}}>
                <Row justify='start'>
                    <Col span={24}>
                        <Input size="large" placeholder="Title" />
                    </Col>
                </Row>
                <Row>
                    Simplified / Scientific
                </Row>
                <Row>
                    Description
                </Row>
                <Row>
                    Direction
                </Row>
                <Row>
                    Requirements
                </Row>
                <Row>
                    Images
                </Row>
                <Row>
                    Join
                </Row>
            </Space>
        </Layout>
    );
}

export default PostStudy;