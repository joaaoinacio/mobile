const JornadaLancamentosEnviarSchema = {
    name: 'JornadaLancamentosEnviar',
    properties: {
        user_id:        'int',
        empresa_id:     'int',
        user_nome:      'string',
        veiculo_nome:   'string',
        veiculo_id:     'int',
        obs:            {type: 'string', opcional: true},
        status:         'int',
        data:           'date',
        descricao:      'string',
        tipo_id:        'int',
        latitude:       {type: 'float', opcional: true},
        longitude:      {type: 'float', opcional: true}
    }
}

export default JornadaLancamentosEnviarSchema;