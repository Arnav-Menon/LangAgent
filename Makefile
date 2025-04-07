# Makefile for Next.js application

# Variables
NODE_ENV ?= development
PORT ?= 3000

# Install dependencies
install:
	npm install

# Run the development server
dev:
	npm run dev

# Build the application for production
build:
	npm run build

# Start the application in production mode
start:
	npm run start

# Run ESLint
lint:
	npm run lint

# Clean node_modules
clean: clean-node-modules install

clean-node-modules:
	rm -rf .next node_modules package-lock.json

# Set environment variable and run the server
serve:
	NODE_ENV=production PORT=$(PORT) npm run start

.PHONY: install dev build start lint clean serve

