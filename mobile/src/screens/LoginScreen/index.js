import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Button, Layout, Text, Input} from '@ui-kitten/components';


const useInputChanges = (initialValue = '') => {
    const [value, setValue] = React.useState(initialValue);
    return {
        value,
        onChangeText: setValue,
    };
};

const LoginScreen = () => {

    const usernameChanges = useInputChanges();
    const passwordChanges = useInputChanges();

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                    {...passwordChanges}
                />

                <Button style={{ width: '100%', marginTop: 30, }}>
                    Login
                </Button>
            </Layout>
        </SafeAreaView>
    );
};


export default LoginScreen;
