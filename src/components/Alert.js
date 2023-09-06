import React from "react";
import { useAppContext } from "../context/appContext";

function Alert() {
  const { alertText, alertType } = useAppContext();
  return (
    <div className={alertType}>
      {alertType === "alert-success" && <i class="bi bi-check-circle-fill"></i>}
      <p>{alertText}</p>
    </div>
  );
}

export default Alert;
