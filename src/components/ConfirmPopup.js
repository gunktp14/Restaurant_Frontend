import React from "react";
import { useAppContext } from "../context/appContext";

function ConfirmPopup() {
  const {
    showPopupConfirm,
    selectedRestaurant,
    clearAllModal,
    deleteRestaurant,
  } = useAppContext();
  return (
    <div className={showPopupConfirm ? "popup active" : "popup"}>
      <div id="close-addForm-btn" onClick={clearAllModal}>
        X
      </div>
      <div>
        <div className="img-box">
          <img src={selectedRestaurant.img} width="50%" alt="" />
        </div>
        <p>
          <b>ชื่อร้าน</b> : {selectedRestaurant.name}
        </p>
        <p>
          <b>ประเภทอาหาร</b> : {selectedRestaurant.type}
        </p>
        <p className="note-delete">
          คุณต้องการลบรายการร้านอาหาร รายการนี้ใช่หรือไม่ !
        </p> 
      </div>
      <div className="btn-block-popup">
        <button className="btn-yes" onClick={()=>{deleteRestaurant()}}>
          Yes
        </button>
        <button className="btn-no" onClick={clearAllModal}>No</button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
