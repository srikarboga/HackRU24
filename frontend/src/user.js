export async function fetchUserData() {
    try {
      const response = await fetch("/api/newmodel");
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }