import React, { useState, useEffect } from 'react';
import './nn.css'; // Importing the CSS file
import * as d3 from 'd3';
import Sliders from './Slider';
import dogTreatImage from './img/dogtreat.png';
import Cookie from './Cookie';

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

    const [sliderValue, setSliderValue] = useState(1);
    const [min_val, setminval] = useState(1);
    const [max_val, setmaxval] = useState(10);
    const [min_val2, setminval2] = useState(1);
    const [max_val2, setmaxval2] = useState(5);

    const handleValueChange = (newValue) => {
        setSliderValue(newValue);
    };

    const [sliderValue2, setSliderValue2] = useState(1);

    const handleValueChange2 = (newValue2) => {
        setSliderValue2(newValue2);
    };

    
    function neuralNetwork(n, min, max) {
        const randomArray = [];
        // Initialize input layer
        randomArray.push([]);
        // Input layer
        for (let j = 0; j < n; j++) {
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

        
        const neuronRadius = 20/sliderValue2;
        const layerSeparation = 100;
        const neuronSeparation = 100;
        const verticalSeparation = 100 / sliderValue2; // Vertical separation constant
        const buffer = 100;

        // Draw neurons
        const layers = neuralNetwork(sliderValue2, 1, 2);
        const colors = ['#01161E', '#124559', '#598392', '#AEC3B0']; // Colors for each layer
        layers.forEach((layer, i) => {
            layer.forEach((neuron, j) => {
                svg.append("circle")
                .attr("class", `neuron layer-${i}`) // Add class for each layer
                .attr("cx", (i * layerSeparation) + neuronSeparation)
                .attr("cy", (j * verticalSeparation) + verticalSeparation + buffer)
                .attr("r", neuronRadius)
                .style("fill", colors[i%4]); // Apply color for each layer
                
            });
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
            <div className='row1'>
                <svg id="neuralNetwork" width="800" height="700"></svg>
                <img
                    src={dogTreatImage}
                    alt="Dog Treat"
                    className="place-image" // Applying class for styling
                />
                <img
                    src={dogTreatImage}
                    alt="Dog Treat"
                    className="place-image" // Applying class for styling
                />
            </div>
            <div className='row2'>
                <Sliders initialValue={sliderValue} onValueChange={handleValueChange} minval={min_val} maxval={max_val}/>
                <Sliders initialValue={sliderValue2} onValueChange={handleValueChange2} minval={min_val2} maxval={max_val2}/>
                <Cookie />
            </div>
        </div>
    );
};

export default NeuralNetworkVisualization;
