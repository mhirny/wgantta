let persons = {
	personID_1: { fname:"Kuba", lname: "Rozpruwacz" },
	personID_2: { fname:"Kubus", lname: "Puchatek" },
	personID_3: { fname: "Jan", lname: "Twardowski" },
	personID_4: { fname:"Pan", lname: "Kleks" },
	personID_5: { fname:"Ula", lname: "Cebula" },
	personID_6: { fname:"Asia", lname: "Kowlska" },
	personID_7: { fname:"Piotr", lname: "Nowak" },
	nextId: 8,
};

// task_list{ taskID: { task_name: ... , assignment: [ personID, ... ] }, }
let task_list = {
	taskID_1: { task_name: "Zadanie1", assignment: [ "personID_1" ] },
	taskID_2: { task_name: "Zadanie2", assignment: [] },
	taskID_3: { task_name: "Zadanie3", assignment: [] },
	taskID_4: { task_name: "Zadanie4", assignment:[ "personID_2", "personID_3", "personID_7" ] },
	taskID_5: { task_name: "Zadanie5", assignment:[ "personID_1", "personID_2", "personID_5", "personID_6" ] },
	taskID_6: { task_name: "Zadanie10", assignment:[ "personID_1", "personID_2", "personID_3", "personID_4", "personID_5", "personID_6", "personID_7" ] },
	taskID_7: { task_name: "Zadanie20", assignment:[ "personID_5" ] },
	taskID_8: { task_name: "Zadanie30", assignment:[ "personID_2", "personID_3" ] },
	taskID_9: { task_name: "Zadanie40", assignment:[] },
	taskID_10: { task_name: "Zadanie50", assignment:[ "personID_4" ] },
	nextId: 11,
};

////
//DB naming convention: server. + "wgantt" + year + "w" + week_number :: server.wgant2018w36;;
let server = {
wgantt2018w1: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 0, 0, 0, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w2: {
	taskID_1: [1, 3, 3, 0, 2, 2, 2],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 1, 1, 1, 1, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [4, 2, 4, 0, 4, 0, 0],
	taskID_7: [2, 2, 0, 2, 2, 0, 2],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w3: {
	taskID_1: [1, 1, 1, 1, 1, 1, 1],
	taskID_2: [0, 0, 0, 1, 0, 0, 1],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 3, 3, 3, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 4, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 2, 3, 2, 0, 3],
	taskID_9: [0, 1, 0, 0, 0, 1, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w4: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 1, 1, 1],
	taskID_4: [0, 0, 2, 0, 1, 0, 1],
	taskID_5: [0, 0, 0, 0, 1, 0, 1],
	taskID_6: [2, 2, 2, 0, 1, 1, 1],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w5: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 1, 2, 3, 4, 3, 2],
	taskID_4: [1, 0, 0, 0, 0, 0, 1],
	taskID_5: [2, 0, 1, 2, 1, 0, 2],
	taskID_6: [3, 2, 2, 0, 0, 0, 3],
	taskID_7: [4, 3, 2, 1, 2, 3, 4],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w36: {
	taskID_1: [1, 0, 0, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 0, 0, 0, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w37: {
	taskID_1: [0, 2, 2, 2, 2, 0, 0],
	taskID_2: [0, 0, 0, 0, 3, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [3, 3, 0, 0, 0, 0, 0],
	taskID_5: [4, 4, 4, 4, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [1, 1, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w38: {
	taskID_1: [0, 2, 2, 2, 2, 0, 0],
	taskID_2: [0, 0, 0, 0, 3, 0, 0],
	taskID_3: [1, 1, 0, 1, 3, 0, 0],
	taskID_4: [0, 0, 0, 0, 0, 0, 0],
	taskID_5: [4, 1, 4, 0, 1, 0, 0],
	taskID_6: [0, 0, 2, 0, 2, 4, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [1, 1, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 3, 3, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 1, 0],
},

wgantt2018w39: {
	taskID_1: [0, 0, 0, 0, 0, 0, 1],
	taskID_2: [0, 0, 0, 0, 3, 0, 1],
	taskID_3: [0, 1, 0, 1, 3, 0, 1],
	taskID_4: [3, 3, 0, 0, 1, 1, 0],
	taskID_5: [3, 3, 3, 3, 3, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 4, 4, 0, 0],
	taskID_8: [1, 1, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},

wgantt2018w48: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 0, 0, 0, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w49: {
	taskID_1: [1, 3, 3, 0, 2, 2, 2],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 1, 1, 1, 1, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [4, 2, 4, 0, 4, 0, 0],
	taskID_7: [2, 2, 0, 2, 2, 0, 2],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w50: {
	taskID_1: [1, 1, 1, 1, 1, 1, 1],
	taskID_2: [0, 0, 0, 1, 0, 0, 1],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 3, 3, 3, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 4, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 2, 3, 2, 0, 3],
	taskID_9: [0, 1, 0, 0, 0, 1, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w51: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 1, 1, 1],
	taskID_4: [0, 0, 2, 0, 1, 0, 1],
	taskID_5: [0, 0, 0, 0, 1, 0, 1],
	taskID_6: [2, 2, 2, 0, 1, 1, 1],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2018w52: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 1, 2, 3, 4, 3, 2],
	taskID_4: [1, 0, 0, 0, 0, 0, 1],
	taskID_5: [2, 0, 1, 2, 1, 0, 2],
	taskID_6: [3, 2, 2, 0, 0, 0, 3],
	taskID_7: [4, 3, 2, 1, 2, 3, 4],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},

wgantt2019w1: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 0, 0, 0, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 0, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2019w2: {
	taskID_1: [1, 3, 3, 0, 2, 2, 2],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 1, 1, 1, 1, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [4, 2, 4, 0, 4, 0, 0],
	taskID_7: [2, 2, 0, 2, 2, 0, 2],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2019w3: {
	taskID_1: [1, 1, 1, 1, 1, 1, 1],
	taskID_2: [0, 0, 0, 1, 0, 0, 1],
	taskID_3: [0, 0, 0, 0, 0, 0, 0],
	taskID_4: [0, 0, 3, 3, 3, 0, 0],
	taskID_5: [0, 0, 0, 0, 0, 0, 0],
	taskID_6: [2, 2, 2, 0, 4, 0, 0],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 2, 3, 2, 0, 3],
	taskID_9: [0, 1, 0, 0, 0, 1, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2019w4: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 0, 0, 0, 1, 1, 1],
	taskID_4: [0, 0, 2, 0, 1, 0, 1],
	taskID_5: [0, 0, 0, 0, 1, 0, 1],
	taskID_6: [2, 2, 2, 0, 1, 1, 1],
	taskID_7: [0, 0, 0, 0, 0, 0, 0],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},
wgantt2019w5: {
	taskID_1: [1, 2, 3, 0, 0, 0, 0],
	taskID_2: [0, 0, 0, 0, 0, 0, 0],
	taskID_3: [0, 1, 2, 3, 4, 3, 2],
	taskID_4: [1, 0, 0, 0, 0, 0, 1],
	taskID_5: [2, 0, 1, 2, 1, 0, 2],
	taskID_6: [3, 2, 2, 0, 0, 0, 3],
	taskID_7: [4, 3, 2, 1, 2, 3, 4],
	taskID_8: [0, 0, 0, 3, 3, 0, 3],
	taskID_9: [0, 0, 0, 0, 0, 0, 0],
	taskID_10: [0, 1, 2, 3, 4, 0, 0],
},

};