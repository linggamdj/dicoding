const { nanoid } = require('nanoid');
const albums = require('./albums');
const songs = require('./songs');

const addAlbumHandler = (request, h) => {
  const { name = 'untitled', year } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newAlbum = {
    name, year, createdAt, updatedAt,
  };

  albums.push(newAlbum);

  const isSuccess = albums.filter((album) => album.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Album gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllAlbumsHandler = () => ({
  status: 'success',
  data: {
    albums,
  },
});

const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const album = albums.filter((n) => n.id === id)[0];

  if (album !== undefined) {
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Album tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
      year,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui album. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Album gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// SONGS HANDLER

const addSongHandler = (request, h) => {
  const { title, year, genre, performer, albumId } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newSong = {
    title, year, genre, performer, albumId, createdAt, updatedAt,
  };

  songs.push(newSong);

  const isSuccess = songs.filter((song) => song.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Musik berhasil ditambahkan',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Musik gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllSongsHandler = () => ({
  status: 'success',
  data: {
    songs,
  },
});

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const song = songs.filter((n) => n.id === id)[0];

  if (song !== undefined) {
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Musik tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, year, genre, performer, albumId } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      title,
      year,
      genre,
      performer,
      albumId,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Musik berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui musik. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Musik berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Musik gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}; 

module.exports = {
  addAlbumHandler,
  getAllAlbumsHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
  addSongHandler,
  getAllSongsHandler,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
};
