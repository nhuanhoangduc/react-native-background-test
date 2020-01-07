import React, { memo } from 'react';
import { View, SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '@ui-kitten/components';
import _ from 'lodash';

import PhotoViewer from './PhotoViewer';
import { global_localPhotosSelector, global_uploadedPhotosSelector } from '@mobile/store/global/selectors';


const Photos = memo(() => {
    const uploadedPhotos = useSelector(global_uploadedPhotosSelector);
    const localPhotos = useSelector(global_localPhotosSelector);

    const sectionData = [
        { title: 'Uploaded photos', data: uploadedPhotos, isLocal: false, },
        { title: 'Local photos', data: localPhotos, isLocal: true, },
    ];

    return (
        <View style={{ flex: 1 }}>
            <SectionList
                sections={sectionData}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index}
                renderItem={({ item: photos, section }) => (
                    <View style={{ marginTop: 10, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                        {_.map(photos, (photo) => <PhotoViewer key={photo._id} id={photo._id} isLocal={section.isLocal} />)}
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ paddingVertical: 10,backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
});


export default Photos;
