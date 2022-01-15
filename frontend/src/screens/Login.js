import React from 'react';
import { Typography, Form, Input, Button, Checkbox } from 'antd';
import Column from 'antd/lib/table/Column';

const { Title, Paragraph, Text, Link } = Typography;

function Login() {

    const onFinish = (values: any) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div
        style= {{
          float: 'right',
          width: "95%",
          height: "100%",
          backgroundColor: 'beige',
          display: "flex",
          flexDirection: 'column',
          paddingTop: "10%",
        }}

      > 
         <Typography>
                <Title>Log In</Title>
          </Typography> 

          <div style={{
            float: 'left',
            justifyContent: 'center',
            paddingTop: '5%',
          }}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
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
                <Input placeholder="Email"/>
              </Form.Item>

              <Form.Item
                name="Password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input placeholder="Password"/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 18, span: 8}}>
                <Button type="primary" 
                        htmlType="submit"
                        style={{
                            paddingRight: 80,
                            paddingLeft: 80,
                        }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          

      </div> 
    

    );
  }

export default Login;