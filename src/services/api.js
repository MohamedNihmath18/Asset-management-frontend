import axios from "axios";

const API_URL = "http://localhost:5000/api/assets"; // Change if backend URL differs

// Create a new asset
export const createAsset = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating asset:", error);
    throw error;
  }
};

// Fetch all assets
export const getAllAssets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.assets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

// Fetch asset by ID
export const getAssetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.asset;
  } catch (error) {
    console.error("Error fetching asset:", error);
    throw error;
  }
};

// Update asset
export const updateAsset = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating asset:", error);
    throw error;
  }
};

// Delete asset
export const deleteAsset = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting asset:", error);
    throw error;
  }
};
