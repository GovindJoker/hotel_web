import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'
import './assets/css/vendor/icomoon/style.css'
// import './/assets/css/vendor/owl.min.css'
import './assets/css/vendor/aos.css'
import './assets/css/vendor/animate.min.css'
import './assets/css/vendor/bootstrap.css'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import Signin from './auth/Signin';
import SignUp from './auth/SignUp';
function App() {
  return (
    <div class="untree_co--site-wrap">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Log-in" element={<Signin/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
