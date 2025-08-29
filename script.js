//Update 29/8/2025
// Tạo bảng 8×9 (8 hàng, mỗi hàng 9 ô, gồm lối đi cột 5)
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

// Fisher–Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Hàm chính: đọc số học sinh, kiểm tra, shuffle, gán vào bảng
function randomize() {
  const input = document.getElementById("student-count");
  const n = parseInt(input.value, 10);
  input.classList.remove("input-error");
  if (isNaN(n) || n < 1 || n > 64) {
    input.classList.add("input-error");
    alert("Vui lòng nhập số học sinh từ 1 đến 64!");
    return;
  }

  // Tạo list từ "1" đến "n"
  const assignments = Array.from({ length: n }, (_, i) => String(i + 1));
  // Đệm thêm "" đến 64 chỗ
  while (assignments.length < 64) assignments.push("");
  shuffle(assignments);

  // Gán vào từng ô (bỏ qua các ô aisle và header)
  const cells = document.querySelectorAll(
    "#classroom td:not(.aisle):not(.row-header)"
  );
  cells.forEach((cell, idx) => {
    cell.textContent = assignments[idx];
  });
}

// Khởi tạo khi load trang
createTable();
