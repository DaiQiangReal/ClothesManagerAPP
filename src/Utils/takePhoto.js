/*
 * @Author: 代强
 * @Date: 2020-08-13 22:24:04
 * @LastEditTime: 2020-08-27 22:25:35
 * @LastEditors: 代强
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/Utils/takePhoto.js
 */
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;
async function takePhoto() {
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64
        });

        return image.base64String;
    }
    catch (e) {
        return null;
    }
}
export default takePhoto