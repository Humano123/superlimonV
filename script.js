(function() {
    const DETECTED_DEVTOOLS_KEY = 'detectedDevTools';
    const USER_CODE_KEY = 'userCode';

    // Função para gerar um código de 10 dígitos
    function generateUserCode() {
        let userCode = localStorage.getItem(USER_CODE_KEY);
        if (!userCode) {
            userCode = Math.random().toString(36).substring(2, 12).toUpperCase();
            localStorage.setItem(USER_CODE_KEY, userCode);
        }
        return userCode;
    }

    const userCode = generateUserCode();

    // Função para limpar o conteúdo da página e exibir a mensagem
    function showWarning() {
        document.body.innerHTML = ''; // Remove todo o conteúdo do body
        document.body.style.backgroundColor = 'red'; // Define o fundo como vermelho
        document.body.style.display = 'flex'; // Usa flexbox para centralizar o conteúdo
        document.body.style.justifyContent = 'center';
        document.body.style.alignItems = 'center';
        document.body.style.height = '100vh'; // Define a altura para 100% da altura da viewport
        document.body.style.margin = '0'; // Remove margens

        const h1 = document.createElement('h1');
        h1.textContent = 'Site bloqueado >:(';
        h1.style.color = 'white'; // Define a cor do texto como branco
        h1.style.margin = '0'; // Remove margens

        const p = document.createElement('p');
        p.textContent = 'Vish, este site foi BLOQUEADO PERMANENTEMENTE no seu dispositivo, possivel motivo: (Uso de DevTools), e isso NÃO é permitido no SuperLimon, não será possivel desbloquear do seu dispositivo, talvez será, mas possivelmente, se você foi bloqueado usando o CHROME, pode TALVEZ ter uma chance do site ser desbloqueado, fora disso mais nada.';
        p.style.color = 'white'; // Define a cor do texto como branco
        p.style.marginTop = '10px'; // Margem superior para espaçamento

        const codeInfo = document.createElement('p');
        codeInfo.textContent = `Código: ${userCode}`;
        codeInfo.style.color = 'white'; // Define a cor do texto como branco
        codeInfo.style.marginTop = '10px'; // Margem superior para espaçamento

        const container = document.createElement('div'); // Contêiner para centralizar o texto
        container.style.textAlign = 'center';
        container.appendChild(h1);
        container.appendChild(p);
        container.appendChild(codeInfo);

        document.body.appendChild(container);
    }

    // Função para detectar a abertura das ferramentas de desenvolvedor
    function detectDevTools() {
        const start = performance.now();
        debugger; // Este comando só será capturado se DevTools estiver aberto
        const end = performance.now();
        return end - start > 100;
    }

    // Função para inundar o console com logs
    function floodConsole() {
        console.log('%cSTOP! This is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam.', 'font-size: 2em; color: red;');
        setInterval(() => {
            console.log('%cSTOP! This is a browser feature intended for developers. If someone told you to copy-paste something here, it is a scam.', 'font-size: 2em; color: red;');
        }, 100);
    }

    // Verificação contínua a cada 100ms
    setInterval(function() {
        if (detectDevTools()) {
            const blockedUsers = JSON.parse(localStorage.getItem(DETECTED_DEVTOOLS_KEY)) || [];
            if (!blockedUsers.includes(userCode)) {
                blockedUsers.push(userCode);
                localStorage.setItem(DETECTED_DEVTOOLS_KEY, JSON.stringify(blockedUsers));
            }
            showWarning();
            floodConsole();
        }
    }, 100);

    // Verificação ao carregar a página
    window.addEventListener('load', function() {
        const blockedUsers = JSON.parse(localStorage.getItem(DETECTED_DEVTOOLS_KEY)) || [];
        if (blockedUsers.includes(userCode)) {
            showWarning();
            floodConsole();
        }
    });
})();
