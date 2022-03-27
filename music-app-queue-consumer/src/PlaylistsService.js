const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylists(userId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE owner = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);
    const playlist = result.rows[0];
    return playlist;
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM songs
      LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = PlaylistsService;