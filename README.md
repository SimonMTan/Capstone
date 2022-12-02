![h-is-for-homies](https://user-images.githubusercontent.com/103973779/205349834-7e5b49da-102d-4494-8c40-81b61531bf0b.png)

<h1> About Homielist </h1>

Homielist is inspired by [Facebook](https://facebook.com/). The site allow users to connect people across the world. The site only host cool people in the world , Check it out now!

**Live Site: [Homielist](https://homielist.onrender.com)**

<h3> Please see below links to Wiki page </h3>

- [Database Schema](https://github.com/SimonMTan/Capstone/wiki/Database-Schema-Design)

- [Feature List](https://github.com/SimonMTan/Capstone/wiki/MVP-Features)

- [User Stories](https://github.com/SimonMTan/Capstone/wiki/User-Stories)

- [WireFrame](https://github.com/SimonMTan/Capstone/wiki/Wire-Frames)

<h2> Languages: </h2>

<h3> Backend: </h3>

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

<h3> Frontend: </h3>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)


<h3> Database: </h3>

![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)

<h2> Feature </h2>

<h3> Splash Page </h3>

Initial page loaded with Log in form attached 

![image](https://user-images.githubusercontent.com/103973779/205352804-ef1c6412-1c7a-457e-b4ca-4d25adc212b9.png)

<h3> Signup Form </h3>

![image](https://user-images.githubusercontent.com/103973779/205353367-98b5bd20-f8d5-471e-a4de-3d344155686f.png)

<h3> NewsFeed </h3>

![image](https://user-images.githubusercontent.com/103973779/205353930-736b33c1-f979-4c6e-84f9-d59a8cf1dce8.png)


<h2> To-Do List:</h2>

-Add Like feature
-Add Search feature
-Add User pages
-Add Aws upload to picture and video

      
## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

