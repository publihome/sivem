
const estadoSelect =  document.getElementById('estadoselect');


$('#estadoselect').change(function(e){
    $("#municipioselect option[value!='']").remove();

    e.preventDefault();
    datos="";

})

estadoSelect.addEventListener('change', function(e){
    e .preventDefault()
    let estado = this.value.split(',');
    estado = estado[1].replace(/[\u0300-\u036f]/g, "");
    console.log(estado)
    obtenerMunicipios(estado)
})

async function obtenerMunicipios(estado){
    try{
        const res = await fetch(`https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/${estado}`)
        const data = await res.json()
        console.log(data.response.municipios)
        agregarMunicipiosSelect(data.response.municipios)
    }catch(err){
    console.log(err)
    }
}

function agregarMunicipiosSelect(municipios){
    let municipioselect = document.querySelector('#municipioselect')
    let option;
    for(let i=0; i<municipios.length; i++){
        option =  document.createElement('option')
        option.text =municipios[i]
        option.value = municipios[i]
        municipioselect.appendChild(option)
    }
}


  $('#guardarespectacular').submit(function(e){
      e.preventDefault()
      var formdata = new FormData($("#guardarespectacular")[0]);
      $.ajax({
          url:'guardarespectacular',
          type:$("#guardarespectacular").attr("method"),
          data: formdata,
          cache: false,
          contentType: false,
          processData: false,
      })
      .done(function(response){
        console.log(response)
        let res = JSON.parse(response)
        console.log(res)
          if(res.success){
              alertify.success(res.success)
              $('#guardarespectacular')[0].reset();
          }
          if(res.error){
            alertify.error(error)
          }
      })
      .fail(function(err){
        alertify.error(err)


      })
  })


// estadoSelect.addEventListener('change', function(e){
//     e.preventDefault()
//     console.log(this.value)
// })




function CalculaPrecio(){
let material = document.getElementById('material').value;
let inputAncho = parseFloat(document.getElementById('ancho').value);
let inputAlto = parseFloat(document.getElementById('alto').value);
console.log(material)
if(material != ""){
    calcularArea(inputAncho, inputAlto)
}
}


function calcularArea(b,h){
    let inputCostoInstalacion =  document.getElementById("instalacion")
    let a = b * h
    let costo =0;
    if(a>50){
        costo = 1200
    }else{
        costo = 800
    }
    inputCostoInstalacion.value = costo
     calcularCostoImpresion(a,costo)
}

function calcularCostoImpresion(a,costo) {
let material = document.getElementById('material').value;

    let precio = document.getElementById('precio');
    let mat = material.split(',')

    let costoimpresion = a * mat[1];

    let costototal = (costoimpresion + costo)
    window.costoimpreso.value = costoimpresion
    precio.value= costototal
    console.log(costoimpresion)
}


/*-------------------------------------- E D I T A R   E S P E C T A C U L A R -----------------------------------------------------*/

$("#editarespectacular").submit(function(e){
    e.preventDefault();
    var formdata = new FormData($("#editarespectacular")[0]);
          $.ajax({
              url:'../guardarCambiosEspectacular',
              type: $("#editarespectacular").attr("method"),  
              data: formdata,
              cache: false,
               contentType: false,
              processData: false,
              })
              .done(function(response){
                  let res = JSON.parse(response);
                  if(res.success){
                      alertify.success(res.success);
                  }
                  if(res.error){
                    alertify.error(res.error);
                  }
              })
              .fail(function(err){
                  alertify.error(err);
              })
    })

/*---------------- E L I M I N A R   E S P E C T A C U L A R------------------------ */

function eliminarEspectacular(id){
   console.log(id);
       $.ajax({
        url: 'espectaculares/eliminarEspectacular',
         dataType: 'json',
         data: {id:id},
         type:"post",
       })
       .done(function(response){
         console.log(response)
         window.location.reload();
       })
      .fail(function(err){
         console.log("error")
       })

}




/*-------------------------------  jquery mask--------------------------------- */




$(document).ready(function(){
    $('#numero').mask('00000');
    $('#telefono').mask('000-000-00-00');
    $('#celular').mask('000-000-00-00');
})




/* ------------------------ S E L E C T  2 ---------------------  */


$('#municipioselect').select2();


