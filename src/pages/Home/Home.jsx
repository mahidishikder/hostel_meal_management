import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Membership from "./membership/membership";
import Choose from "./Choose/Choose";
import AboutMeal from "./AboutMeal/AboutMeal";

const Home = () => {
  return (
   <div>
   
    <Category></Category>
    <Choose></Choose>
    <AboutMeal></AboutMeal>
    <Membership></Membership>
   </div>
  );
};

export default Home;
