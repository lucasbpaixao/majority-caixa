class ProdutoView{

    constructor(elemento){
        this._elemento = elemento;
    }

    template(model){
    	
    	return `<table class="table table-striped">
                 <thead>
                 	<tr>
                 	    <th scope="col">Id</th>
                         <th scope="col">Nome</th>
                 		<th scope="col">Marca</th>
                 		<th scope="col">Categoria</th>
                 		<th scope="col">Preço</th>
                 	</tr>
                 </thead>

                 <tbody>
                     ${model.map(p => `
                         <tr>
                             <td><p>${p.id}</p></td>
                             <td><p>${p.nome}</p></td>
                             <td><p>${p.marca}</p></td>
                             <td><p>${p.categoria}</p></td>
                             <td><p>${p.preco}</p></td>
                             <td><span><a>
									<button type="button" onclick="distProduto.excluir(${p.id})" class="btn btn-success">Excluir</button>
							 </a></span></td>
							 
							 <td><span><a>
									<button type="button" onclick="distProduto.preencherCampos(${p.id})" class="btn btn-success">Preencher Campos</button>
							 </a></span></td>
                         </tr>
                     `)}
                 </tbody>
             </table>`;
       
    }

    update(){
        HttpService.metodoGet('/listarTodos').then(json => {
    		
    		let produtos = new ListaProdutos();
    		
        	json.forEach(produto => {
        		
        		produtos.adiciona(
        			new Produto(produto.id, produto.nome, produto.marca, produto.categoria, produto.preco))
        	});  
        	                	
            this._elemento.innerHTML = this.template(produtos.produtos());
            
    	}).catch(erro => console.log(erro));
    
    }
}