import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all songs
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/songs");
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  // Add or update a song
  const handleSubmit = async (e) => {
    e.preventDefault();

    const songData = {
      name,
      release_year: Number(releaseYear),
      album_id: Number(albumId)
    };

    try {
      if (editId) {
        // Update
        await axios.put(`http://localhost:5000/api/songs/${editId}`, songData);
      } else {
        // Create
        await axios.post("http://localhost:5000/api/songs", songData);
      }

      fetchSongs();
      resetForm();
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/songs/${id}`);
      fetchSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  // Load song data into form for editing
  const editSong = (song) => {
    setEditId(song.id);
    setName(song.name);
    setReleaseYear(song.release_year);
    setAlbumId(song.album_id);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setReleaseYear("");
    setAlbumId("");
  };

  return (
    <div className="page-container">
      <Navbar />
      <h2>Songs</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Album ID"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Update Song" : "Add Song"}</button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h3>All Songs</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="song-item">
          <p><strong>Title:</strong> {song.name}</p>
          <p><strong>Release Year:</strong> {song.release_year}</p>
          <p><strong>Album ID:</strong> {song.album_id}</p>

          <button onClick={() => editSong(song)}>Edit</button>
          <button className="delete" onClick={() => deleteSong(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Songs;
