# Avoid-Kuvid
[![CircleCI](https://circleci.com/gh/JulienTD/Avoid-Kuvid.svg?style=svg&circle-token=883a3d49dc6234ee0b76cc20d0a37768569c3044)](https://app.circleci.com/pipelines/github/JulienTD)

Mobile application permitting students to organize their school life more easily within the university by consulting the cafeteria attendance, or by booking a study room.

## Context
This project has been made during our course "Software Engineering with Practise" at Korea University during the first semester (2020).

## Architecture

The project is composed of 2 modules:
- `api`: it contains the server and permits to receive request from the mobile application
- `app`: it contains the mobile application

## Getting started

### Setup the server and the database
Step 1: Have Docker installed on your computer.  
Step 2: Launch the database and the server by executing `docker-compose up --build`.  
Step 3: The server is now up and running at the address: [http://localhost:5000](http://localhost:5000)  

### Setup the mobile application
Step 1: Have `Node.js` and `npm` installed  
Step 2: Have `expo` installed (`npm install --global expo-cli`)  
Step 3: Install all dependencies by executing `npm ci`  
Step 4: Launch the patch by executing `./bin/patch_node_modules.bat` on Windows or `./bin/patch_node_modules.sh` on Linux  
Step 5: You may have to change the API URL in the file: `app/src/Services/apiRoot.tsx`  
Step 6: Launch the mobile application by executing `npm run start`  

## Developers
- Bae Jang Hoon
- Kim Dong Hwan
- Kim Gyeong Ho
- Maue Victor
- Rigal Dorian
- Tauran Julien

## License
MIT License
