import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

function Table() {
    
  const { restaurantList , displayEditForm ,displayPopupConfirm} = useAppContext();

  useEffect(()=>{

  },[])
  return (
    <div className="wrapper-table">
      <table id="restaurants">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Image</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th width="85px">option</th>
        </tr>
        {restaurantList.map((element, idx) => (
          <tr key={idx}>
            <td>{element.name}</td>
            <td>{element.type}</td>
            <td className="img">
              <img src={element.img} width="50" alt="" />
            </td>
            <td>{element.createdAt}</td>
            <td>{element.updatedAt}</td>
            <td className="option-colum">
              <div className="option">
                <button className="btn-edit" onClick={()=>{displayEditForm(element.id)}}>
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn-delete" onClick={()=>{displayPopupConfirm(element.id)}}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
        {restaurantList.length === 0 && 
          <div className="loader"></div>
        }
      </table>
    </div>
  );
}

export default Table;
