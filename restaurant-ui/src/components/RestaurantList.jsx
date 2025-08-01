import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFoodItem from "./AddFoodItem";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurants", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Restaurants</h1>
      {restaurants.map((rest) => (
        <div key={rest.id} className="border p-3 mb-2 rounded shadow">
          <h2 className="text-lg font-semibold">{rest.name}</h2>
          <p>{rest.address}</p>
          <button
            onClick={() => setSelectedRestaurantId(rest.id)}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add Food Item
          </button>
        </div>
      ))}

      {selectedRestaurantId && (
        <div className="mt-6">
          <h2 className="text-md font-semibold text-gray-700">Add Food Item for Restaurant #{selectedRestaurantId}</h2>
          <AddFoodItem restaurantId={selectedRestaurantId} />
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
