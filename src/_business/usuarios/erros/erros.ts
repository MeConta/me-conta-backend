// ---
export class UsuarioNaoEncontradoError extends Error {
  public code = 404;
  public message = 'Usuário não encontrado';
}

export class UsuarioInvalidoError extends Error {
  public code = 403;
  public message = 'Usuário inválido';
}
