# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy your backend code into the container
COPY . .

# Expose port for FastAPI
EXPOSE 8000

# Start the app
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
