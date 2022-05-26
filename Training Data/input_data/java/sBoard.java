package sudoku;

import java.util.Arrays;

/**
 * This class is a DataStructure to store the board
 * It's also offers method to get particular areas of the board and to retrieve/set values
 * Visibility is package-friendly as it is part of the "internals" of the Solver
 * 
 * @author vincent
 */
final class Board {
	// Constants with package visibility
	static final int EMPTY_CELL = 0;
	static final int GRID_SIZE = 9;
	static final int REGION_SIZE = 3;
	static final String ERROR_MSG_SIZE = "Please provide a "+ GRID_SIZE +"x" + GRID_SIZE + " array for Input";

	private final int[][] board;
	private char[] line;

	/**
	 * Default Constructor
	 * @param init a dimension 2 array of integers, empty cells are represented by 0
	 */
	Board(int[][] init) {
		// A check on the size of the input data could be done here, to throw an InvalidInputException
		// Also, it is possible to deep copy the input array to ensure isolation/security.
		board = init;
	}
	/**
	 * Returns the specified row
	 * @param row row number (starting from 0)
	 */
	int[] getRow(int row) {
		return board[row];
	}

	/**
	 * Returns the specified column
	 * @param col column number (starting from 0)
	 */
	int[] getColumn(int col) {
		final int[] columnView = new int[GRID_SIZE];
		for(int a = 0; a < GRID_SIZE; a++) {
			columnView[a] = board[a][col];
		}
		return columnView;
	}

	/**
	 * Return the numbers from an area of the board (classically a 3x3 square)
	 * @param row row number 
	 * @param col column number
	 * @return the area that enclose the specified row/col values
	 */
	int[] getRegion(int row, int col) {
		final int[] regionView = new int[GRID_SIZE];
		final int rowBase = row - (row % REGION_SIZE);
		final int colBase = col - (col % REGION_SIZE);
		int counter = 0;
		// REGION_SIZE (3) Rows/Columns from rowBase/ColumnBase
		for (int r = rowBase; r < REGION_SIZE + rowBase; r++) {
			for (int c = colBase ; c < REGION_SIZE + colBase; c++) {
				regionView[counter++] = board[r][c];
			}
		}
		return regionView;
	}

	/**
	 * Getter
	 */
	int getCell(int row, int col) {
		return board[row][col];
	}

	/**
	 * Setter
	 */
	void setCell(int row, int col, int val) {
		board[row][col] = val;
	}

	/**
	 * Return a string containing the sudoku with region separators
	 */
	@Override
	public String toString() {
		// Exact size of the generated string for the buffer (values + spacers)
		final int size = (GRID_SIZE*2+1+((REGION_SIZE+1)*2))*(GRID_SIZE+REGION_SIZE+1);
		final String verticalSpace = " |";
		// A StringBuilder is absolutely needed here
		// use of String concatenation (+) would have really bad performance
		final StringBuilder buffer = new StringBuilder(size);
		// Row/Column traversal
		for (int a=0; a < GRID_SIZE; a++) {
			int[] row = board[a];
			if (a % REGION_SIZE == 0) {
				appendLine(buffer);
			}
			for (int b=0; b < GRID_SIZE; b++) {
				int value = row[b];
				if (b % REGION_SIZE == 0) {
					buffer.append(verticalSpace);
				}
				appendValue(buffer, value);
			}
			buffer.append(verticalSpace);
			buffer.append('\n');
		}
		appendLine(buffer);
		return buffer.toString();
	}

	/**
	 * Appends the value, or a _ if empty
	 */
	private void appendValue(StringBuilder buffer, int value) {
		buffer.append(' ');
		if (value != EMPTY_CELL) {
			buffer.append(value);
		} else {
			buffer.append('_');
		}
	}
	/**
	 * Append a line (separator between region)
	 */
	private void appendLine(StringBuilder buffer) {
		// Only create the line once 
		// Thread safe because the Sudoku class create one new Board for every toString() method call
		if (line == null) {
		  line = new char[GRID_SIZE*2+((REGION_SIZE+1)*2)];
		  Arrays.fill(line, '-');
		  //first char as space
		  line[0] = ' ';
		}
		buffer.append(line);
		buffer.append('\n');
	}
}
