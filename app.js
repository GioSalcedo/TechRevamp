let scrollContainer = document.getElementsByClassName('scroll-container');
//Cuando llamo por classname, los elementos se guardan en un arreglo, en este caso, arreglo de 1 solo elemento.

let scroll1 = document.getElementsByClassName('scroll-1');
let scroll2 = document.getElementsByClassName('scroll-2');

scrollContainer[0].addEventListener('mouseover', pauseAnimation)
scrollContainer[0].addEventListener('mouseout', resumeAnimation)

// Función para pausar la animación
function pauseAnimation(){
    scroll1[0].style.animationPlayState = 'paused';
    scroll2[0].style.animationPlayState = 'paused';
}

// Función para reanudar la animación
function resumeAnimation(){
    scroll1[0].style.animationPlayState = 'running';
    scroll2[0].style.animationPlayState = 'running';
}

let mainContents = document.getElementsByClassName('value-card-main-content');

// ciclo for para crear un evento para cada tarjeta
for(element of mainContents){
    element.addEventListener('mouseover', function(e){
        setTimeout(()=>{
            e.target.parentElement.children[0].style.visibility = 'visible';
        }, 100)
    })
    element.addEventListener('mouseout', function(e){
        e.target.parentElement.children[0].style.visibility = 'hidden';
    })
}

//al momento de hacer mouseover, el for ya se ha ejecutado y el element es la última tarjeta del arreglo.
//la función necesita recibir el parámetro e para obtener el elemento especifico al que le hago mouseover (a traves de e.target) --> console.log(e.target) imprime img
//Como el mouseover se está linkeando a la imágen, necesitamos acceder al children 0 del padre (card-description)



//Esto que sigue es mi intento de que la animación en el texto ocurra apenas tocando el scroll, no solo la imagen...pero no, funciona mejor del otro modo.

// for(element of scroll1){
//     element.addEventListener('mouseover', function(e){
//         e.target.children[0].children[1].children[0].style.visibility = 'visible';
//         e.target.children[0].children[1].children[1].style.opacity = "0.1";
//     })
//     element.addEventListener('mouseout', function(e){
//         e.target.children[0].children[1].children[0].style.visibility = 'hidden';
//         e.target.children[0].children[1].children[1].style.opacity = "1";
//     })
// }
// for(element of scroll2){
//     element.addEventListener('mouseover', function(e){
//         e.target.children[0].children[1].children[0].style.visibility = 'visible';
//         e.target.children[0].children[1].children[1].style.opacity = "0.1";
//     });
//     element.addEventListener('mouseout', function(e){
//         e.target.children[0].children[1].children[0].style.visibility = 'hidden';
//         e.target.children[0].children[1].children[1].style.opacity = "1";
//     })
// }



