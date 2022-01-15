import React from 'react';
import '../App.css';
import { Layout, Input, Space, Switch, Row, Col, Upload, Button } from 'antd';

function PostStudyResults() {
    const { TextArea } = Input;

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
            <Space direction="vertical" style={{ padding: '5%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Row justify='start'>
                    <Col span={24}>
                        <Input size="large" placeholder="Title" />
                    </Col>
                </Row>
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
                    Materials and Procedures
                </Row>
                <Row>
                    <TextArea rows={4} />
                </Row>
                <Row>
                    Discussion
                </Row>
                <Row>
                    <TextArea rows={4} />
                </Row>
                <Row>
                    Conclusion
                </Row>
                <Row>
                    <TextArea rows={4} />
                </Row>
                <Row>
                    Implications
                </Row>
                <Row>
                    <TextArea rows={4} />
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
                        <Button type="primary">Update</Button>
                    </Col>
                </Row>
            </Space>
        </Layout>
    );
}

export default PostStudyResults;