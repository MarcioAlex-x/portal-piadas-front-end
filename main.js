document.addEventListener('DOMContentLoaded',()=>{
    const nome = document.querySelector('.nome')
    const historia = document.querySelector('.historia')
    const autor = document.querySelector('.autor')
    const menu = document.querySelector('.menu')
    const piadaDiv = document.querySelector('.piada')
    const message = document.querySelector('.message')
    const form = document.querySelector('.form')


    const criarPiada = async () =>{
        const piada = {
            nome:nome.value,
            historia:historia.value,
            autor:autor.value
        }

        try{
            const req = await fetch('https://piadas-server-zk68.vercel.app/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(piada)
            })

            nome.value = ''
            historia.value = ''
            autor.value = ''

            listarPiadas()
        }catch(err){
            message.innerHTML = 'Ocorreu um erro ao tentar salvar a sua piada!'
            setTimeout(()=>{
                message.innerHTML = ''
            },5000)
        }

    }

    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        criarPiada()
    })

    const listarPiadas = async () =>{
        const req = await fetch('https://piadas-server-zk68.vercel.app/')
        const res = await req.json()
        
        menu.innerHTML = ''

        res.forEach((piada)=>{

            const link = document.createElement('a')
            link.href = '#'
            link.textContent = piada.nome + ' - ' + piada.autor
            link.style.display = 'block'
            const hr = document.createElement('hr')

            link.addEventListener('click',(e)=>{
                e.preventDefault()
                mostrarPiada(piada)
            })

            menu.appendChild(link)
            // menu.appendChild(hr)
        })
    }

    const mostrarPiada = (piada) =>{
        piadaDiv.innerHTML = `
            <h2>${piada.nome}</h2>
            <p>${piada.historia}</p>
            <small>Autor: ${piada.autor}</small>
        `
    }

    listarPiadas()

    
})