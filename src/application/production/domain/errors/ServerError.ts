export interface ServerError {
    statusCode:string,
    error:string,
    message:string
  }

export interface ServerErrorMissingField {
  error:string,
  message: MissingFieldInformation[]
}

export interface MissingFieldInformation {
  code:string,
  expected:string,
  message:string,
  path:string[]
  received:string,
}