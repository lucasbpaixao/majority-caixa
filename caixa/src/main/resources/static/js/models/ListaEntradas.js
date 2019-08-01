class ListaEntradas{
	
	constructor(){
		this._entradas = [];
	}
	
	adiciona(entrada){
		this._entradas.push(entrada);
	}
	
	entradas(){
		return [].concat(this._entradas);
	}
}