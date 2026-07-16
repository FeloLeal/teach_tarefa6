const campoTarefa = document.getElementById("nomeTarefa");
const botaoAdicionar = document.getElementById("adicionar");
const botaoTodas = document.getElementById("mostrarTodas");
const botaoPendentes = document.getElementById("mostrarPendentes");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

const tarefas = [];

function adicionarTarefa() {
  const nome = campoTarefa.value;

  if (nome === "") {
    mensagem.textContent = "Digite o nome da tarefa.";
  } else {
    const dataAtual = new Date();

    const tarefa = {
      nome: nome,
      dataCriacao: dataAtual.toLocaleDateString(),
      concluida: false
    };

    tarefas.push(tarefa);

    campoTarefa.value = "";
    mensagem.textContent = "";

    listarTarefas();
  }
}

function marcarComoConcluida(indice) {
  tarefas[indice].concluida = true;

  listarTarefas();
}

function listarTarefas() {
  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    criarTarefaNaTela(tarefas[i], i);
  }
}

function listarPendentes() {
  listaTarefas.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].concluida === false) {
      criarTarefaNaTela(tarefas[i], i);
    }
  }
}

function criarTarefaNaTela(tarefa, indice) {
  const caixa = document.createElement("div");
  const nome = document.createElement("h2");
  const data = document.createElement("p");
  const status = document.createElement("p");
  const botaoConcluir = document.createElement("button");

  caixa.className = "tarefa";

  nome.textContent = tarefa.nome;
  data.textContent = "Data de criação: " + tarefa.dataCriacao;

  if (tarefa.concluida === true) {
    status.textContent = "Status: concluída";
    caixa.className = "tarefa concluida";
  } else {
    status.textContent = "Status: pendente";

    botaoConcluir.textContent = "Marcar como concluída";
    botaoConcluir.className = "botao-concluir";

    botaoConcluir.addEventListener("click", function() {
      marcarComoConcluida(indice);
    });
  }

  caixa.appendChild(nome);
  caixa.appendChild(data);
  caixa.appendChild(status);

  if (tarefa.concluida === false) {
    caixa.appendChild(botaoConcluir);
  }

  listaTarefas.appendChild(caixa);
}

botaoAdicionar.addEventListener("click", function() {
  adicionarTarefa();
});

botaoTodas.addEventListener("click", function() {
  listarTarefas();
});

botaoPendentes.addEventListener("click", function() {
  listarPendentes();
});