class DistVenda {
	constructor() {
		var $ = document.querySelector.bind(document);
		
		this._vendaView = new VendaView($('#produto'), $('#tabela'));
		this._vendaView.updateCombo();
		this._vendaView.updateTabela();
		this._mensagemView = new MensagemView($('#alertas'));
		
		this._inputProduto = $('#produto');
		this._inputQuantidade = $('#quantidade');
		
	}
	
	cadastrar(){
		let dados = {
			id: this._inputProduto.value.substring(0,1),
			quantidade: this._inputQuantidade.value
		}
		
		HttpService.metodoPost('/cadastrarVenda', dados).then(() => {
			this._mensagemView.update('Venda Cadastrada com sucesso', 'sucesso');
			this._vendaView.updateCombo();
			this._vendaView.updateTabela();
		}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não Foi Possivel Cadastrar a Venda', 'erro');

    	});
		
		this._limpaFormulario();
	}
	
	excluir(id){
		HttpService.metodoDelete('/excluirVenda/' + id).then(()=> {
			this._mensagemView.update('Venda Excluida com sucesso', 'sucesso');
			this._vendaView.updateCombo();
			this._vendaView.updateTabela();
		}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não Foi Possivel Excluir a Venda', 'erro');

    	});
	}
	
	_limpaFormulario(){
		this._inputProduto.value = 'Selecione um Produto';
		this._inputQuantidade.value = '';
	}
}