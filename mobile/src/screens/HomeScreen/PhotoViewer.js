import React, { memo } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { global_photoDetailSelector } from '@mobile/store/global/selectors';


const PhotoViewer = memo(({ id, isLocal }) => {
    const photo = useSelector((store) => global_photoDetailSelector(store, id, isLocal));
    const token = useSelector((store) => store.global.token);

    return (
        <View style={{ position: 'relative', }}>
            <Image
                style={{
                    width: 0.3 * Dimensions.get('window').width,
                    height: 0.3 * Dimensions.get('window').width,
                }}
                source={{
                    uri: photo.imageUrl,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }}
            />

            {photo.sourceType === 'video' ? (
                <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'gray' }}>
                        Video
                    </Text>
                </View>
            ) : null}
        </View>
    );
});


export default PhotoViewer;