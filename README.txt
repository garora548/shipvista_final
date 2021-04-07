//Open cmd and create a new react app with sampleapp // any name you can use.

npx create-react-app sampleapp
cd sampleApp

//Install these in React sampleApp folder through cmd  
npm i -s redux react-redux redux-thunk
npm install bootstrap
npm install react-router-dom
npm i -s axios

//Replace the src folder of sampleApp with the src folder provided in ShipvistaWaterPlants folder

//move to .net solution and run it.

//install sql server skip if you already have

//change the Server of connection string from appsettings.json file 
//My is GAURAV_PC\\SQLEXPRESS
//you can use yours

//run our newly created app "sampleapp" by 
npm start from cmd

You can add 5 plants. 
First you will see that plants has no last watered and hours.
once you start it you will see the change of status and time.
You can stop the watering while the status is in watering 
else you will see a message that you cannot stop watering the plants.
once the hours will crossed 6 hours the row will turn red as we have to water it. 
//To test it you can reduce the hourLimit variable to 1 or lower about from 6 in plantList file from components folder.
you can start multiple water at same time.
You cannot start watering again in 30 seconds.






