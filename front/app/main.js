import "./styles/index.scss";

const submitBtn = document.getElementById("submit")
const inputurl = document.getElementById("url-input")
const outputURL = document.getElementById("output-url")
const statisticInput = document.getElementById("statistic-input")
const statisticBtn = document.getElementById("statisticBtn")
const statisticOutput = document.getElementById("statistic-output")


submitBtn.addEventListener("click", postUrl)
statisticBtn.addEventListener("click",getStatistic)

async function postUrl() {
  const response = await axios.post("http://localhost:3000/api/shorturl/new", {
    "longURL": inputurl.value
  })
  outputURL.textContent = response.data
}


async function getStatistic(){
  const urlCode = statisticInput.value
  const response = await axios.get(`http://localhost:3000/api/statistic/${urlCode}`)
  statisticOutput.innerHTML = 
  `
  Creation Date:  <span id="creationDate">${response.data["creationDate"]}</span> <br><br>
  Redirect Count:  <span id="redirectCount">${response.data["redirectCount"]}</span> <br><br>
  Original Url:  <span id="originalUrl">${response.data["originalUrl"]}</span> <br><br>
  Shorturl Id:  <span id="shorturl-id">${response.data["shorturl-id"]}</span> <br><br>
  `
}


