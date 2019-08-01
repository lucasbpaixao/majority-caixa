package br.com.majority.caixa;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
import br.com.majority.caixa.modelo.Venda;
import br.com.majority.caixa.repository.ProdutoRepository;
import br.com.majority.caixa.repository.VendaRepository;

@Controller
public class VendaController {
	@Autowired
	private VendaRepository repository;
	@Autowired
	private ProdutoRepository repositoryProduto;
	
	@RequestMapping(value = "cadastrarVenda", method=RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } )
	public String cadastraVenda(@RequestBody(required = true) Map<String,Object> corpo) throws Exception {
		
		Produto produto = repositoryProduto.findOne(Integer.parseInt((String) corpo.get("id")));

		Date data = new Date(System.currentTimeMillis());
		
		SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
		
		BigDecimal quantidade = new BigDecimal((String) corpo.get("quantidade"));
		
		Venda venda = new Venda();
		venda.setProduto(produto);
		venda.setData(formatador.format(data));
		venda.setValor(quantidade.multiply(produto.getPreco()));
		venda.setQuantidade(quantidade);
		
		if(quantidade.compareTo(produto.getQuantidade()) == 1) {
			throw new Exception("Quantidade Vendida é Maior do que a Quantidade Presente no Estoque!!!");
		}
		
		produto.setQuantidade(produto.getQuantidade().subtract(quantidade));
		
		repositoryProduto.save(produto);
		repository.save(venda);

		return "venda";
	}

	@RequestMapping(value = "excluirVenda/{id}", method=RequestMethod.GET)
	public String excluirVenda(@PathVariable(value = "id") Integer id) {
		
		Produto produto = new Produto();

		Venda venda = repository.findOne(id);
		produto = repositoryProduto.findOne(venda.getProduto().getId());

		produto.setQuantidade(produto.getQuantidade().add(venda.getQuantidade()));

		repositoryProduto.save(produto);
		repository.delete(venda);

		return "venda";
	}

	@RequestMapping("atualizarTabelaVenda")
	public @ResponseBody String atualizarTabela() {
		
		Iterable<Venda> vendas = repository.findAll();
		Gson gson = new Gson();
		
		return gson.toJson(vendas);
	}

}
