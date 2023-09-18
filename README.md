 # YelpCamp Node.js Website

This README will guide you on how to create a YelpCamp website using Node.js. The website will allow users to create and review campgrounds.

## Technologies Used

- Node.js - For the backend server
- Express - Web framework for Node.js
- MongoDB - Database to store campground and user data
- Mongoose - ODM to interact with MongoDB
- EJS - Template engine for views
- Passport - For user authentication
- Bootstrap - For CSS styling

## Getting Started

1. Clone the repository:

```
git clone https://github.com/Aura-Subhadeep/full-stack-test-app.git
```

2. Install dependencies: 

```
npm install
```

3. Create a .env file and add your MongoDB URI and Cloudinary API keys:

```
DATABASEURL=mongodb://localhost/yelp_camp  
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. Start the server:

```
npm start
```

The app will be running on http://localhost:3000.

## Features

- Campgrounds page to view all campgrounds 
- "Create New Campground" form to add new campgrounds
- Campground show page to view details of a campground
- Comments section on show page for users to leave reviews
- User authentication with signup/login forms  
- User profile pages  
- Edit/delete campgrounds and comments that a user owns
- Flash messages for feedback
- Google Maps integration to show campground locations (WIP)
