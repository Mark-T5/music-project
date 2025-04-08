import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [name, setName] = useState("");
  const [artistId, setArtistId] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [listens, setListens] = useState("");
  const [songs, setSongs] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/albums");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const albumData = {
      name,
      artist_id: Number(artistId),
      release_year: Number(releaseYear),
      listens: Number(listens),
      songs: songs.split(",").map(Number),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/albums/${editId}`, albumData);
      } else {
        await axios.post("http://localhost:5000/api/albums", albumData);
      }
      fetchAlbums();
      resetForm();
    } catch (error) {
      console.error("Error saving album:", error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/albums/${id}`);
      fetchAlbums();
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  const editAlbum = (album) => {
    setEditId(album.id);
    setName(album.name);
    setArtistId(album.artist_id);
    setReleaseYear(album.release_year);
    setListens(album.listens);
    setSongs(album.songs.join(","));
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setArtistId("");
    setReleaseYear("");
    setListens("");
    setSongs("");
  };

  return (
    <div className="page-container">
      <Navbar />
      <h2>Albums</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Album Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Artist ID" value={artistId} onChange={(e) => setArtistId(e.target.value)} required />
        <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
        <input type="number" placeholder="Listens" value={listens} onChange={(e) => setListens(e.target.value)} required />
        <input type="text" placeholder="Songs (comma-separated IDs)" value={songs} onChange={(e) => setSongs(e.target.value)} />
        <button type="submit">{editId ? "Update Album" : "Add Album"}</button>
        {editId && <button onClick={resetForm}>Cancel</button>}
      </form>

      <ul>
        {albums.map((album) => (
          <li key={album.id} className="album-item">
          <p><strong>Title:</strong> {album.name}</p>
          <p><strong>Artist ID:</strong> {album.artist_id}</p>
          <p><strong>Release Year:</strong> {album.release_year}</p>
          <p><strong>Listens:</strong> {album.listens}</p>
          <p><strong>Songs:</strong> {album.songs?.length ? album.songs.join(', ') : 'None'}</p>

          <button onClick={() => editAlbum(album)}>Edit</button>
          <button className="delete" onClick={() => deleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
