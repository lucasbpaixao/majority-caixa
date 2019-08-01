class HttpService{
	
	static metodoGet(url){
		
		return new Promise((resolve, reject) => {
			
			let xhr = new XMLHttpRequest();
	        
	        xhr.open('GET', url);
	        
	        xhr.onreadystatechange = () => {
	                
	            if(xhr.readyState == 4) {
	                
	                if(xhr.status == 200) {   
	                  
	                	resolve(JSON.parse(xhr.responseText));
	                    
	                } else {
	                    
	                    reject(xhr.responseText);
	                }
	            }
	        };
	        
	        xhr.send();
		});
	}
	
	static metodoDelete(url){
		return new Promise((resolve, reject) => {
			
			let xhr = new XMLHttpRequest();
	        
	        xhr.open('GET', url);
	        
	        xhr.onreadystatechange = () => {
	                
	            if(xhr.readyState == 4) {
	                
	                if(xhr.status == 200) {   
	                  
	                	resolve();
	                    
	                } else {
	                    
	                    reject(xhr.responseText);
	                }
	            }
	        };
	        xhr.send();
		});
	}
	
	static metodoPost(url, dados){
		
		return new Promise((resolve,reject) => {
			
			 let xhr = new XMLHttpRequest();
			    xhr.open("POST", url, true);
			    xhr.setRequestHeader("Content-type", "application/json");
			    xhr.onreadystatechange = () => {

			            if (xhr.readyState == 4) {

			                if (xhr.status == 200) {
			              
			                	resolve();			               ﻿
			                }else{
			                	reject(xhr.responseText);
			                }
			            }
			    };
			    xhr.send(JSON.stringify(dados));
		});
		
	}
}