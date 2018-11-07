var xhr = new XMLHttpRequest();
xhr.open('GET', '/empresas');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    var tabla = document.getElementById('content-emr-123456');
    var res = JSON.parse(xhr.response);
    var contentSTR = '';
    if (!res.err) {
        res.empresas.forEach(emr => {
            contentSTR += '<tr>';
            contentSTR += '<td><button data-id="' + emr._id + '">Borrar</button></td>';
            contentSTR += '<td><button data-id="' + emr._id + '">Editar</button></td>';
            contentSTR += '<td>' + emr.nombre + '</td>';
            contentSTR += '<td>' + (emr.descripcion || '') + '</td>';
            contentSTR += '</tr>';
        });
        tabla.innerHTML = contentSTR;
    } else {
        alert(res.error);
    }
    console.log(xhr.response);
};
xhr.send();