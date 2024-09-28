function cadastrar() {

  const nome = document.getElementById("input_nome").value;
  const email = document.getElementById("input_email").value;
  const senha = document.getElementById("input_senha").value;
  const confirmSenha = document.getElementById("input_confirmar_senha").value;

  let regexMaiuscula = /[A-Z]/;
  let regexMinuscula = /[a-z]/;

  let senhaValidaRegex = false;
  let senhaValidaNumeros = false;
  let senhaValida = false;
  let confirmSenhaValida = false;
  let nomeValido = false;
  let emailValido = false;

  let mensagemErroNome = "O nome deve conter pelo menos três caracteres.";

  let mensagemEmailInvalido = "Insira um email válido. Ex: vertex@gmail.com";

  let mensagemSenhaCurta = "A senha deve conter pelo menos 6 caracteres";

  let mensagemSenhaInvalida = `A senha deve conter pelo menos uma letra maiúscula, 
      além de uma minúscula, um caracter numérico e pelo menos um caracter especial <br> (@, #, %, *, ?, $, &, !, -, /).`;

  let mensagemErroConfirmSenha = "As senhas devem ser iguais.";

  /* ------------------- VERIFICAÇÃO DE NOME ------------------ */

  if (nome.length > 2) {
    nomeValido = true;
  }

  if (!nomeValido) {
    document.getElementById("nomeErro").innerHTML = mensagemErroNome;
  } else if (nomeValido) {
    document.getElementById("nomeErro").innerHTML = "";
  }

  /* ------------------ VERIFICAÇÃO DE SENHA ----------------------- */

  if (
    regexMaiuscula.test(senha) &&
    regexMinuscula.test(senha) &&
    senha.length >= 6
  ) {
    senhaValidaRegex = true;
  }

  for (let contador = 0; contador <= 9; contador++) {
    if (senha.indexOf(`${contador}`) > -1) {
      senhaValidaNumeros = true;
    }
  }

  if (senhaValidaRegex && senhaValidaNumeros) {
    senhaValida = true;
  }

  if (senha.length < 6) {
    document.getElementById("cadastroSenhaErro").innerHTML =
      mensagemSenhaCurta;
  } else {
    document.getElementById("cadastroSenhaErro").innerHTML = "";
  }

  if (!senhaValida && senha.length >= 6) {
    document.getElementById("cadastroSenhaErro").innerHTML =
      mensagemSenhaInvalida;
  } else if (senhaValida && senha.length >= 6) {
    document.getElementById("cadastroSenhaErro").innerHTML = "";
  }

  /* ------------------ VERIFICAÇÃO CONFIRMAÇÃO DE SENHA ----------------------- */

  if (confirmSenha != senha) {
    document.getElementById("cadastroConfirmSenhaErro").innerHTML =
      mensagemErroConfirmSenha;
  } else {
    confirmSenhaValida = true;
    document.getElementById("cadastroConfirmSenhaErro").innerHTML = "";
  }

  /* ------------------------------ CONFIRMAÇÃO DE EMAIL ------------------------------- */

  if (
    email.indexOf("@") > 0 &&
    (email.indexOf(".com") > email.indexOf("@") ||
      email.indexOf(".school") > email.indexOf("@"))
  ) {
    emailValido = true;
  }

  if (!emailValido) {
    document.getElementById("cadastroEmailErro").innerHTML =
      mensagemEmailInvalido;
  } else if (emailValido) {
    document.getElementById("cadastroEmailErro").innerHTML = "";
  }

  /* ------------------------------ VERIFICANDO SE TODOS OS CAMPOS ESTÃO CORRETOS ----------------------------- */
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = cadastro_input_senha.value;
  var confirmacaoSenhaVar = input_confirmar_senha.value;
  var cargosVar = select - cargo.value;

  if (nomeValido && emailValido && senhaValida && confirmSenhaValida) {
    document.getElementById("cadastroSucesso").style.display = "flex";
    document.getElementById("cadastroSucesso").style.animation =
      "cadastroComSucesso";
    document.getElementById("cadastroSucesso").style.animationDuration = "5s";

    setTimeout(
      () =>
        (document.getElementById("cadastroSucesso").style.display = "none"),
      4900
    );

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        CargosServer: cargosVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cadastroSucesso.style.display = "flex";

          setTimeout(() => {
            window.location = "dash.html";
          }, "2000");
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }
}

function listar() {
  fetch("/cargos/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((cargos) => {
        cargos.forEach((cargo) => {
          listacargos.innerHTML += `<option value='${cargo.idCargos}'>${cargo.Nome}</option>`;
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}