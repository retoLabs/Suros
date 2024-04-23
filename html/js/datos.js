
import {vgApp,goPag}    from '/suros/js/suros_VGlob.js'

import src from '/suros/js/datosSrc.js'
import sess   from '../k1/libK1_Sesion.js'

window.vgApp = vgApp; // import para Ajax
window.goPag = goPag;

function sesionDatosOK(){
//	loadPlantas();
	src.initAppRepo();
	src.getQuienes();
}

function initDatos(){
	sess.validaSesion('usrMenu', sesionDatosOK); // kernel/libK1_sesion.js
}

window.onload = initDatos;
//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis