import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListRestaurantComponent from './components/ListRestaurantComponent';
import SaveOrUpdateRestaurant from './components/SaveOrUpdateRestaurant';
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import AddFoodItem from "./components/AddFoodItem"; 

function App() {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/" element={<ListRestaurantComponent />} />
        <Route path="/restaurants" element={<ListRestaurantComponent />} />
        <Route path="/add-restaurant" element={<SaveOrUpdateRestaurant />} />
        <Route path="/edit-restaurant/:id" element={<SaveOrUpdateRestaurant />} />
        <Route path="/add-food/:restaurantId" element={<AddFoodItem />} /> 
      </Routes>
    </Router>
  );
} 

export default App;
