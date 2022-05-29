package sudoku;

/**
 * Sudoku External API (only public class of the package)
 */
public class Sudoku 
{	
	/**
	 * Solves "in-place" the sudoku in the provided array
	 * this method signature is inspired from the JDK method Arrays.sort(int[] array) 
	 * @param sudoku a 9x9 array representing a sudoku, empty cells are 0
	 * @return true if the sudoku has been sucessfully solved
	 */
	public static boolean solve(int[][] sudoku) {
	  return new Solver(sudoku).solve();	
	}
	
	/**
	 * Returns the sudoku board as a string
	 * @param sudoku a 9x9 array representing a sudoku, empty cells are 0
	 * @return a string representation of the sudoku
	 */
	public static String asString(int[][] sudoku) {
	  return new Board(sudoku).toString();	
	}
}
