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
    const [max_val, setmaxval] = useState(5);
    const [min_val2, setminval2] = useState(1);
    const [max_val2, setmaxval2] = useState(14);

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
                .attr("r", 50) // Larger radius for output layer neurons
                .style("fill", colors[(layers.length - 1) % 4]); // Apply color for the output layer
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
    
    /*hints = ["Epochs and Learning: An 'epoch' in neural network training is like a round of practice. Imagine you're learning to ride a bike. Each time you practice riding around the block, that's one epoch. Neural networks learn similarly – during each epoch, they look at all the training examples (like different bike rides) to get better at their task.",
                "Hidden Layers, Hidden Magic: Neural networks have hidden layers, which are like secret agents helping them solve problems. Just as spies gather information covertly, hidden layers process data in ways that aren't immediately visible. By passing information through these hidden layers, neural networks can uncover complex patterns and relationships in data.",
                "Backpropagation and Course Correction: Backpropagation is like a correction tool for neural networks. Imagine drawing a picture and your friend points out mistakes you made. Backpropagation does something similar – it helps neural networks learn from their mistakes by adjusting the way they interpret data. This way, they can gradually improve their performance over time.",
                "Overfitting, the Villain of Generalization: Overfitting is a sneaky villain in the world of neural networks. It's like memorizing answers without understanding the questions. When a neural network overfits, it becomes too focused on the training data and can't generalize well to new, unseen examples. Researchers work on techniques to prevent overfitting and ensure neural networks can handle new challenges.",
                "Transfer Learning, Sharing Knowledge: Transfer learning is like borrowing knowledge from one task to help with another. Imagine you're learning to cook pasta, and you realize the skills you've learned from making pizza also apply – that's transfer learning! Similarly, neural networks can use knowledge gained from one task to help solve another, saving time and resources in the learning process."]
    if (epochs==10){
        text = hints[0]
    } else if (epochs == 25) {
        text = hints[1]
    } else if (epochs == 50) {
        text = hints[2]
    } else if (epochs == 100) {
        text = hints[3]
    } else if (epochs == 200) {
        text = hints[4]
        <p>You've reached a milestone! Here's your hint: {hint[i]}</p>
    }*/
    
    return (
        <div className='container'>
            <div><header>Restless Learning</header></div>
            
            <div className='row1'>
                <div className='row3'>
                    <p>The first layer is a 784 pixel image. <br /> Here we have displayed the first layer <br />with fewer nodes for visualization purposes.</p>
                    <h1>No. Hidden Layers</h1>
                    <Sliders initialValue={sliderValue} onValueChange={handleValueChange} minval={min_val} maxval={max_val}/>
                    <Sliders initialValue={sliderValue2} onValueChange={handleValueChange2} minval={min_val2} maxval={max_val2}/>
                    <h1>No. Nodes</h1>
                </div>
                
                <svg id="neuralNetwork" width="800" height="800"></svg>
                <div>
                    <h1>Accuracy</h1>
                    <img
                        src={dogTreatImage}
                        alt="Dog Treat"
                        className="place-image" // Applying class for styling
                    />
                    <h1> Target</h1>
                </div>
                
            </div>
            <div className='row2'>
                
                <Cookie />
            </div>
        </div>
    );
};

export default NeuralNetworkVisualization;
