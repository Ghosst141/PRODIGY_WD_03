const xclass = 'x';
const oclass = 'o';
let turn = false;
const wincomb = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningmsg = document.querySelector('[data-winning-message]');
const windisplay = document.querySelector('.win-msg');
const rebtn=document.querySelector('.restart');

rebtn.addEventListener('click',start);

function start() {
    cells.forEach(link => {
        link.classList.remove(xclass);
        link.classList.remove(oclass);
        link.addEventListener('click', handleclick, { once: true });
    })
    windisplay.classList.remove('show');
    boardhover();
}

start();

function handleclick(e) {
    let cell = e.target;
    currentclass = turn ? oclass : xclass;
    placemark(cell, currentclass);
    if (iswin(currentclass)) {
        windisplay.classList.add('show');
        winningmsg.innerHTML = `${currentclass.toUpperCase()} Wins!`;
    }
    else if (isdraw()) {
        windisplay.classList.add('show');
        winningmsg.innerHTML = `Draw!`;
    }
    swapturn();
    boardhover();
}

function placemark(cell, currentclass) {
    console.log(currentclass);
    cell.classList.add(currentclass);
}

function swapturn() {
    turn = !turn;
}

function boardhover() {
    board.classList.remove(xclass);
    board.classList.remove(oclass);
    if (turn) {
        board.classList.add(oclass);
    }
    else {
        board.classList.add(xclass);
    }
}

function iswin(currentclass) {
    return wincomb.some(comb => {
        return comb.every(index => {
            return cells[index].classList.contains(currentclass);
        })
    })
}

function isdraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    }
    )
}