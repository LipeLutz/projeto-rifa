const guardarLocalStorage = (client) => localStorage.setItem(`rifa`, JSON.stringify(client))

const pegarLocalStorage = () => JSON.parse(localStorage.getItem('rifa')) ?? []

const td = document.querySelectorAll('td')

const limpaInputs = () =>{
    document.getElementById('inputNome').value = ''
    document.getElementById('inputNumero').value = ''
}

const jaExisteCadastro = (client) =>{
    
    const dbClient = pegarLocalStorage()

    dbClient.map((item, index) =>{
        if(item.numero === client.numero){
            console.log('São iguais')
            console.log(item.numero)
            console.log(client.numero)

            alert('Este número já foi cadastrado')
            localStorage.removeItem(item.numero)
        } 
        /*else{
            guardarLocalStorage(dbClient)
        }
            //return alert('Tudo certo')
        */
    })
}

const cadastraContribuinte = () =>{
    const client ={
        nome: document.getElementById('inputNome').value,
        numero: document.getElementById('inputNumero').value
    }

    const dbClient = pegarLocalStorage()

    if(client.nome === '' || client.numero === ''){
        alert('Preencha todos os campos!')
    } else if(jaExisteCadastro(client)){
        alert('Este número já foi cadastrado')
    } else{
        createClient(client)
        if(td.item(client.numero - 1).innerText === client.numero){
            td.item(client.numero - 1).style.backgroundColor = '#49a09d'
        }
    }

    //console.log(td.item(client.numero - 1))
    //console.log(client.numero)
}

const createClient = (client) =>{
    const dbClient = pegarLocalStorage()
    dbClient.push(client)
    guardarLocalStorage(dbClient)
    limpaInputs() 
}
