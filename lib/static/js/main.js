function getRandomStart () {
  const starts = ['Fight for Odin', 'Thor will strike our enemies', 'Fire on the sea', 'Death is near', 'War against the gods', 'Dragonships on the horizon', 'Loki the deciever']

  return starts[Math.floor(Math.random() * starts.length)]
}

function intialize () {
  document.getElementById('start').value = getRandomStart()
  return fetchLyrics('/lastlyrics')
}

function loadLyrics()
{
  return fetchLyrics('/lyrics')
}

let estimatedGpt2Time = 50

function fetchLyrics (path) {
  var temperature = parseInt(document.getElementById('temperature').value)/100
  const model = document.getElementById('gpt2').checked ? "gpt2" : "torchrnn"
  var length = 1000
  if (model === "gpt2") {
    temperature += 0.3
    length = 200
  }

  var timer;

  if (path !== "/lastlyrics") {
    var progressSeconds = model === "gpt2" ? estimatedGpt2Time : 2
    document.getElementById('counter').innerText = progressSeconds
    document.getElementById('loader').style.display = 'flex';

    timer = setInterval(() => {
      progressSeconds--
      document.getElementById('counter').innerText = progressSeconds
    }, 1000)
  }

  return fetch(path + '?model=' + model + '&length=' + length + '&temperature=' + temperature + '&text=' + document.getElementById('start').value || '', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(result => {
    let title = result.lyrics[0]
    result.lyrics = result.lyrics.slice(1).map((line, index) => {
      if (index % 3 === 2) {
        return line + '<br>'
      } else {
        return line
      }
    })

    document.getElementById('title').innerHTML = title
    document.getElementById('lyrics').innerHTML = result.lyrics.join('<br>')
    estimatedGpt2Time = (result.duration + 5) ?? 50
    clearInterval(timer)
    document.getElementById('loader').style.display = 'none'
  });
}