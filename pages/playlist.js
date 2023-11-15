function loadPage() {
    loadPlaylist();
    lockTableHeaders();
}

function loadPlaylist() {
    let playlist = ''; // Initialize playlist variable

    playlist = TEST_PLAYLIST.tracks.map((track) => {
        return '<tr><td>' + track.name + '</td><td>' + track.artist + '</td><td>' + track.album + '</td></tr>';
    }).join('');

    const playlistHeader = '<tr><th>Name</th><th>Artist</th><th>Album</th></tr>';

    // Adding everything to the page
    document.getElementById('playlistImg').src = TEST_PLAYLIST.image;
    document.getElementById('playlistTable').innerHTML = playlist; // Set playlist to table content
    document.getElementById('playlistTableHeaders').innerHTML = playlistHeader; // Set playlist header to table header
    document.title = TEST_PLAYLIST.name;
    document.getElementById('Playlist_name').innerHTML = TEST_PLAYLIST.name;
}

function lockTableHeaders() {
    const tableHeaders = document.getElementById('playlistTableHeaders');
    const tableContent = document.getElementById('playlistTableContent');
    const clonedTable = tableHeaders.cloneNode(true);

    // Hide original header row
    // tableHeaders.style.visibility = 'hidden';

    // Insert cloned header row before table content
    tableContent.insertBefore(clonedTable, tableContent.firstChild);

    // Set cloned header row position to 'sticky'
    clonedTable.style.position = 'sticky';
    clonedTable.style.top = '0';
    clonedTable.style.zIndex = '1';
    clonedTable.style.visibility = 'visible';
}

window.onload = loadPage;

//TEST DATA
let TEST_PLAYLIST = {
    name: "Test Playlist",
    image: '../assets/img/portfolio/album.png',
    tracks: [
        {
            name: "Test Track 1",
            artist: "Test Artist 1",
            album: "Test Album 1"
        },
        {
            name: "Test Track 2",
            artist: "Test Artist 2",
            album: "Test Album 2"
        },
        {
            name: "Test Track 3",
            artist: "Test Artist 3",
            album: "Test Album 3"
        },
        {
            name: "Test Track 4",
            artist: "Test Artist 4",
            album: "Test Album 4"
        },
        {
            name: "Test Track 5",
            artist: "Test Artist 5",
            album: "Test Album 5"
        },
        {
            name: "Test Track 6",
            artist: "Test Artist 6",
            album: "Test Album 6"
        },
        {
            name: "Test Track 7",
            artist: "Test Artist 7",
            album: "Test Album 7"
        },
        {
            name: "Test Track 8",
            artist: "Test Artist 8",
            album: "Test Album 8"
        },
        {
            name: "Test Track 9",
            artist: "Test Artist 9",
            album: "Test Album 9"
        },
        {
            name: "Test Track 10",
            artist: "Test Artist 10",
            album: "Test Album 10"
        }
    ]
}