const JornadaLancamentosSchema = {
    name: 'JornadaLancamentos',
    primaryKey: 'id',
    properties: {
        id:             'int',
        descricao:      'string',
        user_id:        'int',
        empresa_id:     'int',
        user_nome:      'string',
        veiculo_nome:   'string',
        veiculo_id:     'int',
        obs:            {type: 'string', opcional: true},
        status:         'int',
        data:           'date',
        tipo_id:        'int',
        latitude:       {type: 'float', opcional: true},
        longitude:      {type: 'float', opcional: true}
    }
}

export default JornadaLancamentosSchema;