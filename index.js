const guardarLocalStorage = (client) => localStorage.setItem(`rifa`, JSON.stringify(client))

const pegarLocalStorage = () => JSON.parse(localStorage.getItem('rifa')) ?? []

const td = document.querySelectorAll('td')
const btnSorteio = document.getElementById('btnSorteio')

const limpaInputs = () =>{
    document.getElementById('inputNome').value = ''
    document.getElementById('inputNumero').value = ''
}

const colorTable = () =>{
    const dbClient = pegarLocalStorage()

    dbClient.map((arr) =>{
        console.log(arr)
        td.item(arr.numero - 1).style.backgroundColor = '#49a09d'
    })
}

const jaExisteCadastro = (client) =>{
    
    const dbClient = pegarLocalStorage()

    dbClient.map((item, index) =>{
        if(item.numero === client.numero){
            document.getElementById('erro').style.display = 'block'
            document.getElementById('sucesso').style.display = 'none'
            //alert('Este número já foi cadastrado')
            client.numero.pop()
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

    if(client.nome === '' || client.numero === ''){
        alert('Preencha todos os campos!')
    } else if(jaExisteCadastro(client)){
        alert('Este número já foi cadastrado')
    } else{
        document.getElementById('sucesso').style.display = 'block'
        document.getElementById('erro').style.display = 'none'
        setTimeout(() =>{
            createClient(client)
            location.reload()
        }, 2000)
    }
}

const createClient = (client) =>{
    const dbClient = pegarLocalStorage()
    dbClient.push(client)
    guardarLocalStorage(dbClient)
    limpaInputs() 
}

colorTable()

/*
btnSorteio.addEventListener('click', () =>{
    const dbClient = pegarLocalStorage()
    console.log(dbClient)
    console.log(dbClient.length)
    if(dbClient.length == 100){
        console.log('Número de pessoas atingido')
    }
})
*/

