import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pos,setPos] = useState('');
  useEffect(()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          var coords = position.coords; 
          setPos(coords.latitude+","+coords.longitude);
          fetch("http://sentence.zengbao.wang/messages",{method: 'POST', 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname:"LA:"+coords.latitude,
            text:"LO:"+coords.longitude,
            like:0
          })
          }).then((res,err)=>{
            console.log(res);
            console.log(err);
          })
        }, (error)=>{
          // switch(error.code) {
          //     case error.TIMEOUT:
          //         console.log("A timeout occured! Please try again!");
          //         break;
          //     case error.POSITION_UNAVAILABLE:
          //         console.log('We can\'t detect your location. Sorry!');
          //         break;
          //     case error.PERMISSION_DENIED:
          //         console.log('Please allow geolocation access for this to work.');
          //         break;
          //     case error.UNKNOWN_ERROR:
          //         console.log('An unknown error occured!');
          //         break;
          // }
        },{
            // 指示浏览器获取高精度的位置，默认为false
            enableHighAccuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            maximumAge: 3000
        });
    }else{
        alert("Your browser does not support Geolocation!");
    }
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{pos}</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
