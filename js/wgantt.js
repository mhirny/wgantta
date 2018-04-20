let colorsLst = [ "Yellow", "Blue", "Gray", "Orange", "Red" ];
let currentColor = 1;

let gridWidth = 100, gridHeight = 40;
let docfrag = new DocumentFragment();

let currentDB_1 = "wgantt2018w1"; // loading db into variable object;;

let graphGrid = document.getElementById("graphGrid");

// HEADER ;;
//add Person ;; addPersonInput -> persons{}
let addPersonBtn = document.getElementById("addPersonBtn");
let addPersonInput = document.getElementById("addPersonInput");
addPersonBtn.addEventListener( "click", addPerson );
addPersonInput.addEventListener( "keypress", function ( e ){
	if ( e.keyCode == 13) { addPerson(); }
	}
);
function addPerson(){
	let addPersonInputVal = document.getElementById("addPersonInput").value;
	let myRegex = /([^a-zA-Z]*)([a-zA-Z]+) +([a-zA-Z]+)(\-[a-zA-Z]+)*([^a-zA-Z]*)$/;
	let match = myRegex.exec( addPersonInputVal );
	if ( match != null  && match[1]=="" && match[2].length > 0 && match[3].length > 0 && match[5]==""){
		let firstName = match[ 2 ];
		let lastName = match[ 3 ];
		let lastName2nd = match[ 4 ];		
		firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
		lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
		if ( lastName2nd > "" ){
			lastName += "-" + lastName2nd.charAt(1).toUpperCase() + lastName2nd.slice(2).toLowerCase();
		};
		persons[ "personID_" + persons.nextId ] = {};
		persons[ "personID_" + persons.nextId ].fname = firstName;
		persons[ "personID_" + persons.nextId ].lname = lastName;
		persons.nextId++;
		document.getElementById("addPersonInput").value = ""; // clearing input field after successful add;
		loadPersonSelect();
		displayGraphTaskListUl();
	} else { alert("Wrong Name!"); };
};

//load Personel info ;; persons{} -> removePersonSelect
let removePersonSelect = document.getElementById( "removePersonSelect" );
function loadPersonSelect(){
	removePersonSelect.innerHTML = ""; // clearing select before appending new content;
	for ( let i=0; i < Object.keys( persons ).length; i++ ) {
		if ( Object.keys( persons )[ i ] == "nextId" ){ continue; };
		let newElem = document.createElement("option");
		let id = Object.keys( persons )[ i ]; // persons ID;
		newElem.text = persons[ id ].fname + " " + persons[ id ].lname;
		newElem.value = id;
		docfrag.appendChild( newElem );
	}
	removePersonSelect.appendChild( docfrag );
};
loadPersonSelect(); // startup load;

// remove Personel ;; removePersonBtn -delete-> persons{};
removePersonBtn = document.getElementById("removePersonBtn");
removePersonBtn.addEventListener("click", function(){
	for ( i=0; i< Object.keys( task_list ).length; i++ ) {	// removing removed person from assignment;;
		if ( Object.keys( task_list )[ i ] == "nextId" ) {
		continue
		};
		arr = task_list[ Object.keys( task_list )[ i ] ].assignment;//assignment[ Object.keys( assignment )[ i ] ];
		IdIndexInArr = arr.indexOf( removePersonSelect.value );
		if ( IdIndexInArr >= 0 ) {
			arr.splice( IdIndexInArr, 1 ) ;
		}
	}
	delete persons[ removePersonSelect.value ];
	loadPersonSelect();
	displayGraphTaskListUl();
});

// loading colors ;; colorsLst -> colorSelect.
function displayColorsSelect(){
	let colorsSelect = document.getElementById( "colorsSelect" );
	let newElemDel = document.createElement( "div" ); // DELETE color;;
	newElemDel.className = "colorsBtn";
	newElemDel.setAttribute( "id", "colorS0" );
	newElemDel.style.left = "20px";
		//newElemDel.style.backgroundColor = "f1f1f1";//colorsLst[ 0 ];
	let newElemImgDel = document.createElement( "img" );
	newElemImgDel.setAttribute( "src", "img/TrashBinT.png" );
	newElemDel.appendChild( newElemImgDel );
	newElemDel.addEventListener( "click", function() {
		document.getElementById( "colorS" + currentColor).classList.remove( "colorsBtnSelected" );
		newElemDel.classList.add( "colorsBtnSelected" );
		graphGrid.classList.add( "pointerCursor" );
		currentColor = 0;
		});
	if ( currentColor == 0 ) {
		newElemDel.classList.add( "colorsBtnSelected" );
		graphGrid.classList.add( "pointerCursor" );
	}
	colorsSelect.appendChild( newElemDel );

	for (let i=1; i < colorsLst.length; i++) { // Standard colors;;
		let newElem = document.createElement( "div" );
		newElem.className = "colorsBtn";
		newElem.setAttribute( "id", "colorS" + i );
		newElem.style.left = ( i * 40 + 20 ) +"px";
		newElem.style.backgroundColor = colorsLst[ i ];
		newElem.addEventListener( "click", function(){
			document.getElementById( "colorS" + currentColor ).classList.remove( "colorsBtnSelected" );
			newElem.classList.add( "colorsBtnSelected" );
			graphGrid.classList.add( "pointerCursor" );
			currentColor = i;
		});
		if ( i == currentColor ) {
			newElem.classList.add( "colorsBtnSelected" );
			graphGrid.classList.add( "pointerCursor" );
		}
		docfrag.appendChild( newElem );
	}
	colorsSelect.appendChild( docfrag );
	
	let newElemStop = document.createElement( "div" ); // STOP color;;
	newElemStop.className = "colorsBtn";
	newElemStop.setAttribute( "id", "colorSx" );
	newElemStop.style.left = ( colorsLst.length * 40 + 20 ) +"px";
	//newElemStop.style.backgroundColor = "lightgray";//colorsLst[ 0 ];
	let newElemImgStop = document.createElement( "img" );
	newElemImgStop.setAttribute( "src", "img/StopEditT.png" );
	newElemStop.appendChild( newElemImgStop );
	newElemStop.addEventListener( "click", function(){
		document.getElementById( "colorS" + currentColor).classList.remove( "colorsBtnSelected" );
		newElemStop.classList.add( "colorsBtnSelected" );
		graphGrid.classList.remove( "pointerCursor" );
		currentColor = "x";
		});
	if ( currentColor == "x" ) {
		newElemStop.classList.add( "colorsBtnSelected" );
		graphGrid.classList.remove( "pointerCursor" );
	}
	colorsSelect.appendChild( newElemStop );
	
};
displayColorsSelect(); // on-start display;;

