import { Container, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import Player from './Player';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResul from './TrackSearchResul';
import axios from 'axios';
import getResults from './getResults';
import useAuth from './useAuth';

const spotifyApi = new SpotifyWebApi({
  clientId: '897d1580943f4bbba28040d5757aecbe'
})

export default function Dashboard({code}) {
  const accessToken = useAuth(code);

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState('Not Found!')

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!playingTrack) return

    axios.get('http://localhost:3003/lyrics', {
      params: {
        artist: playingTrack.artist,
        title: playingTrack.title
      }
    }).then(res => {
      setLyrics(res.data.lyrics)
    })

  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken);

  }, [accessToken])

  useEffect(() => {

    if (!search) return setSearchResult([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search)
      .then(res => {
        if (cancel) return
        setSearchResult(getResults(res));
      })

      return () => cancel = true

  }, [accessToken, search])

  return (
    <Container className=' d-flex flex-column py-2 vh-100'>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className='flex-grow-1 my-2 overflow-auto'>
        {
          searchResult.map(track => (
            <TrackSearchResul
             track={track}
             key={track.uri}
             chooseTrack={chooseTrack}
            />
          ))
        }

        {
          setSearchResult.length === 0 &&
          <div className='text-center' style={{whiteSpace: 'pre'}}>
            {lyrics}
          </div>
        }
      </div>

      <div>
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
        />
      </div>

    </Container>
  );
}
