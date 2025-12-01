import { Modal, Input, Button, Form, Typography, Divider } from 'antd';
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { generatePrivateKeyAndPublicKey } from '@/shared/utils';
import { useAuthMutations } from '@/shared';

const { Title, Text } = Typography;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { loginMutation } = useAuthMutations();

  const handleFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    const { publicKeyPem: publicKey } = generatePrivateKeyAndPublicKey();
    const payload = {
      publicKey,
      email,
      password,
    };
    loginMutation.mutate(payload, {
      onSuccess: (data) => {
        // localStorage.setItem('private-key', privateKey);
        console.log(data);
      },
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      onClose();
    }, 1000);
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={380}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          Welcome Back
        </Title>
        <Text type="secondary">Login to your account</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false} style={{ marginTop: 16 }}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Enter your email" size="large" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Enter your password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} style={{ borderRadius: 6 }}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider plain style={{ margin: '24px 0' }}>
        <Text type="secondary">or</Text>
      </Divider>

      <div style={{ textAlign: 'center' }}>
        <Text type="secondary">
          Don’t have an account?{' '}
          <a href="#" style={{ fontWeight: 500 }}>
            Register now
          </a>
        </Text>
      </div>
    </Modal>
  );
};
