document.addEventListener('DOMContentLoaded', async () => {
    // alert("This is the playlist page 1");
    try {
        const response = await fetch('/letsDate', {
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

    // Test alert to make sure this is loading
    // alert("This is the playlist page");
});


function openSongShareModal() {
    var modal = document.getElementById("songShareModal");
    modal.style.display = "flex";  // Use flex to center the content vertically and horizontally
}

// Add a function to close the modal (optional)
function closeSongShareModal() {
    var modal = document.getElementById("songShareModal");
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    var modal = document.getElementById("songShareModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};