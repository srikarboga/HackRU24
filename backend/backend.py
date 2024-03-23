from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import model
import uvicorn
import subprocess
import os
from pathlib import Path

app = FastAPI()



testModel = model.Net(1, 10)
testlayers = str(testModel.layers)

#api = FastAPI()
# FastAPI route to handle other API endpoints
@app.get("/api")
def read_root():
    return {"message": "api works!"}

@app.get("/api/model")
def read_root():
    return {"message": testlayers}

# Mount the built React app as a static directory
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)