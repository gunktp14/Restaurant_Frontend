import React from "react";
import logo from "../assets/images/logo.png";

function Logo(props) {
  const { width } = props;
  return <img src={logo} width={width} alt="" />;
}

export default Logo;
