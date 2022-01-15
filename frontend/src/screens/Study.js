import React from 'react';
import '../App.css';
import { Layout, Input, Space, Switch, Row, Col, Upload, Button, Typography } from 'antd';

function Study() {
    const { TextArea } = Input;
    const completed = true;

    const imageUrl = ""
    const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onSearch = value => console.log(value);

    if (completed) {
        return (
            <Layout className='App' style={{ backgroundColor: 'white' }}>
                <Row style={{ backgroundColor: "blue", height: '100vh' }}>
                    <Row>
                        <Typography>Title</Typography>
                    </Row>
                    <Row>
                        <Typography>Researcher Name</Typography>
                    </Row>
                </Row>
                <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                    <Row>
                        <Switch checkedChildren="Simplifed" unCheckedChildren="Scientific" defaultChecked />
                    </Row>
                    <Row>
                        Abstract
                    </Row>
                    <Row>
                        <TextArea rows={4} />
                    </Row>
                    <Row>
                        Introduction
                    </Row>
                    <Row>
                        <TextArea rows={4} />
                    </Row>
                    <Row>
                        Materials and Methods
                    </Row>
                    <Row>
                        Discussion
                    </Row>
                    <Row>
                        Conclusion
                    </Row>
                    <Row>
                        Implications
                    </Row>
                    <Row>
                        Images
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
                    <Row>
                        Related
                    </Row>
                </Space>
            </Layout>)
    }

    return (
        <Layout className='App' style={{ backgroundColor: 'white' }}>
            <Row style={{ backgroundColor: "blue", height: '100vh' }}>
                <Row>
                    <Typography>Title</Typography>
                </Row>
                <Row>
                    <Typography>Researcher Name</Typography>
                </Row>
            </Row>
            <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Row>
                    <Switch checkedChildren="Simplifed" unCheckedChildren="Scientific" defaultChecked />
                </Row>
                <Row>
                    Description
                </Row>
                <Row>
                    <TextArea rows={4} />
                </Row>
                <Row>
                    Direction
                </Row>
                <Row>
                    <TextArea rows={4} />
                </Row>
                <Row>
                    Requirements
                </Row>
                <Row>
                    Images
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
                <Row justify='end'>
                    <Col>
                        <Button type="primary">Join</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>
    );
}

export default Study;