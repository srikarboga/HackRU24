from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import model
from model import train
import uvicorn
from uuid import uuid4
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.datasets as datasets
import torchvision.transforms as transforms 
import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl
from PIL import Image
import io
import base64

app = FastAPI()


origins = [
    "http://localhost:3000",  # Your React development server
    # Add other allowed origins if needed
    #CHANGE THIS WHEN DEPLOYING
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

#Global Params and vairables
models = {}
train_data = datasets.MNIST('./data', train=True, download=False, transform=transforms.ToTensor())
train_data = list(train_data)[:4000]
train_data, val_data = train_data[:3500], train_data[3500:]



criterion = torch.nn.CrossEntropyLoss()
batch_size = 16
epochs = 1
train_loader = DataLoader(dataset = train_data, batch_size = batch_size)
val_loader = DataLoader(dataset = val_data, batch_size = batch_size)
idx = torch.randint(3500, (1,)).item()
image, label = train_data[idx]
im = np.array(image.squeeze())
norm = np.linalg.norm(im)
im = im/norm
cm_hot = mpl.colormaps['hot']
im = cm_hot(im)
im = np.uint8(im * 255)
im = Image.fromarray(im)
im = im.resize((560,560), resample = Image.Resampling.NEAREST)
#im.save("../frontend/src/components/img/dogtreat.png")

#api = FastAPI()
# FastAPI route to handle other API endpoints
@app.get("/api")
def read_root():
    return {"message": "api works!"}

@app.get("/api/newmodel/")
async def new_model(layers: int = 1, size: int = 10):
    user_id = str(uuid4())
    #print("LAYERS: ", layers, size)
    testModel = model.Net(layers, size)
    total_params = sum(p.numel() for p in testModel.parameters())
    print(total_params)
    print(testModel)
    models[user_id] = testModel
    optimizer = torch.optim.SGD(testModel.parameters(), lr = 0.001)
    #testlayers = str(testModel.layers)
    #TRAINING
    loss,acc = train(testModel, optimizer, criterion, batch_size, train_loader, val_loader, epochs)

    #print(loss, acc)
    
    # figure = plt.figure(figsize=(8, 8))
    # plt.imshow(image.squeeze())
    # plt.show()
    # print(label)
    buffered = io.BytesIO()
    im.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    # Send the user_id to the client-side JavaScript
    output = torch.argmax(testModel(image.view(-1, 28*28))).item()
    print(output)
    return {"user_id": user_id, "Accuracy" : acc, "Loss" : loss, "label":label, "predicted": output, "image": img_base64}

@app.get("/api/train/{uuid}")
async def next_iter(uuid: str):
    testModel = models[uuid]
    optimizer = torch.optim.SGD(testModel.parameters(), lr = 0.001)
    loss, acc = train(testModel, optimizer, criterion, batch_size, train_loader, val_loader, epochs)
    output = torch.argmax(testModel(image.view(-1, 28*28))).item()
    print(output)
    return {"Accuracy": acc, "Loss": loss, "predicted": output}

# Mount the built React app as a static directory
#app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)