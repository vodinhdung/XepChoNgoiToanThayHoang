// Update algorithm 30/8/2024
// Tạo bảng chỗ ngồi
function createTable() {
  const table = document.getElementById("classroom");
  table.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("tr");
    const header = document.createElement("td");
    header.textContent = "Hàng " + (i + 1);
    header.classList.add("row-header");
    row.appendChild(header);
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("td");
      if (j === 4) {
        cell.classList.add("aisle");
        if (i === 3) { // Hàng 4 (index 3)
          cell.textContent = "LỐI ĐI";
        }
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Randomize
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Phân phối học sinh
function distributeCounts(total) {
  const rows = 8;
  const base = Math.floor(total / rows);
  const extra = total % rows;
  const counts = Array(rows).fill(base);
  for (let i = 0; i < extra; i++) counts[i]++;
  shuffle(counts);
  return counts;
}

// Gán ngẫu nhiên
function randomize() {
  const input = document.getElementById("student-count");
  const n = parseInt(input.value, 10);
  input.classList.remove("input-error");

  if (isNaN(n) || n < 1 || n > 64) {
    input.classList.add("input-error");
    alert("Vui lòng nhập số học sinh từ 1 đến 64!");
    return;
  }

  const counts = distributeCounts(n);
  const students = Array.from({ length: n }, (_, i) => String(i + 1));
  shuffle(students);

  const rowsEl = document.querySelectorAll("#classroom tr");
  let idx = 0;

  rowsEl.forEach((rowEl, i) => {
    // Lấy tất cả ô ghế (8 ô: 4 trái, 4 phải)
    const seats = Array.from(rowEl.querySelectorAll("td:not(.row-header):not(.aisle)"));
    const leftSeats = seats.slice(0, 4);
    const rightSeats = seats.slice(4, 8);
    const totalThis = counts[i];
    const leftCount = Math.ceil(totalThis / 2);
    const rightCount = totalThis - leftCount;

    // Shuffle vị trí ghế trước khi gán
    shuffle(leftSeats);
    shuffle(rightSeats);

    // Gán học sinh vào ghế trái
    leftSeats.forEach((cell, j) => {
      cell.textContent = j < leftCount && idx < students.length ? students[idx++] : "";
    });
    // Gán học sinh vào ghế phải
    rightSeats.forEach((cell, j) => {
      cell.textContent = j < rightCount && idx < students.length ? students[idx++] : "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createTable();
  document.querySelector("button").addEventListener("click", randomize);
});
