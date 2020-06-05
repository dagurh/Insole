(function () {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  console.log(vw, vh)

  const list = document.querySelector('#opskrifter')
  list.addEventListener('click', showDetails, true)
  const settings = document.querySelector('.page#settings')
  const icon = document.querySelector('#icon')

  icon.addEventListener('click', showSettings)

  function showSettings () {
    if (settings.classList.contains('move')) {
      settings.classList.remove('move')
    } else {
      settings.classList.add('move')
    }
  }

  function showDetails (e) {
    if (e.target.classList.contains('opskrift')) {
      const tid = e.target.id
      const detailsid = tid + '-details'

      const p = document.querySelector('.page.details#' + detailsid)
      const back = p.querySelector('.back')
      back.onclick = function () {
        p.classList.remove('move')
        icon.style.display = 'inherit'
      }
      p.classList.add('move')
      icon.style.display = 'none'
    }
  }
})()
