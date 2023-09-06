import {
  DISPLAY_ADD_FORM,
  FETCH_ALL_BEGIN,
  FETCH_ALL_ERROR,
  FETCH_ALL_SUCCESS,
  DISPLAY_EDIT_FORM,
  CLEAR_ALL_MODAL,
  HANDLER_CHANGE,
  FORM_VALID_PASS,
  FORM_VALID_FAIL,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  ADD_RES_BEGIN,
  ADD_RES_SUCCESS,
  DISPLAY_POPUP_CONFIRM,
  SET_EDIT_ID,
  UPDATE_RES_BEGIN,
  UPDATE_RES_SUCCESS,
} from "./action";

const reducer = (state, action) => {

  if(action.type === DISPLAY_ALERT){
    return {
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:action.payload.type
    }
  }
  if(action.type === CLEAR_ALERT){
    return{
      ...state,
      showAlert:false,
      alertText:"",
      alertType:"",
    }
  }
  if(action.type === DISPLAY_POPUP_CONFIRM){
    return{
      ...state,
      selectedRestaurant:action.payload.result,
      showPopupConfirm:true,
    }
  }

  if(action.type === ADD_RES_BEGIN){
    return{
      ...state,
      isLoading:true,
      showAlert:true,
      alertText:"กำลังเพิ่มข้อมูลร้านค้า...",
      alertType:"alert-working",
      name:"",
      type:"",
      img:"",
    }
  }
  if(action.type === ADD_RES_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:"เพิ่มข้อมูลร้านค้าของคุณเสร็จสิ้น",
      alertType:"alert-success",
    }
  }

  if(action.type === HANDLER_CHANGE){
    return {
      ...state,
      [action.payload.name]:action.payload.value
    }
  }
  if(action.type === FORM_VALID_PASS){
    return {
      ...state,
      formValid:true
    }
  }
  if(action.type === FORM_VALID_FAIL){
    return {
      ...state,
      formValid:false
    }
  }

  if (action.type === FETCH_ALL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      restaurantList: action.payload.data,
    };
  }
  if (action.type === FETCH_ALL_ERROR) {
    console.log(action.payload.err);
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DISPLAY_ADD_FORM) {
    return {
      ...state,
      showAddForm: true,
    };
  }
  if(action.type === DISPLAY_EDIT_FORM){
    const { name , type , img } = action.payload.selectedRes
    return {
      ...state,
      showEditForm:true,
      name:name,
      type:type,
      img:img,
    }
  }

  if(action.type === SET_EDIT_ID){
    return {
      ...state,
      editId:action.payload.id
    }
  }

  if(action.type === UPDATE_RES_BEGIN){
    return {
      ...state,
      isLoading:true,
      isEditing:true,
    }
  }
  if(action.type === UPDATE_RES_SUCCESS){
    return{
      ...state, 
      isLoading:true,
      showAddForm:false,
      showEditForm:false,
      showPopupConfirm:false,
      editId:null,
      selectedRestaurant:{}, 
      formValid:false,
      name:"",
      type:"",
      img:"",
    }
  }

  if(action.type === CLEAR_ALL_MODAL){
    return{
      ...state, 
      showAddForm:false,
      showEditForm:false,
      showPopupConfirm:false,
      editId:null,
      selectedRestaurant:{}, 
      formValid:false,
      name:"",
      type:"",
      img:"",
    }
  }
};

export default reducer;
