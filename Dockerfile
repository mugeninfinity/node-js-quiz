# Step 1: Start from an official, lightweight Node.js image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json file to leverage Docker's build cache
COPY package*.json ./

# Step 4: Install the project dependencies defined in package.json
RUN npm install

# Step 5: Copy all the rest of your application code
# The "." means "copy from the build context root". The second "." means "paste into the current WORKDIR (/app)".
COPY . .

# Step 6: Tell Docker that the application runs on port 3000
EXPOSE 3000

# Step 7: Define the command that will run when the container starts
CMD ["node", "server.js"]