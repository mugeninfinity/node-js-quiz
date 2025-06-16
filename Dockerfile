# Step 1: Start with a lightweight Node.js image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all application code
COPY . .

# Step 5: IMPORTANT - Make the app directory and its contents readable and executable by any user.
RUN chmod -R 755 /app

# Step 6: Expose the application port
EXPOSE 3000

# Step 7: Define the command to run the application.
# The user will be specified in the docker-compose file.
CMD ["node", "server.js"]