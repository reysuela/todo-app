# todo-app
Todo list web application built using Angular, .Net Core, and Angular Material.

<img width="1392" alt="Screen Shot 2020-06-03 at 1 10 53 PM" src="https://user-images.githubusercontent.com/23458996/83673072-ebeed300-a59c-11ea-8e89-1f7cfb3d4a96.PNG">

<img width="1392" alt="Screen Shot 2020-06-03 at 1 11 18 PM" src="https://user-images.githubusercontent.com/23458996/83673153-0628b100-a59d-11ea-84e4-9d50eaac8e0d.PNG">

<img width="1392" alt="Screen Shot 2020-06-03 at 1 11 37 PM" src="https://user-images.githubusercontent.com/23458996/83673189-12147300-a59d-11ea-934a-6b977845f161.PNG">

## Requirements

 - .NetCore SDK
 - NodeJS and NPM

## To Run
Clone or download this repository to your local machine.

    git clone https://github.com/mbenja/todo-app.git
    
Navigate to the top-level application directory.

    cd todo-app-master
Execute the following commands to build and run the application.

    dotnet build
    dotnet run

Open `localhost:5000` in your browser of choice, afterwards you will be redirected to port `5001` where the UI is exposed.

This application uses an **in-memory** database as it was created for the sake of gaining practice in the .Net Core environment. Consequently, every time the application is run the database will be empty, will fill during use, and be emptied upon closing of the application.
