// Add số lượng học sinh của mỗi lớp, A=TX1; B=TX2; C=TX3
var studentsA = [
  "1", "2", "3", "4",
  "5", "6", "7", "8",
  "9", "10", "11", "12",
  "13", "14", "15", "16",
  "17", "18", "19", "20",
  "21", "22", "23", "24",
  "25", "26", "27", "28",
  "29", "30", "31", "32",
  "33", "34", "35", "36",
  "37", "38", "39", "40",
  "41", "42", "43", "44",
  "45", "46", "47", "48",
  "49", "50", "51", "52",
  "53", "54", "55", "56"
];
var studentsB = [
  "1", "2", "3", "4",
  "5", "6", "7", "8",
  "9", "10", "11", "12",
  "13", "14", "15", "16",
  "17", "18", "19", "20",
  "21", "22", "23", "24",
  "25", "26", "27", "28",
  "29", "30", "31", "32",
  "33", "34", "35", "36",
  "37", "38", "39", "40",
  "41", "42", "43", "44",
  "45", "46", "47", "48",
  "49", "50", "51", "52",
  "53", "54", "55", "56",
  "57", "58", "59", "60",
  "61", "62", "63", "64"
];
var studentsC = [
  "1", "2", "3", "4",
  "5", "6", "7", "8",
  "9", "10", "11", "12",
  "13", "14", "15", "16",
  "17", "18", "19", "20",
  "21", "22", "23", "24",
  "25", "26", "27", "28",
  "29", "30", "31", "32",
  "33", "34", "35", "36",
  "37", "38", "39", "40",
  "41", "42", "43", "44",
  "45", "46", "47", "48",
  "49", "50", "51", "52",
  "53", "54", "55", "56",
  "57", "58", "59", "60",
  "61", "62", "63", "64"
];
var currentStudents = studentsA;

// Hàm tạo mảng
function getSeatAssignments() {
  var assignments = currentStudents.slice(); //Lấy danh sách học sinh
  var emptySeats = 64 - assignments.length;
  for (var i = 0; i < emptySeats; i++) {
    assignments.push(""); //thêm chỗ ngồi trống
  }
  return assignments;
}

// Hàm xáo trộn mảng sử dụng thuật toán Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Hàm tạo bảng chỗ ngồi 8 hàng x 10 cột (bao gồm lối đi và tiêu đề hàng)
function createTable() {
  var table = document.getElementById("classroom");
  table.innerHTML = "";
  for (var i = 0; i < 8; i++) {
    var row = document.createElement("tr");
    var rowHeader = document.createElement("td");
    rowHeader.textContent = "Hàng " + (i + 1);
    rowHeader.classList.add("row-header");
    row.appendChild(rowHeader);
    for (var j = 0; j < 9; j++) {
      var cell = document.createElement("td");
      if (j === 4) {
        cell.classList.add("aisle");
        if (i === 3) { // Hàng 4 (index 3)
          cell.textContent = "Lối đi";
        }
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Hàm sắp xếp học sinh ngẫu nhiên vào chỗ ngồi (bỏ qua lối đi và tiêu đề hàng)
function randomize() {
  var cells = document.querySelectorAll("#classroom td:not(.aisle):not(.row-header)");
  var assignments = getSeatAssignments();
  shuffle(assignments);
  cells.forEach(function(cell, index) {
    cell.textContent = assignments[index];
  });
}

//Lấy số lượng học sinh dựa trên lựa chọn lớp
function updateClass() {
  var classSelect = document.getElementById("class-select");
  var selectedClass = classSelect.value;
  if (selectedClass === "A") {
    currentStudents = studentsA;
  } else if (selectedClass === "B") {
    currentStudents = studentsB;
  } else if (selectedClass === "C") {
    currentStudents = studentsC;
  }
  randomize();
}

//Tạo bảng và thực hiện sắp xếp ngay khi trang được tải
createTable();
randomize();
