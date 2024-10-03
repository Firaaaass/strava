// Function to fetch Strava club data
function fetchClubData() {
    const clubId = 'YOUR_CLUB_ID';  // Replace with your actual Strava club ID
    const accessToken = 'YOUR_ACCESS_TOKEN';  // Replace with your Strava access token

    fetch(`https://www.strava.com/api/v3/clubs/${clubId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('club-details').innerHTML = `
            <h3>${data.name}</h3>
            <p>Members: ${data.member_count}</p>
            <p>Location: ${data.city}, ${data.state}, ${data.country}</p>
            <p>Description: ${data.description}</p>
        `;
    })
    .catch(error => console.error('Error fetching club data:', error));
}

// Function to fetch recent activities from the club
function fetchRecentActivities() {
    const clubId = 'YOUR_CLUB_ID';  // Replace with your actual Strava club ID
    const accessToken = 'YOUR_ACCESS_TOKEN';  // Replace with your Strava access token

    fetch(`https://www.strava.com/api/v3/clubs/${clubId}/activities`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(activities => {
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = '';  // Clear any previous data

        activities.forEach(activity => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${activity.athlete.firstname} ${activity.athlete.lastname}</strong>: 
                ${activity.name} - ${activity.distance / 1000} km in ${activity.moving_time / 60} mins
            `;
            activityList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching activities:', error));
}

// Call this function to fetch recent activities on page load
fetchRecentActivities();
