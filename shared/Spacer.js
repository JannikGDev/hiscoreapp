import { View } from 'react-native';

const Spacer = props => {
    return (
        <View
            style={{paddingLeft: props.left, paddingRight: props.right, paddingBottom: props.bottom, paddingTop: props.top}}
        />
    )
};

export default Spacer;