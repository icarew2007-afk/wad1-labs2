"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const playlists = playlistStore.getAllPlaylists();

    let numPlaylists = playlists.length;
    
    let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);
	
	  let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;
    let totalRating = playlists.reduce((total, playlist) => total + parseInt(playlist.rating), 0);
    let avgRating = numPlaylists > 0 ? totalRating/numPlaylists : 0;
    let mapped = playlists.map(playlist => playlist.rating);
    let maxRating = Math.max(...mapped);
let maxRated = playlists.filter(playlist => playlist.rating === maxRating);

  let longestPlaylist = Math.max(...playlists.map(playlist => playlist.songs.length));
  let favTitles = maxRated.map(item => item.title);
  let largestPlaylist = playlists.filter(playlist => playlist.songs.length === longestPlaylist);
  let lengthLargest = longestPlaylist;


    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayAverage: average,
      displayMaxRating: maxRating,
      displayAvgRating: avgRating,
      displayFavTitles: favTitles,
      displayLargestPlaylist: largestPlaylist,
      displayLengthLargest: lengthLargest
    };

    const viewData = {
      title: "Playlist App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
