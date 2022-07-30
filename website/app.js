// const { json } = require("body-parser");

//Global Variables
let generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API

const BaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const APIKey = "&appid=36748a7a900fe3e1b2e42d1832dee4e7&units=metric";

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", preFetch);
/* Function called by event listener */
function preFetch() {
  let zipCode = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  showWeather(BaseUrl, zipCode, APIKey)
    .then((data) => {
      postApiData("/addToApiData", {
        temp: data.main.temp,
        date: newDate,
        content: feelings,
      });
    })
    .then(() => {
      UiData();
    });
}

/* Function to GET Web API Data*/
const showWeather = async (BaseUrl, zipCode, APIKey) => {
  const res = await fetch(BaseUrl + zipCode + APIKey);
  try {
    const data = await res.json();
    return data;
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */
const postApiData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};
/* Function to GET Project Data */
const UiData = async () => {
  const request = await fetch("/allApiData");
  try {
    const allData = await request.json();
    console.log(allData);
    // update new entry values
    const newData = allData[allData.length - 1];
    if (
      newData.date !== undefined &&
      newData.temp !== undefined &&
      newData.content !== undefined
    ) {
      document.getElementById("date").innerHTML = newData.date;
      document.getElementById("temp").innerHTML = newData.temp + " degree C";
      document.getElementById("content").innerHTML = newData.content;
    }
  } catch (error) {
    console.log("error", error);
  }
};
