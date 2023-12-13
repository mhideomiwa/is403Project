/*
document.addEventListener('DOMContentLoaded', async () => {
    const hrefVal = document.getElementById('playlistId').value
    console.log('playlistId: ' + hrefVal)
    // alert("This is the playlist page 1");
    try {
        const response = await fetch(hrefVal, {
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
*/

