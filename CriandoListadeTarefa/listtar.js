const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    li.appendChild(botaoApagar);
    // botaoApagar.classList.add('apagar');
    botaoApagar.setAttribute('class', 'apagar');
}

function apagarTarefa(el){
    el.parentElement.remove();
    salvaTarefas();
}

function salvaTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listasdeTarefas = [];
    for(let i of liTarefas){
        let tarefaTexto = i.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //trim remover o espaço sobrando da string
        listasdeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listasdeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listasdeTarefas = JSON.parse(tarefas);
    for(let i of listasdeTarefas){
        criaTarefa(i);
    }
}

function criaTarefa(textInput){
    const li = criaLi();
    li.innerText = textInput;
    tarefas.appendChild(li);
    li.classList.add('blz');
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}

adicionaTarefasSalvas();

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);

});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        apagarTarefa(el);
    }
});
