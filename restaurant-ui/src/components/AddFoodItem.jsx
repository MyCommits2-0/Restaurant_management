import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddFoodItem = () => {
  const { restaurantId } = useParams(); 

  const [foodItem, setFoodItem] = useState({
    itemName: "",
    itemDescription: "",
    price: "",
    isVeg: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:8080/food_items/${restaurantId}`,
        {
          itemName: foodItem.itemName,
          itemDescription: foodItem.itemDescription,
          price: parseFloat(foodItem.price),
          isVeg: foodItem.isVeg,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Food item added successfully!");
      setFoodItem({
        itemName: "",
        itemDescription: "",
        price: "",
        isVeg: false,
      });
    } catch (error) {
      console.error("Error adding food item:", error.response?.data || error.message);
      setMessage("❌ Failed to add food item.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Food Item to Restaurant ID: {restaurantId}
      </h2>
      <form onSubmit={handleFoodSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={foodItem.itemName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Item Description</label>
          <textarea
            name="itemDescription"
            value={foodItem.itemDescription}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={foodItem.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            step="0.01"
            min="0"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVeg"
            checked={foodItem.isVeg}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="font-medium">Is Vegetarian?</label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-blue-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddFoodItem;
