import React, { createContext, useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import {
  FETCH_ALL_BEGIN,
  FETCH_ALL_ERROR,
  FETCH_ALL_SUCCESS,
  ADD_RES_BEGIN,
  ADD_RES_SUCCESS,
  DISPLAY_ADD_FORM,
  DISPLAY_EDIT_FORM,
  CLEAR_ALL_MODAL,
  HANDLER_CHANGE,
  FORM_VALID_PASS,
  FORM_VALID_FAIL,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  DISPLAY_POPUP_CONFIRM,
  UPDATE_RES_BEGIN,
  UPDATE_RES_SUCCESS,
  SET_EDIT_ID,
} from "./action";
import reducer from "./reducer";

const AppContext = createContext();

//Default state of reducer
const initialState = {
  restaurantList: [],
  //selected Restaurant user is working with.
  selectedRestaurant: {},
  name: "",
  type: "",
  img: "",
  showAlert: false,
  editId:null,
  alertText: "",
  alertType: "",
  showAddForm: false,
  showEditForm: false,
  showPopupConfirm: false,
  isLoading: false,
  isAdding: false,
  formValid: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //display alert function can send msg in to param
  const displayAlert = (msg, type) => {
    dispatch({ type: DISPLAY_ALERT, payload: { msg, type } });
  };
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const displayPopupConfirm = async (id) => {
    const result = await fetchOneRestaurant(id);
    dispatch({ type: DISPLAY_POPUP_CONFIRM, payload: { result } });
  };

  //display function about form add , edit
  const displayAddForm = () => dispatch({ type: DISPLAY_ADD_FORM });

  const displayEditForm = async (id) => { 
    dispatch({type:SET_EDIT_ID,payload:{id}})  
    const result = await fetchOneRestaurant(id); 
    dispatch({ type: DISPLAY_EDIT_FORM, payload: { selectedRes: result } });
  };

  //clear all modal function
  const clearAllModal = () => {
    dispatch({ type: CLEAR_ALL_MODAL });
  };

  //handler onChange input
  const handlerChange = (name, value) => {
    dispatch({ type: HANDLER_CHANGE, payload: { name, value } });
  };

  //send request to API for fetchAll Restaurants
  const fetchAllRestaurant = async () => {
    dispatch({ type: FETCH_ALL_BEGIN });
    try {
      const { data } = await Axios.get(
        "http://localhost:5000/api/v1/restaurant/"
      );
      dispatch({ type: FETCH_ALL_SUCCESS, payload: { data } });
    } catch (err) {
      dispatch({ type: FETCH_ALL_ERROR, payload: { err } });
    }
  };

  //send request to API for fetchOneById and send id in PATH
  const fetchOneRestaurant = async (id) => {
    try {
      const { data } = await Axios.get(
        `http://localhost:5000/api/v1/restaurant/${id}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //Insert Restaurant send request to API method = POST , {data}
  const insertRestaurant = async (event) => {
    event.preventDefault();
    dispatch({ type: ADD_RES_BEGIN });
    try {
      const { name, type, img } = state;
      const result = await Axios.post(
        "http://localhost:5000/api/v1/restaurant/",
        { name: name, type: type, img: img }
      );
      console.log(result);
      setTimeout(() => {
        dispatch({ type: ADD_RES_SUCCESS });
        fetchAllRestaurant()
        setTimeout(() => {
          clearAlert();
        }, 2000);
      }, 1200);
    } catch (err) {
      console.log(err);
    }
  };

  const updateRestaurant = async (event) => {
    event.preventDefault();
    dispatch({ type: UPDATE_RES_BEGIN });
    try {
      const { editId,name, type, img } = state;
      const result = await Axios.put(
        `http://localhost:5000/api/v1/restaurant/${editId}`,
        { name: name, type: type, img: img }
      );
      dispatch({type:UPDATE_RES_SUCCESS})
      fetchAllRestaurant(); 
    } catch (err) {
      console.log(err);
    }
  };

  //delete restaurant by Id :
  const deleteRestaurant = async () => {
    try {
      const { selectedRestaurant } = state;
      await Axios.delete(
        `http://localhost:5000/api/v1/restaurant/${selectedRestaurant.id}`
      );
      fetchAllRestaurant();
      dispatch({ type: CLEAR_ALL_MODAL });
    } catch (err) {
      console.log(err);
    }
  };

  //check form empty if all form row != null allow submit button
  const checkFormValid = () => {
    const { name, type, img } = state;
    if (!name || !type || !img) {
      return dispatch({ type: FORM_VALID_FAIL });
    }
    dispatch({ type: FORM_VALID_PASS });
  };

  useEffect(()=>{
    checkFormValid();
    fetchAllRestaurant();
  },[state.name,state.type, state.img]); 

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchAllRestaurant,
        displayAddForm,
        displayEditForm,
        clearAllModal,
        handlerChange,
        insertRestaurant,
        updateRestaurant,
        displayAlert,
        clearAlert,
        displayPopupConfirm,
        deleteRestaurant,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { useAppContext, initialState };

export default AppProvider;
