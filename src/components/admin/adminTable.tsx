'use client';

import { Table, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Notice } from '@/lib/definitions';
import { handleDelete } from '@/lib/actions/admin';
import dynamic from 'next/dynamic';

function AdminTable({ notices }: { notices: Notice[] }) {
  const columns: ColumnsType<Notice> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'w-32',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'w-64',
      render(value: string) {
        const date = new Date(value);
        return (
          <span className="text-gray-600">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      title: '작업',
      dataIndex: 'action',
      key: 'action',
      className: 'text-center w-64',
      render(value, record: Notice) {
        return (
          <Popconfirm
            title="공지사항을 삭제하시겠습니까?"
            onConfirm={() => handleDelete(record.id)}
            okText="예"
            cancelText="아니오"
          >
            <button className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
              삭제
            </button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={notices}
      columns={columns}
      rowKey="id"
      size="middle"
      tableLayout="fixed"
      bordered
      className="w-full"
      scroll={{ x: 800 }}
    />
  );
}

export default dynamic(() => Promise.resolve(AdminTable), {
  ssr: false,
});