// TOOL BAR ;;
// Add Task;;
let toolBarAddTaskBtn = document.getElementById( "toolBarAddTaskBtn" );
	toolBarAddTaskBtn.addEventListener( "click", openToolBarAddTaskConsole );
function openToolBarAddTaskConsole() {
	if ( toolBarAddTaskBtn.textContent == "Edit tasks" ){
		toolBarAddTaskBtn.textContent = "Close edit"
		displayGraphTaskListUl();
	} else {
		toolBarAddTaskBtn.textContent = "Edit tasks" 
		displayGraphTaskListUl();
	}
};

// Search/Filter input;;
let toolBarTaskSearchInput = document.getElementById( "toolBarTaskSearchInput" );
	toolBarTaskSearchInput.addEventListener( "keyup", function(){
		displayGraphTaskListUl();
		displayGraphGrid();
	});

// 	toolBarDateRangeSwitch;;
let toolBarDateRangeSwitchBtn = document.getElementById( "toolBarDateRangeSwitchBtn" );
toolBarDateRangeSwitchBtn.value = "1W";
let toolBarDateRangeSwitch1W = document.getElementById( "toolBarDateRangeSwitch1W" );
let toolBarDateRangeSwitch4W = document.getElementById( "toolBarDateRangeSwitch4W" );
toolBarDateRangeSwitchBtn.addEventListener( "click", function (){
	if ( toolBarDateRangeSwitchBtn.value == "1W" ){
		toolBarDateRangeSwitchBtn.value = "4W";
		toolBarDateRangeSwitch1W.className = "toolBarDateRangeSwitchTextSmall";
		toolBarDateRangeSwitch4W.className = "toolBarDateRangeSwitchTextBig";
		gridWidth = 25; 
		gridHeight = 40;
		changeDB();
	} else {
		toolBarDateRangeSwitchBtn.value = "1W";
		toolBarDateRangeSwitch1W.className = "toolBarDateRangeSwitchTextBig";
		toolBarDateRangeSwitch4W.className = "toolBarDateRangeSwitchTextSmall";
		gridWidth = 100;
		gridHeight = 40;
		changeDB();
	}
});
	
//PREV. btn;;
let toolBarPreviousBtn = document.getElementById("toolBarPreviousBtn");
toolBarPreviousBtn.addEventListener( "click", function () {
	if ( selectedWeek.value == 1 ) {
		for ( i = 0; i < selectedYear.options.length; i++ ) {
			if ( selectedYear.options[ i ].value ==  selectedYear.value - 1 ) {
				selectedYear.value = selectedYear.value -1;
				selectedMonth.value = 11;
				calculateWeeks();
				selectedWeek.value = selectedWeek.lastChild.value;
				changeDB();
			}
		}
	} else if ( selectedWeek.value > 1 ) {
		selectedWeek.value = selectedWeek.value - 1;
		calculateMonthFromWeeks();
		changeDB();
	}
});
// NEXT btn;;
let toolBarNextBtn = document.getElementById("toolBarNextBtn");
	toolBarNextBtn.addEventListener( "click", function () {
		if ( parseInt(selectedWeek.value) ==  parseInt(selectedWeek.lastChild.value) ) { 
			for ( i = 0; i < selectedYear.options.length; i++ ) {
				if ( selectedYear.options[ i ].value ==  parseInt(selectedYear.value) + 1 ) {
					selectedYear.value = parseInt(selectedYear.value) + 1;
					selectedWeek.value = 1;
					calculateWeeks();
					calculateMonthFromWeeks();
					changeDB();
					break; // break for loop;;
				};
			};
		} else if ( parseInt(selectedWeek.value) < parseInt(selectedWeek.lastChild.value) ) {
			selectedWeek.value = parseInt(selectedWeek.value) + 1;
			calculateMonthFromWeeks();
			changeDB();
		}
	});
	
// Date select load;;
let selectedYear = document.getElementById( "selectedYear" );
let selectedMonth = document.getElementById( "selectedMonth" );
let selectedWeek = document.getElementById( "selectedWeek" );

function getFirstWeekStart( year ) {
	let yearFullDate = new Date( year, 0, 1) ;
	let firstDayOfYear = yearFullDate.getDay();
	let firstWeekStart = yearFullDate;
    if (firstDayOfYear <= 4) {
        firstWeekStart.setDate( yearFullDate.getDate() - firstDayOfYear + 1 );
    } else {
        firstWeekStart.setDate( yearFullDate.getDate() + 8 - firstDayOfYear );
	}
	return firstWeekStart;
};

// load years -> selectYear;;
for ( let i = 2018; i < 2022; i++ ) {
	let newElemOption = document.createElement("option");
	newElemOption.value = i;
	newElemOption.textContent = i;
	docfrag.appendChild( newElemOption );
};
selectedYear.appendChild( docfrag );
// year change; keep previous week value + check for week 53;; blur() on change;;
selectedYear.addEventListener( "change", function(){ 
	let oldSelectedWeek = selectedWeek.value;
	calculateWeeks();
	if (  oldSelectedWeek == 53 && selectedWeek.lastChild.value < 53 ) {
		selectedWeek.value = 52;
	} else {
		selectedWeek.value = oldSelectedWeek;
	};
	selectedYear.blur();
	changeDB();
});

let monthsNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
//loading Month names -> selectedMonth;;
for ( let i = 0; i < monthsNames.length; i++) {
	let newElemOption = document.createElement( "option" );
	newElemOption.value = i;
	newElemOption.textContent = monthsNames[ i ];
	docfrag.appendChild( newElemOption );
};
selectedMonth.appendChild( docfrag );
selectedMonth.addEventListener( "change", function(){
	let yearFirstWeek = getFirstWeekStart( selectedYear.value );
	let dateFromSelect = new Date( selectedYear.value, selectedMonth.value );
	
	let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	let diffDays = Math.round(Math.abs((dateFromSelect.getTime() - yearFirstWeek.getTime()) / (oneDay) ));
	let onChangeNewWeek = 1 + Math.round( diffDays / 7 );
	selectedWeek.value = onChangeNewWeek;
	selectedMonth.blur();
	changeDB();
});

function calculateMonthFromWeeks() {
	let yearFirstWeek = getFirstWeekStart( selectedYear.value );
// calculating first day of selectedWeek;;
	let dateFromSelect = new Date(  yearFirstWeek.getFullYear(), yearFirstWeek.getMonth(), ( yearFirstWeek.getDate() + 7 * selectedWeek.value - 7 )  );

// check if week don't begins in previous month by comapring first day of week ( monday ) to thursday ( monday + 3 );;
	let isThursdayInDifferentMonth = new Date( dateFromSelect.getFullYear(), dateFromSelect.getMonth(), dateFromSelect.getDate() + 3 );
	if ( dateFromSelect.getMonth() == isThursdayInDifferentMonth.getMonth() ) {
		selectedMonth.value = dateFromSelect.getMonth(); 
	} else {
		if ( dateFromSelect.getMonth() == 11 ) {
			selectedMonth.value = 0;
		} else {
			selectedMonth.value = dateFromSelect.getMonth() + 1;
		}
	};
};

//number of Weeks;;
	// checking number of weeks in year;;
function calculateWeeks() {
	selectedWeek.innerHTML = "";
	let yearFirstWeek = getFirstWeekStart( selectedYear.value );
	let nextYearFirstWeek = getFirstWeekStart( parseInt( parseInt(selectedYear.value) + 1) );
	let numberOfWeeks;

	let have52Weeks = new Date( yearFirstWeek.getFullYear() , yearFirstWeek.getMonth(), yearFirstWeek.getDate() + ( 7 * 52 ) );
	let have53Weeks = new Date( yearFirstWeek.getFullYear(), yearFirstWeek.getMonth(), yearFirstWeek.getDate() + ( 7 *53 ) );

	if ( have52Weeks.getTime() == nextYearFirstWeek.getTime() ) {
		numberOfWeeks = 52;
	} else if ( have53Weeks.getTime() == nextYearFirstWeek.getTime() ) {
		numberOfWeeks =  53;
	} else {
		alert(" Weeks in Year calculation Error! ");
	};
	//// loading number of weeks -> selectedWeek;;
	for ( let i = 1; i <= numberOfWeeks; i++ ) {
		let newElemOption = document.createElement( "option" );
		newElemOption.value = i;
		newElemOption.textContent =  i;
		docfrag.appendChild( newElemOption );
	};
	selectedWeek.appendChild( docfrag );
	// listener change selectMonth based on change to selectWeek;;
	selectedWeek.addEventListener( "change", function(){
		calculateMonthFromWeeks();
		// selectWeek blur() on change;;
		selectedWeek.blur();
		changeDB();
	});
}
	//on start calculate weeks;;
calculateWeeks();

let toolBarDateHeadings = document.getElementById("toolBarDateHeadings");
function displayToolBarDateHeadings() {
	toolBarDateHeadings.innerHTML = "";
	if ( toolBarDateRangeSwitchBtn.value == "1W" ) {
		for ( let i = 0; i < 7; i++ ) {
			let newElemDiv = document.createElement("div");
			newElemDiv.className = "toolBarDateHeading1W";
			newElemDiv.style.left = i * gridWidth + "px";
			
			let yearFromSelect = new Date( selectedYear.value, 0, 1) ;
			let firstDayOYear = yearFromSelect.getDay();
			let thisYearFirstWeekDay = yearFromSelect;
				if (firstDayOYear <= 4) {
					thisYearFirstWeekDay.setDate( yearFromSelect.getDate() - firstDayOYear + 1 );
				} else {
					thisYearFirstWeekDay.setDate( yearFromSelect.getDate() + 8 - firstDayOYear );
				}
				let dateFromSelect = new Date(  thisYearFirstWeekDay.getFullYear(), thisYearFirstWeekDay.getMonth(), ( thisYearFirstWeekDay.getDate() + 7 * selectedWeek.value - 7 + i )  );
			
			let headMonth = parseInt(dateFromSelect.getMonth() +1);
			let headDay =  dateFromSelect.getDate();
				if ( headMonth < 10 ) { headMonth = "0" + headMonth };
				if ( headDay <10 ) { headDay = "0" + headDay };
			//newElemDiv.innerHTML = parseInt(dateFromSelect.getMonth() +1) + " / " + dateFromSelect.getDate();
			newElemDiv.textContent = headDay + " / " + headMonth;
			docfrag.appendChild( newElemDiv );
			
		};
	}
	if ( toolBarDateRangeSwitchBtn.value == "4W" ) {
		for ( let i = 0; i < 28; i++ ) {
			let newElemDiv = document.createElement("div");
			newElemDiv.className = "toolBarDateHeading4W";
			newElemDiv.style.left = i * gridWidth + "px";
			
			let yearFromSelect = new Date( selectedYear.value, 0, 1) ;
			let firstDayOYear = yearFromSelect.getDay();
			let thisYearFirstWeekDay = yearFromSelect;
				if (firstDayOYear <= 4) {
					thisYearFirstWeekDay.setDate( yearFromSelect.getDate() - firstDayOYear + 1 );
				} else {
					thisYearFirstWeekDay.setDate( yearFromSelect.getDate() + 8 - firstDayOYear );
				}
				let dateFromSelect = new Date(  thisYearFirstWeekDay.getFullYear(), thisYearFirstWeekDay.getMonth(), ( thisYearFirstWeekDay.getDate() + 7 * selectedWeek.value - 7 + i )  );
			
			let headDay =  dateFromSelect.getDate();
				if ( headDay <10 ) { headDay = "0" + headDay };
			newElemDiv.textContent = headDay;
			docfrag.appendChild( newElemDiv );
			
		};
	}
	toolBarDateHeadings.appendChild( docfrag );
};
displayToolBarDateHeadings();


// GRAPH ZONE ;;
// loading task-list items;; server[ currentDB_1 ][] -> graphTaskListUl
let graphTaskListUl = document.getElementById("graphTaskListUl");
function displayGraphTaskListUl(){
	while (graphTaskListUl.hasChildNodes()) {
		graphTaskListUl.removeChild(graphTaskListUl.lastChild);
	}
	//graphTaskListUl.innerHTML = "";
	if ( toolBarAddTaskBtn.textContent == "Edit tasks" ) {
		let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;
		for (let i=0; i < Object.keys( server[ currentDB_1 ] ).length; i++) {
			
			if ( task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
				let btnID = Object.keys( server[ currentDB_1 ] )[ i ] + "_btn";
				let newElemTaskListBtn = document.createElement( "span" );
					newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
					newElemTaskListBtn.setAttribute( "id", btnID );
					newElemTaskListBtn.textContent = task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].assignment.length;
					newElemTaskListBtn.addEventListener("click", function( event ) {
						if ( newElemTaskListBtn.value == "X" ) {
							displayGraphTaskListUl();
						} else{
							displayGraphTaskListUl();
							openGraphTaskListPersonZone( btnID, Object.keys( server[ currentDB_1 ] )[ i ] );
						}					
					});
					
				let newElemTaskListAnchor = document.createElement( "span" );
					newElemTaskListAnchor.setAttribute( "id", btnID + "Anchor" );
					newElemTaskListAnchor.classList.add( "graphTaskListAnchor" );
					
				let newElemTaskList_li = document.createElement( "li" );
					newElemTaskList_li.className = "graphTaskList_li";
					newElemTaskList_li.setAttribute( "id", "posList_" + Object.keys( server[ currentDB_1 ] )[ i ] );
					newElemTaskList_li.textContent = task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].task_name;
				newElemTaskList_li.appendChild( newElemTaskListBtn );
				newElemTaskList_li.appendChild( newElemTaskListAnchor );					
				docfrag.appendChild( newElemTaskList_li );
			}
		}
	graphTaskListUl.appendChild( docfrag );
	}
	if ( toolBarAddTaskBtn.textContent == "Close edit" ) {
		let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;
		for (let i=0; i < Object.keys( server[ currentDB_1 ] ).length; i++) {
			if ( task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
				let btnID = Object.keys( server[ currentDB_1 ] )[ i ] + "_btn";
				let newElemTaskListBtn = document.createElement( "span" );
					newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
					newElemTaskListBtn.setAttribute( "id", btnID );
					newElemTaskListBtn.textContent = "DEL";
					newElemTaskListBtn.addEventListener("click", function( event ) {

						//make delete on whole DB && task_list;; #delDB
							let taskIdToDelete = Object.keys( server[ currentDB_1 ] )[ i ] ;
							for ( let i = 0; i < Object.keys( server ).length; i++ ) {
									delete server[  Object.keys( server )[ i ] ][ taskIdToDelete ];
								}
							delete task_list[ taskIdToDelete ];
							displayGraphTaskListUl();
							displayGraphGrid();
					});
				let newElemTaskList_li = document.createElement( "li" );
					newElemTaskList_li.className = "graphTaskList_li";
					newElemTaskList_li.setAttribute( "id", "posList_" + Object.keys( server[ currentDB_1 ] )[ i ] );
					let newElemTaskList_li_input = document.createElement( "input" );
						newElemTaskList_li_input.value = task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].task_name;
						newElemTaskList_li_input.className = "graphTaskList_li_input";
						newElemTaskList_li_input.addEventListener( "change", function(){ //saving renames;;
							task_list[ Object.keys( server[ currentDB_1 ] )[ i ] ].task_name = newElemTaskList_li_input.value;
						});
						
					newElemTaskList_li.appendChild ( newElemTaskList_li_input );
					newElemTaskList_li.appendChild( newElemTaskListBtn );
				docfrag.appendChild( newElemTaskList_li );
			}
		}
	graphTaskListUl.appendChild( docfrag );
	//add New Task;;
	//let newElemTaskList_li_new = document.createElement( "" );

				let btnID = "taskID_" + task_list.nextId + "_btn";
				let newElemTaskListBtn = document.createElement( "span" );
					newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
					newElemTaskListBtn.setAttribute( "id", btnID );
					newElemTaskListBtn.textContent = "ADD";
					newElemTaskListBtn.addEventListener("click", function( event ) {
						let isNameProper = "yes";
						if ( newElemTaskList_li_input.value == "" ) {
							isNameProper = "no";
							alert("Task must have name")
						} else {
							for ( let i = 0; i < Object.keys( task_list ).length; i++ ) {
								if ( task_list[ Object.keys( task_list )[ i ]].task_name == newElemTaskList_li_input.value ) {
									alert( "Task name already exist" );
									isNameProper = "no";
									break;
								}
							}
						}
						if ( isNameProper == "yes" ) {						
							//make add on whole DB;; #addDB
							task_list[ "taskID_" + task_list.nextId ] = {};
							task_list[ "taskID_" + task_list.nextId ].task_name = newElemTaskList_li_input.value;
							task_list[ "taskID_" + task_list.nextId ].assignment = [];
							for ( let i = 0; i < Object.keys( server ).length; i++ ) {
								server[ Object.keys( server )[ i ] ][ "taskID_" + task_list.nextId ] = [0, 0, 0, 0, 0, 0, 0];
							}
							task_list.nextId ++;
							displayGraphTaskListUl();
							displayGraphGrid();
						}
					});
				let newElemTaskList_li = document.createElement( "li" );
					newElemTaskList_li.className = "graphTaskList_li";
					newElemTaskList_li.setAttribute( "id", "posList_taskID_" + task_list.nextId );
					let newElemTaskList_li_input = document.createElement( "input" );
						newElemTaskList_li_input.className = "graphTaskList_li_input";
						
					newElemTaskList_li.appendChild ( newElemTaskList_li_input );
					newElemTaskList_li.appendChild( newElemTaskListBtn );
				graphTaskListUl.appendChild( newElemTaskList_li );

	}
};
displayGraphTaskListUl(); // startup load;

