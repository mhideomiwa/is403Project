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
                <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="rap">Rap</option>
            <option value="country">Country</option>
            <option value="jazz">Jazz</option>
            <option value="r&b">R&B</option>
            <option value="classical">Classical</option>
            <option value="folk">Folk</option>
            <option value="indie">Indie</option>
            <option value="gospel">Gospel</option>
            <option value="soul">Soul</option>
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
            <option value="letsDate">LetsDate</option>
            <option value="studyMusic">StudyMusic</option>
            
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