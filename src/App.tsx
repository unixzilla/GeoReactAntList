import React, { FC } from 'react';
import { Layout, Divider, Button, Space, Input, Row, Col, Card } from 'antd';
import { Map } from './components/Map';

import List from './components/List';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const App: FC = () => {

  return (
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
                placeholder="Location"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Col>
          </Row>
          <Divider />
            <Map />
          <Row justify="center">
            <Col span={12}>

            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <List />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <Card >
                <p>Latest Searched Time Zone: EST </p>
                <p>Latest Searched Local Time: 12:00PM </p>                
              </Card>
            </Col>
          </Row>
        </Footer>
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

  )
};

export default App