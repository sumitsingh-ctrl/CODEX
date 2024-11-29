# CODEX

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AdvancedTicTacToeWithAI extends JFrame implements ActionListener {

    private final JButton[][] buttons = new JButton[3][3]; // 3x3 button grid
    private final JButton restartButton; // Button to restart the game
    private char currentPlayer = 'X'; // Current player ('X' or 'O')
    private boolean gameEnded = false;
    private boolean singlePlayer = true; // True for single-player mode, false for two-player mode

    public AdvancedTicTacToeWithAI() {
        setTitle("Tic-Tac-Toe Game with AI");
        setSize(400, 450); // Increased size to accommodate the Restart button
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        JPanel boardPanel = new JPanel();
        boardPanel.setLayout(new GridLayout(3, 3)); // 3x3 grid layout for buttons

        initializeButtons(boardPanel);
        add(boardPanel, BorderLayout.CENTER);


        restartButton = new JButton("Restart");
        restartButton.setFont(new Font("Arial", Font.PLAIN, 30));
        restartButton.addActionListener(e -> resetGame()); // Reset game when clicked
        add(restartButton, BorderLayout.SOUTH); // Add restart button at the bottom


        String[] options = {"Single Player (vs AI)", "Two Players"};
        int mode = JOptionPane.showOptionDialog(this, "Choose Game Mode", "Game Mode",
                JOptionPane.DEFAULT_OPTION, JOptionPane.INFORMATION_MESSAGE, null, options, options[0]);
        singlePlayer = (mode == 0); // If single-player mode is chosen

        setVisible(true);
    }


    public static void main(String[] args) {
        new AdvancedTicTacToeWithAI(); // Launch the GUI
    }

    
    public void initializeButtons(JPanel panel) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j] = new JButton("-");
                buttons[i][j].setFont(new Font("Arial", Font.PLAIN, 60)); // Set font size
                buttons[i][j].setFocusPainted(false);
                buttons[i][j].addActionListener(this); // Add action listener to buttons
                panel.add(buttons[i][j]); // Add button to the panel
            }
        }
    }

    // Handle button clicks
    @Override
    public void actionPerformed(ActionEvent e) {
        JButton clickedButton = (JButton) e.getSource();

        // Ignore clicks if the game has ended or the button is already marked
        if (gameEnded || !clickedButton.getText().equals("-")) {
            return;
        }

        clickedButton.setText(String.valueOf(currentPlayer)); // Set the current player's mark
        clickedButton.setEnabled(false); // Disable the button after it's clicked

        // Check for a win or draw condition
        if (checkWin()) {
            JOptionPane.showMessageDialog(this, "Player " + currentPlayer + " wins!");
            gameEnded = true;
        } else if (isBoardFull()) {
            JOptionPane.showMessageDialog(this, "The game is a draw!");
            gameEnded = true;
        } else {
            // Switch players if two-player mode, otherwise let AI play
            if (singlePlayer && currentPlayer == 'X') {
                currentPlayer = 'O'; // Switch to AI turn
                aiMove(); // AI makes a move
            } else {
                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            }
        }
    }

    // AI makes a move using the Minimax algorithm
    public void aiMove() {
        int[] bestMove = minimax(0, 'O');
        buttons[bestMove[0]][bestMove[1]].setText("O");
        buttons[bestMove[0]][bestMove[1]].setEnabled(false);

        // Check for a win or draw after AI's move
        if (checkWin()) {
            JOptionPane.showMessageDialog(this, "AI wins!");
            gameEnded = true;
        } else if (isBoardFull()) {
            JOptionPane.showMessageDialog(this, "The game is a draw!");
            gameEnded = true;
        } else {
            currentPlayer = 'X'; // Return control to player
        }
    }

    // Minimax algorithm to determine the best move for AI
    public int[] minimax(int depth, char player) {
        // Base case: check for terminal state
        if (checkWin()) {
            return new int[]{-1, -1, player == 'X' ? -1 : 1};
        } else if (isBoardFull()) {
            return new int[]{-1, -1, 0}; // Draw
        }

        int[] bestMove = {-1, -1, player == 'O' ? Integer.MIN_VALUE : Integer.MAX_VALUE};

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (buttons[i][j].getText().equals("-")) { // Empty cell
                    buttons[i][j].setText(String.valueOf(player)); // Simulate move
                    int score = minimax(depth + 1, player == 'O' ? 'X' : 'O')[2];
                    buttons[i][j].setText("-"); // Undo move

                    // Update best move
                    if (player == 'O') {
                        if (score > bestMove[2]) {
                            bestMove = new int[]{i, j, score};
                        }
                    } else {
                        if (score < bestMove[2]) {
                            bestMove = new int[]{i, j, score};
                        }
                    }
                }
            }
        }
        return bestMove;
    }

    // Check if the board is full (draw condition)
    public boolean isBoardFull() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (buttons[i][j].getText().equals("-")) {
                    return false;
                }
            }
        }
        return true;
    }

    // Check for a win condition
    public boolean checkWin() {
        // Check rows, columns, and diagonals
        return (checkRows() || checkColumns() || checkDiagonals());
    }

    // Check rows for a win
    private boolean checkRows() {
        for (int i = 0; i < 3; i++) {
            if (buttons[i][0].getText().equals(String.valueOf(currentPlayer)) &&
                    buttons[i][1].getText().equals(String.valueOf(currentPlayer)) &&
                    buttons[i][2].getText().equals(String.valueOf(currentPlayer))) {
                return true;
            }
        }
        return false;
    }

    // Check columns for a win
    private boolean checkColumns() {
        for (int i = 0; i < 3; i++) {
            if (buttons[0][i].getText().equals(String.valueOf(currentPlayer)) &&
                    buttons[1][i].getText().equals(String.valueOf(currentPlayer)) &&
                    buttons[2][i].getText().equals(String.valueOf(currentPlayer))) {
                return true;
            }
        }
        return false;
    }

    // Check diagonals for a win
    private boolean checkDiagonals() {
        return ((buttons[0][0].getText().equals(String.valueOf(currentPlayer)) &&
                buttons[1][1].getText().equals(String.valueOf(currentPlayer)) &&
                buttons[2][2].getText().equals(String.valueOf(currentPlayer))) ||
                (buttons[0][2].getText().equals(String.valueOf(currentPlayer)) &&
                        buttons[1][1].getText().equals(String.valueOf(currentPlayer)) &&
                        buttons[2][0].getText().equals(String.valueOf(currentPlayer))));
    }

    // Reset the game board
    public void resetGame() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j].setText("-");
                buttons[i][j].setEnabled(true);
            }
        }
        currentPlayer = 'X'; // Reset to player X
        gameEnded = false; // Reset game status
    }
}
