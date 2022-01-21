const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
let colors = []
const randomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const checkDub = (arr) => {
  const counts = {}
  arr.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1
  })
  
  for (let el in counts) {
    //   console.log(counts[`${el}`]);
      if (counts[`${el}`] < 1) {
        delete counts[`${el}`]
      }
  }
  return counts
}

const width = 1001
const height = 1001

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

context.fillStyle = '#000'
context.fillRect(0, 0, width, height)

for (let count = 0; count < 2; count++) {
  for (let y = 0; y <= 300; y++) {
    for (let x = 0; x <= 300; x++) {
      let color = randomColor()
      context.fillStyle = color
      context.fillRect(x + 350, y + 350, 1, 1)
      colors = [...colors, color]
    }
  }
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(`./${count}.png`, buffer)
  let colorsJson = checkDub(colors)
  fs.writeFile(`./${count}.json`,JSON.stringify({
    allColors : colors,
    colorsCount: colorsJson
  }) , function(err) {
    if (err) {
        console.log(err);
    }
});
  colors = []
}
