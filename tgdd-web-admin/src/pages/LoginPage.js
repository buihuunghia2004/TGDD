import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { loginThunk } from '~/services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {  
    dispatch(loginThunk(values))
    navigate('/');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return(
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: '50%',
          borderRadius: '50px',
          backgroundColor: 'beige',
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
  
          <Form.Item label={null}>
            <Button type="dashed" htmlType="submit" style={{ width: '100%', backgroundColor: "beige" }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
};
export default LoginPage;
