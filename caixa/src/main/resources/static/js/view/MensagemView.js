class MensagemView{
	
	constructor(elemento){
		this._elemento = elemento;
	}
	
	template(model, tipo){
		if(tipo == 'erro'){
			return `<div class="alert alert-danger" role="alert">
						<span>${model}</span>
					</div>`;
		}
		
		if(tipo == 'sucesso'){
			return `<div class="alert alert-success" role="alert">
						<span>${model}</span>
					</div>`;
		}
	}
	
	update(model, tipo){
		this._elemento.innerHTML = this.template(model, tipo);
	}
}