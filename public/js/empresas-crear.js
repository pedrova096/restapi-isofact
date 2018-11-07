var xhr = new XMLHttpRequest();
document.getElementById("crear-empresa-12345").addEventListener("click", function(event) {
    xhr.open('POST', '/empresas');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    event.preventDefault();
    xhr.onload = function() {
        var res = JSON.parse(xhr.response);
        if (!res.err) {
            alert('Registro exitosamente guardado\n ' + JSON.stringify(res.empresa));
        } else {
            alert(JSON.stringify(res.error));
        }
    };
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    xhr.send(`nombre='${nombre}'&&descripcion='${descripcion}'`);
});