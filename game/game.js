const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const canvasScore = document.getElementById('score');
const contextScore = canvasScore.getContext('2d');

let box = 150;
let Row = 4
let Col = 4

let board = []
let Pieces = []
let score = 2000

function drawGrid(){
    let i = 0
    for( r = 0; r < Row; r++ ){
        board[r] = []
        for (c = 0; c < Col; c++ ){
            i++
            board[r][c] = i    
            context.fillStyle = "white";
            context.fillRect(r * box, c * box, box, box);
        }
    }
    drawPiece()
}

function generateUniqueCoordinates(minX, maxX, minY, maxY, count) {
    const coordinates = [];

    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        const duplicate = coordinates.some(coord => coord.x === x && coord.y === y);

        if (!duplicate) {
            coordinates.push({ x, y });
        } else {
            i--;
        }
    }
    console.log(coordinates)
    return coordinates;
}

function drawPiece(){
    const minX = 0;
    const maxX = 3;
    const minY = 0;
    const maxY = 3;
    const numberOfCoordinates = 15;

    const uniqueCoordinates = generateUniqueCoordinates(minX, maxX, minY, maxY, numberOfCoordinates);

    for (i = 1; i < 17 ; i++){
        let piece = new Piece(uniqueCoordinates[i-1].x, uniqueCoordinates[i-1].y, i)
        Pieces.push(piece)
    }
}

function Piece(r, c, value){
    this.value = value
    this.x = r 
    this.y = c 
    this.position = board[c][r]
    
    context.fillStyle = "grey"
    context.fillRect(r * box, c * box, box, box)
    context.strokeStyle = "black";
    context.strokeRect(r * box, c * box, box, box)
    context.font = "48px serif";
    context.strokeText(this.value, this.x * box, this.y * box + box)
    
}

Piece.prototype.unDraw = function(){
    console.log("unDraw")
    context.fillStyle = "white"
    context.fillRect(this.x * box, this.y * box, box, box)
    context.strokeStyle = "black";
    context.strokeRect(this.x * box, this.y * box, box, box)
}

Piece.prototype.draw = function(){
    context.fillStyle = "grey"
    context.fillRect(this.x * box, this.y * box, box, box)
    context.strokeStyle = "black";
    context.strokeRect(this.x * box, this.y * box, box, box)
    context.font = "48px serif";
    context.strokeText(this.value, this.x * box, this.y * box + box)
}


canvas.addEventListener('click', handleClick);

function handleClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    const clickedCol = Math.floor(mouseX / box);
    const clickedRow = Math.floor(mouseY / box);
    
    if (
        clickedRow >= 0 &&
        clickedCol >= 0 &&
        clickedRow < Row &&
        clickedCol < Col &&
        board[clickedRow][clickedCol] !== undefined
        ){
            clock();
            moveRight(board[clickedRow][clickedCol])
            moveLeft(board[clickedRow][clickedCol])
            moveUp(board[clickedRow][clickedCol])
            moveDown(board[clickedRow][clickedCol])
            console.log(Pieces);
            checkWin()
            console.log("_______________________________________")
        }
    }
    
    function moveRight(id){
        let blocked
        for (i = 0; i < Pieces.length; i++) {
            if (Pieces[i].position == id){
                for (j = 0; j <Pieces.length; j++) {
                    if (Pieces[j].position == id + 1){
                        blocked = true;
                    }
                }
            }
        }
        
        if (blocked == true){
            console.log("dont move right")
        }else{
            for (i = 0; i < Pieces.length; i++){
                if (Pieces[i].position == id && id + 1 < 17){
                    console.log("move right")
                    Pieces[i].unDraw()
                    Pieces[i].position = id+1
                    Pieces[i].x++
                    Pieces[i].draw()
                }
            }
        }
        
    }
    
    function moveLeft(id){
        let blocked
        for (i = 0; i < Pieces.length; i++) {
            if (Pieces[i].position == id){
                for (j = 0; j <Pieces.length; j++) {
                    if (Pieces[j].position == id - 1){
                        blocked = true;
                    }
                }
            }
        }
        
        if (blocked == true){
            console.log("dont move left")
        }else{
            for (i = 0; i < Pieces.length; i++){
                if (Pieces[i].position == id && id - 1 >= 1){
                    console.log("move left")
                    Pieces[i].unDraw()
                    Pieces[i].position = id-1
                    Pieces[i].x--
                    Pieces[i].draw()
                }
            }
        }
        
    }
    
    function moveUp(id){
        let blocked
    for (i = 0; i < Pieces.length; i++) {
        if (Pieces[i].position == id){
            for (j = 0; j <Pieces.length; j++) {
                if (Pieces[j].position == id - 4){
                    blocked = true;
                }
            }
        }
    }
    
    if (blocked == true){
        console.log("dont move up")
    }else{
        for (i = 0; i < Pieces.length; i++){
            if (Pieces[i].position == id && id - 4 >= 1){
                console.log("move up")
                Pieces[i].unDraw()
                Pieces[i].position = id-4
                Pieces[i].y--
                Pieces[i].draw()
            }
        }
    }
    
}

function moveDown(id){
    let blocked
    for (i = 0; i < Pieces.length; i++) {
        if (Pieces[i].position == id){
            for (j = 0; j <Pieces.length; j++) {
                if (Pieces[j].position == id + 4){
                    blocked = true;
                }
            }
        }
    }
    
    if (blocked == true){
        console.log("dont move down")
    }else{
        for (i = 0; i < Pieces.length; i++){
            if (Pieces[i].position == id && id + 4 < 17){
                console.log("move down")
                Pieces[i].unDraw()
                Pieces[i].position = id+4
                Pieces[i].y++
                Pieces[i].draw()
            }
        }
    }
    
}

function checkWin(){
    let total = 0
    for (let i = 0; i < Pieces.length; i++) {
        if (Pieces[i].value == Pieces[i].position){
            total++
            console.log(Pieces[i].value)
        }
    }
    console.log("total: ", total)
    if(total == 15){
        alert("win")
    }
}

let start = Date.now()
let pScore = new Score(score)

function clock() {
    let now = Date.now()
    let delta = now - start
    if (delta > 1000){
        start = Date.now()
        score--
        pScore.score = score
        pScore.update()
    }
    requestAnimationFrame(clock)
}

function Score(score){
    this.score = score
    contextScore.fillStyle = "red"
    contextScore.font = "48px serif";
    contextScore.fillText(this.score, 50, 60)   
}

Score.prototype.update = function(){
    console.log("update")
    contextScore.clearRect(0, 0, box * 4, box * 0.5);
    contextScore.font = "48px serif";
    contextScore.fillText(this.score, 50, 70);
}

drawGrid();