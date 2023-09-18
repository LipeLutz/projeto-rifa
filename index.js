const guardarLocalStorage = (client) => localStorage.setItem(`rifa`, JSON.stringify(client))

const pegarLocalStorage = () => JSON.parse(localStorage.getItem('rifa')) ?? []

const td = document.querySelectorAll('td')
const btnSorteio = document.getElementById('btn-sorteio')
const btnSortearNovamente = document.getElementById('sortearNovamente')

const limpaInputs = () =>{
    document.getElementById('inputNome').value = ''
    document.getElementById('inputNumero').value = ''
}

const colorTable = () =>{
    const dbClient = pegarLocalStorage()

    dbClient.map((arr) =>{
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

const hundred = () =>{
    const dbClient = pegarLocalStorage()
    if(dbClient.length == 10){
        document.getElementById('inputNumero').setAttribute('readonly', true)
        document.getElementById('inputNome').setAttribute('readonly', true)

        return true
    }
        return false
}

const sorteioVencedor = (randomNumber) =>{
    document.getElementById('loadingParticipante').style.display = 'block'
    document.getElementById('main').style.display = 'none'
    console.log(randomNumber)
    setTimeout( () =>{
        document.getElementById('loadingParticipante').style.display = 'none'
        document.getElementById('main').style.display = 'none'
        document.getElementById('participanteSorteado').style.display = 'block'
        document.getElementById('numeroSorteado').innerText = randomNumber
    }, 3000)
}

const nomeVencedor = (randomNumber) =>{
    const dbClient = pegarLocalStorage()
    dbClient.map(arr =>{
        if(arr.numero == randomNumber && arr.numero > 0){
            document.getElementById('nomeParticipante').innerText = `Parabéns, ${arr.nome}, hoje é o seu dia de sorte :). Você acaba de ganhar a rifa da simone!!! Entre em contato com ela para receber o seu prêmio. `
            console.log(arr.nome)
        }
    })
}

btnSorteio.addEventListener('click', () =>{
    const dbClient = pegarLocalStorage()
    console.log(dbClient.length)
    if(hundred()){
        const randomNumber = Math.floor(Math.random() * dbClient.length)
        if(randomNumber == 0){
            return
        } else{
            sorteioVencedor(randomNumber)
            nomeVencedor(randomNumber)
        }
    } else {
        alert('O número de contribuintes ainda não é o suficiente para realizar o sorteio')
    }
})

btnSortearNovamente.addEventListener('click', () =>{
    document.getElementById('loadingParticipante').style.display = 'none'
    document.getElementById('main').style.display = 'block'
    document.getElementById('participanteSorteado').style.display = 'none'
})


hundred()
colorTable()