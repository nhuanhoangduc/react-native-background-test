import React, { memo, useState, useCallback } from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ImageView from 'react-native-image-view';

import { global_photoDetailSelector } from '@mobile/store/global/selectors';


const PhotoViewer = memo(({ id, isLocal }) => {
    const [showImage, setShowImage] = useState(null);


    const photo = useSelector((store) => global_photoDetailSelector(store, id, isLocal));
    const token = useSelector((store) => store.global.token);


    const onPhotoPressed = useCallback(() => {
        setShowImage([{
            source: {
                uri: photo.imageUrl,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            },
            title: photo.fileName,
            width: photo.width,
            height: photo.height,
        }]);
    }, [photo, token]);

    const onImageViewerClosed = useCallback(() => {
        setShowImage(null);
    }, []);


    return (
        <TouchableOpacity style={{ position: 'relative', width: `${100/3}%`, }} onPress={onPhotoPressed}>
            <Image
                style={{
                    width: 0.3 * Dimensions.get('window').width,
                    height: 0.3 * Dimensions.get('window').width,
                }}
                source={{
                    uri: isLocal ? photo.imageUrl : photo.thumbnailUrl,
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

            <ImageView
                images={showImage || []}
                imageIndex={0}
                isVisible={showImage ? true : false}
                onClose={onImageViewerClosed}
            />
        </TouchableOpacity>
    );
});


export default PhotoViewer;
