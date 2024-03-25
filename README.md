# HackRU24

# Build instructions:

Clone this repository  

Move to the frontend directory   
```cd ./frontend```  
Install npm dependecies  
``` npm install ```  
Move to backend directory  
```cd ../backend```  
Install python dependencies  
``` pip install -r requirements.txt ```  
Run backend server  
```uvicorn backend:app --reload```  

Then in a new terminal open the frontend directory

Run frontend development server  
```npm start```  
Finally, open http://localhost:3000 in a browser of your choice to interact with the website.  

# App Demo

The sliders can be used to adjust the layer size and number of layers of the neural network. The input and output layers cannot be changed. The model is then created on the backend.

<img width="1440" alt="Screen Shot 2024-03-24 at 11 50 36 AM" src="https://github.com/srikarboga/HackRU24/assets/117547124/73977124-67d3-47cf-a2dc-39708ba8455a">  

After each press of the button at the center the model, the model calls the backend server to run one training iteration on the MNIST dataset. The server returns the results the training of the iteration in terms of the accuracy of the model on the validation dataset, and returns this to the frontend to be displayed for the user.  
<img width="1440" alt="image" src="https://github.com/srikarboga/HackRU24/assets/117547124/fb51694b-4b4d-4f6a-86e6-d7ecbad9fcdd">  

There are also some helpful tips to build intuition for how neural networks learn that show up on the bottom left side of the screen after a certain number of epochs.  

The goal of this is to let students build intuition for how neural networks work. 
