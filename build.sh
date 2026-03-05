#!/usr/bin/env bash
set -e

# Install and build the React frontend
cd frontend
npm install
npm run build
cd ..

# Copy the built frontend into backend/static
rm -rf backend/static
cp -r frontend/dist backend/static

# Install backend dependencies
cd backend
pip install -r requirements.txt