// ADD/ REMOVE persons Zone;;
function openGraphTaskListPersonZone( btnID, taskID ) {
	document.getElementById( btnID ).innerHTML = "X"; // clearing all before creating new; X for onclick=close; 
	document.getElementById( btnID ).value = "X";
	let newElemZone = document.createElement( "div" );
		newElemZone.setAttribute( "id", "graphTaskListPersonZone" );
	let graphTaskListPersonRemoveTitle = document.createElement( "div" );
		graphTaskListPersonRemoveTitle.setAttribute( "id", "graphTaskListPersonRemoveTitle");
		graphTaskListPersonRemoveTitle.textContent = "Assigned personel:"
		newElemZone.appendChild( graphTaskListPersonRemoveTitle );
	let graphTaskListPersonAddTitle = document.createElement( "div" );
		graphTaskListPersonAddTitle.setAttribute( "id", "graphTaskListPersonAddTitle" );
		graphTaskListPersonAddTitle.textContent = "Available personel:"
		newElemZone.appendChild( graphTaskListPersonAddTitle );
		
	let newElemRemoveZone = document.createElement( "div" );
		newElemRemoveZone.setAttribute( "id", "graphTaskListPersonRemove");
	let newElemUlRemove = document.createElement( "ul") ;
		newElemUlRemove.classList.add( "ulClear" );
		newElemUlRemove.setAttribute( "id", "PersonRemove_ul" );
		
	let newElemAddZone = document.createElement("div");
		newElemAddZone.setAttribute( "id", "graphTaskListPersonAdd");
	let newElemUlAdd = document.createElement( "ul" );
		newElemUlAdd.classList.add( "ulClear" );
		newElemUlAdd.setAttribute( "id", "PersonAdd_ul" );	

let sortedTask_listAssignment = [];
for ( let i = 0; i < task_list[ taskID ].assignment.length; i++ ) {
	sortedTask_listAssignment.push(  persons[ task_list[ taskID ].assignment[ i ] ] .lname + " " +persons[ task_list[ taskID ].assignment[ i ] ].fname + " " + task_list[ taskID ].assignment[ i ] );
};
sortedTask_listAssignment.sort();
let regEx = /(.*) (.*) (.*)/;
	for (let i = 0; i < task_list[ taskID ].assignment.length; i++){
		let match = regEx.exec( sortedTask_listAssignment[ i ] );
		
		let newElemLi = document.createElement( "li" );
			newElemLi.textContent = match[2] + " " +match[1];
			newElemLi.classList.add( "graphTaskListPersonRemove_li" );
		let newELemLiBtn = document.createElement( "span" );
			newELemLiBtn.textContent = ">";
			newELemLiBtn.classList.add( "graphTaskListPersonRemoveBtn" );
			newELemLiBtn.classList.add( "btn" );
			newELemLiBtn.addEventListener( "click", function( event ){
				//event.stopImmediatePropagation();
				event.stopPropagation();
				let personIDassaigmentIndex = task_list[ taskID ].assignment.indexOf( match[3] );
				task_list[ taskID ].assignment.splice( personIDassaigmentIndex, 1);
				openGraphTaskListPersonZone( btnID, taskID );
			}, false);
		newElemLi.appendChild( newELemLiBtn );
		newElemUlRemove.appendChild( newElemLi );
	};

/*		
	for (let i = 0; i < task_list[ taskID ].assignment.length; i++){
		//sort;;
		let newElemLi = document.createElement( "li" );
			newElemLi.textContent = persons[ task_list[ taskID ].assignment[ i ] ] .fname + " " +persons[ task_list[ taskID ].assignment[ i ] ].lname;
			newElemLi.classList.add( "graphTaskListPersonRemove_li" );
		let newELemLiBtn = document.createElement( "span" );
			newELemLiBtn.textContent = ">";
			newELemLiBtn.classList.add( "graphTaskListPersonRemoveBtn" );
			newELemLiBtn.classList.add( "btn" );
			newELemLiBtn.addEventListener( "click", function( event ){
				//event.stopImmediatePropagation();
				event.stopPropagation();
				task_list[ taskID ].assignment.splice( i, 1);
				openGraphTaskListPersonZone( btnID, taskID );
			}, false);
		newElemLi.appendChild( newELemLiBtn );
		newElemUlRemove.appendChild( newElemLi );
	};
*/
	newElemRemoveZone.appendChild( newElemUlRemove );
	newElemZone.appendChild( newElemRemoveZone );

	
/*
let zzz = [];
for ( let i = 0; i < Object.keys( persons ).length; i++ ) {
	if ( Object.keys( persons )[ i ] == "nextId" ) { continue; };
	zzz.push(  persons[ Object.keys( persons )[ i ] ].lname + " " + persons[ Object.keys( persons )[ i ] ].fname + " "+ Object.keys( persons )[ i ] );
};
zzz.sort();
console.log( zzz );
let personsSorted = {};
for ( let i = 0; i < zzz.length; i++ ){
	let regEx = /(.*) (.*) (.*)/;
	let match = regEx.exec( zzz[ i ] );
	personsSorted[ match[3] ] = {};
	personsSorted[ match[3] ].fname = match[2];
	personsSorted[ match[3] ].lname = match[1];
};
console.log(personsSorted);
*/
let sortedPersons = [];
for ( let i = 0; i < Object.keys( persons ).length; i++ ) {
	if ( Object.keys( persons )[ i ] == "nextId" ) { continue; };
	sortedPersons.push(  persons[ Object.keys( persons )[ i ] ].lname + " " + persons[ Object.keys( persons )[ i ] ].fname + " "+ Object.keys( persons )[ i ] );
}
sortedPersons.sort();
//	let regEx = /(.*) (.*) (.*)/;
	for ( let i = 0; i < sortedPersons.length; i++) {
		let match = regEx.exec( sortedPersons[ i ] );
		if (  match[3]  == "nextId" ) { continue; };
		if ( task_list[ taskID ].assignment.includes(  match[3] ) == false  ) {
			let newElemLi = document.createElement( "li" );
				newElemLi.textContent = match[2] + " " +match[1];
				newElemLi.classList.add( "graphTaskListPersonAdd_li" );
			let newELemLiBtn = document.createElement( "span" );
				newELemLiBtn.textContent = "<";
				newELemLiBtn.classList.add( "graphTaskListPersonAddBtn" );
				newELemLiBtn.classList.add( "btn" );
			let personIDassaigmentIndex = Object.keys( persons ).indexOf( match[3] );
				newELemLiBtn.addEventListener( "click", function( event ){
					//event.stopImmediatePropagation();
					event.stopPropagation();
					task_list[ taskID ].assignment.push( Object.keys( persons )[ personIDassaigmentIndex ] );
					openGraphTaskListPersonZone( btnID, taskID );
				}, false);

			newElemLi.appendChild( newELemLiBtn );		
			newElemUlAdd.appendChild( newElemLi );
		};
	};


/*
	for ( let i = 0; i < Object.keys( persons ).length; i++) {
		if (  Object.keys( persons )[ i ] == "nextId" ) { continue; };
		if ( task_list[ taskID ].assignment.includes(  Object.keys(persons)[ i ] ) == false  ) {
			let newElemLi = document.createElement( "li" );
				newElemLi.textContent = persons[ Object.keys(persons)[ i ]].fname + " " +persons[Object.keys(persons)[ i ]].lname;
				newElemLi.classList.add( "graphTaskListPersonAdd_li" );
			let newELemLiBtn = document.createElement( "span" );
				newELemLiBtn.textContent = "<";
				newELemLiBtn.classList.add( "graphTaskListPersonAddBtn" );
				newELemLiBtn.classList.add( "btn" );
				newELemLiBtn.addEventListener( "click", function( event ){
					//event.stopImmediatePropagation();
					event.stopPropagation();
					task_list[ taskID ].assignment.push( Object.keys( persons )[ i ] );
				//	assignment [ taskID ].sort(); sort for future;;
					openGraphTaskListPersonZone( btnID, taskID );
				}, false);

			newElemLi.appendChild( newELemLiBtn );		
			newElemUlAdd.appendChild( newElemLi );
		};
	};
*/
// finalizing append :: ul -> AddZone -> Zone -> Button
	newElemAddZone.appendChild( newElemUlAdd );
	newElemZone.appendChild( newElemAddZone );
	newElemZone.addEventListener( "click", function( event ){ event.stopPropagation() });
	document.getElementById( btnID + "Anchor" ).appendChild( newElemZone );
	
	newElemZone.scrollIntoView( {block: "end"} );
};

// Creating graph grid divs + 'drawing' bars
//let graphGrid = document.getElementById("graphGrid"); // initialized at start 'cos of use in colorsSelector - cursorPointer

function displayGraphGrid() {
	document.getElementById( "graphGrid" ).innerHTML = "";
	let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;	
	let rowMatchingSearch = 0;
	
/*	if ( currentColor == "x" ){
		graphGrid.classList.remove( "pointerCursor" );
	} else {
		graphGrid.classList.add( "pointerCursor" );
	};*/
	
	if ( toolBarDateRangeSwitchBtn.value == "1W" ) { // 1W drawing;;
		for ( let row = 0; row < Object.keys( server[ currentDB_1 ] ).length; row++ ){ // loops task * 7 grid
			if ( task_list[ Object.keys( server[ currentDB_1 ] )[ row ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;

				for ( let col = 0; col < 7; col++ ) {
					let rowPos = Object.keys( server[ currentDB_1 ] )[ row ]; // rowPos = "zadanie1"
					let grid = document.createElement("div"); // grid element
					let bar = document.createElement("div"); // grid bar is grid ele. child

					bar.setAttribute("id","posBar_" + rowPos + "_" + col ); // bar.setup
					if  ( server[ currentDB_1 ][rowPos ][col] > 0 ) { bar.className = "bar1W";
						bar.style.backgroundColor = colorsLst[ server[ currentDB_1 ][rowPos ][col] ];
					}; //bar.setup
					grid.appendChild( bar ); // adding bar as grid child

					grid.setAttribute("id","pos_" + rowPos + "_" + col ); //grid.setup.start
					grid.className = "grid1W";
					grid.style.left = col * gridWidth + "px";
					grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

					grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
						if ( currentColor == "x" ) { //skip
						} else if ( currentColor == 0 ) { // when selected color is 0 == clear
							server[ currentDB_1 ][rowPos ][col] = 0;
							document.getElementById("posBar_" + rowPos + "_" + col).className = "";
						} else { // when selected color isn't 0==Clear or x==StopEdit;;
							server[ currentDB_1 ][rowPos ][col] = currentColor;
							document.getElementById("posBar_" + rowPos + "_" + col).className = "bar1W";
							document.getElementById("posBar_" + rowPos + "_" + col).style.backgroundColor = colorsLst[ currentColor ];
						}
						//displayGraphGrid();
					});
				graphGrid.appendChild( grid ); // adding grid>bar to graph zone
				}
			rowMatchingSearch ++;
			}
		}
	} //end 1W if;;

	if ( toolBarDateRangeSwitchBtn.value == "4W" ) { // 4W drawing;;
let DBlist = [ currentDB_1, currentDB_2, currentDB_3, currentDB_4 ]; // DB list for 4W over DB loop;;
		for ( let row = 0; row < Object.keys( server[ currentDB_1 ] ).length; row++ ){ // loop on task  names;;
			if ( task_list[ Object.keys( server[ currentDB_1 ] )[ row ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
				for ( let DBlistNr = 0; DBlistNr < 4; DBlistNr ++ ) { // over 4 weeks DBs loop;;
					for ( let col = 0; col < 7; col++ ) { // 7 days of every DB loop;;
						let rowPos = Object.keys( server[ DBlist[ DBlistNr ] ] )[ row ];
						let grid = document.createElement("div"); // grid element
						let bar = document.createElement("div"); // grid bar is grid ele. child

						bar.setAttribute("id","posBar_" + rowPos + "_" + parseInt( col + 7 * DBlistNr ) ); // bar.setup
						if  ( server[ DBlist[ DBlistNr ] ][rowPos ][col] > 0 ) { bar.className = "bar4W";
							bar.style.backgroundColor = colorsLst[ server[ DBlist[ DBlistNr ] ][rowPos ][col] ];
						}; //bar.setup
						grid.appendChild( bar ); // adding bar as grid child

						grid.setAttribute("id","pos_" + rowPos + "_" + parseInt( col + 7 * DBlistNr ) ); //grid.setup.start
						grid.className = "grid4W";
						grid.style.left = gridWidth * 7 * DBlistNr + col * gridWidth + "px";
						grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

						grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
							if ( currentColor == "x" ) { //skip
							} else if ( currentColor == 0 ) { // when selected color is 0 == clear
								server[ DBlist[ DBlistNr ] ][rowPos ][col] = 0;
								document.getElementById("posBar_" + rowPos + "_" + parseInt( col + 7 * DBlistNr )).className = "";
							} else { // when selected color isn't 0==Clear or x==StopEdit;;
								server[ DBlist[ DBlistNr ] ][rowPos ][col] = currentColor;
								document.getElementById("posBar_" + rowPos + "_" + parseInt( col + 7 * DBlistNr )).className = "bar4W";
								document.getElementById("posBar_" + rowPos + "_" + parseInt( col + 7 * DBlistNr )).style.backgroundColor = colorsLst[ currentColor ];
							}
							displayGraphGrid();
						}); // end listener
					graphGrid.appendChild( grid ); // adding grid>bar to graph zone		
					} // end 7 day loop
				} // end DBs loop
			rowMatchingSearch ++;
			} // end search check loop
		} // end task names loop
		
	} // end of if 4W test;;
	
	
/*	
	if ( toolBarDateRangeSwitchBtn.value == "4W" ) { // 4W drawing;;
		for ( let row = 0; row < Object.keys( server[ currentDB_1 ] ).length; row++ ){ // loops task * 28 grid
			if ( task_list[ Object.keys( server[ currentDB_1 ] )[ row ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;

				for ( let col = 0; col < 7; col++ ) {
					let rowPos = Object.keys( server[ currentDB_1 ] )[ row ]; // rowPos = "zadanie1"
					let grid = document.createElement("div"); // grid element
					let bar = document.createElement("div"); // grid bar is grid ele. child

					bar.setAttribute("id","posBar_" + rowPos + "_" + col ); // bar.setup
					if  ( server[ currentDB_1 ][rowPos ][col] > 0 ) { bar.className = "bar4W";
						bar.style.backgroundColor = colorsLst[ server[ currentDB_1 ][rowPos ][col] ];
					}; //bar.setup
					grid.appendChild( bar ); // adding bar as grid child

					grid.setAttribute("id","pos_" + rowPos + "_" + col ); //grid.setup.start
					grid.className = "grid4W";
					grid.style.left = col * gridWidth + "px";
					grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

					grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
						if ( currentColor == "x" ) { //skip
						} else if ( currentColor == 0 ) { // when selected color is 0 == clear
							server[ currentDB_1 ][rowPos ][col] = 0;
							document.getElementById("posBar_" + rowPos + "_" + col).className = "";
						} else { // when selected color isn't 0==Clear or x==StopEdit;;
							server[ currentDB_1 ][rowPos ][col] = currentColor;
							document.getElementById("posBar_" + rowPos + "_" + col).className = "bar4W";
							document.getElementById("posBar_" + rowPos + "_" + col).style.backgroundColor = colorsLst[ currentColor ];
						}
						displayGraphGrid();
					});
				graphGrid.appendChild( grid ); // adding grid>bar to graph zone
				}
				for ( let col = 0; col < 7; col++ ) {
					let rowPos = Object.keys( server[ currentDB_2 ] )[ row ]; // rowPos = "zadanie1"
					let grid = document.createElement("div"); // grid element
					let bar = document.createElement("div"); // grid bar is grid ele. child

					bar.setAttribute("id","posBar_" + rowPos + "_" + parseInt( col +7 ) ); // bar.setup
					if  ( server[ currentDB_2 ][rowPos ][col] > 0 ) { bar.className = "bar4W";
						bar.style.backgroundColor = colorsLst[ server[ currentDB_2 ][rowPos ][col] ];
					}; //bar.setup
					grid.appendChild( bar ); // adding bar as grid child

					grid.setAttribute("id","pos_" + rowPos + "_" + parseInt( col +7 ) ); //grid.setup.start
					grid.className = "grid4W";
					grid.style.left = gridWidth * 7 + col * gridWidth + "px";
					grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

					grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
						if ( currentColor == "x" ) { //skip
						} else if ( currentColor == 0 ) { // when selected color is 0 == clear
							server[ currentDB_2 ][rowPos ][col] = 0;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +7 )).className = "";
						} else { // when selected color isn't 0==Clear or x==StopEdit;;
							server[ currentDB_2 ][rowPos ][col] = currentColor;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +7 ) ).className = "bar4W";
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +7 ) ).style.backgroundColor = colorsLst[ currentColor ];
						}
						displayGraphGrid();
					});
				graphGrid.appendChild( grid ); // adding grid>bar to graph zone
				}			
				for ( let col = 0; col < 7; col++ ) {
					let rowPos = Object.keys( server[ currentDB_3 ] )[ row ]; // rowPos = "zadanie1"
					let grid = document.createElement("div"); // grid element
					let bar = document.createElement("div"); // grid bar is grid ele. child

					bar.setAttribute("id","posBar_" + rowPos + "_" + parseInt( col +14 ) ); // bar.setup
					if  ( server[ currentDB_3 ][rowPos ][col] > 0 ) { bar.className = "bar4W";
						bar.style.backgroundColor = colorsLst[ server[ currentDB_3 ][rowPos ][col] ];
					}; //bar.setup
					grid.appendChild( bar ); // adding bar as grid child

					grid.setAttribute("id","pos_" + rowPos + "_" + parseInt( col +14 ) ); //grid.setup.start
					grid.className = "grid4W";
					grid.style.left = gridWidth * 14 + col * gridWidth + "px";
					grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

					grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
						if ( currentColor == "x" ) { //skip
						} else if ( currentColor == 0 ) { // when selected color is 0 == clear
							server[ currentDB_3 ][rowPos ][col] = 0;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +14 )).className = "";
						} else { // when selected color isn't 0==Clear or x==StopEdit;;
							server[ currentDB_3 ][rowPos ][col] = currentColor;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +14 )).className = "bar4W";
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +14 )).style.backgroundColor = colorsLst[ currentColor ];
						}
						displayGraphGrid();
					});
				graphGrid.appendChild( grid ); // adding grid>bar to graph zone
				}			
				for ( let col = 0; col < 7; col++ ) {
					let rowPos = Object.keys( server[ currentDB_4 ] )[ row ]; // rowPos = "zadanie1"
					let grid = document.createElement("div"); // grid element
					let bar = document.createElement("div"); // grid bar is grid ele. child

					bar.setAttribute("id","posBar_" + rowPos + "_" + parseInt( col +21 ) ); // bar.setup
					if  ( server[ currentDB_4 ][rowPos ][col] > 0 ) { bar.className = "bar4W";
						bar.style.backgroundColor = colorsLst[ server[ currentDB_4 ][rowPos ][col] ];
					}; //bar.setup
					grid.appendChild( bar ); // adding bar as grid child

					grid.setAttribute("id","pos_" + rowPos + "_" + parseInt( col +21 ) ); //grid.setup.start
					grid.className = "grid4W";
					grid.style.left = gridWidth * 21 + col * gridWidth + "px";
					grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

					grid.addEventListener("click", function (){ // grid listener to manipulate bar.child
						if ( currentColor == "x" ) { //skip
						} else if ( currentColor == 0 ) { // when selected color is 0 == clear
							server[ currentDB_4 ][rowPos ][col] = 0;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +21 )).className = "";
						} else { // when selected color isn't 0==Clear or x==StopEdit;;
							server[ currentDB_4 ][rowPos ][col] = currentColor;
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +21 )).className = "bar4W";
							document.getElementById("posBar_" + rowPos + "_" + parseInt( col +21 )).style.backgroundColor = colorsLst[ currentColor ];
						}
						displayGraphGrid();
					});
				graphGrid.appendChild( grid ); // adding grid>bar to graph zone
				}			
				
			rowMatchingSearch ++;
			}
		}
	} //end 4W if;;
*/
}
//on start displayGraphGrid;;
displayGraphGrid();

