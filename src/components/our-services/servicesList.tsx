import ServicesSection from "./servicesSection"
import { FaMapMarkerAlt, FaUtensils, FaCar, FaCocktail } from "react-icons/fa";
import PoolIcon from "@mui/icons-material/Pool";
import GamesIcon from "@mui/icons-material/Games";

export const servicesList: ServicesSection[] = [
  {
    id: "travelPlan",
    title: "Travel Plan",
    description: "We offer customized travel plans that cover must-see attractions, hidden gems, and local experiences tailored to your preferences.",
    icon: <FaMapMarkerAlt />,
  },
  {
    id: "cateringService",
    title: "Catering Service",
    description: "Enjoy delicious, authentic and home-style meals prepared fresh daily. Our catering service offers a variety of Manglorian cuisines, with options to suit every dietary need.",
    icon: <FaUtensils />,
  },
  {
    id: "swimmingPool",
    title: "Swimming Pool",
    description: "Relax and unwind with full access to our clean and refreshing swimming pool. Whether it\’s a morning dip or an afternoon splash, it's perfect for guests of all ages.",
    icon: <PoolIcon sx={{ fontSize: '3rem' }} />,
  },
  {
    id: "funActivities",
    title: "Fun Activities",
    description: "From outdoor games to indoor entertainment, we\’ve got fun activities for everyone. Join in on group games or relaxing evening gatherings by the fire.",
    icon: <GamesIcon sx={{ fontSize: '3rem' }} />,
  },
  {
    id: "hireDriver",
    title: "Hire Driver",
    description: "Need a ride? Our professional drivers are available to take you around safely and comfortably—whether you\'re exploring local sights or visiting nearby pilgrimage spots.",
    icon: <FaCar />,
  },
  {
    id: "barAndDrink",
    title: "Bar & Drink",
    description: "Kick back with a drink from our fully stocked bar. We offer a range of alcoholic and non-alcoholic beverages in a cozy setting, perfect for winding down your day.",
    icon: <FaCocktail />,
  },
];