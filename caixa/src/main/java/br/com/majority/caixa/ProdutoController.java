package br.com.majority.caixa;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import br.com.majority.caixa.modelo.Produto;
import br.com.majority.caixa.repository.ProdutoRepository;

@Controller
public class ProdutoController {

	@Autowired
	private ProdutoRepository repository;
	
	@RequestMapping(value = "cadastrarProduto", method=RequestMethod.POST , consumes = {MediaType.APPLICATION_JSON_VALUE })
	public String cadastraProdutos(@RequestBody(required = true) Map<String,Object> corpo, Model model) {

		Produto produto = new Produto();

		BigDecimal quantidade = new BigDecimal(0);
		String preco = (String) corpo.get("preco");
		produto.setNome((String) corpo.get("nome"));
		produto.setMarca((String) corpo.get("marca"));
		produto.setCategoria((String) corpo.get("categoria"));
		produto.setPreco(new BigDecimal(preco));
		produto.setQuantidade(quantidade);

		repository.save(produto);
				
		return "cadastroProdutos";
	}

	@RequestMapping(value = "excluirProduto/{id}")
	public String excluirProduto(@PathVariable(value = "id") Integer id) {
		
		repository.delete(id);

		return "redirect:/cadastroProdutos";
	}
	
	@RequestMapping(value = "alterarProduto", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE })
	public String alterarProduto(@RequestBody(required = true) Map<String,Object> corpo) {
		Produto produto = new Produto();
		
		String preco = (String) corpo.get("preco");
		
		produto.setId(Integer.parseInt((String) corpo.get("id")));
		produto.setNome((String) corpo.get("nome"));
		produto.setMarca((String) corpo.get("marca"));
		produto.setCategoria((String) corpo.get("categoria"));
		produto.setPreco(new BigDecimal(preco));

		repository.save(produto);

		return "cadastroProdutos";
	}
	
	@RequestMapping(value="listarTodos", method=RequestMethod.GET)
	public @ResponseBody String listarTodos() {		
	    Gson gson = new Gson();
		  
		Iterable<Produto> produtos = repository.findAll();
	    String json = gson.toJson(produtos);
		
		return json;
	}
	
	@RequestMapping(value="preencherCampos/{id}", method=RequestMethod.GET)
	public @ResponseBody String preencherCampos(@PathVariable(value = "id") Integer id) {		
	    Gson gson = new Gson();
		  
	    String json = gson.toJson(repository.findOne(id));
		
		return json;
	}
}
