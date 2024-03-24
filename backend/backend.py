from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import model
import uvicorn
from uuid import uuid4

app = FastAPI()


origins = [
    "http://localhost:3000",  # Your React development server
    # Add other allowed origins if needed
    #CHANGE THIS WHEN DEPLOYING
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

models = {}
#api = FastAPI()
# FastAPI route to handle other API endpoints
@app.get("/api")
def read_root():
    return {"message": "api works!"}

@app.get("/api/newmodel")
async def new_model():
    user_id = str(uuid4())
    testModel = model.Net(1, 10)
    testlayers = str(testModel.layers)
    models[user_id] = testModel
    # Send the user_id to the client-side JavaScript
    return {"user_id": user_id, "model":testlayers}

# Mount the built React app as a static directory
#app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)