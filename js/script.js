const rightArea = document.querySelector(".right-area");
const sidebar = document.createElement("div");
sidebar.classList.add("side-result-container");
rightArea.appendChild(sidebar);

function noText() {
    sidebar.classList.add("side-noText");

    const imgSidebar = document.createElement("img");
    imgSidebar.src = "./images/Munheco.png";
    imgSidebar.classList.add("img-sidebar");
    sidebar.appendChild(imgSidebar);

    const textSidebarContainer = document.createElement("div");
    textSidebarContainer.classList.add("text-sidebar-container");

    const textSidebarCaps = document.createElement("p");
    textSidebarCaps.classList.add("text-sidebar-caps");
    textSidebarCaps.textContent = "Ningún mensaje fue encontrado";
    textSidebarContainer.appendChild(textSidebarCaps);

    const textSidebar = document.createElement("p");
    textSidebar.classList.add("text-sidebar-nothing");
    textSidebar.textContent =
        "Ingresa el texto que desees encriptar o desencriptar.";
    textSidebarContainer.appendChild(textSidebar);

    sidebar.appendChild(textSidebarContainer);
}

function cleanSidebar() {
    sidebar.replaceChildren();
}

function takeText(objetive) {
    cleanSidebar();
    const inputText = document.querySelector(".input-text").value;
    if (inputText === "") noText();
    else {
        const textToShow = document.createElement("p");
        textToShow.classList.add("text-sidebar");
        if (inputText.match(/[A-Zá-ź]/gu)) {
            noText();
            alert("Solo letras minúsculas y sin acentos");
        } else {
            let tempText = "";
            if (objetive == "encrypt") {
                tempText = encrypt(inputText);
                textToShow.textContent = tempText;
            }
            if (objetive == "decrypt") {
                tempText = decrypt(inputText);
                textToShow.textContent = tempText;
            }
            const buttonCopy = document.createElement("button");
            buttonCopy.classList.add("copy-button");
            const imgCopy = document.createElement("img");
            imgCopy.classList.add("img-copy");
            imgCopy.src = "./images/copy-alt-regular-24.png";
            imgCopy.alt = "Imagen de Copiar";

            buttonCopy.textContent = "Copiar";
            buttonCopy.appendChild(imgCopy);
            buttonCopy.addEventListener("click", async() => {
                navigator.clipboard.writeText(tempText);
            });
            sidebar.appendChild(textToShow);
            sidebar.appendChild(buttonCopy);

            if (textToShow.offsetHeight >= 859) sidebar.style.height = "auto";
            sidebar.style.justifyContent = "space-between";
        }
    }
}

function encrypt(textToEncrypt) {
    textToEncrypt = textToEncrypt.replaceAll("e", "enter");
    textToEncrypt = textToEncrypt.replaceAll("i", "imes");
    textToEncrypt = textToEncrypt.replaceAll("a", "ai");
    textToEncrypt = textToEncrypt.replaceAll("o", "ober");
    textToEncrypt = textToEncrypt.replaceAll("u", "ufat");
    return textToEncrypt;
}

function decrypt(textToDecrypt) {
    textToDecrypt = textToDecrypt.replaceAll("enter", "e");
    textToDecrypt = textToDecrypt.replaceAll("imes", "i");
    textToDecrypt = textToDecrypt.replaceAll("ai", "a");
    textToDecrypt = textToDecrypt.replaceAll("ober", "o");
    textToDecrypt = textToDecrypt.replaceAll("ufat", "u");
    return textToDecrypt;
}

/*function copy() {
    const inputText = document.querySelector(".text-sidebar").value;
    const copyToClipboard = (inputText) => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(inputText);
        return Promise.reject("The Clipboard API is not available.");
    };
}*/

noText();
const buttonEncrypt = document.querySelector(".encrypt");
buttonEncrypt.addEventListener("click", () => takeText("encrypt"));
const buttonDecrypt = document.querySelector(".decrypt");
buttonDecrypt.addEventListener("click", () => takeText("decrypt"));