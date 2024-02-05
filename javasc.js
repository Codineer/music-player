const audio = new Audio('songs/Hass Hass.mp3');

// Add an event listener for when the metadata has loaded
audio.addEventListener('loadedmetadata', function() {
  // Access the metadata
  const artist = audio.artist || getMetadata(audio, 'artist');

  if (artist) {
    console.log('Artist:', artist);
  } else {
    console.log('Artist information not available.');
  }
});

// Function to retrieve metadata from the Web Audio API
function getMetadata(audio, key) {
  const metadata = audio[key];
  if (metadata) {
    return metadata;
  }

  const mediaSource = new MediaSource();
  const mediaSourceURL = URL.createObjectURL(mediaSource);
  const sourceBuffer = mediaSource.addSourceBuffer('songs/Hass Hass.mp3');

  sourceBuffer.addEventListener('updateend', function() {
    mediaSource.endOfStream();

    // Access the metadata
    const artist = audio[key] || 'Unknown Artist';

    // Cleanup
    URL.revokeObjectURL(mediaSourceURL);
    audio[key] = artist;

    // Trigger loadedmetadata event manually
    audio.dispatchEvent(new Event('loadedmetadata'));
  });

  // Set the source buffer
  sourceBuffer.appendBuffer(fetchAudioFile('songs/Hass Hass.mp3'));

  return null;
}

// Function to fetch the audio file
async function fetchAudioFile(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return buffer;
}

// Start loading the audio
audio.load();
