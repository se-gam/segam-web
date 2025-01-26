'use client';

import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Notice } from '@/lib/definitions';

type NoticeFormProps = {
  onSubmit?: (values: Pick<Notice, 'title' | 'content'>) => void;
  initialData?: Pick<Notice, 'title' | 'content'>;
  readOnly?: boolean;
};

export default function AdminNoticeForm({
  initialData,
  onSubmit,
  readOnly = false,
}: NoticeFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (values: Pick<Notice, 'title' | 'content'>) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: '',
        content: '',
        ...initialData,
      }}
    >
      <Form.Item
        label="제목"
        name="title"
        rules={[{ required: true, message: '제목을 입력해주세요!' }]}
      >
        <Input placeholder="제목" readOnly={readOnly} />
      </Form.Item>

      <Form.Item
        label="내용"
        name="content"
        rules={[{ required: true, message: '내용을 입력해주세요!' }]}
      >
        <Input.TextArea rows={5} placeholder="내용" readOnly={readOnly} />
      </Form.Item>

      {!readOnly && (
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            확인
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
