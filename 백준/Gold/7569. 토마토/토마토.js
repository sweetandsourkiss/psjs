const fs = require("fs");
const file_path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(file_path).toString().split("\n");
// your own code here
const [col, row, height] = input[0].split(" ").map(Number);
const tomato = Array.from({ length: height }, () =>
  Array.from({ length: row }, () => Array(col))
);

for (let h = 0; h < height; h++) {
  for (let r = 0; r < row; r++) {
    const row_tomato = input[1 + h * row + r].split(" ").map(Number);
    for (let c = 0; c < col; c++) {
      tomato[h][r][c] = row_tomato[c];
    }
  }
}
const delta_row = [-1, 1, 0, 0, 0, 0];
const delta_col = [0, 0, -1, 1, 0, 0];
const delta_height = [0, 0, 0, 0, -1, 1];

let day = 0;
const rippen_tomatoes = [];
let unrippen_tomatoes_count = 0;
const visited = Array.from({ length: height }, () =>
  Array.from({ length: row }, () => Array(col).fill(false))
);

for (let h = 0; h < height; h++) {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      if (tomato[h][r][c] === 1) {
        rippen_tomatoes.push([[h, r, c], 0]);
        visited[h][r][c] = true;
      } else if (tomato[h][r][c] === 0) {
        unrippen_tomatoes_count++;
      }
    }
  }
}
let index = 0;

if (unrippen_tomatoes_count > 0) {
  while (index < rippen_tomatoes.length) {
    const [[h, r, c], now_day] = rippen_tomatoes[index++];
    day = now_day;
    for (let d = 0; d < delta_row.length; d++) {
      const [new_h, new_r, new_c] = [
        h + delta_height[d],
        r + delta_row[d],
        c + delta_col[d],
      ];
      if (
        new_h < 0 ||
        new_h >= height ||
        new_r < 0 ||
        new_r >= row ||
        new_c < 0 ||
        new_c >= col
      ) {
        continue;
      }
      if (tomato[new_h][new_r][new_c] === 0 && !visited[new_h][new_r][new_c]) {
        unrippen_tomatoes_count--;
        visited[new_h][new_r][new_c] = true;
        tomato[new_h][new_r][new_c] = 1;
        rippen_tomatoes.push([[new_h, new_r, new_c], now_day + 1]);
      }
    }
  }
}

if (unrippen_tomatoes_count > 0) {
  console.log(-1);
} else {
  console.log(day);
}
