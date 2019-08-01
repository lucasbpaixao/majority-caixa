class DistRegistrarEntrada {
	
	constructor(){
		var $ = document.querySelector.bind(document);
		
		this._resgistrarEntradaView = new RegistrarEntradaView($('#produto'), $('#tabelaEntradas'));
		this._resgistrarEntradaView.updateCombo();
		this._resgistrarEntradaView.updateTabela();
		this._mensagemView = new MensagemView($('#alertas'));
		
		this._inputProduto = $('#produto');
		this._inputQuantidade = $('#quantidade');
	}
	
	cadastrar(){
		
		
		let idproduto = this._inputProduto.value.substring(0,1);
		
		let entrada = {
			idProduto: idproduto,
			quantidade: this._inputQuantidade.value
		}
		
		HttpService.metodoPost('/cadastrarEntrada', entrada).then(() => {
			this._mensagemView.update('Entrada registrada com Sucesso', 'sucesso');
			
			this._resgistrarEntradaView.updateCombo();
			this._resgistrarEntradaView.updateTabela();
		}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não foi Possivel Registrar a Entrada', 'erro');

    	});
		
		this._limpaFormulario();
	}
	
	atualizarTabela(){
		this._resgistrarEntradaView.updateTabela();
		this._mensagemView.update('Tabela Atualizada', 'sucesso');
	}
	
	excluir(id){
		
		event.preventDefault();

        HttpService.metodoDelete('/excluirEntrada/' + id).then(() => {
        	this._mensagemView.update('Entrada Excluida com Sucesso', 'sucesso');
        	this._resgistrarEntradaView.updateCombo();
			this._resgistrarEntradaView.updateTabela();
    	}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não foi Possivel Excluir a Entrada', 'erro');

    	});
	}
	
	_limpaFormulario(){
		this._inputProduto.value = 'Selecione um Produto';
		this._inputQuantidade.value = '';
	}
}