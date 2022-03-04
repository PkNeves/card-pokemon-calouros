function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'pt-br'}, 'google_translate_element');
}
let formulario = 'calouro'

const signos = {
  "aries": {
    url: "./public/aries.png",
    color: "#F30D0D",
    complementar: "#01adff",
  },
  "touro": {
    url: "./public/touro.png",
    color: "#D879F2",
    complementar: "#91da97",
  },
  "gemeos": {
    url: "./public/gemeos.png",
    color: "#FFD93B",
    complementar: "#3be9ff",
  },
  "cancer": {
    url: "./public/cancer.png",
    color: "#FFFFFF",
    complementar: "fa7f72",
  },
  "leao": {
    url: "./public/leao.png",
    color: "#FF7A28",
  },
  "virgem": {
    url: "./public/virgem.png",
    color: "#80F74D",
    complementar: "#f08080",
  },
  "libra": {
    url: "./public/libra.png",
    color: "#FF81D0",
    complementar: "#81ffd8",
  },
  "escorpiao": {
    url: "./public/escorpiao.png",
    color: "#6C2A2C",
    complementar: "#9f6d6b"
  },
  "sagitario": {
    url: "./public/sagitario.png",
    color: "#3E0A52",
    complementar: "#b8860b"
  },
  "capricornio": {
    url: "./public/capricornio.png",
    color: "#020003",
    complementar: "#fffff0",
  },
  "aquario": {
    url: "./public/aquario.png",
    color: "#1561C9",
    complementar: "#c5de00"
  },
  "peixes": {
    url: "./public/peixes.png",
    color: "#6BA2F2",
    complementar: "#cfc48e"
  }
}
const ids = ['nome', 'img-signo', 'img-pokemon', 'img-character', 'pronome', 'twitter', 'instagram', 'idade', 'cidade', 'sexual', 'politica', 'hobbies', 'bebe', 'drogas', 'animes', 'relacionamento']

function trocarFormulario() {
  if (formulario == 'simples') {
    formulario = 'calouro'
    let label = document.querySelector("#label-formulario").innerHTML = "Formulário Calouro"
    let camposSimples = document.querySelectorAll(".simples")
    let camposCalouros = document.querySelectorAll(".calouro")

    for (let i = 0; i<camposSimples.length; i++) {
      camposSimples[i].style.display = 'none';
    }
    for (let i = 0; i<camposCalouros.length; i++) {
      camposCalouros[i].style.display = 'block';
    }
  } else {
    formulario = 'simples'
    let label = document.querySelector("#label-formulario").innerHTML = "Formulário Simples"

    let camposSimples = document.querySelectorAll(".simples")
    let camposCalouros = document.querySelectorAll(".calouro")

    for (let i = 0; i<camposSimples.length; i++) {
      camposSimples[i].style.display = 'block';
    }
    for (let i = 0; i<camposCalouros.length; i++) {
      camposCalouros[i].style.display = 'none';
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
  let pokemonNumber = count % 151

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
  margem.style.backgroundColor = signos[signo].color

//   domtoimage.toPng(margem)
//   .then(function (dataUrl) {
//       let link = document.querySelector("#salvar")
//       // var link=window.URL.createObjectURL(blob);
//       // window.location=link;
//       // var link = document.createElement('a');
//       link.download = 'my-card-pokemon.png';
//       link.href = dataUrl;

//       // link.click();
//       // link.remove();
// });
}

function salvar() {
  var node = document.getElementById('margem');

  domtoimage.toPng(node)
  .then(function (dataUrl) {
      // var link=window.URL.createObjectURL(blob);
      // window.location=link;
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