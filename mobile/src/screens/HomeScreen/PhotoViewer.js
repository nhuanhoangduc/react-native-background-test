import React, { memo } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { global_photoDetailSelector } from '@mobile/store/global/selectors';


const PhotoViewer = memo(({ id, isLocal }) => {
    const photo = useSelector((store) => global_photoDetailSelector(store, id, isLocal));

    return (
        <Image
            style={{
                width: 0.3 * Dimensions.get('window').width,
                height: 0.3 * Dimensions.get('window').width,
            }}
            source={{ uri: photo.imageUrl }}
        />
    );
});


export default PhotoViewer;