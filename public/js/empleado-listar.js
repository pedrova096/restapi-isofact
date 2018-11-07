var xhr = new XMLHttpRequest();
xhr.open('GET', '/empleados');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    var tabla = document.getElementById('content-emp-123456');
    var res = JSON.parse(xhr.response);
    var contentSTR = '';
    if (!res.err) {
        res.empleados.forEach(emr => {
            contentSTR += '<tr>';
            contentSTR += '<td><button data-id="' + emr._id + '">Borrar</button></td>';
            contentSTR += '<td><button data-id="' + emr._id + '">Editar</button></td>';
            contentSTR += '<td>' + emr.nombre + '</td>';
            contentSTR += '<td>' + emr.apellido + '</td>';
            contentSTR += '<td>' + emr.empresa.nombre + '</td>';
            contentSTR += '</tr>';
        });
        tabla.innerHTML = contentSTR;
    } else {
        alert(res.error);
    }
    console.log(xhr.response);
};
xhr.send();