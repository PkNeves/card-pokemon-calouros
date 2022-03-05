function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'pt-br'}, 'google_translate_element');
}
let formulario = 'calouro'

const signos = {
  "aries": {
    url: "./public/images/aries.png",
    color: "linear-gradient(225deg, rgba(241, 14, 14, 1) 50%, rgba(19, 161, 228, 1) 100%)",
    complementar: "rgba(19, 161, 228, 0.6)",
  },
  "touro": {
    url: "./public/images/touro.png",
    color: "linear-gradient(225deg, rgba(216, 121, 242, 1) 50%, rgba(78, 208, 89, 1) 100%)",
    complementar: "rgba(78, 208, 89, 0.6)",
  },
  "gemeos": {
    url: "./public/images/gemeos.png",
    color: "linear-gradient(225deg, rgba(255, 217, 59, 1) 50%, rgba(59, 233, 255, 1) 100%)",
    complementar: "rgba(59, 233, 255, 0.6)",
  },
  "cancer": {
    url: "./public/images/cancer.png",
    color: "linear-gradient(225deg, rgba(123, 123, 123, 1) 50%, rgba(243, 205, 6, 1) 100%)",
    complementar: "rgba(243, 205, 6, 0.6)",
  },
  "leao": {
    url: "./public/images/leao.png",
    color: "linear-gradient(225deg, rgba(255, 124, 43, 1) 50%, rgba(252, 148, 254, 1) 100%)",
    complementar: "rgba(252, 148, 254, 0.6)"
  },
  "virgem": {
    url: "./public/images/virgem.png",
    color: "linear-gradient(225deg, rgba(128, 247, 77, 1) 50%, rgba(240, 128, 128, 1) 100%)",
    complementar: "rgba(240, 128, 128, 0.6)",
  },
  "libra": {
    url: "./public/images/libra.png",
    color: "linear-gradient(225deg, rgba(255, 129, 208, 1) 50%, rgba(33, 188, 255, 1) 100%)",
    complementar: "rgba(33, 188, 255, 0.6)",
  },
  "escorpiao": {
    url: "./public/images/escorpiao.png",
    color: "linear-gradient(225deg, rgba(108, 42, 44, 1) 50%, rgba(238, 129, 29, 1) 100%)",
    complementar: "rgba(238, 129, 29, 0.6)"
  },
  "sagitario": {
    url: "./public/images/sagitario.png",
    color: "linear-gradient(225deg, rgba(62, 10, 82, 1) 50%, rgba(222, 15, 15, 1) 100%)",
    complementar: "rgba(222, 15, 15, 0.6)"
  },
  "capricornio": {
    url: "./public/images/capricornio.png",
    color: "linear-gradient(225deg, rgba(2, 0, 3, 1) 50%, rgba(205, 166, 255, 1) 100%)",
    complementar: "rgba(205, 166, 255, 0.6)",
  },
  "aquario": {
    url: "./public/images/aquario.png",
    color: "linear-gradient(225deg, rgba(21, 97, 201, 1) 50%, rgba(171, 197, 16, 1) 100%)",
    complementar: "rgba(171, 197, 16, 0.6)"
  },
  "peixes": {
    url: "./public/images/peixes.png",
    color: "linear-gradient(225deg, rgba(107, 162, 242, 1) 50%, rgba(42, 242, 242, 1) 100%)",
    complementar: "rgba(42, 242, 242, 0.6)"
  }
}
function trocarFormulario(nome) {
  if (formulario == nome) return;
  else {
    let esconder = formulario
    let mostrar = nome
    formulario = nome
    
    let buttonDesativar = document.querySelector(`#button-${esconder}`)
    buttonDesativar.classList.remove("form-button-active")
    buttonDesativar.classList.add("form-button")
    
    let buttonAtivar = document.querySelector(`#button-${mostrar}`)
    buttonAtivar.classList.add("form-button-active")
    buttonAtivar.classList.remove("form-button")



    let campoMostrar = document.querySelectorAll(`.${mostrar}`)
    let campoEsconder = document.querySelectorAll(`.${esconder}`)

    for (let i = 0; i<campoMostrar.length; i++) {
      campoMostrar[i].style.display = 'flex';
    }
    for (let i = 0; i<campoEsconder.length; i++) {
      campoEsconder[i].style.display = 'none';
    }
  }
}

