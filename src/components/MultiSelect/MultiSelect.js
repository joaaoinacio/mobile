import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {styles} from './styles';

export default function MultiSelect({
    onSelectedItemsChange,
    items,
    selectedItems,
    style,
    searchPlaceholderText,
    selectText
}){
    return(
        <View style={{...styles.root, ...style}}>
            <SectionedMultiSelect
                items={items}
                colors= {styles.multiSelectColors}
                styles={styles.multiSelectStyles}
                selectedText="selecionados"         
                confirmText="Aplicar"
                searchPlaceholderText={searchPlaceholderText}
                uniqueKey="id"
                selectText={selectText}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
            />
        </View>
    )

}
