import {StyleSheet, Pressable } from 'react-native';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';

const SettingsIcon = ( {func}) => {
    
    const iconSize = 25; // Größe des Icons

    const styles = StyleSheet.create({
        iconbutton: {
            zIndex: 1,
            width: iconSize + 5,
            height: iconSize + 5,
            alignItems: 'center'
        },
        symbol: {
            width: iconSize,
            height: iconSize,
            marginTop: 2,
        },
    });


    /* colors={user[loginState][1]} type={user[loginState][2]} */
    return (
        <Pressable style={styles.iconbutton} onPress={() => func()} pointerEvents="auto">
            <SymbolView name={'line.horizontal.3.decrease.circle.fill'} style={styles.symbol} /> 
        </Pressable>
    );
};


export default SettingsIcon;
