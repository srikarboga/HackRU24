export async function fetchUserData() {
    try {
      const response = await fetch("http://localhost:8000/api/newmodel"); //CHANGE THIS WHEN DEPLOYING: TO /api/newmodel
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }