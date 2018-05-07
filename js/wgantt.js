let currentDB = {
  db1: "wgantt2018w1",
  db2: "",
  db3: "",
  db4: ""
};
let colorsLst = [ "Yellow", "Blue", "Gray", "Orange", "Red" ];
let currentColor = 1;

let gridWidth = 100;
let gridHeight = 40;
let docfrag = new DocumentFragment();

let graphGrid = document.getElementById("graphGrid");

// HEADER ;;
//add Person ;; addPersonInput -> persons{}
let addPersonBtn = document.getElementById("addPersonBtn");
let addPersonInput = document.getElementById("addPersonInput");
addPersonBtn.addEventListener( "click", addPerson );
addPersonInput.addEventListener( "keypress", function ( e ) {
  if ( e.keyCode == 13) { addPerson(); }
});

function addPerson () {
  let addPersonInputVal = document.getElementById("addPersonInput").value;
  let myRegex = /([^a-zA-Z]*)([a-zA-Z]+) +([a-zA-Z]+)(\-[a-zA-Z]+)*([^a-zA-Z]*)$/;
  let match = myRegex.exec( addPersonInputVal );
  if ( match != null  && match[1]=="" && match[2].length > 0 && match[3].length > 0 && match[5]=="") {
    let firstName = match[ 2 ];
    let lastName = match[ 3 ];
    let lastNameDoublePart = match[ 4 ];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    if ( lastNameDoublePart !== undefined ){
      lastName += "-" + lastNameDoublePart.charAt(1).toUpperCase() + lastNameDoublePart.slice(2).toLowerCase();
    };
    persons[ "personID_" + persons.nextId ] = {};
    persons[ "personID_" + persons.nextId ].fname = firstName;
    persons[ "personID_" + persons.nextId ].lname = lastName;
    persons.nextId++;
    document.getElementById("addPersonInput").value = ""; // clearing input field after successful add;
    loadPersonSelect();
    displayGraphTaskListUl();
  } else {
    alert("Wrong Name!");
  };
};

//load Personel info ;; persons{} -> removePersonSelect
let removePersonSelect = document.getElementById( "removePersonSelect" );
function loadPersonSelect () {
  removePersonSelect.innerHTML = ""; // clearing select before appending new content;
  for ( let i = 0, j = Object.keys( persons ).length; i < j; i++ ) {
    if ( Object.keys( persons )[ i ] == "nextId" ) { continue; };
    let newElem = document.createElement("option");
    let id = Object.keys( persons )[ i ]; // persons ID;
    newElem.text = persons[ id ].fname + " " + persons[ id ].lname;
    newElem.value = id;
    docfrag.appendChild( newElem );
  }
  removePersonSelect.appendChild( docfrag );
};

