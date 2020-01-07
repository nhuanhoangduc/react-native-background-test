const RNFS = require('react-native-fs');

import { Platform } from 'react-native';
import store from '@mobile/store';
import { global_UPDATE_LOCAL_PHOTO } from '@mobile/store/global/actions';


const worker = async (id, photo) => {
    let cacheUri = null;
    let fileHash = null;

    if (Platform.OS === 'ios') {
        try {
            cacheUri = await RNFS.copyAssetsFileIOS(photo.imageUrl, `${RNFS.CachesDirectoryPath}/${Date.now()}.jpg`, 0, 0);
            fileHash = await RNFS.hash(cacheUri, 'md5');
        } catch (error) {
            
        }
    } else {
        try {
            fileHash = await RNFS.hash(photo.imageUrl, 'md5');
        } catch (error) {
            
        }
    }

    store.dispatch(global_UPDATE_LOCAL_PHOTO(photo._id, {
        cacheUri: cacheUri,
        hash: fileHash,
    }));
};

export default worker;
