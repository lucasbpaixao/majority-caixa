class Produto{
	
	constructor(id, nome, marca, categoria, preco, quantidade){
		
		this._id = id;
		this._nome = nome;
		this._marca = marca;
		this._categoria = categoria;
		this._preco = preco;
		this._quantidade = quantidade;
	}
	
	set id (id){
		
		this._id = id;
	}
	get id (){
		
		return this._id;
	}
	
	set nome (nome){
		
		this._nome = nome;
	}
	get nome (){
		
		return this._nome;
	}
	
	set marca (marca){
		
		this._marca = marca;
	}
	get marca (){
		
		return this._marca;
	}
	
	set categoria (categoria){
		
		this._categoria = categoria;
	}
	get categoria (){
		
		return this._categoria;
	}
	
	set preco (preco){
		
		this._preco = preco;
	}
	get preco (){
		
		return this._preco;
	}
	
	set quantidade (quantidade){
		
		this._quantidade = quantidade;
	}
	get quantidade (){
		
		return this._quantidade;
	}
}