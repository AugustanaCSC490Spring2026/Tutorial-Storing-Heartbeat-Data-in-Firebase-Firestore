# Tutorial-Storing-Heart-Rate-Data-in-Firebase-Firestore
A web client for Bluetooth heart monitoring devices that displays live BPM data and stores readings in Firebase Firestore using the Web Bluetooth API.

# **DISCLAIMER:**

This GitHub repository has built off of an existing GitHub repository created by the user: **[megaconfidence](https://github.com/megaconfidence)**

The original repository can be found here: https://github.com/megaconfidence/bt-heart-monitor.git

The orginal YouTube tutorial for can be found here: https://www.youtube.com/watch?v=SsnqrpUQLbk 
## Usage
Open the application in a supported browser with Web Bluetooth enabled. Connect a Bluetooth heart rate monitoring device and begin monitoring to view live BPM data. Heart rate readings are automatically stored in Firebase Firestore.

Supported browsers: https://caniuse.com/web-bluetooth

## Local Project Set Up
This project has zero build dependencies and runs as a static web application.

Run the commands below:
```sh
git clone https://github.com/AugustanaCSC490Spring2026/Tutorial-Storing-Heartbeat-Data-in-Firebase-Firestore.git
cd Tutorial-Storing-Heartbeat-Data-in-Firebase-Firestore/
yarn start

```
Then visit [http://localhost:3000/](http://localhost:3000/) in a [supported browser](https://caniuse.com/web-bluetooth).

## Firebase Setup
Create a project in Firebase and enable a Firestore Database.

Add your Firestore Database inside firebase.js. The file should be formatted with the firebaseConfig constant updated:

```
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = { 
    apiKey: "...", 
    authDomain: "...", 
    projectId: "...", 
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..." 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

Heart rate readings from your bluetooth device are stored automatically during readings in a Firestore Collection titled:
**User Heart Rate**

## Data format in Firestore
Firestore formats the data received from the bluetooth device as so:
```
{
  "bpm": 72,
  "deviceId": "device-name",
  "timestamp": "Month Day, Year at HH:MM:SS AM/PM"
}
```
## Final Step
Now that you have your heartbeat sensor collecting data in your Firestore database, all
you have to do is check that it is storing properly. If you want to update the name of the dataset,
simple change one line in 'index.js' file. 

```
collection(db, "User Heart Rate")
```

Replace "User Heart Rate" with whatever you want the new dataset to be titled.


Congratulations! You have successfully set up your heartbeat sensor to automatically store heart rate data in Firebase Firestore!
