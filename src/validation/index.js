import { Toast } from 'native-base';
import { join, forEach } from 'lodash'

export function validaCampos (campos) {
  let array = []
  forEach(campos, item => {
    if (item.campo === '')
      array.push(item.nome)
  })
  mensagem = join(array, ', ')

  if (array.length > 1) {
    Toast.show({
      text: 'Os campos (' + mensagem + ') precisam ser preenchidos',
      type: 'warning',
      duration: 3000
    })
  }
  if (array.length === 1) {
    Toast.show({
      text: 'O campo (' + mensagem + ') precisa ser preenchido',
      type: 'warning',
      duration: 3000
    })
  }
}