from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()





#api = FastAPI()
# FastAPI route to handle other API endpoints
@app.get("/api")
def read_root():
    return {"Hello": "World"}

# Mount the built React app as a static directory
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)