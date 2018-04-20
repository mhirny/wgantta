let colorsLst = [ "Yellow", "Blue", "Gray", "Orange", "Red" ];
let currentColor = 1;

let gridWidth = 100, gridHeight = 40;
let df = new DocumentFragment();

// loading colors ;; colorsLst -> colorSelect.
let colorsSelect = document.getElementById("colorsSelect");
for (let i=0; i < colorsLst.length; i++) {
	let nowyElement = document.createElement("div");
	nowyElement.className = "colorsBtn";
	nowyElement.setAttribute( "id", "colorS" + i );
	nowyElement.style.bottom = "5px";
	nowyElement.style.left = (i * 40 + 20) +"px";
	nowyElement.style.backgroundColor = colorsLst[ i ];
	nowyElement.addEventListener( "click", function(){
		document.getElementById("colorS" + currentColor).classList.remove("colorsBtnSelected");
		nowyElement.classList.add("colorsBtnSelected");
		currentColor = i;
	});
	if ( i == currentColor ) { nowyElement.classList.add("colorsBtnSelected"); }
	df.appendChild( nowyElement );
}
colorsSelect.appendChild( df );

// loading task-list items;; table[] -> graphTaskListUl
let graphTaskListUl = document.getElementById("graphTaskListUl");
for (let i=0; i < Object.keys(table).length; i++) {
	let nowyElement = document.createElement("li");
	nowyElement.textContent = Object.keys( table )[ i ];
	nowyElement.className = "graphTaskList-li";
	df.appendChild( nowyElement );
	}
	graphTaskListUl.appendChild( df );

// Creating graph grid divs + 'drawing' bars
let graphGrid = document.getElementById("graphGrid");

for ( let row = 0; row < Object.keys(table).length; row++ ){ // loops 5 x 7 grid
	for ( let col = 0; col < 7; col++ ) {
		let rowPos = Object.keys( table )[ row ]; // rowPos = "zadanie1"
		let grid = document.createElement("div"); // grid element
		let bar = document.createElement("div"); // grid bar is grid ele. child

		bar.setAttribute("id","posBar_" + rowPos + "_" + col ); // bar.setup
		if  ( table[rowPos ][col] > 0 ) { bar.className = "bar";
			bar.style.backgroundColor = colorsLst[ table[rowPos ][col] ];
		}; //bar.setup
		grid.appendChild( bar ); // adding bar as grid child

		grid.setAttribute("id","pos_" + rowPos + "_" + col ); //grid.setup.start
		grid.className = "grid";
		grid.style.left = col * gridWidth + "px";
		grid.style.top = row * gridHeight + "px"; //grid.setup.end

		grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
			if ( currentColor == 0 ) { // when selected color is 0 == clear
				table[rowPos ][col] = 0;
				document.getElementById("posBar_" + rowPos + "_" + col).className = "";
			} else { // when selected color isn't 0 or Clear
				table[rowPos ][col] = currentColor;
				document.getElementById("posBar_" + rowPos + "_" + col).className = "bar";
				document.getElementById("posBar_" + rowPos + "_" + col).style.backgroundColor = colorsLst[ currentColor ];
			}
		} );
	graphGrid.appendChild( grid ); // adding grid>bar to graph zone
	}
}

function test() {
	console.log( Object.keys(table)[1] );
}
//console.log( document.defaultView.getComputedStyle( grid, null ).getPropertyValue("width")  );
/*
let zzz = "poz_zadanie1_2";
let myRegex = /.*_(.*)_(.*)$/;
let match = myRegex.exec( zzz );
console.log( match[1], match[2] );
*/
//console.log( Object.keys( table )[0] ); // Object.keys( table ).length
// myObj.hasOwnProperty('key')

//delete table.zadanie10; // delete table['zadanie10'];
//table.zadanie60 = [0, 1, 2, 3, 4, 0, 0];