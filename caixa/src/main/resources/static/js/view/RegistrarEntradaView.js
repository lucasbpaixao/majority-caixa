class RegistrarEntradaView{
	
	constructor(elementoCombo, elementoTabela){
		this._elementoCombo = elementoCombo;
		this._elementoTabela = elementoTabela;
	}
	
	templateCombo(model){
		return `
			<option>Selecione um Produto</option>
						${model.map(p =>  `
							<option value="${p.id}">${p.id} - ${p.nome} - ${p.marca}</option>
						`)};
						
					`;
		
	}
	
	updateCombo(){
        HttpService.metodoGet('/listarTodos').then(json => {
    		
    		let produtos = new ListaProdutos();
        	
        	json.forEach(produto => produtos.adiciona(
        			new Produto(produto.id, produto.nome, produto.marca, produto.categoria, produto.preco)));  
        	        	                	
            this._elementoCombo.innerHTML = this.templateCombo(produtos.produtos());
            
    	}).catch(erro => console.log(erro));
	}
	
	templateTabela(model){
		
		return `
		
		<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Id do Produto</th>
						<th scope="col">Nome</th>
						<th scope="col">Marca</th>
						<th scope="col">Quantidade</th>
					</tr>
				</thead>
				<tbody>
				${model.map(e => `
					<tr>
						
						<td>${e.id}</td>
						<td>${e.idProduto}</td>
						<td>${e.nome}</td>
						<td>${e.marca}</td>
						<td>${e.quantidade}</td>
						<td><span><a> <button onclick="distRegistrarEntrada.excluir(${e.id})" type="button" class="btn btn-success">Excluir</button></a></span></td>
							
						
					</tr>
					`)}
				</tbody>
			</table>`;
		
	}
	
	updateTabela(){
        HttpService.metodoGet('/atualizarTabela').then(json => {
    		
    		let entradas = new ListaEntradas();
        	    		
        	json.forEach(entrada => {
        		let entradaObj = {
        			id: entrada.id,
        			idProduto: entrada.produto.id,
        			nome: entrada.produto.nome,
        			marca: entrada.produto.marca,
        			quantidade: entrada.quantidade
        		}
        		
        		entradas.adiciona(entradaObj);  
        	});
        	        	                	
            this._elementoTabela.innerHTML = this.templateTabela(entradas.entradas());
            
    	}).catch(erro => console.log(erro));
	}
}