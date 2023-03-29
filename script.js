const API_QUERY_URL = "https://ipapi.co/"

// Source: https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
const REGEX_IPV4 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gm

// By Stephen Ryan at Dartware
// Source: https://community.fortra.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4
const REGEX_IPV6 =
  /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/

// Code to generate Leaflet map
const map = L.map("map", { zoomControl: false }).setView([51.105, -0.09], 13)
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Used to keep track of the current marker (if any)
let marker

const searchBar = document.getElementById("ip-address")
const btnSubmit = document.getElementById("btn-submit")
const form = document.getElementById("form")

const resultIPAddress = document.getElementById("result-ip-address")
const resultLocation = document.getElementById("result-location")
const resultLocation2 = document.getElementById("result-location-2")
const resultTimezone = document.getElementById("result-timezone")
const resultISP = document.getElementById("result-isp")

window.onload = e => {
  searchBar.value = ""
  sendAPIQuery("")
}

btnSubmit.addEventListener("click", e => {
  handleSearchSubmit(e)
})

// If user hits enter on the text field, the same event handler is fired
form.addEventListener("submit", e => {
  handleSearchSubmit(e)
})

function handleSearchSubmit(e) {
  e.preventDefault()
  const isIPAddress =
    REGEX_IPV4.test(searchBar.value) || REGEX_IPV6.test(searchBar.value)

  if (!isIPAddress) {
    alert("Invalid IP Address")
    return
  }
  sendAPIQuery(searchBar.value)
}

function sendAPIQuery(query) {
  fetch(`${API_QUERY_URL}/${query}/json`)
    .then(res => res.json())
    .then(data => displayResults(data))
}

function displayResults(data) {
  if (data.error) {
    alert(`The following error was returned from the server: ${data.reason}`)
    return
  }
  if (marker) {
    marker.remove()
  }
  resultIPAddress.innerText = `${data.ip}`
  resultLocation.innerText = `${data.city}, ${data.region_code}`
  resultLocation2.innerText = `${data.postal}`
  resultTimezone.innerText = `UTC${data.utc_offset}`
  resultISP.innerText = `${data.org}`
  const latLong = [data.latitude, data.longitude]
  marker = L.marker(latLong, {
    icon: L.icon({ iconUrl: "./images/icon-location.svg" })
  })
  marker.addTo(map)
  map.setView(latLong, 13)
}
