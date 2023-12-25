const JornadaLancamentosSchema = {
  name: 'JornadaLancamentos',
  primaryKey: 'id',
  properties: {
    uuid: {type: 'string', unique: true},
    id: {type: 'int', unique: true},
    descricao: 'string',
    user_id: 'int',
    empresa_id: 'int',
    user_nome: 'string',
    veiculo_nome: 'string',
    veiculo_id: 'int',
    obs: {type: 'string', opcional: true},
    status: 'int',
    data: 'date',
    tipo_id: 'int',
    latitude: {type: 'float', opcional: true},
    longitude: {type: 'float', opcional: true},
    new: {type: 'int', opcional: true},
  },
};

export default JornadaLancamentosSchema;
