import "./styles/index.scss";

const submitBtn = document.getElementById("submit")
const inputurl = document.getElementById("url-input")
const outputURL = document.getElementById("output-url")
submitBtn.addEventListener("click", postUrl)


async function postUrl() {
  const response = await axios.post("http://localhost:3000/api/shorturl/new", {
    "longURL": inputurl.value
  })
  outputURL.textContent = response.data
}