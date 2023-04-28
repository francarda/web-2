/**1.- Utilice Ajax para consumir la api https://randomuser.me/api/ que retorna en cada 
petición los datos de perfil de un usuario fake. 
Primero verifique en el navegador la api y compruebe que información retorna. 
Utilice el visor de Json del sitio http://jsonviewer.stack.hu/ para pegar el texto plano de 
json y con el visor facilitar el análisis de la respuesta. 
Realice una página con un botón que permita mostrar los principales datos e imagen 
pequeña del perfil recuperado en forma de lista. Agregue a cada entrada un botón para 
eliminar esa entrada cuando sea necesario.  */

const columna = document.createElement("div");
columna.className="col-3";
let contenedor= document.getElementById("contenedor");
let hombres= document.getElementById("hombres");
let mujeres= document.getElementById("mujeres")

function funcEliminar(a){
document.getElementById(a).remove();
}
let arreglo=[]
function recuperar(){    
    
    fetch("https://randomuser.me/api/").
    then(response => response.json()).
    then(usuario=>{
        arreglo.push(usuario.results[0]);
        objetos(usuario.results[0]);

    }).catch(error=>console.log("error al cargar desde api"))
}
let selector= document.getElementById("seleccion");
let paises=[]

function objetos(usuario){
    let div =document.createElement("div")
    let nombre=`Nombre: ${usuario.name.first} ${usuario.name.last} <br>`;
    //let direccion= `Direccion: ${usuario.location.street.name} ${usuario.location.street.number}<br>`;
    //let ciudad= `Ciudad: ${usuario.location.city}, Estado: ${usuario.location.state}, Pais: ${usuario.location.country}<br>`
    let email= `E-mail: ${usuario.email}<br>`;
    // let edad= `Edad: ${usuario.dob.age}<br>`;
    let foto=`${usuario.picture.medium}`;
    let id= `${usuario.login.uuid}`;
    let pais= `${usuario.location.country}`;
    if(!paises.includes(pais)){
        paises.push(pais)
        let option= document.createElement("option");
        option.innerHTML=pais;
        option.setAttribute("value", pais)
        selector.appendChild(option)
    }
    console.log(id);
    let imagen= document.createElement("div");
    imagen.style.backgroundImage= "url(" + foto + ")";
    imagen.style.backgroundSize = "cover"
    imagen.className= "imagenes";
    
    imagen.addEventListener("mouseover", function(event){
        let dev= document.createElement("div")
        dev.innerHTML=`${usuario.name.title} ${usuario.name.first} ${usuario.name.last} <br> telefono: ${usuario.phone} `
        dev.classList.add("cartel");
        /*event.target.appendChild(dev)*/
        event.target.parentNode.appendChild(dev)
    event.target.style.backgroundColor= "white"
    },false);

    imagen.addEventListener("mouseout", function(event){
        //event.target.innerHTML="" ;
        let actual= event.target;
        let ultimo= actual.nextSibling.nextSibling;

        actual.parentNode.removeChild(ultimo)
    })


    console.log(nombre);  
    let eliminar= document.createElement("button");
    eliminar.innerHTML="Eliminar";
    eliminar.className= "btn color eliminar";
    eliminar.setAttribute("onclick", `funcEliminar("${id}")`);
    const columna = document.createElement("div");
    columna.className="border bg-primary text-white rounded datos";
    columna.innerHTML= nombre + email;
    div.setAttribute("id", id);
    div.className="id"
    div.appendChild(columna);
    div.appendChild(imagen);
    div.appendChild(eliminar)
    //contenedor.appendChild(div)
    if(`${usuario.gender}` == "male"){
        hombres.appendChild(div)
    }else{
        mujeres.appendChild(div)
    }

}

function cantidad(){
    arreglo= [];
    selector.innerHTML= '<option value="value1" selected>---</option>'
    hombres.innerHTML="";
    mujeres.innerHTML="";  
    let numero = document.getElementById("num").value;
    let visual = document.getElementById("visual")
    visual.classList.remove("d-none")
    
    for(let i =0; i<numero; i++){
        recuperar();
    };
  
};
function filtrar(){
    let numero= document.getElementById("antiguedad").value;
    let filtrados = arreglo.filter(user=> (parseInt(`${user.registered.age}`) > numero) );
    hombres.innerHTML="";
    mujeres.innerHTML="";
    filtrados.forEach(usuario=>objetos(usuario))
}
function original(){
    hombres.innerHTML="";
    mujeres.innerHTML="";
    arreglo.forEach(usuario=> objetos(usuario))
}
function ordenar(){
    arreglo.sort(function(a, b) {
        if (a.name.last > b.name.last) {
          return 1;
        }
        if (a.name.last < b.name.last) {

          return -1;
        }
        return 0;
      });
    //arreglo.sort(((a, b) => a.name.last - b.name.last));
    hombres.innerHTML="";
    mujeres.innerHTML="";
    arreglo.forEach(usuario=> objetos(usuario))

}
function seleccion1(){
    let aux= `${selector.value}`;
    let filt= arreglo.filter(user => (`${user.location.country}`==`${aux}`));
    console.log(aux);
    console.log(filt)
    hombres.innerHTML="";
    mujeres.innerHTML="";
    filt.forEach(usuario=> objetos(usuario))
}