document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(getEndpoint(), {
            method: 'POST',
            body: '',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
            const initialTableRowsHTML = await response.text();
            document.getElementById('playlistTableBody').innerHTML = initialTableRowsHTML;
        } else {
            console.error('Server error:', response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

function getEndpoint() {
    // Logic to determine the endpoint based on current URL or any other criterion
    // For example:
    const currentPath = window.location.pathname;

    // Customize this logic based on how your routes are structured
    if (currentPath === '/dance') {
        return '/dance'; // Endpoint for the dance playlist
    } else if (currentPath === '/gym') {
        return '/gym'; // Endpoint for the gym playlist
    } else if (currentPath === '/study') {
        return '/study'; // Endpoint for the study playlist
    } else if (currentPath === '/simp') {
        return '/simp'; // Endpoint for the simp playlist
    }
    else {
        return '/letsDate'; // Default endpoint
    }
}
