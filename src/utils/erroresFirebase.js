export const erroresFirebase=(code)=>{
    switch (code) {
        case "auth/email-already-in-use":
          return {
            code: "email",
            message: "usuario ya registrado"
          }
        case "auth/invalid-email":
          return {
            code: "email",
            message: "Formato email no valido"
          }
        case "auth/invalid-credential":
          return {
            code: "password",
            message: "Usuario o contraseña incorrectos"
          }
        default:
          return {
            code: "email",
            message: "Ocurrio un error en el server"
          }
      }
}