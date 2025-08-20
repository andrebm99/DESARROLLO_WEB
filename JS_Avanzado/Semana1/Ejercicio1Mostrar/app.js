const inspeccionar = (v) => ({
    valor: v,
    tipo: typeof v,
    esArray: Array.isArray(v)
});

function validar(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = Number(document.getElementById('edad').value);
    const suscrito = document.getElementById('suscrito').value;

    // Intereses con array
    const checks = Array.from(document.querySelectorAll('input[name="intereses"]:checked'));
    const intereses = checks.map(c => c.value);

    // Validando que nombre sea >= que 3 caracteres y que solo tenga espacios y letras
    const nombreValidadoTamaño = nombre.length >= 3;
    const nombreValidadoLetras = /^[A-Za-zÀ-ÿ\s]+$/.test(nombre); 
    const edadValidada = Number.isInteger(edad) && edad >= 0 && edad <= 120; 
    
    if(!nombreValidadoTamaño){
        alert('Nombre invalido. Debe tener almenos 3 caracteres');
        return false; 
    } 
    if (!nombreValidadoLetras) {
        alert('No se permiten caracteres que no sean Letras o Espacios');
        return false;
    }
    if(!edadValidada){
        alert('Edad inválida!. Debe ser un enterio mayor o igual a 0 y menor o igual que 120.');
        return false; 
    } 
    // Construyendo el objeto de salida y aplicar inspección

    const datos = { nombre, edad:edad, intereses, suscrito };

    const inspeccion = {
        nombre: inspeccionar(nombre),
        edad: inspeccionar(edad),
        intereses: inspeccionar(intereses),
        suscrito: inspeccionar(suscrito)
    };

    console.clear();
    console.log('Datos capturados:', datos);
    console.log('Inspección de tipos:', inspeccion);

    // Confirmamos el envio del formulario

    if(confirm('¿Deseas confirmar el envio de estos datos?')){
        document.getElementById('salida').textContent = JSON.stringify({ datos,inspeccion }, null, 2);
    } else{
        document.getElementById('salida').textContent = 'Envio cancelado por el usuario.';
    }

    return false; 

    
}