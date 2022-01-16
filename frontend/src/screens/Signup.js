import React, { useState } from 'react';
import {
  Form,
  Input,
  Row,
  Button,
  Typography
} from 'antd';

import axios from 'axios';
import '../App.css';
import back from '../assets/backwhite.png'


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const { Title, Paragraph, Text, Link } = Typography;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 40,
    },
    sm: {
      span: 100,
    },
  },
  wrapperCol: {
    xs: {
      span: 40,
    },
    sm: {
      span: 40,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};


function Signup() {

  const auth = getAuth();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        console.log(user.user.uid);
        console.log(getAuth().currentUser);
        var config = {
          method: 'post',
          url: 'http://localhost:8000/user',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "user_id": user.user.uid,
            "is_researcher": false,
            "username": values.fullname,
            "email": values.email
          }
        };
        axios(config).then((res) => {
          console.log(res.data);
        })
      })
  };

  return (
    <div>
      <Button style={{
                    position: 'absolute',
                    backgroundColor: "#528B6E",
                    borderColor: "#528B6E",
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
        flexDirection: Row,
        width: '100vw',
        height: '100vh',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#528B6E',
          width: "45%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Title style={{ color: 'white' }}> Already have an account? </Title>
          <Button type="primary" shape="round" size={'large'}
            style={{
              marginTop: 20,
              paddingRight: 60,
              paddingLeft: 60,
              paddingTop: 13,
              paddingBottom: 35,
              backgroundColor: 'white',
              color: '#528B6E',
              border: 0,
              fontWeight: 700,
            }}>
            Log In
          </Button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: "55%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Title style={{
            marginBottom: "8%",
          }}> Create an Account </Title>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            size={'large'}
            scrollToFirstError
          >
            <Form.Item
              name="fullname"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullname!',
                  whitespace: true,
                },
              ]}
            >
              <Input id="inputID" placeholder="Full Name" style={{
                marginRight: 300,
                borderRadius: 50,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'rgba(82, 139, 110, 0.32)',
              }} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input id="inputID" placeholder="Email" style={{
                borderRadius: 50,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'rgba(82, 139, 110, 0.32)',
              }} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              style={{

              }}
              hasFeedback
            >
              <Input.Password id="inputID" placeholder="Password" bordered={false} style={{
                borderRadius: 50,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'rgba(82, 139, 110, 0.32)',

              }} />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password id="inputID" placeholder="Confirm Password" bordered={false} style={{
                borderRadius: 50,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'rgba(82, 139, 110, 0.32)',
              }} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" shape="round" size={'large'}
                style={{
                  marginTop: 40,
                  paddingRight: 100,
                  paddingLeft: 100,
                  paddingTop: 13,
                  paddingBottom: 40,
                  fontWeight: 700,
                  backgroundColor: "#528B6E",
                }}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;