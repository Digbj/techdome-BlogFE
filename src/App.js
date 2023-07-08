import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Navbar from './components/Nav';
import Login from './components/login';
import Blog from './components/blog';
import UserContextProvider from './context/userContext';
import CreateBlog from './components/create';
import SinglePost from './components/singlep';
import Footer from './components/footer';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/createBlog' element={<CreateBlog/>}/>
          <Route path='/singlepost/:id' element={<SinglePost/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>
      
      </UserContextProvider>
     
    </div>
  );
}

export default App;
