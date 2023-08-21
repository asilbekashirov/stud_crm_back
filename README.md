# The project description

## BACKEND
### This website is aimed for student to help them search for available universities, preview the information about the courses available and apply for studies. The content on a website is managed and updated by a company via admin panel.

### The most basic usage, with limited functionality of the website does not require authorization. To view the demo version click (Frontend part) [here](http://mega-dream.neltify.app)

### Backend is deployed on a free server on "[Render](https://render.com/)" website and requires some time to spin up for the first use

### Project structure:
- **controllers** - validates request data (if necessary), and calls the appropriate service methods
- **service** - works with database and CRUD operations
- **models** - describes data structures for database objects
- **router** - creates endpoints for requests
- **middleware** - middleware for requests to check role permissions and token
- **media** - stores media files received from users
- **utils** - common helper functions

## Dependencies:
- Express
- JavaScript
- MongoDB/Mongoose
- Mongoose Paginate V2
- Multer
