const IGV = 0.18;

const items = [
    { nombre: 'Mouse', precio: 50, tipo: 'general' },
    { nombre: 'Atún en lata', precio: 8, tipo: 'alimento' },
    { nombre: 'Libro', precio: 35, tipo: 'libro' }
];

function impuestoPorTipo(tipo){
    switch(tipo){
        case 'general':
        case 'libro':
            return 0;
        default:
            return IGV;

    }
}

function calcular(){
    // Capturar cantidades de la tabla

    const inputs = Array.from(document.querySelectorAll('tbody input[type="number"]'));
    const cantidades = {};

    for(const el of inputs){
        const nombre = el.getAttribute('data-item');
        cantidades[nombre] = Number(el.value);
    }

    // Recorrer los items y calcular

    const detalle = [];
    let subtotal = 0;
    let impuestoTotal = 0;
    
    for(const it of items){
        const qty = Math.max(0, Number(cantidades[it.nombre] || 0));
        if(qty === 0) continue;
        const imp = impuestoPorTipo(it.tipo);
        const monto = it.precio * qty;
        const impuesto = monto * imp; 

        subtotal += monto; 
        impuestoTotal += impuesto; 
        detalle.push({ ...it, cantidad: qty, monto, impuesto });
    }

    let total = subtotal + impuestoTotal;

    // Aplicamos despuesto del 10%

    if(confirm('¿Aplicar 10% de descuento al total?')){
        total *= 0.9; 
    }

    // Extra

    const code = prompt('Código de descuento adicional (opcional: ', '');

    if(code && code.trim().toUpperCase() === 'JS2025'){
        total *= 0.95;
        alert('Código JS2025 aceptado: 5% adicional.');
    }

    const resultado = { detalle, subtotal, impuestoTotal, total };
    console.clear();
    console.log('Resultado del carrito: ', resultado);

    document.getElementById('salida').textContent = JSON.stringify(resultado, null, 2);
    
}

function limpiar(){
    const inputs = document.querySelectorAll('tbody input[type="number"]');

    inputs.forEach( i => i.value = 0);

    document.getElementById('salida').textContent = 'Cantidades reseteadas.';
}