var xhr = new XMLHttpRequest();
document.getElementById("crear-empleado-12345").addEventListener("click", function(event) {
    xhr.open('POST', '/empleados');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    event.preventDefault();
    xhr.onload = function() {
        var res = JSON.parse(xhr.response);
        console.log(xhr.responseText);
        if (!res.err) {
            alert('Registro exitosamente guardado\n ' + JSON.stringify(res.empleado));
        } else {
            alert(JSON.stringify(res.error));
        }
    };
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var empresa = document.getElementById("empresa").value;
    xhr.send(`nombre='${nombre}'&&apellido='${apellido}'&&empresa=${empresa}`);
});