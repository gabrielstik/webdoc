const images = [
  'favelas/wall.jpeg',
  'favelas/wark.png',
  'favelas/warkBlend.png',
  'parallax/miami/car.png',
  'parallax/miami/miami_middle.png',
  'parallax/saoPaulo/man1.png',
  'parallax/saoPaulo/man2.png',
  'parallax/saoPaulo/mans2.png',
  'parallax/soweto/background.png',
  'parallax/soweto/man.png',
  '1950.jpg',
  '1976.jpg',
  '1984.jpg',
  'architectural.jpg',
  'c1959.jpg',
  'carioca.jpg',
  'compton_top.jpg',
  'compton.jpeg',
  'corbeil_essonnes.jpg',
  'cover.jpg',
  'cross.jpg',
  'dancing_in_street.jpg',
  'dr1800.jpg',
  'foot.jpg',
  'from_ghetto.jpeg',
  'funk_probidao.jpg',
  'globe.png',
  'gun.png',
  'history_corbeil.jpg',
  'illegal_side.jpeg',
  'infrastructures.jpg',
]
const videos = [
  'compton_witness.mp4',
  'drdrugs.mp4',
  'drfunk.mp4',
  'intro.mp4',
  'kouptchino1.mp4',
  'kouptchino2.mp4',
  'lacourneuve64.mp4',
  'lacourneuve83.mp4',
  'miami1.mp4',
  'minions.mp4',
  'neymar.mp4',
  'noisey.mp4',
  'ntm.mp4',
  'pnl.mp4',
  'soweto1.mp4',
  'wark.mp4',
]
const audios = [
  'favelas/shake_spray.wav',
  'favelas/spray.mp3',
  'clicReverb.mp3',
  'country_hover.mp3',
  'djeuns1.mp3',
  'djeuns2.mp3',
  'djeuns3.mp3',
  'fond_street_rap.mp3',
  'graph_up_1.mp3',
  'intro.mp3',
  'page_d_accueil.mp3',
  'port_scene.mp3',
  'quote.mp3',
  'shake_spray.mp3',
  'sounds_bip.mp3',
  'sport_fond.mp3',
  'spray.wav',
  'street_art_fond.mp3',
  'swoosh.mp3',
  'Underground_party.mp3',
]

for (const image of images) {
  const imageObject = new Image()
  imageObject.src = `assets/images/${image}`
}
for (const video of videos) {
  const videoObject = new Video()
  videoObject.src = `assets/medias/${video}`
}
for (const audio of audios) {
  const audioObject = new Audio()
  audioObject.src = `assets/medias/${audio}`
}