const canvas = document.getElementById('mytris');
const context = canvas.getContext('2d');

context.scale(20, 20); // making the pieces larger!

const matrix = [ // array pieces
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

function arenaCollide(arena, player) {
    const [mtx, po] = [player.matrix, player.pos];
    for (let y = 0; y < mtx.length; ++y) {
        for (var x = 0; x < mtx[y].length; ++x) {
            if (mtx[y][x] !== 0 && (arena[y + po.y] &&
                arena[y + po.y][x + po.x] !==  0))
                return true;
            }
        }
    }
    return false;
}

function createOurMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset){ // placing the pieces on the screen...
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1, 1);
      }
    });
  });
};

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    });
}

function playerPieceDrop() {
    player.pos.y++
    dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000; // pieces drop in ms`
let lastTime = 0;

function update(time = 0) { //continous updateing with requestAnimationFrame()
    const grabTime = time - lastTime;
    lastTime = time;

    dropCounter += grabTime;
    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}


// console assets
const player = {
  pos: {x: 5, y: 5},
  matrix: matrix,
};

const arena = createOurMatrix(12, 20);

document.addEventListener('keydown', e => {
    if (e.keyCode === 37 ){
        player.pos.x--;
    } else if (e.keyCode === 39 ){
         player.pos.x++;
    } else if (e.keyCode === 40) {
        playerPieceDrop();
    }
})

update();
