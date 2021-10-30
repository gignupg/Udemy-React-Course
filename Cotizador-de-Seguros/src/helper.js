// basico 2000, completo 2800 
// marca 2049, 1582, 1091
// año times 100

export function obtenerPlan(plan) {
    if (plan === "basico") return 2000
    return 2800
}

export function obtenerMarca(marca) {
    if (marca === "americano") return 2049
    else if (marca === "europeo") return 1582
    return 1091
}

export function obtenerAño(año) {
    return (new Date().getFullYear() - año) * 100;
}