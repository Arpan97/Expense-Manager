import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Images from '../../utils/images';
import Textstyles from '../../utils/text';
import {connect} from 'react-redux';
import {useMemo, useState, useEffect} from 'react';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

const CustomInput = props => {
  const [nightMode, setNightMode] = useState(false);
  const styles = getStyle(nightMode, props);

  useMemo(() => {
    if (props?.themeMode == false) {
      setNightMode(false);
    } else if (props?.themeMode == true) {
      setNightMode(true);
    }
  }, [props?.themeMode, nightMode]);
  return (
    <View style={styles.container}>
      <View style={styles.input_view}>
        <TextInput
          style={[props?.style,Textstyles.medium, styles.input_field]}
          placeholder={props?.placeholder}
          value={props?.value}
          onChangeText={props?.onChangeText}
          maxLength={props?.maxLength}
          keyboardType={props?.keyboardType}
          editable={props?.editable}
          multiline={props?.multiline}
          numberOfLines={props?.numberOfLines}
        />
      </View>
          {props?.error == true ? (
            <View style={styles.icn_view}>
              <Image source={Images.warning} style={styles.icn} />
            </View>
          ) :
          props?.error == false ? (
            <View style={styles.icn_view}>
              <Image source={Images.success} style={styles.icn} />
            </View>
          ) : null}
    </View>
  );
};

const mapStateToProps = state => ({
  themeMode: state.theme,
});

export default connect(mapStateToProps, null)(CustomInput);

const getStyle = (nightMode, props) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    input_view: {
      width: '100%',
    },
    input_field: {
      backgroundColor:
        nightMode == true ? Colors.backgroundColor : Colors.white,
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: props?.error == true ? Colors.red : Colors.borderColor,
      color: Colors.black,
      fontSize: 12,
      elevation: props?.error == true ? 0 : 2
    },
    icn_view: {
      position: 'absolute',
      right: vw(2),
      top: vh(1.5),
    },
    icn: {
      width: 25,
      height: 25,
    },
  });
