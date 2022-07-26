import { Button, Table } from 'antd';
import Search from 'antd/lib/transfer/search';
import React, { useState } from 'react';
const columns = [
  {
    title: 'Location',
    dataIndex: 'locationNmae',
  },
];

export interface SearchedList {
  key: number;
  locationNmae: string;
  
}

export interface ListProps {
  searched: Array<SearchedList>;
}

const List = (props: ListProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const data = props.searched;
  const start = () => {
    setLoading(true); // ajax request after empty completing
    console.log(selectedRowKeys);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" danger onClick={start} disabled={!hasSelected} loading={loading}>
          Delete
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default List;