// remove Personel ;; removePersonBtn -delete-> persons{};
removePersonBtn = document.getElementById("removePersonBtn");
removePersonBtn.addEventListener("click", function () {
  for ( i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {	// removing removed person from all task_list.[task_id].assignment;;
    if ( Object.keys( task_list )[ i ] == "nextId" ) {
      continue
    }
    arr = task_list[ Object.keys( task_list )[ i ] ].assignment;
    IdIndexInArr = arr.indexOf( removePersonSelect.value );
    if ( IdIndexInArr >= 0 ) {
      arr.splice( IdIndexInArr, 1 );
    }
  }
  delete persons[ removePersonSelect.value ];
  loadPersonSelect();
  displayGraphTaskListUl();
});

// loading colors ;; colorsLst -> colorSelect.
function displayColorsSelect () {
  let colorsSelect = document.getElementById( "colorsSelect" );
  let newElemDel = document.createElement( "div" ); // DELETE color;;
  newElemDel.className = "colorsBtn";
  newElemDel.setAttribute( "id", "colorS0" );
  newElemDel.style.left = "20px";
  //newElemDel.style.backgroundColor = "f1f1f1";//colorsLst[ 0 ];
  let newElemImgDel = document.createElement( "img" );
  newElemImgDel.setAttribute( "src", "img/TrashBinT.png" );
  newElemDel.appendChild( newElemImgDel );
  newElemDel.addEventListener( "click", function () {
    document.getElementById( `colorS${currentColor}` ).classList.remove( "colorsBtnSelected" );
    newElemDel.classList.add( "colorsBtnSelected" );
    graphGrid.classList.add( "pointerCursor" );
    currentColor = 0;
  });
  if ( currentColor == 0 ) {
    newElemDel.classList.add( "colorsBtnSelected" );
    graphGrid.classList.add( "pointerCursor" );
  }
  colorsSelect.appendChild( newElemDel );

  for ( let i = 1, j = colorsLst.length; i < j; i++ ) { // Standard colors;;
    let newElem = document.createElement( "div" );
    newElem.className = "colorsBtn";
    newElem.setAttribute( "id", `colorS${i}` );
    newElem.style.left = ( i * 40 + 20 ) +"px";
    newElem.style.backgroundColor = colorsLst[ i ];
    newElem.addEventListener( "click", function () {
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
  newElemStop.addEventListener( "click", function () {
    document.getElementById( `colorS${currentColor}`).classList.remove( "colorsBtnSelected" );
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

// TOOL BAR ;;
// Add Task;;
let toolBarAddTaskBtn = document.getElementById( "toolBarAddTaskBtn" );
toolBarAddTaskBtn.addEventListener( "click", openToolBarAddTaskConsole );
function openToolBarAddTaskConsole () {
  if ( toolBarAddTaskBtn.textContent == "Edit tasks" ) {
    toolBarAddTaskBtn.textContent = "Close edit";
    displayGraphTaskListUl();
  } else {
    toolBarAddTaskBtn.textContent = "Edit tasks";
    displayGraphTaskListUl();
  }
};

// Search/Filter input;;
let toolBarTaskSearchInput = document.getElementById( "toolBarTaskSearchInput" );
toolBarTaskSearchInput.addEventListener( "keyup", function () {
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
    changeDB();
  } else {
    toolBarDateRangeSwitchBtn.value = "1W";
    toolBarDateRangeSwitch1W.className = "toolBarDateRangeSwitchTextBig";
    toolBarDateRangeSwitch4W.className = "toolBarDateRangeSwitchTextSmall";
    changeDB();
  }
});

let selectedYear = document.getElementById( "selectedYear" );
let selectedMonth = document.getElementById( "selectedMonth" );
let selectedWeek = document.getElementById( "selectedWeek" );

//PREV. btn;;
let toolBarPreviousBtn = document.getElementById("toolBarPreviousBtn");
toolBarPreviousBtn.addEventListener( "click", function () {
  if ( selectedWeek.value == 1 ) {
    for ( i = 0, j = selectedYear.options.length; i < j; i++ ) {
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
    for ( i = 0, j = selectedYear.options.length; i < j; i++ ) {
      if ( selectedYear.options[ i ].value ==  parseInt(selectedYear.value) + 1 ) {
        selectedYear.value = parseInt(selectedYear.value) + 1;
        selectedWeek.value = 1;
        calculateWeeks();
        calculateMonthFromWeeks();
        changeDB();
        break; // break for loop;;
      }
    }
  } else if ( parseInt(selectedWeek.value) < parseInt(selectedWeek.lastChild.value) ) {
            selectedWeek.value = parseInt(selectedWeek.value) + 1;
            calculateMonthFromWeeks();
            changeDB();
  }
});

// Date select load;;

function getFirstWeekStart ( year ) {
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
selectedMonth.addEventListener( "change", function () {
  let yearFirstWeek = getFirstWeekStart( selectedYear.value );
  let dateFromSelect = new Date( selectedYear.value, selectedMonth.value );

  let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  let diffDays = Math.round(Math.abs((dateFromSelect.getTime() - yearFirstWeek.getTime()) / (oneDay) ));
  let onChangeNewWeek = 1 + Math.round( diffDays / 7 );
  selectedWeek.value = onChangeNewWeek;
  selectedMonth.blur();
  changeDB();
});

function calculateMonthFromWeeks () {
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
  }
};

//number of Weeks;;
  // checking number of weeks in year;;
function calculateWeeks () {
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
  }
  //// setting number of weeks -> selectedWeek;;
  for ( let i = 1; i <= numberOfWeeks; i++ ) {
    let newElemOption = document.createElement( "option" );
    newElemOption.value = i;
    newElemOption.textContent =  i;
    docfrag.appendChild( newElemOption );
  };
  selectedWeek.appendChild( docfrag );
  // listener: change selectMonth based on change to selectWeek;;
  selectedWeek.addEventListener( "change", function () {
    calculateMonthFromWeeks();
    // selectWeek blur() on change;;
    selectedWeek.blur();
    changeDB();
  });
}

let toolBarDateHeadings = document.getElementById("toolBarDateHeadings");
function displayToolBarDateHeadings () {
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
        let dateFromSelect = new Date(  thisYearFirstWeekDay.getFullYear(), thisYearFirstWeekDay.getMonth(),
            ( thisYearFirstWeekDay.getDate() + 7 * selectedWeek.value - 7 + i )  );

      let headMonth = parseInt(dateFromSelect.getMonth() +1);
      let headDay =  dateFromSelect.getDate();
        if ( headMonth < 10 ) { headMonth = `0${headMonth}` };
        if ( headDay <10 ) { headDay = `0${headDay}` };
      //newElemDiv.innerHTML = parseInt(dateFromSelect.getMonth() +1) + " / " + dateFromSelect.getDate();
      newElemDiv.textContent = `${headDay} / ${headMonth}`;
      docfrag.appendChild( newElemDiv );
    };
  }
  if ( toolBarDateRangeSwitchBtn.value == "4W" ) {
    for ( let i = 0; i < 28; i++ ) {
      let newElemDiv = document.createElement("div");
      newElemDiv.className = "toolBarDateHeading4W";
      newElemDiv.style.left = i * (gridWidth / 4) + "px";

      let yearFromSelect = new Date( selectedYear.value, 0, 1) ;
      let firstDayOYear = yearFromSelect.getDay();
      let thisYearFirstWeekDay = yearFromSelect;
        if (firstDayOYear <= 4) {
          thisYearFirstWeekDay.setDate( yearFromSelect.getDate() - firstDayOYear + 1 );
        } else {
          thisYearFirstWeekDay.setDate( yearFromSelect.getDate() + 8 - firstDayOYear );
        }
        let dateFromSelect = new Date(  thisYearFirstWeekDay.getFullYear(), thisYearFirstWeekDay.getMonth(),
            ( thisYearFirstWeekDay.getDate() + 7 * selectedWeek.value - 7 + i )  );

      let headDay =  dateFromSelect.getDate();
        if ( headDay <10 ) { headDay = `0${headDay}` };
      newElemDiv.textContent = headDay;
      docfrag.appendChild( newElemDiv );

    };
  }
  toolBarDateHeadings.appendChild( docfrag );
};

// GRAPH ZONE ;;
// loading task-list items;; server[ currentDB.db1 ][] -> graphTaskListUl
let graphTaskListUl = document.getElementById("graphTaskListUl");
function displayGraphTaskListUl () {
  while (graphTaskListUl.hasChildNodes()) {
    graphTaskListUl.removeChild(graphTaskListUl.lastChild);
  }
  //graphTaskListUl.innerHTML = "";
  if ( toolBarAddTaskBtn.textContent == "Edit tasks" ) {
    let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;
    for ( let i = 0, j = Object.keys( server[ currentDB.db1 ] ).length; i < j; i++) {

      if ( task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].task_name.toLowerCase()
          .indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
        let btnID = Object.keys( server[ currentDB.db1 ] )[ i ] + "_btn";
        let newElemTaskListBtn = document.createElement( "span" );
        newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
        newElemTaskListBtn.setAttribute( "id", btnID );
        newElemTaskListBtn.textContent = task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].assignment.length;
        newElemTaskListBtn.addEventListener("click", function ( event ) {
          if ( newElemTaskListBtn.value == "X" ) {
            displayGraphTaskListUl();
          } else{
            displayGraphTaskListUl();
            openGraphTaskListPersonZone( btnID, Object.keys( server[ currentDB.db1 ] )[ i ] );
          }
        });

        let newElemTaskListAnchor = document.createElement( "span" );
        newElemTaskListAnchor.setAttribute( "id", btnID + "Anchor" );
        newElemTaskListAnchor.classList.add( "graphTaskListAnchor" );

        let newElemTaskList_li = document.createElement( "li" );
        newElemTaskList_li.className = "graphTaskList_li";
        newElemTaskList_li.setAttribute( "id", `posList_${Object.keys( server[ currentDB.db1 ] )[ i ]}` );
        newElemTaskList_li.textContent = task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].task_name;
        newElemTaskList_li.appendChild( newElemTaskListBtn );
        newElemTaskList_li.appendChild( newElemTaskListAnchor );
        docfrag.appendChild( newElemTaskList_li );
      }
    }
  graphTaskListUl.appendChild( docfrag );
  } // end of if edit task
  if ( toolBarAddTaskBtn.textContent == "Close edit" ) {
    let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;
    for ( let i = 0, j = Object.keys( server[ currentDB.db1 ] ).length; i < j; i++) {
      if ( task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].task_name.toLowerCase().indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
        let btnID = Object.keys( server[ currentDB.db1 ] )[ i ] + "_btn";
        let newElemTaskListBtn = document.createElement( "span" );
        newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
        newElemTaskListBtn.setAttribute( "id", btnID );
        newElemTaskListBtn.textContent = "DEL";
        newElemTaskListBtn.style.backgroundColor = 'red';
        newElemTaskListBtn.addEventListener("click", function ( event ) {
          //make delete on whole DB && task_list;; #delDB
          let taskIdToDelete = Object.keys( server[ currentDB.db1 ] )[ i ] ;
          for ( let i = 0, j = Object.keys( server ).length; i < j; i++ ) {
            delete server[  Object.keys( server )[ i ] ][ taskIdToDelete ];
          }
          delete task_list[ taskIdToDelete ];
          displayGraphTaskListUl();
          displayGraphGrid();
        });
        let newElemTaskList_li = document.createElement( "li" );
        newElemTaskList_li.className = "graphTaskList_li";
        newElemTaskList_li.style.backgroundColor = '#f1f1f1';
        newElemTaskList_li.setAttribute( "id", `posList_${Object.keys( server[ currentDB.db1 ] )[ i ]}` );
        let newElemTaskList_li_input = document.createElement( "input" );
        newElemTaskList_li_input.value = task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].task_name;
        newElemTaskList_li_input.className = "graphTaskList_li_input";
        newElemTaskList_li_input.addEventListener( "change", function () { //saving renames;;
          task_list[ Object.keys( server[ currentDB.db1 ] )[ i ] ].task_name = newElemTaskList_li_input.value;
        });

        newElemTaskList_li.appendChild ( newElemTaskList_li_input );
        newElemTaskList_li.appendChild( newElemTaskListBtn );
        docfrag.appendChild( newElemTaskList_li );
      }
    }
    graphTaskListUl.appendChild( docfrag );
    //add New Task;;
    //let newElemTaskList_li_new = document.createElement( "" );
    let btnID = `taskID_${task_list.nextId}_btn`;
    let newElemTaskListBtn = document.createElement( "span" );
    newElemTaskListBtn.classList.add( "graphTaskListBtn", "btn" );
    newElemTaskListBtn.setAttribute( "id", btnID );
    newElemTaskListBtn.textContent = "ADD";
    newElemTaskListBtn.style.backgroundColor = 'lightgreen';
    newElemTaskListBtn.addEventListener("click", function ( event ) {
      let isNameProper = "yes";
      if ( newElemTaskList_li_input.value == "" ) {
        isNameProper = "no";
        alert("Task must have name")
      } else {
        for ( let i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {
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
        for ( let i = 0, j = Object.keys( server ).length; i < j; i++ ) {
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
    newElemTaskList_li.style.backgroundColor = '#f1f1f1';
    let newElemTaskList_li_input = document.createElement( "input" );
    newElemTaskList_li_input.className = "graphTaskList_li_input";
        
    newElemTaskList_li.appendChild ( newElemTaskList_li_input );
    newElemTaskList_li.appendChild( newElemTaskListBtn );
    graphTaskListUl.appendChild( newElemTaskList_li );
  }
};

// ADD/ REMOVE persons Zone;;
function openGraphTaskListPersonZone ( btnID, taskID ) {
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
  for ( let i = 0, j = task_list[ taskID ].assignment.length; i < j; i++ ) {
    let personID =  task_list[ taskID ].assignment[ i ];
    sortedTask_listAssignment.push( `${persons[ personID ].lname} ${persons[ personID ].fname} ${personID}` );
  }
  sortedTask_listAssignment.sort();
  let regEx = /(.*) (.*) (.*)/;
  for ( let i = 0, j = task_list[ taskID ].assignment.length; i < j; i++ ) {
    let match = regEx.exec( sortedTask_listAssignment[ i ] );

    let newElemLi = document.createElement( "li" );
    newElemLi.textContent = `${match[2]} ${match[1]}`;
    newElemLi.classList.add( "graphTaskListPersonRemove_li" );
    let newELemLiBtn = document.createElement( "span" );
    newELemLiBtn.textContent = ">";
    newELemLiBtn.classList.add( "graphTaskListPersonRemoveBtn" );
    newELemLiBtn.classList.add( "btn" );
    newELemLiBtn.addEventListener( "click", function ( event ) {
      //event.stopImmediatePropagation();
      event.stopPropagation();
      let personIDassaigmentIndex = task_list[ taskID ].assignment.indexOf( match[3] );
      task_list[ taskID ].assignment.splice( personIDassaigmentIndex, 1);
      openGraphTaskListPersonZone( btnID, taskID );
    }); // false;
    newElemLi.appendChild( newELemLiBtn );
    newElemUlRemove.appendChild( newElemLi );
  };

  newElemRemoveZone.appendChild( newElemUlRemove );
  newElemZone.appendChild( newElemRemoveZone );

  let sortedPersons = [];
  for ( let i = 0, j = Object.keys( persons ).length; i < j; i++ ) {
    if ( Object.keys( persons )[ i ] == "nextId" ) { continue; };
    let personID = Object.keys( persons )[ i ];
    sortedPersons.push( `${persons[ personID ].lname} ${persons[ personID ].fname} ${personID}` );
  }
  sortedPersons.sort();
  //	let regEx = /(.*) (.*) (.*)/;
  for ( let i = 0, j = sortedPersons.length; i < j; i++) {
    let match = regEx.exec( sortedPersons[ i ] );
    if (  match[3]  == "nextId" ) { continue; };
    if ( task_list[ taskID ].assignment.includes(  match[3] ) == false  ) {
      let newElemLi = document.createElement( "li" );
      newElemLi.textContent = `${match[2]} ${match[1]}`;
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

  // finalizing append :: ul -> AddZone -> Zone -> Button
  newElemAddZone.appendChild( newElemUlAdd );
  newElemZone.appendChild( newElemAddZone );
  newElemZone.addEventListener( "click", function( event ){ event.stopPropagation() });
  document.getElementById( btnID + "Anchor" ).appendChild( newElemZone );

  newElemZone.scrollIntoView( {block: "end"} );
};

// Creating graph grid divs + 'drawing' bars
//let graphGrid = document.getElementById("graphGrid"); // initialized at start 'cos of use in colorsSelector - cursorPointer

function displayGraphGrid () {
  document.getElementById( "graphGrid" ).innerHTML = "";
  let toolBarTaskSearchInput_value = document.getElementById( "toolBarTaskSearchInput" ).value;	
  let rowMatchingSearch = 0;

  if ( toolBarDateRangeSwitchBtn.value == "1W" ) { // 1W drawing;;
    for ( let row = 0, i = Object.keys( server[ currentDB.db1 ] ).length; row < i; row++ ) { // loops task * 7 grid
      if ( task_list[ Object.keys( server[ currentDB.db1 ] )[ row ] ].task_name.toLowerCase()
          .indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;

        for ( let col = 0; col < 7; col++ ) {
          let rowPos = Object.keys( server[ currentDB.db1 ] )[ row ]; // rowPos = "zadanie1"
          let grid = document.createElement("div"); // grid element
          let bar = document.createElement("div"); // grid bar is grid ele. child

          bar.setAttribute("id",`posBar_${rowPos}_${col}` ); // bar.setup
          if  ( server[ currentDB.db1 ][rowPos ][col] > 0 ) { bar.className = "bar1W";
            bar.style.backgroundColor = colorsLst[ server[ currentDB.db1 ][rowPos ][col] ];
          }; //bar.setup
          grid.appendChild( bar ); // adding bar as grid child

          grid.setAttribute('id',`pos_${rowPos}_${col}` ); //grid.setup.start
          grid.className = "grid1W";
          grid.style.left = col * gridWidth + "px";
          grid.style.top = rowMatchingSearch * gridHeight + "px"; //grid.setup.end;;

          grid.addEventListener("click", function () { // grid listener to manipulate bar.child
            if ( currentColor == "x" ) { //skip
            } else if ( currentColor == 0 ) { // when selected color is 0 == clear
              server[ currentDB.db1 ][rowPos ][col] = 0;
              document.getElementById(`posBar_${rowPos}_${col}`).className = "";
            } else { // when selected color isn't 0==Clear or x==StopEdit;;
              server[ currentDB.db1 ][rowPos ][col] = currentColor;
              document.getElementById(`posBar_${rowPos}_${col}`).className = "bar1W";
              document.getElementById(`posBar_${rowPos}_${col}`).style.backgroundColor = colorsLst[ currentColor ];
            }
            //displayGraphGrid();
          });
        graphGrid.appendChild( grid ); // adding grid>bar to graph zone
        }
      rowMatchingSearch ++;
      }
    }
  } //end 1W if;;
  /* 4W loop: for every 'task_list{taskID{task_name} }', loop for every week database (x4) 'curentDB{DBname}',
  and loop 7 days in each week (display grid+bar) + color from 'server{DBname{taskID[for_day_color_number]} }; */
  if ( toolBarDateRangeSwitchBtn.value == "4W" ) {
    for ( let row = 0, i = Object.keys( server[ currentDB.db1 ] ).length; row < i; row++ ) { // loop on task names;;
      if ( task_list[ Object.keys( server[ currentDB.db1 ] )[ row ] ].task_name.toLowerCase()
          .indexOf( toolBarTaskSearchInput_value.toLowerCase() ) >=0  ) { // search check;;
        for ( let DBnbr = 1; DBnbr <= 4; DBnbr ++ ) { // loop over 4 weeks; currentDB{} names;;
          if ( currentDB[ `db${DBnbr}` ] == 'ignore' ) { continue };
          for ( let col = 0; col < 7; col++ ) { // 7 days of every DB loop;;
            let rowPos = Object.keys( server[ currentDB[ `db${DBnbr}` ] ] )[ row ];
            let grid = document.createElement("div");
            let bar = document.createElement("div");

            bar.setAttribute("id",`posBar_${rowPos}_${parseInt( col + 7 * (DBnbr -1))}` );
            if  ( server[ currentDB[ `db${DBnbr}` ] ][rowPos ][col] > 0 ) {
              bar.className = "bar4W";
              bar.style.backgroundColor = colorsLst[ server[ currentDB[ `db${DBnbr}` ] ][rowPos ][col] ];
            };
            grid.appendChild( bar );

            grid.setAttribute("id",`pos_${rowPos}_${parseInt( col + 7 * (DBnbr -1))}` );
            grid.className = "grid4W";
            // grid.style.left == DBloop * 7days * gridWidth  +  CurrentDBday(= col) * gridWidth 
            grid.style.left = (gridWidth / 4) * 7 * (DBnbr - 1) + col * (gridWidth / 4) + "px";
            grid.style.top = rowMatchingSearch * gridHeight + "px";

            grid.addEventListener("click", function () { // grid listener to manipulate child( 'bar' )
              if ( currentColor == "x" ) { // if selected color is x == ignore color changes input == skip
              } else if ( currentColor == 0 ) { // when selected color is 0 == clear / delete
                server[ currentDB[ `db${DBnbr}` ] ][rowPos ][col] = 0;
                document.getElementById(`posBar_${rowPos}_${parseInt( col + 7 * (DBnbr -1))}`).className = "";
              } else { // when selected color isn't 0 == Clear or x == StopEdit;; == change color;;
                server[ currentDB[ `db${DBnbr}` ] ][rowPos ][col] = currentColor;
                document.getElementById(`posBar_${rowPos}_${parseInt( col + 7 * (DBnbr -1))}`).className = "bar4W";
                document.getElementById(`posBar_${rowPos}_${parseInt( col + 7 * (DBnbr -1))}`).style.backgroundColor = colorsLst[ currentColor ];
              }
              //displayGraphGrid();
            }); // end listener
          graphGrid.appendChild( grid ); // adding grid>bar to graph zone		
          } // end 7 day loop
        } // end DBs loop
      rowMatchingSearch ++;
      } // end search check loop
    } // end task names loop

  } // end of if 4W test;;

}

// GLOBALS;;
// changing Data Base + if DB don't exist create new 0-ed;;
// DB naming convention: server."wgantt" + year + "w" + week_number :: server.wgant2018w36;;
function changeDB () {
  currentDB.db1 = `wgantt${selectedYear.value}w${selectedWeek.value}`;
  if ( !server[ currentDB.db1 ] ) {
    server[ currentDB.db1 ] = {};
    for ( let i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {
      if ( Object.keys( task_list)[ i ] == "nextId" ) { continue }
      server[ currentDB.db1 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
    }
  }

  if ( toolBarDateRangeSwitchBtn.value == "4W" ) {
    let sWeekValue = parseInt(selectedWeek.value);
    let sWeekLastChildValue = parseInt(selectedWeek.lastChild.value);
    let difference = sWeekLastChildValue - sWeekValue;
    for ( let i = 1; i < 4; i++ ) {
      if ( sWeekValue + i <= sWeekLastChildValue ){
        currentDB[ `db${i + 1}` ] = `wgantt${selectedYear.value}w${sWeekValue + i}`;
      } else if ( sWeekValue + i > sWeekLastChildValue &&
          selectedYear.value < parseInt(selectedYear.lastChild.value)){
        currentDB[ `db${i + 1}`] = `wgantt${parseInt(selectedYear.value) + 1}w${i - difference}`;
      } else {
        currentDB[ `db${i + 1}` ] = 'ignore';
      };
    }

  // in 4weeks mode: if data-base dont exist && is not set to 'ignore' ( as out of range ) create new 0-ed data-base;;
    if ( !server[ currentDB.db2 ] && currentDB.db2 != "ignore" ) {
      server[ currentDB.db2 ] = {};
      for ( let i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {
        if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
        server[ currentDB.db2 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
      }
    };
    if ( !server[ currentDB.db3 ] && currentDB.db3 != "ignore" ) {
      server[ currentDB.db3 ] = {};
      for ( let i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {
        if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
        server[ currentDB.db3 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
      }
    };
    if ( !server[ currentDB.db4 ] && currentDB.db4 != "ignore" ) {
      server[ currentDB.db4 ] = {};
      for ( let i = 0, j = Object.keys( task_list ).length; i < j; i++ ) {
        if ( Object.keys( task_list)[ i ] == "nextId" ) { continue };
        server[ currentDB.db4 ][ Object.keys( task_list)[ i ] ] = [0, 0, 0, 0, 0, 0, 0];
      }
    };
  };

  displayToolBarDateHeadings();
  displayGraphTaskListUl();
  displayGraphGrid();
}

(function init () {
  loadPersonSelect();
  displayColorsSelect();
  calculateWeeks();
  displayToolBarDateHeadings();
  displayGraphTaskListUl();
  displayGraphGrid();
})();