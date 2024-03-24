import React, { useEffect } from 'react';
import './Cookie.css'; // Importing the CSS file
import * as d3 from 'd3';
import { useState } from 'react';
import Sliders from './Slider';

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
    const [sliderValue, setSliderValue] = useState(0);

    const handleValueChange = (newValue) => {
        setSliderValue(newValue);
    };

    console.log("FROM NN:", sliderValue)



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

    const svg = d3.select("#neuralNetwork");

    
    // Clear previous SVG elements
    svg.selectAll("*").remove();
    
    const neuronRadius = 20;
    const layerSeparation = 100;
    const neuronSeparation = 100;
    const verticalSeparation = 100; // Vertical separation constant
    const buffer = 100;

    // Draw neurons
    const layers = neuralNetwork(4, 1, 2);
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']; // Colors for each layer
    layers.forEach((layer, i) => {
        var counter = 0;
        layer.forEach((neuron, j) => {
            
            if(counter >= 1){
                svg.append("circle")
                .attr("class", `neuron layer-${i}`) // Add class for each layer
                .attr("cx", (i * layerSeparation) + neuronSeparation)
                .attr("cy", (j * verticalSeparation) + verticalSeparation + buffer)
                .attr("r", neuronRadius)
                .style("fill", colors[i]); // Apply color for each layer
            }else{
                svg.append("circle")
                .attr("class", `neuron layer-${i}`) // Add class for each layer
                .attr("cx", (i * layerSeparation) + neuronSeparation)
                .attr("cy", (j * verticalSeparation) + verticalSeparation + buffer)
                .attr("r", neuronRadius)
                .style("fill", colors[i]); // Apply color for each layer
            }
            counter++;
            
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
                    .style("stroke", "red"); // Make lines red colored
            });
        });
    });
    //}, []);

    

    
    return (
        <div>
            <svg id="neuralNetwork" width="800" height="700"></svg>
            <Sliders onValueChange={handleValueChange}/>
        </div>
    );
};

export default NeuralNetworkVisualization;
