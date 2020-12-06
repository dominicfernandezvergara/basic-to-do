import React, { useEffect } from "react";
import styles from "./homeWeather.module.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import SunImage from "../../images/undraw_weather_app_i5sm.svg";
import {
  getWheaterDataLatitudeLongitude,
  getWheaterDataCityName,
} from "../../redux/weatherStore";
import CircularProgress from "@material-ui/core/CircularProgress";

//all comment in this component: How to use Geolocation to get latitude and longitude

// import useGeolocation from '../../../hooks/use-geolocation';

const HomeWeather = () => {
  const dispatch = useDispatch();
  const time = moment().format("LTS");
  const date = moment().format("LL");
  const city = useSelector((store) => store.weather.data.city);
  const temperature = useSelector((store) => store.weather.data.temperature);
  const country = useSelector((store) => store.weather.data.country);
  const loading = useSelector((store) => store.weather.loading);

  // const { latitude, longitude, error: geoError } = useGeolocation()
  // console.log('latitude', latitude)
  // console.log('longitude', longitude)
  // console.log('geoError', geoError)
  // async function handleGeoSuccess(position) {
  // console.log("Latitude is :", position.coords.latitude);
  // console.log("Longitude is :", position.coords.longitude);
  // const latitude = position.coords.latitude;
  // const longitude = position.coords.longitude;
  // const response = {
  // latitude: latitude,
  // longitude: longitude,
  //   latitude,
  //   longitude,
  // };
  //   dispatch(getWheaterDataLatitudeLongitude(response));
  // }

  // function handleGeoError(error) {
  //   console.error("error", error);
  // }

  useEffect(() => {
    dispatch(getWheaterDataCityName());
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     handleGeoSuccess,
    //     handleGeoError
    //   );
    // } else dispatch(getWheaterDataTest());
  }, []);

  // const isLoggedIn = true;

  const weatherInfo = (
    <div className={styles.weatherInfo}>
      <div className={styles.city}>{city}</div>
      <div className={styles.temperature}>{temperature}ºC</div>
    </div>
  );

  const wait = <CircularProgress />;

  return (
    <div className={styles.containerWeather}>
      <img className={styles.imageSun} src={SunImage} alt="" />
      <div className={styles.containerDate}>
        <div>{loading === null || loading ? wait : weatherInfo}</div>
        <div>{date}</div>
        <div>{time}</div>
      </div>
    </div>
  );
};

export default HomeWeather;
