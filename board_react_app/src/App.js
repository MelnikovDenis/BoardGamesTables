import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import LeftMenu from "./layouts/LeftMenu.jsx";
import MembersPage from "./pages/MembersPage.jsx";
import BoardsPage from "./pages/BoardsPage.jsx";
import BoardsMembersPage from "./pages/BoardsMembersPage.jsx";

function App() {
  return (
    <div className="App">
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Navigate to="/members/page" />} />
            <Route path="/boards/page" element={
            <LeftMenu>
              <BoardsPage />
            </LeftMenu>}/>

            <Route path="/members/page" element={
            <LeftMenu>
              <MembersPage />
            </LeftMenu>}/>

            <Route path="/boardsMembers/page" element={
            <LeftMenu>
              <BoardsMembersPage />
            </LeftMenu>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
