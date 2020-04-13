
export function fechaParseada(fecha){
    var fechaRecibida = new Date(fecha);    
    return (
    " " +
    fechaRecibida.getDate() + "/" +
    parseInt(fechaRecibida.getMonth() + 1) +
    "/" +
    fechaRecibida.getFullYear() + 
    " " 
    +
    fechaRecibida.getHours() + 
    ":" 
    +
    fechaRecibida.getMinutes()
    );
}

export function fechaParseadaCorta(fecha){
    var fechaRecibida = new Date(fecha);    
    return (
    fechaRecibida.getDate() + "/" +
    parseInt(fechaRecibida.getMonth() + 1) +
    "/" +
    fechaRecibida.getFullYear()
    );
}

export function horaParseada(fecha){
    var fechaRecibida = new Date(fecha);    
    return (
    " " +
    fechaRecibida.getHours() + 
    ":" 
    +
    fechaRecibida.getMinutes()
    );
}