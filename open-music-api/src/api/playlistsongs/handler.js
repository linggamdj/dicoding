const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongHandler = this.deletePlaylistSongHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);

      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
      await this._playlistSongsService.verifySongExist(songId);
      await this._playlistSongsService.addPlaylistSong({ playlistId, songId });

      const response = h.response({
        status: 'success',
        message: 'Playlist song berhasil ditambahkan',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server Error
      const response = h.request({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistSongsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

      const playlist = await this._playlistsService.getPlaylistById(playlistId);
      playlist.songs = await this._playlistSongsService.getPlaylistSongs(playlistId);

      return {
        status: 'success',
        data: {
          playlist,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server Error
      const response = h.request({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);

      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
      await this._playlistSongsService.deletePlaylistSong(playlistId, songId);

      return {
        status: 'success',
        message: 'Playlist song berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlaylistSongsHandler;
