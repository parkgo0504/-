import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./Main/MainPage";
import MapPage from "./KakaoMap/MapPage";
import SignIn from "./AuthenticationPage/SignIn";
import SignUp from "./AuthenticationPage/SignUp";
import AiTest from "./AuthenticationPage/AiTest";
import BoardMain from "./kanbanboard/newBoard/boardMain";
import InquiryBulletinBoard from './Inquiry/InquiryBulletinBoard';
import ScrolloToTop from './ScrollToTop';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <style jsx global>{`
          body {
            margin: 0px;
            padding: 0px;
          }
        `}</style>
        <ScrolloToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board" element={<BoardMain />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aimain" element={<AiTest />} />
          <Route path='/inquiry' element={<InquiryBulletinBoard /> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
