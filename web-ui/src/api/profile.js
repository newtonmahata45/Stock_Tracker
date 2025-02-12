import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1/users";

export const get_profile = async (userData) => {
    try {
        console.log("get_profile -> userData", userData.token);
        const response = await axios.get(`${API_BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        });
        console.log("get_profile -> response", response);
        return response.data;

    } catch (error) {
        console.log("Error fetching profile data:", error);
        return [];
    }
};
