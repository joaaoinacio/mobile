import { Switch } from 'native-base';
import React from 'react';
import ListItemDefault from '.';
import SyncWifiController from '../../../../controllers/ConfigController/SyncWifiController';

const SyncWifi = ({ item }) => {
    const [value, setValue] = React.useState(false)


    React.useEffect(() => {
        getData()
    }, []);

    async function getData() {
        try {
            const { active } = await SyncWifiController.getStore()
            setValue(active)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function handleChange() {
        try {
            const new_value = !value
            await SyncWifiController.turnOn(new_value)
            setValue(new_value)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ListItemDefault
            item={item}
            action={
                <Switch
                    value={value}
                    onValueChange={handleChange}
                />
            }
        />
    )
}


export default SyncWifi;