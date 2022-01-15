import React from 'react';
import '../App.css';
import { Layout, Input, List, Card, Row } from 'antd';

function Study() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

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
        <Layout className='App'>
            <Sider className='Sider' style={{ backgroundColor: 'white' }}>
                <Row align='middle' justify='center'>
                    Delve
                </Row>
                <Row>
                    <Row>
                        Profile
                    </Row>
                    <Row>
                        Post a Study
                    </Row>
                    <Row>
                        Post Results
                    </Row>


                </Row>
                <Row>
                    <Row>
                        All
                    </Row>
                    <Row>
                        Clinical Trials
                    </Row>
                    <Row>
                        Environmental
                    </Row>
                    <Row>
                        Civic
                    </Row>
                    <Row>
                        Psychology
                    </Row>
                    <Row>
                        Science
                    </Row>
                </Row>
            </Sider>
            <Layout>
                <Header>
                    <Row align='middle' justify='center'>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: '100%' }} />
                    </Row>
                </Header>
                <Content>
                    <Row>
                        Filter
                    </Row>
                    <List
                        style={{ padding: '20px' }}
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>Card content</Card>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Study;