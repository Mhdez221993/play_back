import React from 'react';

function TrackSearchResul({track, chooseTrack}) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className='d-flex m-2 align-items-center'
      style={{cursor: 'pointer'}}
      onClick={handlePlay}
    >

      <img src={track.albumUrl} alt={track.title} style={{height: '64px', width: '64px'}} />
      <div style={{marginLeft: '10px'}}>
        <div>{ track.title }</div>
        <div className='text-muted'>{ track.artist }</div>
      </div>
    </div>
  );
}

export default TrackSearchResul;
