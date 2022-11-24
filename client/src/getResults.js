const getResults = (res) => {
  let result = res.body.tracks.items.map(track => {
    const smalles = getSmallesImage(track.album.images)

    return {
      artist: track.artists[0].name,
      title: track.name,
      uri: track.uri,
      albumUrl: smalles.url
    }
  })

  return result
};

const getSmallesImage = (images) => {
  return images.reduce(
    (smalles, image) => {
      if (image.height < smalles.height) return image;
      return smalles;
  }, images[0])
}

export default getResults;
