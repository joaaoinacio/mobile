const JornadasTipoSchema = {
  name: 'JornadasTipo',
  primaryKey: 'id',
  properties: {
    tee_codigo: 'int',
    descricao: 'string',
    icone: 'string',
    id: 'int',
    ordem: 'int',
    ativo: 'bool',
    exigeqrcode: 'bool',
  },
};

// {
//   "tee_codigo": 63,
//   "descricao": "Carga/Descarga - Espera",
//   "icone": "https://api.dottransporter.com.br/storage/jornada/icones/default.png",
//   "id": 15,
//   "ordem": 0,
//   "ativo": false,
//   "exigeqrcode": false
// }

export default JornadasTipoSchema;
