import SyncController from '../../controllers/SyncController';

export const images = {
  background: require('../../images/menu-lateral-transp.png'),
  jornada:  require('../../images/jornada.png'),
  lancamento:  require('../../images/lancamentos.png')
}


const Routes = [
    {
      name: "Jornada",
      route: "Jornada",
      image: images.jornada
    },
    {
      name: "Lancamentos",
      route: "Lancamentos",
      image: images.lancamento
    },
    {
      name: "Configurações",
      route: "Config",
      icon: { type: 'Ionicons', name: 'settings' }
    },
    {
      name: "Sincronizar",
      action: () => SyncController.index(),
      icon: { type: 'MaterialIcons', name: 'sync' }
    },
  ];

  export default Routes;
