const grid = document.querySelector("#grid");

const xhr = new XMLHttpRequest();

const rows = grid.rows;
const colors = [];
const colorPicker = document.querySelector("#color-picker");

const sendBtn = document.createElement("button");
const deletBtn = document.createElement("button");

sendBtn.innerHTML = "Send";
deletBtn.innerHTML ="Delete all colums";

sendBtn.addEventListener("click", send);
deletBtn.addEventListener("click",DeleteData);

document.body.appendChild(sendBtn);
//document.body.appendChild(deletBtn);

//regenerate the color


//delete all colums
function DeleteData(){
  if (confirm("Are you sure you want to delete all columns?")) {
    // make an AJAX request to the server to delete the columns
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/pixel/delete_colums_test.php", true);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert("Columns deleted successfully");
      }
    }
  }
}
//fonction send file
function send() {

    for (let i = 0; i < rows.length; i++) {
        let row = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
          let cell = rows[i].cells[j];
          let color = ({
            row: i,
            col: j,
            color: cell.style.backgroundColor
          });
          colors.push(color);

        }

      }
      
      //--------- Client side -------------------//
      const params = new URLSearchParams(window.location.search);
const username = params.get('username');
const password = params.get('password');

const data = { username: username, password: password, colors: colors };
xhr.open("POST", "https://c001-105-101-50-48.eu.ngrok.io/pixel/ServerMode.php", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log("Data inserted successfully");
    document.getElementById("response").innerHTML = xhr.responseText;
  }
};
xhr.send(JSON.stringify(data));
sendBtn.removeEventListener("click", send);
// Print something

// Delay page reload by 2 seconds
setTimeout(function() {
   location.reload();
}, 2000);

}



// Insert the colors array into the database
/*
    const sql = "INSERT INTO color_table (raw,col,HexColor) VALUES ";
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < colors[i].length; j++) {
        sql += "(" + i + "," + j + ",'" + colors[i][j] + "'),";
      }
    }
*/

//-----------------------------------------//

for (let i = 0; i < 9; i++) {
const row = document.createElement("tr");
for (let j = 0; j < 9; j++) {
const cell = document.createElement("td");

// fonction de click
cell.addEventListener("click", function() {
this.previousColor = this.style.backgroundColor;
this.style.backgroundColor = colorPicker.value;

});

//fonction back
cell.addEventListener("contextmenu", function(event) {
event.preventDefault();
if (this.previousColor) {
this.style.backgroundColor = this.previousColor;
this.previousColor = null;
} else {
this.style.backgroundColor = "";
}
});
  //fonction colorPicker
 cell.addEventListener("mousedown", function(event) {
  if (event.buttons === 4) {
    const bgColor = window.getComputedStyle(this).getPropertyValue("background-color");
    const color = tinycolor(bgColor);
    const hex = color.toHexString();
    colorPicker.value = hex;
  }
});


row.appendChild(cell);
}
grid.appendChild(row);
}
