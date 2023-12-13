const addSongModal = `
<div id="songShareModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeSongShareModal()">&times;</span>
        <h2 class="shareSong">Share Your Song</h2>
        <br>
        <form id="songShareForm" onsubmit="return validateForm()" action="/submitSong" method="post">
            <!-- Song Title -->
            <label for="songTitle">Song Title:*</label>
            <input type="text" id="songTitle" name="songTitle" required>
            <br>
            <br>
            <!-- Artist Name -->
            <label for="artistName">Artist Name:*</label>
            <input type="text" id="artistName" name="artistName" required>
            <br>
            <br>
            <!-- Genre -->
            <label for="genre">Genre:*</label>
            <select id="genre" name="genre" required>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Rap">Rap</option>
                <option value="Country">Country</option>
                <option value="Jazz">Jazz</option>
                <option value="R&B">R&B</option>
                <option value="Classical">Classical</option>
                <option value="Folk">Folk</option>
                <option value="Indie">Indie</option>
                <option value="Gospel">Gospel</option>
                <option value="Soul">Soul</option>
                <!-- Add genre options as needed -->
            </select>
            <br>
            <br>
            <!-- Playlist Category -->
            <label for="playlistCategory">Playlist Category:*</label>
            <select id="playlistCategory" name="playlistCategory" required>
                <option value="dance">Dance</option>
            <option value="simp">Simp</option>
            <option value="gym">Gym</option>
            <option value="letsDate">Let's Date</option>
            <option value="study">Study Music</option>
            
                <!-- Add playlist category options as needed -->
            </select>
            <br>
            <br>
            <!-- Additional Fields can be added as needed -->

            <button class = "addsongbutton" type="submit">Add to playlist</button>
        </form>
    </div>
</div>`;

const addSongButton = `<button class = "addsongbutton" onclick="openSongShareModal()">Add a song!</button>`;

module.exports = { addSongModal, addSongButton };