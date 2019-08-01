
var $ = document.querySelector.bind(document);
class DistProduto{
	
	constructor(){
		this._inputId = $('#id');
		this._inputNome = $('#nomeProduto');
		this._inputMarca = $('#marca');
		this._inputCategoria = $('#categoria');
		this._inputPreco = $('#preco');

		this._produtoView = new ProdutoView($('#tabela'));
		this._produtoView.update();
		
		this._mensagemView = new MensagemView($('#alertas'));
		
		this._botaoCadastrar = $("#cadastrarProduto");
	}
	
	cadastrar(){

			event.preventDefault();
			
			let produto = {nome: this._inputNome.value, marca: this._inputMarca.value, categoria: this._inputCategoria.value, preco: this._inputPreco.value};

			HttpService.metodoPost('/cadastrarProduto', produto).then(mensagem => {
            	this._mensagemView.update('Produto Cadastrado com Sucesso', 'sucesso');
            	this._produtoView.update();
            	this._limpaFormulario();
			}).catch(erro => {
	    		console.log(erro);
	    		this._mensagemView.update('Não foi Possivel Cadastrar o Produto', 'erro');

	    	});

	}
	
	alterar(){

		event.preventDefault();
		
		let produto = {id: this._inputId.value, nome: this._inputNome.value, marca: this._inputMarca.value, categoria: this._inputCategoria.value, preco: this._inputPreco.value};

		HttpService.metodoPost('/alterarProduto', produto).then(mensagem => {
        	this._mensagemView.update('Produto Alterado com Sucesso', 'sucesso');
        	this._produtoView.update();
        	this._limpaFormulario();
		}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não foi Alterar o Produto', 'erro');

    	});;

	}
		
	preencherCampos(id){
		event.preventDefault();

        HttpService.metodoGet('/preencherCampos/' + id).then(produto => {

      		this._inputId.value = produto.id;
    		this._inputNome.value = produto.nome;
    		this._inputMarca.value = produto.marca;
    		this._inputCategoria.value = produto.categoria;
    		this._inputPreco.value = produto.preco;
        	  
    	}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não foi Possivel Preencher os Campos', 'erro');

    	});
	}
	
	excluir(id){
		event.preventDefault();

        HttpService.metodoDelete('/excluirProduto/' + id).then(() => {
        	this._mensagemView.update('Produto Excluido com Sucesso', 'sucesso');
        	this._produtoView.update();  
    	}).catch(erro => {
    		console.log(erro);
    		this._mensagemView.update('Não foi Possivel Excluir o Produto', 'erro');

    	});
	}
	
    _limpaFormulario(){
  		this._inputId.value = '';
		this._inputNome.value = '';
		this._inputMarca.value = '';
		this._inputCategoria.value = '';
		this._inputPreco.value = '';
    }
}