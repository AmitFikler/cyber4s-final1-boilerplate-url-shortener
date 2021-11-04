import "./styles/index.scss";

const submitBtn = document.getElementById("submit")
const inputurl = document.getElementById("url-input")
const outputURL = document.getElementById("output-url")
const statisticInput = document.getElementById("statistic-input")
const statisticBtn = document.getElementById("statisticBtn")
const statisticOutput = document.getElementById("statistic-output")
const outputContiner = document.getElementById("output-continer")


submitBtn.addEventListener("click", postUrl)
statisticBtn.addEventListener("click",getStatistic)

async function postUrl() {
  try {
    const response = await axios.post("http://localhost:3000/api/shorturl/new", {
      "longURL": inputurl.value
    })
    
    outputURL.textContent = response.data
    outputContiner.style.visibility = "visible"
  } catch (error) {
    alartError("Invalid URL") 
  }
}


async function getStatistic(){
  try {
    const urlCode = statisticInput.value
    const response = await axios.get(`http://localhost:3000/api/statistic/${urlCode}`)
    statisticOutput.innerHTML = 
    `
    Creation Date:  <span id="creationDate">${response.data["creationDate"]}</span> <br><br>
    Redirect Count:  <span id="redirectCount">${response.data["redirectCount"]}</span> <br><br>
    Original Url:  <span id="originalUrl">${response.data["originalUrl"]}</span> <br><br>
    Shorturl Id:  <span id="shorturl-id">${response.data["shorturl-id"]}</span> <br><br>
    ` 
  } catch (error) {
    alartError("No such URL was found in the system") 
  }
}


function alartError(str){
  let alart =
  `
  <div class="alert alert-danger" role="alert" id="danger">
  ${str}
  </div>`
  let div = document.createElement("div")
  div.innerHTML = alart
  document.body.insertBefore(div, document.querySelector("h1"))
  setTimeout(()=>{
      document.getElementById("danger").remove()
  },2000)

}


