// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur",(evento)=>{
//     validarNacimiento(evento.target);
// });

export function validar(input){
    const tipoDeImput = input.dataset.tipo;
    if(validadores[tipoDeImput]){
        validadores[tipoDeImput](input);
    }

    //console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message--error").innerHTML=""
    }else{
        input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeImput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "tyMismatch",
    "patternMismatch",
    "customError"
];
    


const mensajesDeError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email:{
        valueMissing: "El campo email no puede estar vacio",
        typeMismath: "El correo no es valido"
    },
    password:{
        valueMissing: "el campo password no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "El campo fecha no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing:"El campo numero no puede estar vacio",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion:{
        valueMissing:"El campo direccion no puede estar vacio",
        patternMismatch:"La direccion debe tener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing:"El campo ciudad no puede estar vacio",
        patternMismatch:"La ciudad debe tener entre 10 a 40 caracteres"
    },
    estado:{
        valueMissing:"El campo estado no puede estar vacio",
        patternMismatch:"La estado debe tener entre 10 a 40 caracteres"
    }

}

const validadores={
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeImput, input){
    let mensaje= "";
    tipoDeErrores.forEach(error=>{
        if(input.validity[error]){
            console.log(tipoDeImput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeImput][error]);
            mensaje = mensajesDeError[tipoDeImput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    mayorEdad(fechaCliente);
    let mensage = "";
    if(!mayorEdad(fechaCliente)){
        mensage = "Debes de tener almenos 18 años de edad"
    }
    input.setCustomValidity(mensage);   
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    
    return (diferenciaFechas <= fechaActual);
    
}