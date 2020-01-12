const RNFS = require('react-native-fs');

import { Platform } from 'react-native';
import store from '@mobile/store';
import { global_UPDATE_LOCAL_PHOTO, global_ADD_JOB } from '@mobile/store/global/actions';
import { global_photoDetailSelector } from '@mobile/store/global/selectors';


const worker = async (id, { photoId }) => {
    const state = store.getState();
    const photo = global_photoDetailSelector(state, photoId, true);

    let cacheUri = null;
    let fileHash = null;

    if (Platform.OS === 'ios') {
        try {
            cacheUri = await RNFS.copyAssetsFileIOS(photo.imageUrl, `${RNFS.CachesDirectoryPath}/${Date.now()}.jpg`, 0, 0);
            fileHash = await RNFS.hash(cacheUri, 'md5');
            await RNFS.unlink(cacheUri);
        } catch (error) {
            
        }
    } else {
        try {
            fileHash = await RNFS.hash(photo.imageUrl, 'md5');
        } catch (error) {
            
        }
    }

    store.dispatch(global_UPDATE_LOCAL_PHOTO(photo.id, {
        localIdentifier: fileHash,
    }));
    
    store.dispatch(global_ADD_JOB('upload-job', { photoId: photo.id, }));
};

export default worker;
