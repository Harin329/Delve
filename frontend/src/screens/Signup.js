import React, { useState } from 'react';
import {
  Form,
  Input,
  Row,
  Button,
  Typography
} from 'antd';

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
      offset: 8,
    },
  },
};


function Signup () {

  const auth = getAuth();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    createUserWithEmailAndPassword(auth, values.email, values.password).then((user) => {console.log(user.user.uid)})
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: Row,
      width: '100vw',
      height: '100vh',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#528C6F',
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Title> Already have an account? </Title>
        <Button type="primary" shape="round" size={'large'}
              style={{
                  marginTop: 20,
                  paddingRight: 60,
                  paddingLeft: 60,
              }}>
              Log In
          </Button> 
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'beige',
        width: "50%",
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
            <Input placeholder="Full Name" style={{
              paddingRight: 300,
              borderRadius: 50,
            }}/>
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
            <Input placeholder="Email" style={{
              borderRadius: 50,
            }}/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" style={{
              borderRadius: 50,
            }}/>
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
            <Input.Password placeholder="Confirm Password" style={{
              borderRadius: 50,
            }}/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" shape="round" size={'large'}
                style={{
                    marginTop: 30,
                    paddingRight: 60,
                    paddingLeft: 60,
                }}>
                SUBMIT
            </Button> 
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;