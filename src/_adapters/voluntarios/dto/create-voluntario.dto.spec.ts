import { plainToClass } from 'class-transformer';
import { CreateVoluntarioDto } from './create-voluntario.dto';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { validate } from 'class-validator';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../../_business/voluntarios/entidades/voluntario.entity';
import * as dayjs from 'dayjs';
import { address, date, lorem } from '@faker-js/faker/locale/pt_BR';
import {
  Estado,
  Genero,
} from '../../../_business/usuarios/entidades/usuario.entity';

describe('CreateVoluntarioDto', () => {
  const input = {
    tipo: TipoUsuario.ATENDENTE,
    bio: lorem.paragraphs(2),
    crp: lorem.lines(1),
    areaAtuacao: AreaAtuacao.PSICOLOGO,
    anoFormacao: +dayjs(date.past()).format('YYYY'),
    cidade: address.city(),
    formado: true,
    semestre: 10,
    frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    instituicao: lorem.sentence(1),
    dataNascimento: dayjs().subtract(18, 'years').format('YYYY-MM-DD'),
    genero: Genero.PREFIRO_NAO_DECLARAR,
    UF: Estado.AC,
    especializacoes: lorem.words(10),
    telefone: '11912345678',
  };
  let transformed: CreateVoluntarioDto;
  beforeEach(() => {
    transformed = plainToClass(CreateVoluntarioDto, input);
  });
  it('Deve converter a data em um Dto de Voluntário', () => {
    expect(transformed).toEqual(
      expect.objectContaining({
        dataNascimento: expect.any(Date),
      }),
    );
  });
  it('Deve validar a bio em um Dto de Voluntário Atendente', async () => {
    transformed = plainToClass(CreateVoluntarioDto, { ...input, bio: '' });
    const [error] = await validate(transformed);
    const { property, constraints } = error;
    expect(property).toBe('bio');
    expect(constraints).toMatchObject({
      isNotEmptyString: expect.any(String),
      isNotEmpty: expect.any(String),
    });
  });
});
