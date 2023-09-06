import React from "react";
import Logo from "../Logo";
import { useAppContext } from "../../context/appContext";

function Menu() {
  const { displayAddForm, showAddForm , clearAllModal } = useAppContext();
  return (
    <div className="nav-left">
      <div className="title-menu">
        <Logo width="40" />
      </div>
      <div className="menu-control">
        <i className="bi bi-shop"></i>
        <span>ข้อมูลร้านอาหาร</span>
      </div>
      <div
        className="menu-control"
        onClick={()=>{
          if(showAddForm){
            clearAllModal()
          }else{
            displayAddForm()
          }
        }}
      >
        <i className="bi bi-house-add-fill"></i>
        <span>เพิ่มข้อมูลร้านอาหาร</span>
      </div>
      <div className="menu-control">
        <i className="bi bi-pencil-square"></i>
        <span>เเก้ไขข้อมูลร้าน</span>
      </div>
      <div className="menu-control">
        <i className="bi bi-eye-fill"></i>
        <span>มุมมองผู้ใช้</span>
      </div>
    </div>
  );
}

export default Menu;
