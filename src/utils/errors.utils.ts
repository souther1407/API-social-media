export function obtenerTextoError(error:unknown){
    return (error as Error).message
}