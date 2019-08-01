class ListaProdutos{
	
	constructor(){
		this._produtos = [];
	}
	
	adiciona(produto){
		this._produtos.push(produto);
	}
	
	produtos(){
		return [].concat(this._produtos);
	}
}