function poemDadosPokemon(dados) {
  if (dados.status != 200) return
  const name = dados.data.name
  const hp = dados.data.stats[0].base_stat
  const attack = dados.data.stats[1].base_stat
  const defense = dados.data.stats[2].base_stat
  // const img = dados.data.sprites.other['official-artwork'].front_default
  const img = dados.data.sprites.other.dream_world.front_default
  const habilidades = dados.data.abilities
  const tipos = dados.data.types
  let habilidades_name = ''
  let tipos_name = ''

  for(let i=0; i<habilidades.length; i++) {
    habilidades_name += habilidades[i].ability.name + ' / '
  }
  for(let i=0; i<tipos.length; i++) {
    tipos_name += tipos[i].type.name + ' / '
  }

  const htmlName = document.querySelector('#pokemon').innerHTML = name
  const htmlHp = document.querySelector('#hp').innerHTML = hp
  const htmlAttack = document.querySelector('#attack').innerHTML = attack
  const htmlDefense = document.querySelector('#defense').innerHTML = defense
  const htmlImg = document.querySelector('#img-pokemon').src = img
  const htmlHabilidades = document.querySelector('#habilidades').innerHTML = habilidades_name
  const htmlTipos = document.querySelector('#tipos').innerHTML = tipos_name
}

async function pegaDadosPokemon(nome) {
  nome = nome.toLowerCase()
  nome = nome.replace(/\s/g, '')
  let count = 0
  for (let i = 0; i<nome.length; i++) {
    count += nome.charCodeAt(i)
  }
  let pokemonNumber = (count % 151) + 1

  let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
  poemDadosPokemon(data)
  }

function putImage(name) {
  let output = document.querySelector(`#${name}`);
  let event = document.querySelector(`input[name=${name}]`)
  output.src = URL.createObjectURL(event.files[0]);
  // output.onload = function() {
  //   URL.revokeObjectURL(output.src) // free memory
// };
}

async function confirma() {
  let cartaBotao = document.querySelector("#carta-botao")
  let margem = document.querySelector("#margem")
  let atributos = document.querySelectorAll(".atributos")
  let form = document.querySelector("#form-total")
  let inputs = form.querySelectorAll('input')
  let principalNome = '';
  let idade = '';

  // put signo image
  let select = form.querySelector("#select-img-signo")
  let signo = select.value;
  if (signo != '') {
    let imgSigno = document.querySelector('#img-signo')
    imgSigno.src = signos[signo].url
  }
  
  for (let i=0; i<inputs.length; i++) {
    let campo = inputs[i].name
    // put character image
    if (campo === 'img-character') {
      if (inputs[i].files.length > 0) {
        putImage('img-character')
      }
      continue
    }
    if (campo == 'nome') {
      principalNome = inputs[i].value == '' ? "Ash" : inputs[i].value
      inputs[i].value = principalNome
    } else if (campo == 'idade') {
      idade = inputs[i].value
    } else {
      inputs[i].value = inputs[i].value == '' ? "-" : inputs[i].value
    }
    // put other fields
    let span = document.querySelector(`#${inputs[i].name}`)
    span.innerHTML = inputs[i].value

    // var node = document.getElementById('margem');

  
  }

  let combinacao = principalNome+idade

  await pegaDadosPokemon(combinacao)
  

  for (let i =0; i<atributos.length; i++) {
    atributos[i].style.backgroundColor = signos[signo].complementar
  }

  // alter visualization
  form.style.display = 'none'
  cartaBotao.style.display = 'flex'
  // margem.style.backgroundColor = signos[signo].color
  margem.style.background = signos[signo].color

}

function salvar() {
  var node = document.getElementById('margem');

  domtoimage.toPng(node)
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-card-pokemon.png';
      link.href = dataUrl;
      link.click();
      link.remove();
});
}
function voltar() {
  let cartaBotao = document.querySelector("#carta-botao")
  let form = document.querySelector("#form-total")
  form.style.display = 'flex'
  cartaBotao.style.display = 'none'
}