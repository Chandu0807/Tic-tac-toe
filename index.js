const boxes = document.querySelectorAll(".box");
        const resetButton = document.querySelector(".reset-button");
        const statusDisplay = document.querySelector(".status");
        const symbolButtons = document.querySelectorAll(".symbol-choice button");
        let turnO = true;
        let gameActive = false;
        let xScore = 0;
        let oScore = 0;

        const winningPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        symbolButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (!gameActive) {
                    gameActive = true;
                    symbolButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    turnO = button.id === 'o';
                    statusDisplay.textContent = `${turnO ? "O" : "X"}'s turn`;
                }
            });
        });

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                if (gameActive && !box.classList.contains('filled')) {
                    box.classList.add('filled');
                    box.innerHTML = `<h1>${turnO ? "O" : "X"}</h1>`;
                    if (checkWinner()) {
                        const winner = turnO ? "O" : "X";
                        statusDisplay.textContent = `${winner} Wins!`;
                        if (winner === 'X') xScore++;
                        else oScore++;
                        updateScore();
                        gameActive = false;
                    } else if ([...boxes].every(box => box.classList.contains('filled'))) {
                        statusDisplay.textContent = "It's a Draw!";
                        gameActive = false;
                    } else {
                        turnO = !turnO;
                        statusDisplay.textContent = `${turnO ? "O" : "X"}'s turn`;
                    }
                }
            });
        });

        function checkWinner() {
            return winningPatterns.some(pattern => {
                const [a, b, c] = pattern;
                const values = [
                    boxes[a].textContent,
                    boxes[b].textContent,
                    boxes[c].textContent
                ];
                
                if (values[0] && values[0] === values[1] && values[1] === values[2]) {
                    boxes[a].classList.add('winner');
                    boxes[b].classList.add('winner');
                    boxes[c].classList.add('winner');
                    return true;
                }
                return false;
            });
        }

        function updateScore() {
            document.getElementById('x-score').textContent = xScore;
            document.getElementById('o-score').textContent = oScore;
        }

        resetButton.addEventListener("click", () => {
            boxes.forEach(box => {
                box.innerHTML = "";
                box.classList.remove('filled', 'winner');
            });
            gameActive = false;
            symbolButtons.forEach(btn => btn.classList.remove('active'));
            statusDisplay.textContent = "Choose your symbol to start";
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });