'use client';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Notice } from '@/lib/definitions';
import PopupButton from '@/components/admin/PopupButton';
import { handleDelete } from '@/lib/actions/admin';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

function AdminTable({ notices }: { notices: Notice[] }) {
  const router = useRouter();

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
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/admin/dashboard/${record.id}/edit`);
              }}
              className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(record.id);
              }}
              className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              삭제
            </button>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.key === 'Enter' && e.stopPropagation()}
            >
              <PopupButton noticeId={record.id} />
            </span>
          </div>
        );
      },
    },
  ];

  const handleRowClick = (record: Notice) => {
    router.push(`/admin/dashboard/${record.id}/view`);
  };

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
      pagination={{
        pageSize: 10,
        position: ['bottomRight'],
        hideOnSinglePage: true,
      }}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
}

export default dynamic(() => Promise.resolve(AdminTable), {
  ssr: false,
});
