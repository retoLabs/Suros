
import {vgk}  from '../k1/libK1_Utils.js'

export var vgApp = {
	paramsXHR : {
		fase : 'alfa',
		url : 'http://' + window.location.host + '/suros/',
		base : '/datos',
		otro : '',
		iam : '',
		eco : null
	},
	sqlite : {
		base   : '/shell/sqlite',
		pathDB : 'apps/Suros/sqlite',
		userDB : 'usersSuros.sqlite',
		sessDB : 'sessSuros.sqlite',
		repoDB : 'repoSuros.sqlite',
		notaDB : 'notasSuros.sqlite',
		stmtDB : '',
	},
	cypher : {
		base   : '/shell/cypher',
		pathDB : 'apps/Suros/sqlite',
	},
	encript : {
		base   : '/shell/encript',
	},
	clima : {
		base : '/shell/clima'
	}
}

export function goPag(pag,_id){
	if (vgk.params) var idSess = vgk.params.idSess;
	switch (pag){

		case 'INFO':
			window.open('surosInfo.html','_blank');
			break;

	}
}

