import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    celcius: "",
    name: "City",
    humidity: 0,
    speed: 0,
    image: "/onkary293/Images/clear.png",
  });
  const [name, setName] = useState("");
  const clickHandler = () => {
    if (name !== "") {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2bfed0855c80e4ceccedcfe2d11e9cb9&&units=metric`;
      axios
        .get(apiurl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath = "/Images/cloudy.png";
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = "/Images/clear.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "/Images/rain.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = "/Images/drizzler.png";
          } else if (res.data.weather[0].main == "Haze") {
            imagePath = "/Images/mist.png";
          } else {
            imagePath = "/Images/clear.jpg";
          }
          console.log(res.data);

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setName("");
        })
        .catch((err) => {
          alert("Invalid City Name");
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img
              src="/onkary293/Images/searching.png"
              alt="search"
              className="imgsearch"
              onClick={clickHandler}
            />
          </button>
        </div>
        <div className="winfo">
          <img src={data.image} alt="img" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/onkary293/Images/humidty.png" alt="humitdyimg" />
              <div className="humidty">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/onkary293/Images/windy.png" alt="speedimg" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
