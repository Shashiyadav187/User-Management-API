# TU20signIn
This is repo. contains the files needed to create the sign in page for TU20 users and administrators.

SETUP (Windows):
1. open cmd
2. navigate to mongodb folder and run the mongod.exe program, with:
      server/3.4/bin> mongod.exe --port 8080 --dbpath {{path to mongo db}}
3. open a new cmd window
4. navigate to mongo.exe file (same directory as mongod.exe)
      server/3.4/bin> mongo.exe --port 8080
5. navigate to the app.js file;
      node app.js
6. open localhost:3000 on web browser to be greeted to registration page
