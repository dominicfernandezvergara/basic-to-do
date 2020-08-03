// import axios from "axios";

const ADD_TODO_DATA = "GET_CURRENT_TODO_DATA";
const REMOVE_TODO_DATA = "REMOVE_TODO_DATA";
const COMPLETE_TODO_DATA = "COMPLETE_TODO_DATA";

const GET_DATA = "GET_DATA";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const GET_DATA_ERROR = "GET_DATA_ERROR";

// const ADD_SUPERMARKET_DATA = "ADD_SUPERMARKET_DATA";
// const ADD_SUPERMARKET_SUCCESS = "ADD_SUPERMARKET_SUCCESS";
// const ADD_SUPERMARKET_ERROR = "ADD_SUPERMARKET_ERROR";

const currentLocalStorage =
  JSON.parse(localStorage.getItem("todosSuperMarket")) || [];
const initialData = {
  todosSuperMarket: currentLocalStorage,
  todosDailyTask: [],
  todosOthers: [],
  loading: null,
  error: false,
};

export default function taskTodoReducer(state = initialData, action) {
  switch (action.type) {
    case ADD_TODO_DATA: {
      const type = action.payload.type;
      localStorage.setItem(
        "todosSuperMarket",
        JSON.stringify([...state[type], action.payload])
      );
      return {
        ...state,
        [type]: [...state[type], action.payload],
      };
    }

    case REMOVE_TODO_DATA: {
      const type = action.payload.type;
      const newTodos = [...state[type]];
      newTodos.splice(action.payload.index, 1);

      localStorage.setItem("todosSuperMarket", JSON.stringify(newTodos));
      return {
        ...state,
        [type]: newTodos,
      };
    }

    case COMPLETE_TODO_DATA: {
      const type = action.payload.type;
      const newTodos = [...state[type]];
      const itemIsComplete = newTodos[action.payload.index].isCompleted;
      newTodos[action.payload.index].isCompleted = !itemIsComplete;
      localStorage.setItem("todosSuperMarket", JSON.stringify(newTodos));
      return {
        ...state,
        [type]: newTodos,
      };
    }

    case GET_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_DATA_SUCCESS: {
      const a = action.payload;
      console.log("action.payload222222222", action.payload);
      return {
        ...state,
        todosSuperMarket: [...state.todosSuperMarket, ...a],
        loading: false,
        error: false,
      };
    }
    case GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
}

export const addTodoData = (todoData) => async (dispatch) => {
  dispatch({
    type: ADD_TODO_DATA,
    payload: todoData,
  });
};

export const removeTodoData = (todoDataRemove) => async (dispatch) => {
  console.log("object", todoDataRemove);
  dispatch({
    type: REMOVE_TODO_DATA,
    payload: todoDataRemove,
  });
};

export const completeTodoData = (todoDataComplete) => async (dispatch) => {
  dispatch({
    type: COMPLETE_TODO_DATA,
    payload: todoDataComplete,
  });
};

// export const getDataFetch = () => async (dispatch) => {
//   dispatch({
//     type: GET_DATA,
//   });
//   try {
//     const API_URL = `http://localhost:4000/superMarket`;
//     const res = await axios.get(API_URL);
//     console.log("res", res);
//     console.log("res.data", res.data);

//     dispatch({
//       type: GET_DATA_SUCCESS,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_DATA_ERROR,
//       payload: error,
//     });
//   }
// };

// export const addSupermarketTask = (newTask) => async (dispatch) => {
//   dispatch({
//     type: ADD_SUPERMARKET_DATA,
//   });
//   try {
//     const API_URL = `http://localhost:4000/superMarket/add-task`;
//     const res = await axios.post(API_URL, newTask);

//     dispatch({
//       type: ADD_SUPERMARKET_SUCCESS,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADD_SUPERMARKET_ERROR,
//       payload: error,
//     });
//   }
// };
