const db = require("../db"); 

exports.getArtists = (req, res) => {
    const sql = "SELECT * FROM artists";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching artists:", err);
            return res.status(500).json({ error: "Database error" });
        }

        //Convert JSON fields safely
        const formattedResults = results.map(artist => ({
            ...artist,
            albums: artist.albums ? safeParseJSON(artist.albums) : [],
            songs: artist.songs ? safeParseJSON(artist.songs) : []
        }));

        res.json(formattedResults);
    });
};

// Helper function to safely parse JSON (prevents crashes)
const safeParseJSON = (data) => {
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Add an artist
exports.createArtist = (req, res) => {
    const { name, monthly_listeners, genre, albums, songs } = req.body;

    //Ensure albums and songs are valid JSON before inserting
    const validAlbums = Array.isArray(albums) ? JSON.stringify(albums) : '[]';
    const validSongs = Array.isArray(songs) ? JSON.stringify(songs) : '[]';

    const sql = "INSERT INTO artists (name, monthly_listeners, genre, albums, songs) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, monthly_listeners || 0, genre, validAlbums, validSongs], (err, result) => {
        if (err) {
            console.error("Error inserting artist:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Artist added successfully", artistId: result.insertId });
    });
};

// Update an artist
exports.updateArtist = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Artist ID is required for update" });
    }

    const { name, monthly_listeners, genre, albums, songs } = req.body;

    //Convert arrays to JSON strings before updating
    const validAlbums = Array.isArray(albums) ? JSON.stringify(albums) : '[]';
    const validSongs = Array.isArray(songs) ? JSON.stringify(songs) : '[]';

    const sql = "UPDATE artists SET name = ?, monthly_listeners = ?, genre = ?, albums = ?, songs = ? WHERE id = ?";
    db.query(sql, [name, monthly_listeners || 0, genre, validAlbums, validSongs, id], (err, result) => {
        if (err) {
            console.error("Error updating artist:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Artist updated successfully" });
    });
};

// Delete an artist
exports.deleteArtist = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Artist ID is required for deletion" });
    }

    db.query("DELETE FROM artists WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting artist:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Artist deleted successfully" });
    });
};
