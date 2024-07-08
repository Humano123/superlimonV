const webhookUrl = 'https://discordapp.com/api/webhooks/1252368927422545930/uW_W97tDio9KT9q_MoqPpa04GIyc21k6EFdB0jwjzT8BRo5s-XsaP3XNK32ipWuVvpAb';
let generatedPassword = '';

function generateRandomPassword() {
    const chars = '0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function getBlockedUsers() {
    return JSON.parse(localStorage.getItem('detectedDevTools')) || [];
}

function renderBlockedUsers() {
    const container = document.getElementById('blockedUsersContainer');
    container.innerHTML = '';

    const blockedUsers = getBlockedUsers();
    blockedUsers.forEach(function(userCode) {
        const div = document.createElement('div');
        div.textContent = `Código: ${userCode}`;
        div.style.border = '1px solid black';
        div.style.padding = '10px';
        div.style.margin = '5px';
        container.appendChild(div);
    });
}

function unblockUser(userCode) {
    let blockedUsers = getBlockedUsers();
    blockedUsers = blockedUsers.filter(code => code !== userCode);
    localStorage.setItem('detectedDevTools', JSON.stringify(blockedUsers));
    alert(`O código "${userCode}" foi desbloqueado.`);
    renderBlockedUsers();
}

function getPasswordFromWebhook() {
    generatedPassword = generateRandomPassword();
    const request = new XMLHttpRequest();
    request.open('POST', webhookUrl);
    request.setRequestHeader('Content-type', 'application/json');

    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 204) {
                alert('A senha foi enviada ao canal do Discord.');
                document.getElementById('getPasswordButton').disabled = true;
                document.getElementById('checkPasswordButton').style.display = 'inline-block';
            } else {
                alert('Erro ao obter senha do webhook. Tente novamente.');
            }
        }
    };

    request.onerror = function() {
        alert('Erro de rede ao tentar obter senha do webhook. Verifique sua conexão.');
    };

    const data = JSON.stringify({ content: `A senha gerada é: ${generatedPassword}` });

    request.send(data);
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value.trim();

    if (passwordInput === generatedPassword) {
        document.getElementById('passwordSection').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('Senha incorreta. Tente novamente.');
    }
}

document.getElementById('getPasswordButton').addEventListener('click', function() {
    getPasswordFromWebhook();
});

document.getElementById('checkPasswordButton').addEventListener('click', function() {
    checkPassword();
});

document.getElementById('recoButton').addEventListener('click', function() {
    const codeInput = document.getElementById('codeInput').value;
    if (codeInput) {
        unblockUser(codeInput);
    } else {
        alert('Por favor, insira um código válido.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    renderBlockedUsers();
});