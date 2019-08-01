class Entrada{
	constructor(idProduto, quantidade){
		this._produto = new Produto(idProduto);
		this._quantidade = quantidade;
	}
	
	get quantidade(){
		return this._quantidade;
	}
	
	get produto(){
		return this._produto;
	}
}