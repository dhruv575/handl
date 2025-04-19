# HandL - Highs and Lows

HandL is a daily reflection application that allows users to track their daily experiences by recording a high point and a low point each day, along with a numerical score. It helps users build a habit of daily reflection and provides insights into their emotional patterns over time.

## Project Structure

This repository consists of two main parts:

1. **Frontend**: React-based web application
2. **Backend**: Node.js/Express REST API

## Features

- User authentication (register, login)
- Daily entry creation and tracking
- Social features (connect with friends, view their entries)
- Stats and visualizations (streaks, weekly averages)
- Profile management with image uploads
- Mobile-responsive design
- Optional SMS reminders
- Optional weekly email recaps

## Technologies Used

### Frontend
- React
- React Router
- Styled Components
- Axios
- React Icons

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Twilio (optional SMS)
- SendGrid (optional emails)
- OpenAI (optional recap generation)

## Deployment

### Backend Deployment
The backend is already deployed on Vercel as a serverless API at [https://handl-backend.vercel.app/](https://handl-backend.vercel.app/). 
You can check the API status at [https://handl-backend.vercel.app/api/health](https://handl-backend.vercel.app/api/health).

### Frontend Deployment
The frontend is configured to use the production API URL. The production domain is [www.handl.club](https://www.handl.club).

## Local Development

### Backend Setup
If you want to run the backend locally for development:
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server: `npm run dev`
5. The local backend will be available at `http://localhost:5000`

### Frontend Setup
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. The application will be available at `http://localhost:3000`
4. The frontend is configured to connect to the deployed backend API at `https://handl-backend.vercel.app/api`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License.

**HandL Technical Description**  
---

Dhruv Gupta 							      	        		   

**Project Proposal**

I would like to develop a project that allows people to track their day through a quick few things. The project is named HighsAndLows. Every day, they should be able to enter in a score from 1-10, a daily high, and a daily low.

They should be able to friend other users of the app and view their daily highs and lows, as well as charts/analytics about how they are doing generally. People should also be able to backtrack/fill out days they missed in a later time.

People will get formatted emails which recap their week (after they have used the platform for a whole week at least). These recaps should be generated with the help of LLMs.

**Proposed Technical Stack**

* **MongoDB \+ Express \+ Node**: We will intend to use MongoDB for storage of zips, agencies, locations, and partners.  
* **Vercel:** Both the backend and frontend will be deployed on Vercel (in different deployments of course)  
* **Up to you:** Some package that allows us to send texts every day around 10:30 PM to users to remind them to fill out for that day  
* **MailJS:** For sending out emails that recap a person's week  
* **OpenAI API:** We should use ChatGPT 4o-mini to generate these recaps above (given quite a lot of structure)  
* **Cloudinary**: For image hosting  
* **React:** The frontend will be all react. The app has been created using npx create-react-app to begin with.

**Backend Setup**

We have begun by creating a new react project. In the root of that, we have created a new folder called "backend". In the backend, we have run npm init \-y

**User Model**  
    Username (String)  
    Name (String)  
    Phone Number (String)  
    Email (String)  
    Profile\_Picture\_URL (String)  
    Friends\[\] (Foreign Key)  
    Days\[\] (Foreign Key)

 **Day Model**  
    Date (Date)  
    Score (Number)  
    High (String)  
    Low (String)

**Backend Development Steps**

These steps are to be followed by Cursor Agent running Claude 3.7 Sonnet. Each step should only be completed one at a time, and after each step is completed, the readme file should be updated accordingly. Do NOT go ahead at all and do not set up extra steps in advance

1. ✅ Set up the file directory and all necessary introductory files for the project. Install any necessary components.  
2. ✅ Create and define our different file models  
3. ✅ Build out authentication and sign up/login framework. Authentication should last for 1 year when done, and rely on email. Phone number is also required.  
4. ✅ Build the controllers and routes needed to add and remove each of our models. Then, create routes to query the lists of them.  
5. ✅ Build out framework and middleware necessary for sending texts, adding friends, viewing friends, etc  
6. ✅ Build out framework and middleware necessary for uploading pictures to Cloudinary and then receiving back the link.   
7. ✅ Build out framework for summarizing weeks and sending out emails about them using SendGrid

**Frontend Development Steps**

1. Create a file directory with images, components, data and pages. Create a global API variable that is set and can be edited for where the server is hosted  
2. Develop a header, footer, and landing page which explain what this project is about and how it works generally.  
3. Develop a sign up/log in page which follows the authentication guidelines laid out above  
4. Develop a dashboard from which users can view their own stats, fill out days they've missed and view previous days through a calendar feature and/or fill out the current day  
5. Develop a tab on the dashboard through which users can manage friend requests or search for new friends  
6. Develop a public view for each user which will show some aggregated stats as well as their 5 most recent days  
7. Build a feed feature which will display the person's friend's "Days", with the most recent ones at the top. You should be able to view their profiles from there as well

**Frontend Considerations**

1. We want the frontend to be as clean and modern as possible, considering our target audience is 16-24 year olds. Take heavy inspiration from the UI of Notion  
2. We want the frontend to feel responsive and provide micro feedback  
3. This web application will most likely be used predominantly on mobile devices. Mobile compatibility is a top priority for this project.

**Necessary Keys**

JWT\_SECRET=fde5be3fca2f594bb39592a9d3781f5dabd1226bfea2d6fc1a51d65fdf031d23b05d4c8e46feb01531c9be214411bbec1523f735139db8f6d15320974e2d5ef3503db53ca1502a0f9489d310f55100baabcf6ebb3b10e975f3b445f70dee4c8c2bced6618ecf0f13ec4029914e05935bc02e7849a55348899fbba06bf6882ef1fcf67e33ce15b8afc08fc81d60868792f69f2a407301bb2f421655dfd8bbfe3481b86fe5ff01f02b30de35df5a35ec3c58a9b7a93b0baddded92c453a06fc5a2bd72ae739ee4ddc785fce6399dfe97f74945ef06023a64cb173800dbd85f10ba8847f9f8391422683d365bfdcabf7949d70a54f919c304463d1448820d6aa1dc  
CLOUDINARY\_CLOUD\_NAME="djt4gxy9s"  
CLOUDINARY\_API\_KEY="551626585336911"  
CLOUDINARY\_API\_SECRET="d6HCnsoaDBypM1dXCReFoJqkZDA"  
OPENAI\_API\_KEY="sk-proj-v7uw\_Ehnon3QpMJsLMnW1swNQVU4-MSfxFe1qTSQczFhmOxPBa0KuHphNApammqWTK5vl5Hi9KT3BlbkFJOtBAsWQkGq-YbtQNhtsJRRVOiAwWbLP0niKjxMcCDWKuZSqkWKhiFOzqGoJHf4Jt3pGcF2PzIA"

**Cloudinary Example File**

const express \= require('express');  
const router \= express.Router();  
const upload \= require('../middleware/upload');  
const { uploadImage } \= require('../utils/cloudinary');  
const { auth } \= require('../middleware/auth');

// Handle image uploads  
router.post('/image', auth, upload.single('image'), async (req, res) \=\> {  
  try {  
    if (\!req.file) {  
      return res.status(400).json({  
        success: false,  
        error: 'No image file provided'  
      });  
    }

    // Validate file type  
    const allowedTypes \= \['image/jpeg', 'image/png', 'image/jpg', 'image/webp'\];  
    if (\!allowedTypes.includes(req.file.mimetype)) {  
      return res.status(400).json({  
        success: false,  
        error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.'  
      });  
    }

    // Convert buffer to base64  
    const b64 \= Buffer.from(req.file.buffer).toString('base64');  
    const dataURI \= \`data:${req.file.mimetype};base64,${b64}\`;

    // Determine folder based on route or query param  
    const folder \= req.query.type \=== 'profile' ? 'profiles' : 'articles';  
    console.log(\`Uploading image to ${folder} folder\`);

    // Upload to Cloudinary using our utility  
    const imageUrl \= await uploadImage(dataURI, folder);

    res.json({  
      success: true,  
      data: {  
        url: imageUrl  
      }  
    });  
  } catch (error) {  
    console.error('Image upload error:', error);  
    res.status(500).json({  
      success: false,  
      error: 'Failed to upload image. Please try again.'  
    });  
  }  
});

module.exports \= router;


**Completed Steps**

1. **Backend Setup (Complete)**
   - Created directory structure: config, controllers, middleware, models, routes, utils
   - Set up essential files: server.js, .env
   - Created database connection utility
   - Set up Cloudinary and file upload middleware
   - Created authentication middleware structure
   - Added error handling utilities
   - Installed necessary packages
   - Added .gitignore file

2. **Data Models (Complete)**
   - Created User model with:
     - Basic fields (username, name, phone, email, password)
     - Profile picture URL
     - Friend relationships and friend requests
     - Authentication methods (JWT generation, password hashing)
     - Virtual field for days
   - Created Day model with:
     - Date, score, high and low fields
     - Relationship to User model
     - Helper methods for formatting and analytics
     - Indexed to ensure one entry per user per day
   - Added utility methods for streaks and weekly averages

3. **Authentication Framework (Complete)**
   - Implemented user registration with validation
   - Implemented user login with JWT authentication
   - Set up token expiry for 1 year as required
   - Created protected routes with authentication middleware
   - Added input validation using express-validator
   - Implemented profile update functionality
   - Created global error handling middleware
   - Ensured email and phone number requirements are enforced

4. **CRUD Operations (Complete)**
   - Implemented controllers for User and Day models
   - Created routes for adding, retrieving, updating, and deleting entries
   - Added validation for all routes
   - Implemented secure data access controls
   - Added query capabilities for listing days and users
   - Set up proper error handling for all operations

5. **Friend System and SMS Framework (Complete)**
   - Implemented friend request sending, accepting, and rejecting
   - Added friend list retrieval functionality
   - Set up Twilio integration for SMS
   - Created scheduled daily reminder feature
   - Added manual reminder triggering for admins
   - Implemented notification preferences
   - Created middleware to secure friend-related operations

6. **Cloudinary Integration (Complete)**
   - Set up Cloudinary configuration
   - Created file upload middleware using Multer
   - Implemented image upload route
   - Added secure authentication for uploads
   - Created utility functions for cloud storage
   - Configured different storage folders (profiles, general)
   - Added proper error handling for uploads

7. **Email Weekly Recap System (Complete)**
   - Implemented SendGrid integration for emails
   - Created OpenAI-powered recap generation
   - Added weekly scheduled emails
   - Built admin routes for manual recap sending
   - Created streak and average score calculations
   - Implemented personalized email content
   - Added fallback template for reliability
   - Set up proper error handling for the email service

