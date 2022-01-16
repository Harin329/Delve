import React, { useState } from 'react';
import '../App.css';
import { Layout, Input, Space, Switch, Row, Col, Upload, Button, Typography } from 'antd';
import back from '../assets/back.png'

function PostStudy() {
    const { TextArea } = Input;
    const { Title } = Typography;

    const [isScientific, setIsScientific] = useState(false);
    const [requirements, setRequirements] = useState(["18+", "English", "Science"]);

    const randomColors = ['#528C6F', '#5088BA', '#C37277', '#EFB943', '#8580CD']

    const imageUrl = ""
    const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onSearch = value => console.log(value);

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
                    <Title>Create a Study</Title>
                </Row>
                <Row>
                    <Title level={4}>Title</Title>
                </Row>
                <Row justify='start'>
                    <Col span={24}>
                        <Input size="large" placeholder="Enter your title here..." bordered={false} style={{ marginLeft: -20, marginTop: -30, marginBottom: 30 }} />
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
                    <Title level={4}>Description</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Direction</Title>
                </Row>
                <Row>
                    <TextArea rows={4} placeholder='Start typing...' bordered={false} style={{ backgroundColor: '#E8E8E8', marginBottom: 30 }} />
                </Row>
                <Row>
                    <Title level={4}>Requirements</Title>
                </Row>
                <Row style={{ marginBottom: 30, marginTop: 10 }}>
                    {requirements.map((req) => {
                        return (
                            <Col style={{ width: 70, height: 70 }}>
                                <Row justify='center'>
                                    <div style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)], height: 50, width: 50, borderRadius: 50 }} />
                                    <Typography style={{ marginTop: 5 }}>{req}</Typography>
                                </Row>
                            </Col>
                        )
                    })}
                    <Col style={{ width: 70, height: 70 }}>
                        <Row justify='center'>
                            <div style={{ backgroundColor: '#528C6F', height: 50, width: 50, borderRadius: 50 }} />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Title level={4}>Upload Images</Title>
                </Row>
                <Row>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Row>
                <Row justify='center'>
                    <Col span={2}>
                        <Button type="primary" style={{ backgroundColor: '#528C6F', width: '100%', borderRadius: 20 }}>Create</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>
    );
}

export default PostStudy;