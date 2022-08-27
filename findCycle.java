import java.util.*;
import java.io.*;

public class findCycle {
	
	static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	static StringTokenizer in;
	static String next() throws IOException {
		while (in == null || !in.hasMoreTokens())
			in = new StringTokenizer(br.readLine());
		return in.nextToken();
	}
	static long readLong() throws IOException {
		return Long.parseLong(next());
	}
	static int readInt() throws IOException {
		return Integer.parseInt(next());
	}
	static double readDouble() throws IOException {
		return Double.parseDouble(next());
	}
	static char readChar() throws IOException {
		return next().charAt(0);
	}
	static String readLine() throws IOException {
		return br.readLine();
	}
	
	public static void main(String[] args) throws IOException {
		int n = Math.min(400, readInt()); //number of data points
		int[][] arr = new int[n][2]; //minutes column, rating column
		for (int i = 0; i < n; i++) {
			arr[i][0] = readInt();
			arr[i][1] = readInt();
		}
		double bestDif = Integer.MAX_VALUE;
		int numCycle = 0;
		for (int i = 85; i <= 115; i++) {
			double dif = 0;
			for (int j = 0; j < n; j++) {
				int x = arr[j][0] % i;
				if (x <= 5) {
					dif += Math.abs(8 - arr[j][1]);
				} else if (x > i - 10) {
					dif += Math.abs(9.5 - arr[j][1]);
				} else if (x > 5 && x <= 30) {
					dif += Math.abs(6 - arr[j][1]);
				} else {
					dif += Math.abs(3 - arr[j][1]);
				}
			}
			System.out.print(dif + " ");
			if (dif < bestDif) {
				bestDif = dif;
				numCycle = i;
			}
		}
		System.out.println("");
		System.out.println(numCycle);
 	}
}
