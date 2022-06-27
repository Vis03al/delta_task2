const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let canvasW = canvas.width
let canvasH = canvas.height
let tileWidth = 65
let tileHeight = 10;
let leftPressed = false
let rightPressed = false
let interval = null;
let score = 0;
let flag = 1;
let tiles = [{x: 0, y: canvasH - 50}]
let ball = {x: 15, y: 20, r: 10}
moveTiles()
moveBall()

function moveBall() {
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
            rightPressed = true;
        }
        if (e.key === 'ArrowLeft') {
            leftPressed = true;
        }
    });
    document.addEventListener('keyup', e => {
        if (e.key === 'ArrowRight') {
            rightPressed = false;
        }
        if (e.key === 'ArrowLeft') {
            leftPressed = false;
        }
    });
}


function drawBall() {
    if (rightPressed && ball.x + ball.r < canvasW) {
        ball.x += 4
    }
    if (leftPressed && ball.x - ball.r > 0) {
        ball.x -= 4
    }
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
    ctx.fillStyle = "blue";
    ctx.fill()
    ctx.closePath()
}

function drawTile() {
    ctx.rect(0, 0, canvasW, 10)
    ctx.fillStyle = "brown"
    ctx.fill()
    ctx.closePath()
    tiles.forEach((tile) => {
        ctx.beginPath();
        ctx.rect(tile.x, tile.y, tileWidth, tileHeight)
        ctx.fillStyle = "grey";
        ctx.fill()
        ctx.closePath()
    })

}

function addNewTile() {
    const lastTile = tiles[tiles.length - 1]
    tiles.push({x: randomX(), y: lastTile.y + 100})
    // drawTile();


}

function moveTiles() {
    if (interval) return;
    interval = setInterval(() => {
        checkGameOver()
        ctx.clearRect(0, 0, canvasW, canvasH)
        tiles.forEach(tile => {
            tile.y -= 1;
        })

        const nearest = tiles.find(tile => ball.y < tile.y + 10 && ball.y > tile.y - ball.r)
        // console.log(nearest)
        if (nearest) {
            balldrop(nearest)
        } else {
            ball.y += 4;
        }


        addNewTile();
        drawTile();
        drawBall()
        // balldrop()

    }, 15)

}

function randomX() {
    return Math.floor(Math.random() * 435)
}

function balldrop(nearest) {

    if (ball.y > nearest.y - ball.r) {
        if (ball.x + ball.r < nearest.x || ball.x - ball.r > nearest.x + tileWidth) {
            ball.y += 4;
            score++
        } else {
            ball.y = nearest.y - ball.r
        }
    }

    // else{
    //     ball.y+=4;
    // }
}

function checkGameOver() {
    if (score / 10 >= flag) {
        console.log("flAG=", flag)
        flag++;
        console.log("entered")
        ctx.beginPath();
        ctx.arc(10, 30, 5, 0, 2 * Math.PI)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }
    if (ball.y < 10 || ball.y > canvasH) {
        console.log("sup")
        LocalStorage(score)
        alert("GAME OVER \nYOUR SCORE = " + score)

        restart();
    }
}

function restart() {
    console.log("inside restart")
    ball = {x: 15, y: 20, r: 10}
    tiles = [{x: 0, y: canvasH - 50}]
    score = 0
    console.log("ball",ball)
    // clearInterval(interval)
    // interval = null
    moveTiles()

}

function LocalStorage() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const Score = {
        Score: score
    };

    highScores.push(Score);

    highScores.sort((a, b) => b.Score - a.Score)
    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores));


    let highScoresList = document.getElementById('highScoresList');
    // const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    // document.getElementById("finalScore").innerHTML = "TOP 5 SCORES:"
    highScoresList.innerHTML = highScores.map(
        score => {
            return `<li class="high-score">${score.Score}</li>`;
        }).join("");
}

function drawhealth() {
    console.log("entered")
    ctx.beginPath();
    ctx.arc(randomX(), 30, ball.r, 0, 2 * Math.PI)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.closePath()
}

function healthpickup() {

}