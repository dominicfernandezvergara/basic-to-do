import axios from "axios";

//All comment are about to use latitude and longitude to get the weather through Geolocation

const GET_WEATHER = "GET_WEATHER";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

const initialData = {
  data: {
    temperature: "",
    city: "",
    country: "",
    latitude: "",
    longitude: "",
  },
  loading: null,
  error: false,
};

export default function weatherReducer(state = initialData, action) {
  switch (action.type) {
    case GET_WEATHER: {
      console.log("get weather", action.data);
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case GET_WEATHER_SUCCESS: {
      console.log("action success", action.payload);
      return {
        ...state,
        data: {
          ...state.city,
          ...action.payload,
        },
        loading: false,
        error: false,
      };
    }
    case GET_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
export const getWheaterDataCityName = (city) => async (dispatch) => {
  console.log("cityReact", city);
  dispatch({
    type: GET_WEATHER,
  });

  try {
    const API_KEY = "29958692948bbd2bd99b11c5268abf11";
    const citya = city;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${citya}&appid=${API_KEY}&units=metric`;
    const res = await axios.get(API_URL);
    console.log("res", res);

    const weatherRes = {
      temperature: res.data.main.temp,
      city: res.data.name,
      country: res.data.sys.country,
    };
    console.log("weatherRes", weatherRes);
    dispatch({
      type: GET_WEATHER_SUCCESS,
      payload: weatherRes,
    });
  } catch (error) {
    dispatch({
      type: GET_WEATHER_ERROR,
      payload: error,
    });
  }
};
// comment getWheaterDataLatitudeLongitude: if you use in the page "Home" Geolocation to get latitude and longitude you need to use the commented function

// export const getWheaterDataLatitudeLongitude = ({
//   latitude,
//   longitude,
// }) => async (dispatch) => {
//   dispatch({
//     type: GET_WEATHER,
//   });

//   try {
//     const API_KEY = "29958692948bbd2bd99b11c5268abf11";

//     const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
//     const res = await axios.get(API_URL);

//     const weatherRes = {
//       temperature: res.data.main.temp,
//       city: res.data.name,
//       country: res.data.sys.country,
//       latitude,
//       longitude,
//     };
//     dispatch({
//       type: GET_WEATHER_SUCCESS,
//       payload: weatherRes,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_WEATHER_ERROR,
//       payload: error,
//     });
//   }
// };
