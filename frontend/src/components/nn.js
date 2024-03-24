import React, { useState, useEffect, useContext } from 'react';
import './nn.css'; // Importing the CSS file
import * as d3 from 'd3';
import Sliders from './Slider';
import dogTreatImage from './img/dogtreat.png';
import Cookie from './Cookie';
import { fetchUserData } from '../user.js';
//import { UserDataContext } from '../usercontext.js';

function NeuralNetworkVisualization(){
    
    
    //useEffect(() => {
        // Example data
        /*const neuralNetwork = {
            inputLayer: [0, 0, 0],
            hiddenLayer: [0.5, 0.6],
            hiddenLayer2: [0, 1],
            outputLayer: [0.7]
            
        };
        */
    const [userData, setUserData] = useState(null);
    //const [uuid, setuuid] = useState(null);
    //const { userData, setUserData } = useContext(UserDataContext);
    const [acc, setAcc] = useState(null);
    const [loss, setLoss] = useState(null);
    const [label, setLabel] = useState(null);
    const [predicted, setPredicted] = useState(null);
    const [sliderValue, setSliderValue] = useState(2);
    const [sliderValue2, setSliderValue2] = useState(5);
    useEffect(() => {
        fetchUserData(sliderValue, sliderValue2)
            .then(data => {
                //console.log("haha", user_id);
                setUserData(data.user_id);
                setAcc(Number(data.Accuracy).toFixed(2));
                //console.log(data.Accuracy)
                setLoss(data.Loss);
                setLabel(data.label);
                setPredicted(data.predicted);
            })
            .catch(error => {
                // Handle error if needed
            });
    }, [sliderValue, sliderValue2]);

    
    const [min_val, setminval] = useState(1);
    const [max_val, setmaxval] = useState(5);
    const [min_val2, setminval2] = useState(1);
    const [max_val2, setmaxval2] = useState(14);
    //setAcc(Number(acc).toFixed(2))

    const handleValueChange = (newValue) => {
        setSliderValue(newValue);
    };

    

    const handleValueChange2 = (newValue2) => {
        setSliderValue2(newValue2);
    };

    
    function neuralNetwork(n, min, max) {
        const randomArray = [];
        // Initialize input layer
        randomArray.push([]);
        // Input layer
        for (let j = 0; j < 784 / 56; j++) {
            const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            randomArray[0].push(randomInt);
        }
        // Hidden layers
        for( let i = 1; i < sliderValue; i++){
            randomArray.push([]);
            for (let j = 0; j < n; j++) {
                const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
                randomArray[i].push(randomInt);
            }
        }
        // Output layer (assuming only one neuron in the output layer)
        randomArray.push([Math.floor(Math.random() * (max - min + 1)) + min]);
        return randomArray;
    }
    
    useEffect(() => {
        const svg = d3.select("#neuralNetwork");

        // Clear previous SVG elements
        svg.selectAll("*").remove();

        
        const neuronRadius = 100/(sliderValue2*2.5);
        const layerSeparation = 100;
        const neuronSeparation = 50;
        const verticalSeparation = 600 / sliderValue2; // Vertical separation constant
        const buffer = 100;

        // Draw neurons
        const layers = neuralNetwork(sliderValue2, 1, 2);
        const colors = ['#01161E', '#124559', '#598392', '#AEC3B0']; // Colors for each layer
        layers.slice(0, -1).forEach((layer, i) => {
            layer.forEach((neuron, j) => {
                // Append circles for neurons in all layers except the output layer
                svg.append("circle")
                    .attr("class", `neuron layer-${i}`) // Add class for each layer
                    .attr("cx", (i * layerSeparation) + neuronSeparation)
                    .attr("cy", (j * verticalSeparation) + verticalSeparation + buffer)
                    .attr("r", neuronRadius)
                    .style("fill", colors[i % 4]); // Apply color for each layer
            });
        });
        
        // Append circles for neurons in the output layer
        const outputLayer = layers.slice(-1)[0]; // Get the last layer
        outputLayer.forEach((neuron, j) => {
            svg.append("circle")
                .attr("class", `neuron output-layer`) // Add class for the output layer
                .attr("cx", ((layers.length - 1) * layerSeparation) + neuronSeparation) // Adjust for the last layer
                .attr("cy", (j * verticalSeparation) + verticalSeparation + buffer)
                .attr("r", 40) // Larger radius for output layer neurons
                .style("fill", "green"); // Apply color for the output layer
        });

        // Draw connections
        layers.slice(0, -1).forEach((layer, i) => {
            layer.forEach((neuron, j) => {
                layers[i + 1].forEach((nextNeuron, k) => {
                    svg.append("line")
                        .attr("class", `connection layer-${i}`) // Add class for each layer
                        .attr("x1", i * layerSeparation + neuronSeparation)
                        .attr("y1", j * verticalSeparation + verticalSeparation + buffer)
                        .attr("x2", (i + 1) * layerSeparation + neuronSeparation)
                        .attr("y2", k * verticalSeparation + verticalSeparation + buffer)
                        .style("stroke", "#588157"); // Make lines red colored
                });
            });
        });
    }, [sliderValue, sliderValue2]);
    
    return (
        <div className='container'>
            <div><header>Restless Learning</header></div>
            
            <div className='row1'>
                <div className='row3'>
                    <p>The first layer has 784 neurons, because we <br/>have 784 pixels in our image. But here we've <br />displayed fewer input neurons for visualization<br /> purposes.</p>
                    <h1>No. Hidden Layers: {sliderValue-1}</h1>
                    <Sliders initialValue={sliderValue} onValueChange={handleValueChange} minval={min_val} maxval={max_val}/>
                    <Sliders initialValue={sliderValue2} onValueChange={handleValueChange2} minval={min_val2} maxval={max_val2}/>
                    <h1>No. Nodes per layer: {sliderValue2}</h1>
                </div>
                
                <svg id="neuralNetwork" width="800" height="800"></svg>
                <div>
                    <h1 className="text">Accuracy: {acc}%</h1>
                    <img
                        src={dogTreatImage}
                        alt="Dog Treat"
                        className="place-image" // Applying class for styling
                    />
                    <h1 className="text"> Correct output: {label}</h1>
                    <h1 className="text"> Predicted output: {predicted}</h1>
                </div>
                
            </div>
            <div className='row2'>
                
                <Cookie userData={userData} setUserData={setUserData} setAcc={setAcc} setLoss={setLoss} setPredicted={setPredicted}/>
            </div>
        </div>
    );
};

export default NeuralNetworkVisualization;
