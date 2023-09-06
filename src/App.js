import "./App.css";
import { useAppContext } from "./context/appContext";
import { Table, Menu, AddFormModal, ConfirmPopup } from "./components";

function App() {
  const { showAddForm, showEditForm, showPopupConfirm } = useAppContext();
  return (
    <div className="app-container">
      <Menu />
      <div
        className={
          showAddForm || showEditForm || showPopupConfirm
            ? "modal active"
            : "modal"
        }
      >
        {(showAddForm || showEditForm) && <AddFormModal/>}
        {showPopupConfirm && <ConfirmPopup/>}
      </div>
      <Table />
    </div>
  );
}

export default App;
