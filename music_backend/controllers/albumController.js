const db = require("../db"); 

exports.getAlbums = (req, res) => {
    const sql = "SELECT * FROM albums";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching albums:", err);
            return res.status(500).json({ error: "Database error" });
        }

        //Convert JSON fields properly
        const formattedResults = results.map(album => ({
            ...album,
            songs: album.songs ? JSON.parse(album.songs) : []
        }));

        res.json(formattedResults);
    });
};

// Add an album
exports.createAlbum = (req, res) => {
    const { name, artist_id, release_year, listens, songs } = req.body;

    //Ensure songs are a valid JSON string
    const validSongs = Array.isArray(songs) ? JSON.stringify(songs) : '[]';

    const sql = "INSERT INTO albums (name, artist_id, release_year, listens, songs) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, artist_id, release_year, listens, validSongs], (err, result) => {
        if (err) {
            console.error("Error inserting album:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Album added successfully", albumId: result.insertId });
    });
};

// Update an album
exports.updateAlbum = (req, res) => {
    const { id } = req.params;
    const { name, artist_id, release_year, listens, songs } = req.body;

    //Convert songs list to JSON before updating
    const validSongs = Array.isArray(songs) ? JSON.stringify(songs) : '[]';

    const sql = "UPDATE albums SET name = ?, artist_id = ?, release_year = ?, listens = ?, songs = ? WHERE id = ?";
    db.query(sql, [name, artist_id, release_year, listens, validSongs, id], (err, result) => {
        if (err) {
            console.error("Error updating album:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Album updated successfully" });
    });
};

// Delete an album
exports.deleteAlbum = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM albums WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting album:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Album deleted successfully" });
    });
};
