import { Connection, createConnection, Repository } from 'typeorm';
import { TypeOrmAgendaService } from './typeorm-agenda.service';
import { SlotAgendaDbEntity } from './entidades/slot-agenda-db.entity';
import * as moment from 'moment';
import { SlotAgendaParam } from '../../_business/agenda/services/agenda.service';
import { VoluntarioDbEntity } from '../voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../usuarios/entidades/usuario.db.entity';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../../jest.setup';
import { internet, lorem, name } from 'faker/locale/pt_BR';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { FrenteAtuacao } from '../../_business/voluntarios/entidades/voluntario.entity';
describe('Agenda Repo', () => {
  let connection: Connection;
  let repo: Repository<SlotAgendaDbEntity>;
  let usuarioRepo: Repository<UsuarioDbEntity>;
  let voluntarioRepo: Repository<VoluntarioDbEntity>;
  let sut: TypeOrmAgendaService;

  const request: SlotAgendaParam = {
    atendenteId: 1,
    inicio: moment().toDate(),
    fim: moment().add(1, 'hour').toDate(),
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [SlotAgendaDbEntity, VoluntarioDbEntity, UsuarioDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repo = connection.getRepository(SlotAgendaDbEntity);
    usuarioRepo = connection.getRepository(UsuarioDbEntity);
    voluntarioRepo = connection.getRepository(VoluntarioDbEntity);
    sut = new TypeOrmAgendaService(repo);
  });
  beforeEach(async () => {
    const usuario = await usuarioRepo.save(
      usuarioRepo.create({
        senha: DEFAULT_PASSWORD,
        nome: name.firstName(),
        tipo: TipoUsuario.ATENDENTE,
        email: internet.email(),
        dataTermos: new Date(),
        salt: MOCKED_SALT,
      }),
    );
    await voluntarioRepo.save(
      voluntarioRepo.create({
        id: usuario.id,
        usuario,
        aprovado: true,
        formado: false,
        anoFormacao: +moment().format('YYYY'),
        bio: lorem.paragraphs(),
        frentes: [FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS],
        instituicao: lorem.words(),
      }),
    );
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('deve criar um slot de agenda para uma pessoa atendente', async function () {
    await sut.cadastrar(request);
    const [slot] = await repo.find();
    expect(slot).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        inicio: expect.any(Date),
        fim: expect.any(Date),
      }),
    );
  });
  // TODO: Esse teste não funciona
  it.skip('deve retornar slots do período e atendente', async function () {
    const slot = await repo.save(request);
    //const dataInicio = moment().subtract(1, 'days').startOf('day').toDate();
    //const dataFim = moment().add(1, 'days').endOf('day').toDate();
    console.log('SLOT', slot);
    console.log(
      'saved!',
      await repo.find({
        loadEagerRelations: true,
        //relations: ['voluntario'],
        loadRelationIds: true,
        where: {
          voluntario: slot.atendenteId,
          /*inicio: MoreThanOrEqual(
            DateUtils.mixedDateToUtcDatetimeString(dataInicio),
          ),
          fim: LessThanOrEqual(DateUtils.mixedDateToUtcDatetimeString(dataFim)),*/
        },
      }),
    );
    const slots = await sut.recuperaSlots({
      atendenteId: 1,
      inicio: moment().subtract(1, 'days').startOf('day').toDate(),
      fim: moment().add(1, 'days').endOf('day').toDate(),
      // inicio: request.inicio,
      // fim: request.fim,
    });
    await expect(slots).toHaveLength(1);
  });
});
