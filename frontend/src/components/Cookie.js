import React, { useState , useEffect} from 'react';
import button from './img/brain.png'; // Importing the image
import { fetchTrainData } from '../user.js';
//import { UserDataContext } from '../usercontext.js';

function Cookie(props) {
    const [epochs, setEpochs] = useState(0); // Using useState hook to maintain state
    //const { userData, setUserData } = useContext(UserDataContext);
    const{userData, setUserData, setAcc, setLoss, setPredicted} = props

    useEffect(() => {
        setEpochs(0)
    }, [userData]);

    useEffect(() => {
        if(epochs){
            fetchTrainData(userData)
            .then(data => {
                setLoss(data.Loss);
                setAcc(Number(data.Accuracy).toFixed(2));
                setPredicted(data.predicted);
                console.log("running")
            })
            .catch(error => {
                // Handle error if needed
            });
        }
    }, [epochs]);




    const shoot = () => {
        setEpochs(epochs + 1); // Updating the epochs state
    }

    const hints = ["You've earned a Reward! Here's your hint: \nEpochs and Learning: An 'epoch' in neural network training is like a round of practice. \n Imagine you're learning to ride a bike. Each time you practice riding around the block, that's one epoch. Neural networks learn similarly – during each epoch, they look at all the training examples (like different bike rides) to get better at their task.",
                "You've earned a Reward! Here's your hint: \nHidden Layers, Hidden Magic: Neural networks have hidden layers, which are like secret agents helping them solve problems. \n Just as spies gather information covertly, hidden layers process data in ways that aren't immediately visible. By passing information through these hidden layers, neural networks can uncover complex patterns and relationships in data.",
                "You've earned a Reward! Here's your hint: \nBackpropagation and Course Correction: Backpropagation is like a correction tool for neural networks. \n Imagine drawing a picture and your friend points out mistakes you made. Backpropagation does something similar – it helps neural networks learn from their mistakes by adjusting the way they interpret data. This way, they can gradually improve their performance over time.",
                "You've earned a Reward! Here's your hint: \nOverfitting, the Villain of Generalization: Overfitting is a sneaky villain in the world of neural networks. \n It's like memorizing answers without understanding the questions. When a neural network overfits, it becomes too focused on the training data and can't generalize well to new, unseen examples. Researchers work on techniques to prevent overfitting and ensure neural networks can handle new challenges.",
                "You've earned a Reward! Here's your hint: \nTransfer Learning, Sharing Knowledge: Transfer learning is like borrowing knowledge from one task to help with another. \n Imagine you're learning to cook pasta, and you realize the skills you've learned from making pizza also apply – that's transfer learning! Similarly, neural networks can use knowledge gained from one task to help solve another, saving time and resources in the learning process."]
    var text;
    if (epochs==10){
        text =  hints[0]
    } else if (epochs == 25) {
        text = hints[1]
    } else if (epochs == 50) {
        text = hints[2]
    } else if (epochs == 100) {
        text = hints[3]
    } else if (epochs == 200) {
        text = hints[4]
    }
    
    return (
        
        <div className = "bottomRow">
            {/* Using the imported image and applying class names */}
            <p className='hint' style={{fontSize: 15 + "px"}}>{text}</p>
            <div className="cookie-image">
                <button>
                    <img
                        src={button}
                        alt="Dog Treat"
                        onClick={shoot}
                        // Applying class for styling
                        height = "150 px"
                    
                    />
                </button>
                
                <h1 className='train'>CLICK TO TRAIN</h1>
            </div>
            <h1 className='epoch' style={{fontSize: 4 + 'em'}}> Epochs: {epochs}</h1>
            
        </div> 
    );
}

export default Cookie;