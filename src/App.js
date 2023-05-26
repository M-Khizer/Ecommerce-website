import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import { createBrowserRouter,
         createRoutesFromElements,
         Outlet,
         Route,
         RouterProvider} from "react-router-dom";
import Error404 from "./Components/404error";
import Signout from "./Components/Signout";
import Addproduct from "./Components/addproduct";


const Root = ()=>{
    return (
          <>
          <div>
            {/* <Link to='/' >Home</Link>
            <Link to='/signin' >Sign in</Link>
            <Link to='/singup' >Sign Up</Link> */}
          </div>
      
          <div>
            <Outlet/>
          </div>
          
          </>
        )
      }

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/' element={<Root/>}>
     
      <Route index element={<Home />} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signout" element={<Signout/>} />
      <Route path="/addproducts" element={<Addproduct/>} />

      <Route element={<Error404/>} />
    </Route>
  )
)

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
