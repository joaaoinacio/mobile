const VeiculoSchema = {
  name: 'Veiculo',
  primaryKey: 'id',
  properties: {
    id: 'int',
    placa: 'string',
    data: 'string',
    ativo: 'int',
    fantasia: 'string',
    usuarios: 'string?',
    qrcode: 'string?',
  },
};

export default VeiculoSchema;
