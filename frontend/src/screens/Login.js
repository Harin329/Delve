import React from 'react';
import { Typography, Form, Input, Button, Checkbox } from 'antd';
import Column from 'antd/lib/table/Column';

import '../App.css';
import back from '../assets/back.png'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const { Title, Paragraph, Text, Link } = Typography;



function Login() {
  
    const auth = getAuth();

    const onFinish = (values) => {
      signInWithEmailAndPassword(auth, values.Email, values.Password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        console.log('fail')
      })
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div>
          <Button style={{
                    position: 'absolute',
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    }}> 
            <img src={back} style={{
                    position: 'absolute',
                    left: 50,
                    top: 50,
                    height: 40,
                    width: 40,
                }}/> 
          </Button>  
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: "55%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Title style ={{
            marginBottom: "8%",
          }}> Log In </Title>
          <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              <Form.Item
                name="Email"
                rules={[{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },]}
              >
                <Input placeholder="Email" id="inputID" style={{
                  paddingRight: 300,
                  borderRadius: 50,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: 'rgba(82, 139, 110, 0.32)',
                }}/>
              </Form.Item>

              <Form.Item
                name="Password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password id="inputID" placeholder="Password" bordered={false} style={{
                  borderRadius: 50,
                  paddingBottom: 10,
                  paddingTop: 10,
                  backgroundColor: 'rgba(82, 139, 110, 0.32)',
                }}/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 8}}>
                <Button type="primary" 
                        htmlType="submit"
                        shape="round"
                        style={{
                          marginTop: 40,
                          paddingRight: 100,
                          paddingLeft: 100,
                          paddingTop: 13,
                          paddingBottom: 40,
                          fontWeight: 700,
                          fontSize: 16,
                          backgroundColor: "#528B6E",
                        }}
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#528B6E',
          width: "45%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>        
        </div>
      </div>
      </div>
    );
  }

export default Login;