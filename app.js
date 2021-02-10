const searchSong = async() =>{
const searchText = document.getElementById('search-field').value
const url =`https://api.lyrics.ovh/suggest/${searchText}`
const res = await fetch(url)
const data = await res.json()
displaySong(data.data)
}
const displaySong = songs =>{
  const songContainer  = document.getElementById('song-container')
  songContainer.innerHTML = ' '
    songs.forEach(element => {
        const songDiv  = document.createElement('div')
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${element.title}</h3>
            <p class="author lead">Album by <span>${element.artist.name} </span></p>
            <audio controls>
                <source src="${element.preview}" type = 'audio/mpeg'>
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${element.artist.name}','${element.title}')"class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv)
    });
}

const getLyric = async(artist , title) =>{
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res  = await fetch(url)
        const data = await res.json()
        getLyrics(data.lyrics)
    }catch(error){
        
         errorSHow('Sorry something is wrong!!!')
    }
  

}
const getLyrics = lyric =>{
    const lyricDiv = document.getElementById('song-lyrics')
    lyricDiv.innerText = lyric
}
const errorSHow = eror =>{
    const errorDiv = document.getElementById('error-text')
    errorDiv.innerText = eror
    

}