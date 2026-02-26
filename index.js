import { db } from "./firebase.js";

import {
  collection,
  addDoc
}
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const appUI = document.querySelector(".ui");
const bpmText = document.querySelector(".bpm");
const stopButton = document.querySelector(".stop");
const errorText = document.querySelector(".error");
const beatAudio = document.querySelector("audio");
const connectButton = document.querySelector(".connect");
const connectUI = document.querySelector(".connect-ui");
const startButton = document.querySelector(".start");
const heartUI = document.querySelector(".heart");




let device;
let heartRateChar;


function parseHeartRateData(value){
   const is16Bits = value.getUint8(0) & 0x1;
   if(is16Bits) return value.getUint16(1, true);
   return value.getUint8(1);
}


async function handleRateChange(event) {
  const bpm = parseHeartRate(event.target.value);
  bpmTxt.textContent = bpm;
  console.log("Heart Rate:", bpm);
  await addDoc(
    collection(db, "heartRates"),
    {
      bpm: bpm,
      timestamp: Date.now(),
      deviceId: device.name || "unknown-device"
    }
  );
}




async function connectDevice() {
   if (device.gatt.connected) return;


   const server = await device.gatt.connect();
   const service = await server.getPrimaryService('heart_rate');


   heartRateChar = await service.getCharacteristic('heart_rate_measurement');
   heartRateChar.addEventListener('characteristicvaluechanged', handleRateChange);
}


async function requestDevice() {
   device = await navigator.bluetooth.requestDevice({
       acceptAllDevices: true,
       optionalServices: ['heart_rate'],
   });


   device.addEventListener('gattserverdisconnected', connectDevice);
}


async function startMonitoring(){
   await heartRateChar.startNotifications();
   beatAudio.play();
   heartUI.classList.remove('pause-animation');
}


async function stopMonitoring(){
   await heartRateChar.stopNotifications();
   beatAudio.pause();
   heartUI.classList.add('pause-animation');
}


async function init() {
   if (!navigator.bluetooth) return errorText.classList.remove("hide");


   await requestDevice();
   connectButton.textContent = "connecting..."


   await connectDevice();
   connectUI.classList.add('hide');
   appUI.classList.remove('hide');


   await startMonitoring();
}


connectButton.addEventListener("click", init)
startButton.addEventListener("click", startMonitoring)
stopButton.addEventListener("click", stopMonitoring)
