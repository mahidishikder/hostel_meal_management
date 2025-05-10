import {
    createBrowserRouter,
  } from "react-router-dom";
import Error from "../pages/Error/Error";
import Root from "../layout/root";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Join from "../pages/Join/Join";
import Register from "../pages/Register/Register";
import MealsAdd from "../pages/MealsAdd/MealsAdd";
import MealsDetails from "../pages/Home/MealsDetails/MealsDetails";
import Dashboard from "../layout/Dashboard";
import Upcomming from "../pages/upcomming/upcomming";
import Users from "../pages/Users/Users";
import Chart from "../pages/Chart/Chart";
import ManageMeals from "../pages/ManageMeals/ManageMeals";
import ManageUpcomming from "../pages/ManageUpcomming/ManageUpcomming";
import UserProfile from "../pages/UserProfile/UserProfile";
import UpdateUpcomming from "../pages/UpdateUpcomming/UpdateUpcomming";
import UpdateMeals from "../pages/UpdateMeals/UpdateMeals";
import RequestedMeals from "../pages/RequestedMeals/RequestedMeals";
import MyReviews from "../pages/MyReviews/MyReviews";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import AllRevies from "../pages/AllReview/AllRevies";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "../provider/PrivateRoute";


  export const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error></Error>,
      element: <Root></Root>,
      children:[
        {
            element:<Home></Home>,
            path:'/'
        },
        {
            element:<Meals></Meals>,
            path:'/meals'
        },
        {
            element:<UpcomingMeals></UpcomingMeals>,
            path:'/upcoming-meals'
        },
        {
            element:<Join></Join>,
            path:'/join'
        },
        {
          element:<PrivateRoute><MealsDetails></MealsDetails></PrivateRoute>,
          path:'/mealsDetails/:id'
        },
        {
          element:<Register></Register>,
          path:'/register'
        },
        {
          element:<Contact></Contact>,
          path:'/contact'
        },
        
      ]
    },

    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        
        {
          element:<MealsAdd></MealsAdd>,
          path:'addMeal'
        },
        {
          element:<Upcomming></Upcomming>,
          path:'addUpcomming'
        },
        {
          element:<ManageUpcomming></ManageUpcomming>,
          path:'manageUpcomming'
        },
        {
          element:<Users></Users>,
          path:'users'
        },
        {
          element:<Chart></Chart>,
          path:''
        },
        {
          element:<ManageMeals></ManageMeals>,
          path:'manageMeals'
        },
        {
          element:<UserProfile></UserProfile>,
          path:'myProfile'
        },
        {
          path: 'upcoming/update/:id',
          element: <UpdateUpcomming />
        },
        {
          path: 'meal/update/:id',
          element: <UpdateMeals />
        },
        {
          path: 'allReview',
          element: <AllRevies />
        },
        {
          path: 'requestedMeals',
          element: <RequestedMeals />
        },
        {
          path: 'myReviews',
          element: <MyReviews />
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory />
        },

        
        
        

      
    ]
    }
  ]);