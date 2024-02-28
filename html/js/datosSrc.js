/*
create table quien (
id integer primary key autoincrement,
cod varchar2(5) unique,
nom varchar(20),
ctg varchar(5),
txt varchar(128)
);
*/


import utils  from '../k1/libK1_Utils.js'
import ajax   from '../k1/libK1_Ajax.js'


//------------------------------------------------------------------- Arbol

function ecoQuienesSQL(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	vgApp.lista = new Array();
	filas.map(function(fila){
		vgApp.lista.push(fila);
	})
	console.log('Tabla: '+vgApp.tabla);
	vgApp.appLstEsp.actualiza(filas);
}

function getQuienes(){
	var stmt = "select id,cod,nom,ctg from quien;";
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
}

//------------------------------------------------------------------- DML SQLite Agro
function ecoUpdateFila(xhr){
	alert(xhr.responseText);
}
function updateFila(fila){
	var stmt = "update agro set img='"+fila.img+"' where cod='" + fila.cod+"';";
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
				this.items = items;
				if (items.length) this.idAct = items[0].id0;
			},
			showInfo : function(item){
				if (vgApp.tabla == 'HORTA'){ 
					this.activ = item;
					this.foto = 'img/horta/Viv1-H/'+item.img;
					showInfoEspecie(item.genero,item.especie);
				}
				else if (vgApp.tabla == 'FRUTA'){
					this.activ = item;
					this.foto = 'img/fruta/Viv1-F/'+item.img;
					showInfoEspecie(item.genero,item.especie);
				}
				else{ 
					this.activ = null;
					showInfoEspecie(item.genero,item.especie);
				}
			}
		}
	})
}

export default {initAppRepo,getQuienes}



//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis