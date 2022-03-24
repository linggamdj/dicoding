const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    try {
      const { albumId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.checkAlbumExist(albumId);

      const checkUserAlbumLike = await this._service.checkAlbumLike(credentialId, albumId);

      if (!checkUserAlbumLike) {
        await this._service.addAlbumLike(credentialId, albumId);
        const response = h.response({
          status: 'success',
          message: 'Berhasil menambahkan like',
        });
        response.code(201);
        return response;
      }

      await this._service.deleteAlbumLike(credentialId, albumId);

      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus like',
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

  async getAlbumLikesHandler(request, h) {
    try {
      const { albumId } = request.params;

      const data = await this._service.getAlbumLikes(albumId);
      const likes = data.count;

      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.code(200);
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
}

module.exports = AlbumLikesHandler;
