import './scss/app.scss'
import Header from "./components/Header/Header";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";


function App() {

  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/cart'} element={<Cart/>}/>
          <Route path={'*'} element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
