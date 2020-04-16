
export function fechaParseada(fecha) {
    var fechaRecibida = new Date(fecha);
    let minutos = (fechaRecibida.getMinutes() < 10 ? '0' : '') + fechaRecibida.getMinutes();
    let horas = (fechaRecibida.getHours() < 10 ? '0' : '') + fechaRecibida.getHours();
    return (
        " " +
        fechaRecibida.getDate() + "/" +
        parseInt(fechaRecibida.getMonth() + 1) +
        "/" +
        fechaRecibida.getFullYear() +
        " "
        +
        horas +
        ":"
        +
        minutos
    );
}

export function fechaParseadaCorta(fecha) {
    var fechaRecibida = new Date(fecha);
    return (
        fechaRecibida.getDate() + "/" +
        parseInt(fechaRecibida.getMonth() + 1) +
        "/" +
        fechaRecibida.getFullYear()
    );
}

export function horaParseada(fecha) {
    var fechaRecibida = new Date(fecha);
    let minutos = (fechaRecibida.getMinutes() < 10 ? "0" : "") + fechaRecibida.getMinutes();
    let horas = (fechaRecibida.getHours() < 10 ? "0" : "") + fechaRecibida.getHours();
    return (
        " " +
        horas +
        ":"
        +
        minutos
    );
}