let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let update = 10000
let issMarker
let issIcon = L.icon(
    {
        iconUrl: 'icon.png',
        iconSize: [70, 70]

    })

let issLat = document.querySelector('#iss-lat')
let issLon = document.querySelector('#iss-lon')
let timeIssLocationFetched = document.querySelector('#time')

let map = L.map('iss-map').setView([0, 0], 1);

iss()
setInterval(iss, update) //10 second interval to call function

function iss() {
    fetch(url).then(res => res.json())
        .then((issData) => {
            console.log(issData)
            let lat = issData.latitude
            let lon = issData.longitude
            issLat.innerHTML = lat
            issLon.innerHTML = lon
            if (!issMarker) {
                issMarker = L.marker([lat, lon], {icon: issIcon}).addTo(map)
            } else {
                issMarker.setLatLng([lat, lon], {icon: issIcon})
            }

            let now = Date()
            timeIssLocationFetched.innerHTML = `This data was fetched ${now}`

        }).catch((err) => {
        console.log('Error', err)
    })
}
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVpZ2lmaXJlYmFsbCIsImEiOiJja2Z4ZHMwbTYwM2MxMnNueTJoanM0NjZuIn0.oDcJdbBK_2-ulMD-cJtdvA'
}).addTo(map);