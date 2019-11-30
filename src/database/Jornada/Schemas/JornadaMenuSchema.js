const JornadaMenuSchema = {
    name: 'JornadaMenu',
    primaryKey: 'id',
    properties: {
        id:         'int',
        descricao:  'string',
        icone:       {type: 'string', optional: true},
    }
}


export default JornadaMenuSchema;