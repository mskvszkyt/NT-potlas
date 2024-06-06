document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'red';
    let gameActive = true;
    const rows = 6;
    const cols = 7;
    const cells = [];

    function createBoard() {
        board.innerHTML = '';
        cells.length = 0;
        for (let row = 0; row < rows; row++) {
            const rowArray = [];
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
                rowArray.push(cell);
            }
            cells.push(rowArray);
        }
    }

    function handleCellClick(e) {
        if (!gameActive) return;

        const col = e.target.dataset.col;
        let placed = false;

        for (let row = rows - 1; row >= 0; row--) {
            const cell = cells[row][col];
            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                cell.classList.add(currentPlayer);
                placed = true;
                if (checkWin(row, col)) {
                    alert(`${currentPlayer.toUpperCase()} Wins!`);
                    gameActive = false;
                } else if (isDraw()) {
                    alert('Draw!');
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                }
                break;
            }
        }

        if (!placed) {
            alert('Column is full!');
        }
    }

    function checkWin(row, col) {
        return (
            checkDirection(row, col, -1, 0) + checkDirection(row, col, 1, 0) >= 3 ||
            checkDirection(row, col, 0, -1) + checkDirection(row, col, 0, 1) >= 3 ||
            checkDirection(row, col, -1, -1) + checkDirection(row, col, 1, 1) >= 3 ||
            checkDirection(row, col, -1, 1) + checkDirection(row, col, 1, -1) >= 3
        );
    }

    function checkDirection(row, col, rowIncrement, colIncrement) {
        let count = 0;
        let currentRow = row + rowIncrement;
        let currentCol = col + colIncrement;

        while (
            currentRow >= 0 &&
            currentRow < rows &&
            currentCol >= 0 &&
            currentCol < cols &&
            cells[currentRow][currentCol].classList.contains(currentPlayer)
        ) {
            count++;
            currentRow += rowIncrement;
            currentCol += colIncrement;
        }

        return count;
    }

    function isDraw() {
        return cells.every(row => row.every(cell => cell.classList.contains('red') || cell.classList.contains('yellow')));
    }

    resetButton.addEventListener('click', () => {
        gameActive = true;
        currentPlayer = 'red';
        createBoard();
    });

    createBoard();
});
