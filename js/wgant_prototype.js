let tabela = {
	zadanie1: [1, 0, 0, 0, 0, 0, 0],
	zadanie2: [0, 0, 0, 0, 0, 0, 0],
	zadanie3: [0, 0, 0, 0, 0, 0, 0],
	zadanie4: [0, 0, 0, 0, 0, 0, 0],
	zadanie5: [0, 0, 0, 0, 0, 0, 0],
};

let graphGrid = document.getElementById("graphGrid");

let grid = document.createElement("div");
let bar = document.createElement("div");
bar.setAttribute("id","test2a");
bar.className = "bar";
grid.appendChild( bar );

grid.setAttribute("id","test2");
grid.className = "grid";
grid.style.left = "100px";
grid.style.top = "100px";

grid.addEventListener("click", function (){
	if (tabela.zadanie1[0] == 0 ){
		console.log("bylo zero");
		tabela.zadanie1[0] = 1;
		document.getElementById("test2a").className = "bar";
	} else {
		console.log("bylo jeden" + tabela.zadanie1[0]  );
		tabela.zadanie1[0] = 0;
		document.getElementById("test2a").classList.remove("bar");
	}
} );

graphGrid.appendChild( grid );

//console.log( document.defaultView.getComputedStyle( grid, null ).getPropertyValue("width")  );
/*
let zzz = "poz_zadanie1_2";
let myRegex = /.*_(.*)_(.*)$/;
let match = myRegex.exec( zzz );
console.log( match[1], match[2] );
*/
//console.log( Object.keys( tabela )[0] ); // Object.keys( tabela ).length
// myObj.hasOwnProperty('key')
