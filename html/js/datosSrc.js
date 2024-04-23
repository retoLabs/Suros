/*
create table quien (
id integer primary key autoincrement,
cod varchar2(5) unique,
nom varchar(20),
ctg varchar(5),
txt varchar(128)
);

create table canjes (
id integer primary key autoincrement,
cod varchar2(5),
mmjj varchar2(5),
tipo varcahr2(5),
num integer,
std integer,
sint integer,
cava integer,
txt varcha2(128),
FOREIGN KEY (cod) REFERENCES quien (cod) 
);
*/


import utils  from '../k1/libK1_Utils.js'
import ajax   from '../k1/libK1_Ajax.js'


//------------------------------------------------------------------- Quienes

function ecoQuienesSQL(xhr){
   var filas = utils.csv2filas(xhr.responseText);
 	vgApp.appLstEsp.actualiza(filas);
}

function getQuienes(){
	var stmt = "select * from quien;";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.repoDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoQuienesSQL; 

	ajax.ajaxCmdShell(params,body);
	return 0;
}

//------------------------------------------------------------------- Canjes

function ecoCanjesSQL(xhr){
   var filas = utils.csv2filas(xhr.responseText);
 	vgApp.appCanjes.actualiza(filas);
}

function getCanjes(cod){
	var stmt = "select * from canjes where cod='"+cod+"';";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.repoDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoCanjesSQL; 

	ajax.ajaxCmdShell(params,body);
	return 0;
}

//------------------------------------------------------------------- DML SQLite 
function ecoUpdateFila(xhr){
	console.log(xhr.responseText);
}
function updateFila(fila){
	console.log(utils.o2s(fila));
	var stmt = "update quien set nom='"+fila.nom+"'";
	stmt +=",cod='"+fila.cod+"'";
	stmt +=",ctg='"+fila.ctg+"'";
	stmt +=",txt='"+fila.txt+"'";
	stmt+= " where id='" + fila.id+"';";

	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : vgApp.sqlite.repoDB,
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoUpdateFila; 

	ajax.ajaxCmdShell(params,body);
}

function initAppRepo(){
	vgApp.appLstEsp = new Vue({
		el: '#lstEsp',
			data: {
				items: [],
				activ: null,
				foto: null,
			},
		methods : {
			update : function(item){
				updateFila(item);
			},
			actualiza : function(items){
				console.log('items:', items.length);
				this.items = items;
				if (items.length) this.idAct = items[0].id0;
			},
			showInfo : function(item){
				this.activ = item;
				getCanjes(item.cod);
			}
		}
	})

	vgApp.appCanjes = new Vue({
		el: "#canjes",
		data: {
			items: [],
			activ: null
		},
		methods : {
			update : function(item){
				updateFila(item);
			},
			actualiza : function(items){
				console.log('items:', items.length);
				this.items = items;
				if (items.length) this.idAct = items[0].id0;
			},
			showInfo : function(item){
				this.activ = item;
//				alert(item.cod);
			}
		}

})

}

export default {initAppRepo,getQuienes}



//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis