import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createRestaurant,
  updateRestaurant,
  getRestaurantById
} from '../services/RestaurantService';

const SaveOrUpdateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    status: '0x01'
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getRestaurantById(id).then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateRestaurant(id, restaurant).then(() => navigate('/restaurants'));
    } else {
      createRestaurant(restaurant).then(() => navigate('/restaurants'));
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        {id ? 'Update Restaurant' : 'Add Restaurant'}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {['name', 'description', 'address', 'city'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              required
              type="text"
              id={field}
              name={field}
              value={restaurant[field]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={restaurant.status}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3"
          >
            <option value="0x01">Active</option>
            <option value="0x00">Inactive</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveOrUpdateRestaurant;
