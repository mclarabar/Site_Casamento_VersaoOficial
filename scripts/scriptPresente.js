
    // Elementos principais
    const ordenarSelect = document.getElementById("ordenar");
    const giftContainer = document.getElementById("giftContainer");
    const cartButton = document.getElementById("cartButton");
    const cartSection = document.getElementById("cartSection");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const addMoreBtn = document.getElementById("addMore");
    const resumoSection = document.getElementById("resumoSection");
    const finalizarCompra = document.getElementById("finalizarCompra");
    const voltarCarrinho = document.getElementById("voltarCarrinho");
    
    // 🎯 VARIÁVEIS DE EXIBIÇÃO DO RESUMO ADICIONADAS AQUI
    const subtotalDisplay = document.getElementById("subtotalDisplay");
    const descontoDisplay = document.getElementById("descontoDisplay");
    const totalFinalDisplay = document.getElementById("totalFinalDisplay");
    const irParaPagamentoBtn = document.getElementById("irParaPagamento");
    
    let cart = [];

    // Carregar carrinho salvo
    document.addEventListener("DOMContentLoaded", () => {
        const savedCart = localStorage.getItem("carrinho");
        if (savedCart) {
            cart = JSON.parse(savedCart);
            atualizarCarrinho();

            if (cart.length > 0) {
                cartSection.classList.remove("hidden");
                giftContainer.classList.add("hidden");
                document.querySelector(".top-bar").style.display = "none";
            } else {
                giftContainer.classList.remove("hidden");
            }
        } else {
            giftContainer.classList.remove("hidden");
        }
    });

    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(cart));
    }

    // Ordenar lista
    ordenarSelect.addEventListener("change", () => {
        const cards = Array.from(giftContainer.children);
        if (ordenarSelect.value === "az") {
            cards.sort((a, b) =>
                a.querySelector(".gift-title").textContent.localeCompare(
                    b.querySelector(".gift-title").textContent
                )
            );
        } else if (ordenarSelect.value === "preco") {
            cards.sort(
                (a, b) => parseFloat(a.dataset.preco) - parseFloat(b.dataset.preco)
            );
        }
        giftContainer.innerHTML = "";
        cards.forEach((c) => giftContainer.appendChild(c));
    });

    // Adicionar ao carrinho
    document.querySelectorAll(".gift-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const title = card.querySelector(".gift-title").textContent;
            const price = card.querySelector(".gift-price").textContent;
            const image = card.querySelector(".gift-image").src;

            cart.push({ title, price, image });
            atualizarCarrinho();
            salvarCarrinho();

            cartSection.classList.remove("hidden");
            giftContainer.classList.add("hidden");
            document.querySelector(".top-bar").style.display = "none";
        });
    });

    // Atualizar carrinho
    function atualizarCarrinho() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const precoNum = parseFloat(
                item.price.replace(/[R$\s.]/g, "").replace(",", ".")
            );
            total += precoNum;

            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>
                <div class="cart-item">
                  <img src="${item.image}">
                  <div>
                    <div class="cart-item-title">${item.title}</div>
                    <div class="remove" data-index="${index}">Remover</div>
                  </div>
                </div>
              </td>
              <td>R$ ${precoNum.toFixed(2).replace(".", ",")}</td>
            `;
            cartItems.appendChild(tr);
        });

        cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
        cartButton.textContent = cart.length
            ? `🛒 Carrinho (${cart.length})`
            : "🛒 Carrinho vazio";
    }

    // Remover item
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            atualizarCarrinho();
            salvarCarrinho();

            if (cart.length === 0) {
                localStorage.removeItem("carrinho");
                cartSection.classList.add("hidden");
                giftContainer.classList.remove("hidden");
                document.querySelector(".top-bar").style.display = "flex";
            }
        }
    });
    
    // --- NOVO: Função para Carregar Resumo e Exibir Valores ---
    function carregarResumo() {
        // Obter o total atual do carrinho (valor formatado)
        const totalString = cartTotal.textContent;
        
        // 2. Extrair o valor numérico para cálculo (para o JS)
        const totalNum = parseFloat(totalString.replace(/[R$\s]/g, "").replace(",", "."));
        
        // 3. Lógica de Desconto (por enquanto, 0)
        const valorDesconto = 0.00; 
        const totalFinalNum = totalNum - valorDesconto;
        
        // 4. Formatar os valores
        const descontoFormatado = `- R$ ${valorDesconto.toFixed(2).replace(".", ",")}`;
        const totalFinalFormatado = `R$ ${totalFinalNum.toFixed(2).replace(".", ",")}`;
        
        // 5. Preencher os campos do resumo
        subtotalDisplay.textContent = totalString;
        descontoDisplay.textContent = descontoFormatado;
        totalFinalDisplay.textContent = totalFinalFormatado;
    }


    // Adicionar mais itens
    addMoreBtn.addEventListener("click", () => {
        cartSection.classList.add("hidden");
        giftContainer.classList.remove("hidden");
        document.querySelector(".top-bar").style.display = "flex";
    });

    // Ir para resumo (MODIFICADO para CHAMA a função carregarResumo)
    finalizarCompra.addEventListener("click", () => {
        carregarResumo(); 
        cartSection.classList.add("hidden");
        resumoSection.classList.remove("hidden");
    });

    // Voltar ao carrinho
    voltarCarrinho.addEventListener("click", () => {
        resumoSection.classList.add("hidden");
        cartSection.classList.remove("hidden");
    });
    
    // Botão Carrinho (para alternar entre lista e carrinho)
    cartButton.addEventListener("click", () => {
        if (cart.length > 0) {
             // Se o carrinho estiver visível, volte para a lista.
            if (!cartSection.classList.contains("hidden")) {
                cartSection.classList.add("hidden");
                giftContainer.classList.remove("hidden");
                document.querySelector(".top-bar").style.display = "flex";
            } else {
                // Se o carrinho estiver escondido, vá para o carrinho.
                cartSection.classList.remove("hidden");
                giftContainer.classList.add("hidden");
                document.querySelector(".top-bar").style.display = "none";
            }
        } else {
            // Se estiver vazio, sempre mostra a lista
            cartSection.classList.add("hidden");
            giftContainer.classList.remove("hidden");
            document.querySelector(".top-bar").style.display = "flex";
        }
    });