/**1.- Utilice Ajax para consumir la api https://randomuser.me/api/ que retorna en cada 
petición los datos de perfil de un usuario fake. 
Primero verifique en el navegador la api y compruebe que información retorna. 
Utilice el visor de Json del sitio http://jsonviewer.stack.hu/ para pegar el texto plano de 
json y con el visor facilitar el análisis de la respuesta. 
Realice una página con un botón que permita mostrar los principales datos e imagen 
pequeña del perfil recuperado en forma de lista. Agregue a cada entrada un botón para 
eliminar esa entrada cuando sea necesario.  */

//let contenedor= document.createElement("div");
//contenedor.className+="container";
const columna = document.createElement("div");
columna.className="col-3";
let contenedor= document.getElementById("contenedor")
function funcEliminar(a){
document.getElementById(a).remove();
}
function recuperar(){    
    fetch("https://randomuser.me/api/").
    then(response => response.json()).
    then(usuario=>{
        let div =document.createElement("div")
        let nombre=`Nombre: ${usuario.results[0].name.title} ${usuario.results[0].name.first} ${usuario.results[0].name.last} <br>`;
        let direccion= `Direccion: ${usuario.results[0].location.street.name} ${usuario.results[0].location.street.number}<br>`;
        let ciudad= `Ciudad: ${usuario.results[0].location.city}, Estado: ${usuario.results[0].location.state}, Pais: ${usuario.results[0].location.country}<br>`
        let email= `E-mail: ${usuario.results[0].email}<br>`;
        let edad= `Edad: ${usuario.results[0].dob.age}<br>`;
        let foto=`${usuario.results[0].picture.medium}`;
        let id= `${usuario.results[0].id.value}`
        id= id.replace();
        console.log(id);
        let imagen= document.createElement("img");
        imagen.setAttribute("src", foto);
        imagen.className= "imagenes";
        console.log(nombre);  
        let eliminar= document.createElement("button");
        eliminar.innerHTML="Eliminar";
        eliminar.setAttribute("onclick", `funcEliminar(${id})`);
        const columna = document.createElement("div");
        columna.className="col-6 border bg-primary text-white rounded";
        columna.innerHTML=nombre + direccion + ciudad+ email+ edad;
        div.setAttribute("id", id);
        div.appendChild(columna);
        div.appendChild(imagen);
        div.appendChild(eliminar)
        contenedor.appendChild(div)
        
    });
    
}

