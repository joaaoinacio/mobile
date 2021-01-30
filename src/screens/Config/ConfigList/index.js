import { isEmpty } from 'lodash';
import React from 'react';
import ListItemDefault from './ListItems';
import SyncWifi from './ListItems/SyncWifi';
import ListItemTitle from './ListItems/Title';

const json_list = [
    {
        id: 'sync',
        title: 'Sincronização',
        child: [
            {
                id: 'sync_internet_mode',
                title: 'Apenas com Wifi',
                desc: 'Sincronizar dados apenas com conexão Wifi',
                component: <SyncWifi />
            }
        ]
    }

];


const ConfigList = ({ }) => {

    const id_generator = (id, index) => `config_list_item_${id}_${index}`

    return (
        <>
            {
                json_list.map((item, index) => {
                    if (!isEmpty(item.child))
                        return (
                            <>
                                <ListItemTitle
                                    item={item}
                                    key={id_generator(item.id, index)}
                                />
                                {
                                    item.child.map((childItem, childIndex) => {
                                        if (childItem.component) return React.cloneElement(childItem.component, { item: childItem, key: id_generator(childItem.id, childIndex) })
                                        return (
                                            <ListItemDefault item={childItem} key={id_generator(childItem.id, childIndex)} />
                                        )
                                    })
                                }
                            </>
                        )
                    return (
                        <></>
                    )
                })
            }
        </>
    )
}


export default ConfigList;