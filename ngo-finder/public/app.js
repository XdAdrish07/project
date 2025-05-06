const donorForm = document.getElementById('donor-form');
const ngoList = document.getElementById('ngo-list');

donorForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const donorAddress = document.getElementById('donor-address').value;

  // 1. Convert donor address to lat/lng
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(donorAddress)}`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();

  if (data.length === 0) {
    alert('Could not find your address! Please check and try again.');
    return;
  }

  const donorLat = parseFloat(data[0].lat);
  const donorLng = parseFloat(data[0].lon);

  // 2. Fetch all NGOs
  const ngoResponse = await fetch('/ngos');
  const ngos = await ngoResponse.json();

  if (ngos.length === 0) {
    ngoList.innerHTML = "<p>No NGOs found. Please check back later!</p>";
    return;
  }

  // 3. Calculate distances from donor to each NGO
  const ngosWithDistance = ngos.map(ngo => {
    const dist = getDistance(donorLat, donorLng, ngo.latitude, ngo.longitude);
    return { ...ngo, distance: dist };
  });

  // 4. Sort by distance
  ngosWithDistance.sort((a, b) => a.distance - b.distance);

  // 5. Display nearest NGOs
  displayNgos(ngosWithDistance);
});

function displayNgos(ngos) {
  ngoList.innerHTML = "";
  ngos.forEach(ngo => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${ngo.name}</h3>
      <p><strong>Address:</strong> ${ngo.address}</p>
      <p><strong>Contact:</strong> ${ngo.contact}</p>
      <p><strong>Distance:</strong> ${ngo.distance.toFixed(2)} km</p>
      <hr>
    `;
    ngoList.appendChild(div);
  });
}

// Haversine formula to calculate distance
function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
