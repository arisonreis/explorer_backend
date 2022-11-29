class AppError {
  message;
  status;
  // ordem de parâmetro acordo com a ordem acima, primeiro recebe a msg
  constructor(message, status = 400) {
    this.status = status;
    this.message = message;
  }
}
export { AppError };
