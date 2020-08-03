import axios from "axios";

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
    case GET_WEATHER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        loading: false,
        error: false,
      };
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

export const getWheaterData = ({ latitude, longitude }) => async (dispatch) => {
  dispatch({
    type: GET_WEATHER,
  });

  try {
    const API_KEY = "29958692948bbd2bd99b11c5268abf11";
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const res = await axios.get(API_URL);

    const weatherRes = {
      temperature: res.data.main.temp,
      city: res.data.name,
      country: res.data.sys.country,
      latitude,
      longitude,
    };
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
