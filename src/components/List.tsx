import { Button, Table } from 'antd';
import React, { useState, useEffect } from 'react';
const columns = [
  {
    title: 'Location',
    dataIndex: 'locationNmae',
  },
];

export interface SearchedList {
  key: number;
  locationNmae: string;
  position: [number, number];
}

export interface ListProps {
  searched: Array<SearchedList>;
  onRemoveLocations: (list: React.Key[]) => any;
}

const List = (props: ListProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<SearchedList>>([]);
  let data = props.searched;

  const start = () => {
    setLoading(true); // ajax request after empty completing
    console.log(selectedRowKeys);
    setTimeout(() => {
      props.onRemoveLocations(selectedRowKeys);
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

  useEffect(() => {
    setDataSource(data);
  });

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

      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default List;