import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllRestaurants,
  deleteRestaurantById
} from '../services/RestaurantService';

const ListRestaurantComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const fetchAllRestaurants = () => {
    getAllRestaurants()
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  };

  const updateRestaurant = (id) => {
    navigate(`/edit-restaurant/${id}`);
  };

  const removeRestaurant = (id) => {
    deleteRestaurantById(id)
      .then(() => fetchAllRestaurants())
      .catch((error) => console.error('Error deleting restaurant:', error));
  };

  const addFoodItem = (restaurantId) => {
    navigate(`/add-food/${restaurantId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">List of Restaurants</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/add-restaurant')}
        >
          Add Restaurant
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Created</th>
              <th className="py-2 px-4 border">Updated</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">No restaurants found.</td>
              </tr>
            ) : (
              restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="text-center">
                  <td className="py-2 px-4 border">{restaurant.id}</td>
                  <td className="py-2 px-4 border">{restaurant.name || '-'}</td>
                  <td className="py-2 px-4 border">{restaurant.description || '-'}</td>
                  <td className="py-2 px-4 border">{restaurant.address || '-'}</td>
                  <td className="py-2 px-4 border">{restaurant.city || '-'}</td>
                  <td className="py-2 px-4 border">{restaurant.status === '0x01' ? 'Active' : 'Inactive'}</td>
                  <td className="py-2 px-4 border">{restaurant.creationDate}</td>
                  <td className="py-2 px-4 border">{restaurant.updatedOn}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => updateRestaurant(restaurant.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeRestaurant(restaurant.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => addFoodItem(restaurant.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                    >
                      Add Food
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRestaurantComponent;
