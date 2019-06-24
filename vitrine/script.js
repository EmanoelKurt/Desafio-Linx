// Cria tag script para fazer a leitura do JSONP
var script = document.createElement('script');
script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X'
document.getElementsByTagName('head')[0].appendChild(script);

var scrollMax;

function createReferenceItem(inf) {

	let reference = inf.data.reference.item;
	
	// Ajusta formato da string que contém as condições de pagamento
	let refInstallmentString = reference.productInfo.paymentConditions.replace("de", "de R$").replace(".", ","); 

	document.querySelector("#reference-img").src = "http:" + reference.imageName;;
	document.querySelector("#reference-text").innerHTML = reference.name;
	document.querySelector("#old-price").innerHTML = "De: " + reference.oldPrice;
	document.querySelector("#sight-price").innerHTML = reference.price;
	document.querySelector("#installment-price").innerHTML = refInstallmentString;
	document.querySelector("#reference-link").href = "http:" + reference.detailUrl;
}

function createListItens(inf) {

	let list = inf.data.recommendation;
	
	for(i = 0; i < list.length; i++) {	// Laço for que cria os itens da vitrine e funciona para qualquer quantidade de itens

		let div = document.createElement('a');
		div.className = "showcase-item";
		div.href = "http:" + list[i].detailUrl;
		showcaseListBox.appendChild(div);

		let itemImage = document.createElement('img');
		itemImage.src = "http:" + list[i].imageName;
		div.appendChild(itemImage);

		let itemDescription = document.createElement('p');
		itemDescription.className = "item-description";
		itemDescription.innerHTML = list[i].name;
		div.appendChild(itemDescription);

		let priceText = document.createElement('p');
		priceText.className = "price-text";
		
		// Condicional para acrescentar oldPrice à vitrine somente quando o item da lista tiver este campo preenchido
		if (list[i].oldPrice != null) { 
			// Aqui optei por inserir a tag span como uma string para gerar menos linhas de código
			priceText.innerHTML = `<span class="old-price"> De: ${list[i].oldPrice}</span><br>`;  
		}
		priceText.innerHTML = priceText.innerHTML + "Por: ";
		div.appendChild(priceText);
		
		let price = document.createElement('span');
		price.className = "sight-price";
		price.innerHTML = list[i].price + "<br>";
		priceText.appendChild(price);

		// Ajusta o formato da string que contém as condições de pagamento e adiciona à vitrine
		let listInstallmentString = list[i].productInfo.paymentConditions.replace("de", "de R$").replace(".", ","); 
		let installmentPrice = document.createElement('span');
		installmentPrice.className = "installment-price";
		installmentPrice.innerHTML = listInstallmentString + "<br> sem juros";
		priceText.appendChild(installmentPrice);
	}
}

function X(inf) { // Função que recebe o JSONP

	// Calcula o valor máximo que o scroll pode assumir com base no número de itens da lista de recomendação
	if(inf.data.recommendation.length <= 6) scrollMax = 515;
	else scrollMax = 515 + (inf.data.recommendation.length - 6) * 171;

	// Optei por criar o item de referência separadamente dos itens de recomendação da lista, pois avaliei que haveria
	// algumas diferenças entre eles que poderiam complicar a codificação, por exemplo, na extração dos dados do arquivo JSONP, 
	// onde as informações dos itens referência e recomendação são armazenadas em caminhos diferentes.
	
	createReferenceItem(inf); // Cria o item referência da vitrine

	createListItens(inf); // Cria a lista de itens recomendados da vitrine
}

var buttomR = document.querySelector("#buttom-right");
var buttomL = document.querySelector("#buttom-left");
var showcaseListBox = document.querySelector("#showcase-list-box");
var scrollPosition = 0;

// Adiciona efeito hover aos botões de paginação
buttomR.addEventListener("mouseenter", () => buttomR.src = "botaoRH.jpg");
buttomR.addEventListener("mouseleave", () => buttomR.src = "botaoR.jpg");
buttomL.addEventListener("mouseenter", () => buttomL.src = "botaoLH.jpg");
buttomL.addEventListener("mouseleave", () => buttomL.src = "botaoL.jpg");

// Adiciona funcionalidade aos botões de paginação
buttomR.addEventListener("click", () => {
	if(scrollPosition < scrollMax) {
		scrollPosition += 515;
		showcaseListBox.scroll({left: scrollPosition, behavior: 'smooth'});
	}
})

buttomL.addEventListener("click", () => {
	if(scrollPosition > 0) {
		scrollPosition -= 515;
		showcaseListBox.scroll({left: scrollPosition, behavior: 'smooth'});
	}
})