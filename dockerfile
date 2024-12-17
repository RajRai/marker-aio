# Use an official Python image as the base
FROM python:3.12-slim

# Install Node.js and necessary system libraries
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    libgl1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python packages
RUN pip install --no-cache-dir marker-pdf streamlit \
    uvicorn fastapi python-multipart

# Set the working directory
WORKDIR /app

# Copy start.js into the container
COPY start.js /app/start.js

# Install Node.js dependencies
RUN npm install concurrently

# Expose ports for marker_server and streamlit
EXPOSE 8001
EXPOSE 8501

# Entrypoint to run the start.js script
ENTRYPOINT ["node", "start.js"]
