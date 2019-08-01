class VendaView {
	
	constructor(elementoCombo, elementoTabela) {
		this._elementoCombo = elementoCombo;
		this._elementoTabela = elementoTabela;
	
	}
	
	_templateCombo(produtos){
		
		return `
			<option>Selecione um Produto</option>
			${produtos.map(p => `
				<option>${p.id} - ${p.nome} - ${p.marca}</option>
			
			`)}
			
		`;
	}
	
	updateCombo(){
		HttpService.metodoGet('listarTodos').then(json => {
			
			let produtos = [];
			json.forEach(produto => {
				
				produtos.push(produto);
			});
			
			this._elementoCombo.innerHTML = this._templateCombo(produtos);
			
		});
	}
	
	_templateTabela(vendas){
		
		console.log(vendas);
		return `<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">Id</th>
						<th scope="col">Id do Produto</th>
						<th scope="col">Nome</th>
						<th scope="col">Marca</th>
						<th scope="col">Valor da Venda</th>
						<th scope="col">Data da Venda</th>
						<th scope="col">Quantidade Vendida</th>
					</tr>
				</thead>
				<tbody>
				
					${vendas.map(venda => `
					
					<tr>
						<td><span> ${venda.id} </span></td>
						<td><span> ${venda.idProduto} </span></td>
						<td><span> ${venda.nomeProduto} </span></td>
						<td><span> ${venda.marcaProduto} </span></td>
						<td><span> ${venda.valor} </span></td>
						<td><span> ${venda.data} </span></td>
						<td><span> ${venda.quantidade} </span></td>
						<td><span><a> <button type="button" onclick="distVenda.excluir(${venda.id})" class="btn btn-success">Excluir</button> </a></span></td>
					</tr>
					`)}

				</tbody>
			</table>`;
	}
	
	updateTabela(){
		HttpService.metodoGet('/atualizarTabelaVenda').then(json => {
			
			let vendas = [];
			
			json.forEach(venda => {
				
				let vendaObj = {
					id: venda.id,
					idProduto: venda.produto.id,
					nomeProduto: venda.produto.nome,
					marcaProduto: venda.produto.marca,
					valor: venda.valor,
					data: venda.data,
					quantidade: venda.quantidade
				}
				

				vendas.push(vendaObj);
			});
			
			this._elementoTabela.innerHTML = this._templateTabela(vendas);
		});
	}
	
}