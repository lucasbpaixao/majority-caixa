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

import br.com.majority.caixa.modelo.Entrada;
import br.com.majority.caixa.modelo.Produto;
import br.com.majority.caixa.repository.EntradaRepository;
import br.com.majority.caixa.repository.ProdutoRepository;

@Controller
public class EntradaController {

	@Autowired
	private EntradaRepository repository;
	@Autowired
	private ProdutoRepository repositoryProduto;
		
	@RequestMapping(value = "cadastrarEntrada", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } )
	public String cadastrarEntrada(@RequestBody(required = true) Map<String,Object> corpo) {
		
		Produto produto = repositoryProduto.findOne(Integer.parseInt((String) corpo.get("idProduto")));

		Entrada entrada = new Entrada();
		
		String quantidade = (String) corpo.get("quantidade");
		
		BigDecimal quantidadeConv = new BigDecimal(quantidade);
		
		entrada.setProduto(produto);
		entrada.setQuantidade(quantidadeConv);

		produto.setQuantidade(quantidadeConv.add(produto.getQuantidade()));

		repositoryProduto.save(produto);
		repository.save(entrada);

		return "registrarEntrada";
	}

	@RequestMapping(value = "excluirEntrada/{id}")
	public String excluirProduto(@PathVariable(value = "id") Integer id) {
		
		Produto produto = new Produto();

		Entrada entrada = repository.findOne(id);
		produto = repositoryProduto.findOne(entrada.getProduto().getId());

		produto.setQuantidade(produto.getQuantidade().subtract(entrada.getQuantidade()));

		repositoryProduto.save(produto);
		repository.delete(entrada);

		return "registrarEntrada";
	}

	@RequestMapping(value = "atualizarTabela", method=RequestMethod.GET)
	public @ResponseBody String atualizarTabela(Model model) {
		
	    Gson gson = new Gson();
		  
	    Iterable<Entrada> entradas = repository.findAll();	    
	    String json = gson.toJson(entradas);
		
		return json;
	}

}
