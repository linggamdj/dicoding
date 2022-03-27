class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
 
    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
      const { playlistId, userId, targetEmail } = JSON.parse(message.content.toString());
      
      const playlists = await this._playlistsService.getPlaylists(userId);
      playlists.songs = await this._playlistsService.getPlaylistSongs(playlistId);

      const playlistFormatted = {
        playlist: playlists,
      }

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistFormatted));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
 
module.exports = Listener;