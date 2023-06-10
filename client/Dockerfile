# Use the official Node.js 14 Alpine image as the base
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json yarn.lock ./

# Install dependencies and husky globally
RUN yarn global add husky@7.0.4 && \
    yarn install --silent --no-progress --frozen-lockfile

# Copy the rest of the project files to the working directory
COPY . .

# Build and run the application
CMD [ "yarn", "serve" ]
