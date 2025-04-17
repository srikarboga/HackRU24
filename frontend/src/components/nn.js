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
    const [imageData, setImageData] = useState(null);

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
                setImageData(data.image);
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

        const height = 400;
        const width = 400;
        const offset = 80;
        const layers = neuralNetwork(sliderValue2, 1, 2);
        const neuronRadius = 10;
        var layerSeparation = width/(layers.length+1) + offset;
        //const neuronSeparation = 20;
        var verticalSeparation = height / sliderValue2; // Vertical separation constant
        const buffer = 30;

        
        
        //.style("fill", colors[1]) // Apply color for each layer



        // Draw neurons
        
        const colors = ['#01161E', '#124559', '#598392', '#AEC3B0']; // Colors for each layer
        layers.slice(0, -1).forEach((layer, i) => {
            //layerSeparation = height/layer.length;
            var verticalSeparation = height / layer.length;
            layer.forEach((neuron, j) => {
                // Append circles for neurons in all layers except the output layer
                svg.append("circle")
                    .attr("class", `neuron layer-${i}`) // Add class for each layer
                    .attr("cx", (i * layerSeparation) + offset)//+ neuronSeparation)
                    .attr("cy", ((j) * verticalSeparation) + offset)
                    .attr("r", neuronRadius)
                    .style("fill", colors[i % 4]); // Apply color for each layer
            });
        });

        
        // Append circles for neurons in the output layer
        const outputLayer = layers.slice(-1)[0]; // Get the last layer
        outputLayer.forEach((neuron, j) => {
            svg.append("circle")
                .attr("class", `neuron output-layer`) // Add class for the output layer
                .attr("cx", ((layers.length - 1) * layerSeparation) + offset)// + neuronSeparation) // Adjust for the last layer
                .attr("cy", (height/2) + offset)
                .attr("r", 30) // Larger radius for output layer neurons
                .style("fill", "green"); // Apply color for the output layer
        });

        // Draw connections
        layers.slice(0, -2).forEach((layer, i) => {
            layer.forEach((neuron, j) => {
                var prevlayer = height / layer.length
                layers[i + 1].forEach((nextNeuron, k) => {
                    var currlayer = height / layers[i+1].length
                    svg.append("line")
                        .attr("class", `connection layer-${i}`) // Add class for each layer
                        .attr("x1", (i * layerSeparation) + offset)
                        .attr("y1", (j*prevlayer) + offset)
                        .attr("x2", (i + 1) * layerSeparation + offset)// + neuronSeparation)
                        .attr("y2", (k * currlayer) + offset)
                        .style("stroke", "#588157"); // Make lines red colored
                });
            });
        });


        layers[layers.length-2].forEach((neuron, j) => {
            var prevlayer = height / layers[layers.length-2].length
            var currlayer = height / layers[layers.length-1].length
            svg.append("line")
                .attr("class", `connection layer-${layers.length-1}`) // Add class for each layer
                .attr("x1", ((layers.length-2) * layerSeparation) + offset)
                .attr("y1", (j*prevlayer) + offset)
                .attr("x2", ((layers.length-1)) * layerSeparation + offset)// + neuronSeparation)
                .attr("y2", (height/2) + offset)
                .style("stroke", "#588157"); // Make lines red colored
        }
        )

        //console.log(layers[layers.length-2])
    }, [sliderValue, sliderValue2]);
    
    return (
        <div className='container'>
            <div ><header className = "mainTitle">Restless Learning</header></div>
            
            <div className='row1'>
                <div className='row3'>
                    <p>The first layer has 784 neurons, because we have 784 pixels in our image. But here we've displayed fewer input neurons for visualization purposes.</p>
                    <h1>No. Hidden Layers: {sliderValue-1}</h1>
                    <Sliders initialValue={sliderValue} onValueChange={handleValueChange} minval={min_val} maxval={max_val}/>
                    <Sliders initialValue={sliderValue2} onValueChange={handleValueChange2} minval={min_val2} maxval={max_val2}/>
                    <h1>No. Nodes per layer: {sliderValue2}</h1>
                </div>
                
                <svg id="neuralNetwork" width="800" height="600"></svg>
                <div className= "Accuracy">
                    <h1 className="text">Accuracy: {acc}%</h1>
                    {imageData && (
                        <img
                            src={`data:image/png;base64,${imageData}`}
                            alt="MNIST sample"
                            className="place-image"
                        />
                    )}
                    <h1 className="text"> Correct output: {label}</h1>
                    <h1 className="text"> Predicted output: {predicted}</h1>
                </div>
                
            </div>
            <Cookie userData={userData} setUserData={setUserData} setAcc={setAcc} setLoss={setLoss} setPredicted={setPredicted}/>
        </div>
    );
};

export default NeuralNetworkVisualization;
