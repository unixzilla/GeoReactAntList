import React, { FC, useState, useRef } from 'react';
import { Layout, Divider, Button, Modal, Input, Row, Col, Card, InputRef } from 'antd';
import { Map, MarkList } from './components/Map';
import axios from 'axios';
import List, {ListProps, SearchedList} from './components/List';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Search } = Input;


interface LatestSearchedTimeZoneResultProps {
  timezone:string;
}
const LatestSearchedTimeZoneResult = (props:LatestSearchedTimeZoneResultProps) => {
  const timezone = props.timezone;
  let date = new Date().toLocaleString("en-US", {timeZone:timezone})
  return (
    <Card >
      <p>Latest Searched Time Zone: {timezone} </p>
      <p>Latest Searched Local Time: {date} </p>
    </Card>
  );
}

interface LatLong {
  latitude: number;
  longitude: number;
}

const getLocation = new Promise<LatLong>((resolve, reject) => {

  navigator.geolocation.getCurrentPosition((position) => {
    resolve(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    );
  }, (error) => reject(error.message));

});
const AK:String = 'c27f0ce5e76be00366bc64aac78cf76e';
const geoAPIURL:string = `http://api.positionstack.com/v1/forward?timezone_module=1&access_key=${AK}&query=`;

const App: FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [markers,setMarkers] = useState<Array<MarkList>>([])
  const [lastSearchTimezone, setLastSearchTimezone] = useState("");
  const [locationList, setLocationList] = useState<Array<SearchedList>>([]);
  const [listKey, setListKey] = useState(1);
  const [myLocation, setMyLocation] = useState([]);
  const [myLocationLoader, setMyLocationLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [myLocationMessage, setMyLocationMessage] = useState("");
  
  
  const lookup = async (searchLocationValue:string) => {
    try{
      const geoData = await axios.get(`${geoAPIURL}${searchLocationValue}`);
      const results = geoData.data.data;
      if (results.length == 0) 
      {
        Modal.error({
          title: 'Location not found.',
        });
      }else{
        const result = results[0];
        setLastSearchTimezone(result.timezone_module.name);
        setMarkers([...markers,{position:[result.latitude,result.longitude]}])
        setSearchLocation(searchLocationValue);
        setListKey(listKey+1);
        setLocationList([...locationList, { key:listKey, locationNmae: searchLocationValue}]);
      }
      setSearchLoader(false);
    }catch(err){
      setSearchLoader(false);
      console.error(err);
    }
    
  }
  const onSearch = (value: string) => {
    if (value.length > 0){
      setSearchLoader(true);
      lookup(value);
      
    }
  }
  const SearchLocationTextField = () => {
    
    return (
      <Search
        placeholder="Location"
        allowClear
        enterButton="Search"
        size="large"
        ref={inputRef}
        onSearch={onSearch}
        loading={searchLoader}
      />
    );
  }

  const setToMyLocation = async () => {
    setMyLocationLoader(true);
    try {
      let myLatLong = await getLocation;
      setMyLocationLoader(false);
      setMyLocationMessage("My Location is: Lat:" + myLatLong.latitude + ", Long:" + myLatLong.longitude);
    } catch (err) {
      setMyLocationLoader(false);
      setMyLocationMessage("Error: " + err);
    }
  }

  const MyLocationButton = () => {
    return (
      <Button type="primary" shape="round" size="large" loading={myLocationLoader} onClick={()=>setToMyLocation()} disabled={myLocationLoader}>
        Get My Location
      </Button>
    );
  }

  const lastMarker:[number, number] = (markers.length > 0 ) ? markers[markers.length - 1].position : [43.658883735915914, -79.38076286800805];

  return (
    <>
      <Layout>
        <Header className="header" />
        <Content>
          <Row justify="center">
            <Col span={4}>
              <MyLocationButton />
            </Col>
            <Col span={8}>
              <p>
                {myLocationMessage}
              </p>
            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <SearchLocationTextField />
            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <Map markers={markers} lastMarker={lastMarker} />
            </Col>
          </Row>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <List searched={locationList} />
            </Col>
          </Row>
        </Content>
        {lastSearchTimezone && 
        <Footer>
          <Divider />
          <Row justify="center">
            <Col span={12}>
              <LatestSearchedTimeZoneResult timezone={lastSearchTimezone} />
            </Col>
          </Row>
        </Footer>
        }
      </Layout>
    </>
  )
};

export default App