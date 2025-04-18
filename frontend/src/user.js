export async function fetchUserData(slidervalue, slidervalue2) {
  try {
    const response = await fetch("http://localhost:8000/api/newmodel/?layers="+ (slidervalue-1)+ "&size=" + slidervalue2); //CHANGE THIS WHEN DEPLOYING: TO /api/newmodel otherwise http://localhost:8000/api/train/
    //console.log("va;ues:", slidervalue, "hasdfhasf",  slidervalue2);
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchTrainData(uuid) {
  try {
    const response = await fetch('http://localhost:8000/api/train/'+uuid); //CHANGE THIS WHEN DEPLOYING: TO /api/newmodel otherwise http://localhost:8000/api/train/
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}