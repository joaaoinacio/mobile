import { isEmpty, isUndefined } from 'lodash';
import moment from 'moment';
import { ListItem, Text, View, Icon } from 'native-base';
import React from 'react';
import { styles } from './styles';

function isItemNewDate(lastItem, item){
    if(isUndefined(lastItem) || isUndefined(item)) return false

    let lastDate = moment(lastItem.data).format('DD/MM/YYYY')
    let date     = moment(item.data).format('DD/MM/YYYY')

    if(isEmpty(lastDate) || isEmpty(date)) return false

    if(lastDate != date) return true
    
    return false
}


const LancamentoItem = ({item, index, lancamentos}) => {
    if(index === 0 || isItemNewDate(lancamentos.list[index-1], item)){
        return(
            <View>
                <ListItem itemDivider>
                    <Text>{moment(item.data).format('DD/MM/YYYY')}</Text>
                </ListItem>    
                <View style={styles.listItem}>
                    <View style={{width: '90%'}}>
                        <Text>
                            <Text style={styles.dateText}>{moment(item.data).format('hh:mm A')}</Text>{"   "}{item.descricao}
                        </Text>
                    </View>
                    {
                        item.status == 3 ? 
                            <Icon name="dot-circle-o" type="FontAwesome" style={styles.itemStatusIcon}/>
                        : null
                    }
                </View>
            </View>
        )
    }
    return(
        <View style={styles.listItem}>
            <View style={{width: '90%'}}><Text><Text style={styles.dateText}>{moment(item.data).format('hh:mm A')}</Text>{"   "}{item.descricao}</Text></View>
            {
                item.status == 3 ? 
                    <Icon name="dot-circle-o" type="FontAwesome" style={styles.itemStatusIcon}/>
                : null
            }
        </View>
    ) 
}

export default LancamentoItem;