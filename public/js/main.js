const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp_val");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let city = cityName.value;
  if (city === "") {
    city_name.innerText = "Please Enter Your City Name";
    dataHide.classList.add("data_hide");
  } else {
    try {
      dataHide.classList.add("data_hide");
      city_name.innerText = "loading...";
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=520c5fd7276347fa5ddee363d17337bd`;
      const response = await (await fetch(url)).json();
      const status_code = response.cod;
      if (status_code == "404")
        throw new Error("Please Enter A Valid City Name");
      dataHide.classList.remove("data_hide");
      city_name.innerText = `${response.name},${response.sys.country}`;
      temp.innerText = response.main.temp;
      const icon = response.weather[0].icon;
      temp_status.innerHTML = `<img src="icons/${icon}.png"></img>`;
    } catch (err) {
      city_name.innerText = err.message;
      dataHide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);

const day = document.getElementById("day");
const date = document.getElementById("date");
const getCurrentDay = () => {
  const d = new Date();
  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const n = weekday[d.getDay()];
  day.innerText = n;

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const m = month[d.getMonth()];
  var today = d.getDate();
  date.innerText = `${today} ${m}`;
};
