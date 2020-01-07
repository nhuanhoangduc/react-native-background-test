import React, { memo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { global_localPhotosSelector, global_uploadedPhotosSelector } from '@mobile/store/global/selectors';


const Photos = memo(() => {
    const uploadedPhotos = useSelector(global_uploadedPhotosSelector);
    const localPhotos = useSelector(global_localPhotosSelector);

    return (
        <View style={{ flex: 1 }}>
          
        </View>
    );
});


export default Photos;
