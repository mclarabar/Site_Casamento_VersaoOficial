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

// 🎯 VARIÁVEIS DE EXIBIÇÃO DO RESUMO
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

        // 💡 CORREÇÃO: Só execute a lógica se os elementos existirem
        if (cart.length > 0) {
            if (cartSection) {
                cartSection.classList.remove("hidden");
            }
            if (giftContainer) {
                giftContainer.classList.add("hidden");
                const topBar = document.querySelector(".top-bar");
                if (topBar) topBar.style.display = "none";
            }
        } else {
            if (giftContainer) {
                giftContainer.classList.remove("hidden");
            }
        }
    } else {
        if (giftContainer) {
            giftContainer.classList.remove("hidden");
        }
    }
    
    // 🎯 CARREGAR VALORES DO RESUMO SE OS ELEMENTOS EXISTIREM
    const subtotalSalvo = localStorage.getItem("subtotal_compra");
    const descontoSalvo = localStorage.getItem("desconto_compra");
    const totalSalvo = localStorage.getItem("total_compra");
    
    if (subtotalDisplay && subtotalSalvo) subtotalDisplay.textContent = subtotalSalvo;
    if (descontoDisplay && descontoSalvo) descontoDisplay.textContent = descontoSalvo;
    if (totalFinalDisplay && totalSalvo) totalFinalDisplay.textContent = totalSalvo;
});

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(cart));
}

// Ordenar lista
if (ordenarSelect) {
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
}

// 🎯 ADICIONAR AO CARRINHO - ABRE NOVA JANELA
document.querySelectorAll(".gift-button").forEach((button) => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        const title = card.querySelector(".gift-title").textContent;
        const price = card.querySelector(".gift-price").textContent;
        const image = card.querySelector(".gift-image").src;

        cart.push({ title, price, image });
        atualizarCarrinho();
        salvarCarrinho();
        
        // 🎯 ABRIR CARRINHO.HTML EM NOVA JANELA
        window.open("carrinho.html", "_blank");
    });
});

// Atualizar carrinho
function atualizarCarrinho() {
    if (!cartItems) return; // Proteção caso não exista na página
    
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

    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
    if (cartButton) {
        cartButton.textContent = cart.length
            ? `🛒 Carrinho (${cart.length})`
            : `🛒 Carrinho vazio`;
    }
}

// Remover item
if (cartItems) {
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            atualizarCarrinho();
            salvarCarrinho();

            if (cart.length === 0) {
                localStorage.removeItem("carrinho");
                
                // 🎯 SE ESTIVER NA PÁGINA DO CARRINHO E FICAR VAZIO, VOLTAR PARA INDEX
                if (document.body.id === "carrinho") {
                    window.location.href = "index.html#presentes";
                } else {
                    // Se estiver no index, apenas mostrar a lista novamente
                    if (cartSection) cartSection.classList.add("hidden");
                    if (giftContainer) {
                        giftContainer.classList.remove("hidden");
                        const topBar = document.querySelector(".top-bar");
                        if (topBar) topBar.style.display = "flex";
                    }
                }
            }
        }
    });
}

// Função para Carregar Resumo e Exibir Valores
function carregarResumo() {
    if (!cartTotal) return;
    
    const totalString = cartTotal.textContent;
    const totalNum = parseFloat(totalString.replace(/[R$\s]/g, "").replace(",", "."));
    
    const valorDesconto = 0.00; 
    const totalFinalNum = totalNum - valorDesconto;
    
    const descontoFormatado = `- R$ ${valorDesconto.toFixed(2).replace(".", ",")}`;
    const totalFinalFormatado = `R$ ${totalFinalNum.toFixed(2).replace(".", ",")}`;
    
    // Salvar no localStorage para usar em outras páginas
    localStorage.setItem("subtotal_compra", totalString);
    localStorage.setItem("desconto_compra", descontoFormatado);
    localStorage.setItem("total_compra", totalFinalFormatado);
    
    // Se os elementos existirem na página, preencher
    if (subtotalDisplay) subtotalDisplay.textContent = totalString;
    if (descontoDisplay) descontoDisplay.textContent = descontoFormatado;
    if (totalFinalDisplay) totalFinalDisplay.textContent = totalFinalFormatado;
}

// Adicionar mais itens
if (addMoreBtn) {
    addMoreBtn.addEventListener("click", () => {
        // 🎯 FECHAR A JANELA ATUAL E VOLTAR PARA A PÁGINA DE PRESENTES
        window.close();
    });
}

// Ir para resumo
if (finalizarCompra) {
    finalizarCompra.addEventListener("click", () => {
        carregarResumo(); 
        if (cartSection) cartSection.classList.add("hidden");
        if (resumoSection) resumoSection.classList.remove("hidden");
    });
}

// Voltar ao carrinho
if (voltarCarrinho) {
    voltarCarrinho.addEventListener("click", () => {
        if (resumoSection) resumoSection.classList.add("hidden");
        if (cartSection) cartSection.classList.remove("hidden");
    });
}

// Botão Carrinho (para alternar entre lista e carrinho)
if (cartButton) {
    cartButton.addEventListener("click", () => {
        if (cart.length > 0) {
            if (!cartSection.classList.contains("hidden")) {
                cartSection.classList.add("hidden");
                if (giftContainer) {
                    giftContainer.classList.remove("hidden");
                    const topBar = document.querySelector(".top-bar");
                    if (topBar) topBar.style.display = "flex";
                }
            } else {
                cartSection.classList.remove("hidden");
                if (giftContainer) {
                    giftContainer.classList.add("hidden");
                    const topBar = document.querySelector(".top-bar");
                    if (topBar) topBar.style.display = "none";
                }
            }
        } else {
            cartSection.classList.add("hidden");
            if (giftContainer) {
                giftContainer.classList.remove("hidden");
                const topBar = document.querySelector(".top-bar");
                if (topBar) topBar.style.display = "flex";
            }
        }
    });
}