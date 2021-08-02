import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function SelectPicker() {
    return (
      <View>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: '木村拓哉', value: '木村拓哉' },
            { label: 'TOKIO', value: 'TOKIO' },
            { label: 'KinKiKids', value: 'KinKiKids' },
            { label: 'V6', value: 'V6' },
            { label: '嵐', value: '嵐' },
            { label: 'KAT-TUN', value: 'KAT-TUN' },
            { label: 'NEWS', value: 'NEWS' },
            { label: '関ジャニ∞', value: '関ジャニ∞' },
            { label: 'Hey!Say!JUMP', value: 'Hey!Say!JUMP' },
            { label: 'Kis-My-Ft2', value: 'Kis-My-Ft2' },
            { label: 'SexyZone', value: 'SexyZone' },
            { label: 'A.B.C-Z', value: 'A.B.C-Z' },
            { label: 'ジャニーズWEST', value: 'ジャニーズWEST' },
            { label: 'King & Prince', value: 'King & Prince' },
            { label: 'SixTONES', value: 'SixTONES' },
            { label: 'SnowMan', value: 'SnowMan' },
            { label: 'ジャニーズジュニア情報局', value: 'ジャニーズジュニア情報局' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: '選択してください', value: '' }}
          Icon={() => (<Text style={{ position: 'absolute', right: 1, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
        />
      </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 350,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor:'#eee'
  },
});
