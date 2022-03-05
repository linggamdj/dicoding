const {
  addAlbumHandler,
  getAllAlbumsHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/albums',
    handler: addAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums',
    handler: getAllAlbumsHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: editAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: deleteAlbumByIdHandler,
  },
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
},
{
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
},
{
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
},
{
    method: 'PUT',
    path: '/Songs/{id}',
    handler: handler.putSongByIdHandler,
},
{
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler,
}
];

module.exports = routes;
