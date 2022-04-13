import { createMock } from '@golevelup/ts-jest';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  AutorizarVoluntario,
  VoluntarioNaoEncontradoError,
} from './autorizar-voluntario.feat';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../voluntarios/services/voluntario.service';
import { VoluntarioOutput } from '../../voluntarios/dtos/voluntario.dto';
import {
  EMailSendError,
  ISendEmailService,
} from '../../mail/services/mail.service';

class InMemoryVoluntarioService
  implements IBuscarVoluntarioViaId, IAtualizarAprovacaoVoluntario
{
  public voluntarios: VoluntarioOutput[] = [
    {
      ...createMock<VoluntarioOutput>(),
      usuario: { ...createMock<Usuario>(), id: 0, tipo: TipoUsuario.ATENDENTE },
    },
  ];
  async findById(id: number): Promise<VoluntarioOutput> {
    return Promise.resolve(
      this.voluntarios.find((voluntario) => voluntario.usuario.id === id),
    );
  }

  async atualizarAprovacao(id: number, aprovado: boolean): Promise<void> {
    const index = this.voluntarios.findIndex(
      (voluntario) => voluntario.usuario.id === id,
    );
    this.voluntarios[index].aprovado = aprovado;
  }
}

describe('Autorizar voluntário', () => {
  let sut: AutorizarVoluntario;
  let service: InMemoryVoluntarioService;
  let emailService: ISendEmailService;

  beforeEach(async () => {
    service = new InMemoryVoluntarioService();
    emailService = createMock<ISendEmailService>();
    sut = new AutorizarVoluntario(service, emailService, {
      subject: '[Me Conta?] Atualização na sua conta',
    });
  });

  it('Deve ser definido', async () => {
    expect(sut).toBeDefined();
  });

  describe('Deve autorizar um voluntário', () => {
    beforeEach(async () => {
      await sut.execute(0, true);
    });
    it('O Voluntário deve estar aprovado', async () => {
      const [voluntario] = service.voluntarios;
      expect(voluntario.aprovado).toBeTruthy();
    });
    it('Deve enviar e-mail de aprovação', async () => {
      expect(emailService.send).toBeCalledWith(
        expect.objectContaining({
          template: '../../mail/templates/voluntario-aprovacao',
        }),
      );
    });
  });

  describe('Deve negar um voluntário', () => {
    beforeEach(async () => {
      await sut.execute(0, false);
    });
    it('O voluntário deve estar reprovado', () => {
      const [voluntario] = service.voluntarios;
      expect(voluntario.aprovado).toBeFalsy();
    });
    it('Deve enviar e-mail de reprovação', async () => {
      expect(emailService.send).toBeCalledWith(
        expect.objectContaining({
          template: '../../mail/templates/voluntario-reprovacao',
        }),
      );
    });
  });

  it('Deve dar erro de voluntário não encontrado', async () => {
    await expect(() => sut.execute(1, true)).rejects.toThrow(
      VoluntarioNaoEncontradoError,
    );
  });
  it('Deve dar erro am enviar e-mail', async () => {
    jest.spyOn(emailService, 'send').mockRejectedValue(Error);
    await expect(() => sut.execute(0, true)).rejects.toThrow(EMailSendError);
  });
});
