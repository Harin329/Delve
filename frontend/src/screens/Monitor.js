import React, { useState, useEffect } from 'react';
import '../App.css';
import { Table, Typography, Layout, Input, List, Card, Row } from 'antd';

import { useNavigate } from 'react-router-dom';
import back from "../assets/back.png"
import participant from "../assets/researcher.png"

import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const { Title, Paragraph, Text, Link } = Typography;

function Monitor() {
    const { Header, Sider, Content } = Layout;
    const { Search } = Input;

    const auth = getAuth();
    const user = auth.currentUser;

    const [userID, setUserID] = useState(user.uid);
    const [data, setData] = useState([]);
    const [studyTitle, setStudyTitle] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const ID = window.location.pathname.split('/')[2];
        getPreStudy(ID)
    }, [userID])

    function getPreStudy(ID) {
        try {
            var config = {
                method: 'get',
                url: 'http://localhost:8000/study/' + ID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            };
            axios(config).then((res) => {
                console.log(res.data)
                setStudyTitle(res.data.title);
                try {
                    var config = {
                        method: 'get',
                        url: 'http://localhost:8000/study/' + ID + '/update',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    };
                    axios(config).then((res) => {
                        console.log(res.data)
                        setData(res.data)
                    })
                } catch (e) {
                    console.log(e);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    const columns = [
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title: 'User ID',
          dataIndex: 'creator',
          key: 'creator',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
      ];

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
                            {studyTitle}
                        </Title>
                    </Row>
                    <Table dataSource={data} columns={columns} />;
                </Content>
            </Layout>
        </Layout>
    );
}

export default Monitor;