// GLOBALS;;
// changing Data Base + if DB don't exist create empty one;;
//DB naming convention: server. + "wgantt" + year + "w" + week_number :: server.wgant2018w36;;
function changeDB() {
	currentDB_1 = "wgantt" + selectedYear.value + "w" + selectedWeek.value;
	if ( !server[ currentDB_1 ] ) {
		server[ currentDB_1 ] = {};
		for ( let i = 0; i < Object.keys( task_list ).length; i++ ) {
			if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
			server[ currentDB_1 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
		};
	};
	
		if ( toolBarDateRangeSwitchBtn.value == "4W" ) {
			for ( let i = 1; i < 4; i++ ) {
				if ( parseInt(selectedWeek.value) + i -1 < parseInt(selectedWeek.lastChild.value) ){
					eval( "currentDB_" + parseInt( i + 1 ) + " = 'wgantt" + selectedYear.value + "w" + parseInt( parseInt(selectedWeek.value) + i) +"'");
				} else if ( parseInt(selectedWeek.value) +i -1 >= parseInt(selectedWeek.lastChild.value) && parseInt(selectedYear.value) < parseInt(selectedYear.lastChild.value)){
					eval( "currentDB_" + parseInt( i + 1 ) + " = 'wgantt" + parseInt( parseInt(selectedYear.value) + 1) + "w" + parseInt(parseInt(selectedWeek.value) +i -1  - parseInt(selectedWeek.value)) + "'" );
				} else {
					eval( "currentDB_" + parseInt( i + 1 ) + " = 'ignore'" );
				};
			}

		if ( !server[ currentDB_2 ] && currentDB_2 != "ignore" ) {
			server[ currentDB_2 ] = {};
			for ( let i = 0; i < Object.keys( task_list ).length; i++ ) {
				if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
				server[ currentDB_2 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
			};
		};
		if ( !server[ currentDB_3 ] && currentDB_3 != "ignore" ) {
			server[ currentDB_3 ] = {};
			for ( let i = 0; i < Object.keys( task_list ).length; i++ ) {
				if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
				server[ currentDB_3 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
			};
		};
		if ( !server[ currentDB_4 ] && currentDB_4 != "ignore" ) {
			server[ currentDB_4 ] = {};
			for ( let i = 0; i < Object.keys( task_list ).length; i++ ) {
				if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
				server[ currentDB_4 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
			};
		};
	}
	
	displayToolBarDateHeadings();
	displayGraphTaskListUl();
	displayGraphGrid();
}


function testBtn() {
	console.log("test: ");
let currentDBzz = "ignore";
if ( currentDBzz != "ignore" ) {console.log("zzz")}
}
//console.log( document.defaultView.getComputedStyle( grid, null ).getPropertyValue("width")  );
/*
let zzz = "poz_zadanie1_2";
let myRegex = /.*_(.*)_(.*)$/;
let match = myRegex.exec( zzz );
console.log( match[1], match[2] );
*/
//let table = server.wgantt2018w36;

//console.log( Object.keys( table )[0] ); // Object.keys( table ).length
// myObj.hasOwnProperty('key')

//delete table.zadanie10; // delete table['zadanie10'];
//table.zadanie60 = [0, 1, 2, 3, 4, 0, 0];