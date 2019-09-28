const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector(".msgOne");
const msgTwo = document.querySelector(".msgTwo");

weatherform.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  fetch(`http://localhost:3000/weather/?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        msgOne.textContent = "Invalid Search Term";
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
