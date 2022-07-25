import React, { FC } from 'react';
import { Layout, Divider, Button, Space, Input, Row, Col } from 'antd';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


import List from './components/List';
import './App.css';

const { Header, Content } = Layout;
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
const [zoom, setZoom] = React.useState(3); // initial zoom
const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
  lat: 0,
  lng: 0,
});


const App: FC = () => (
  <>
    <Layout>
      <Header className="header" />
      <Content>
        <Row justify="center">
          <Col span={12}>
            <Button type="primary" shape="round" size="large">
              Get My Location
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Col span={12}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Col span={12}>
            <List />
          </Col>
        </Row>
      </Content>
    </Layout>
  </>

  /*
  //input Location
  //display Location to map and add marker to each search
  //list table with pagination
    //display max 10 items
    //checkbox at the beginning each row
  //delete button on top 
  //display timezone and local time latest searched location
  */

);

export default App