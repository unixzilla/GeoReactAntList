import { Button, Table } from 'antd';
import React, { useState } from 'react';
const columns = [
  {
    title: 'Location',
    dataIndex: 'locationNmae',
  },
];
const data = [
    {
      key: 1,
      locationNmae: 'Mike',
     
    },
    {
      key: 2,
      locationNmae: 'John',
     },
  ];

for (let i = 3; i < 46; i++) {
  data.push({
    key: i,
    locationNmae: `Edward King ${i}`,
   
  });
}

const List = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true); // ajax request after empty completing

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