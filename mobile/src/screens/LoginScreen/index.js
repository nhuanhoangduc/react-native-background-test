import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Layout, Text, Input} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { global_UPDATE_TOKEN } from '@mobile/store/global/actions';
import { usePost } from '@mobile/hooks';


const useInputChanges = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return {
        value,
        onChangeText: setValue,
    };
};

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading, error, response, request } = usePost('/api/authenticate');

    useEffect(() => {
        if (!loading && !error && response && response.data) {
            const token = response.data;

            dispatch(global_UPDATE_TOKEN(token));
            navigation.navigate('HomeScreen');
        }
    }, [loading]);

    const usernameChanges = useInputChanges();
    const passwordChanges = useInputChanges();

    const onLoginButtonPressed = () => {
        request({
            username: usernameChanges.value,
            password: passwordChanges.value,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1}}
                extraScrollHeight={Dimensions.get('window').height * 0.2}
            >
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
                    <Text category="h1">Photos sharing</Text>

                    <Input
                        style={{ marginTop: 50, }}
                        size='medium'
                        label='Username'
                        {...usernameChanges}
                    />
                    <Input
                        style={{ marginTop: 10, }}
                        size='medium'
                        label='Password'
                        secureTextEntry={true}
                        {...passwordChanges}
                    />

                    <Button style={{ width: '100%', marginTop: 30, }} onPress={onLoginButtonPressed} disabled={loading}>
                        { loading ? 'Progressing...' : 'Login' }
                    </Button>

                    {error ? (
                        <Text style={{ marginTop: 10, color: 'red', }}>{error.message}</Text>
                    ) : null}
                </Layout>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};


export default LoginScreen;
