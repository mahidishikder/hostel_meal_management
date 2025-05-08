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
          element:<MealsDetails></MealsDetails>,
          path:'/mealsDetails/:id'
        },
        {
          element:<Register></Register>,
          path:'/register'
        },{
          element:<MealsAdd></MealsAdd>,
          path:'/mealsForm'
        }
      ]
    },
  ]);