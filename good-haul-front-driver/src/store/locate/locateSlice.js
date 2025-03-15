import {createSlice} from '@reduxjs/toolkit';
import {Platform, PermissionsAndroid} from 'react-native';
import {
  init,
  Geolocation,
  setLocatingWithReGeocode,
} from 'react-native-amap-geolocation';

export const slice = createSlice({
  name: 'locate',
  initialState: {
    location: {
      provinceName: '',
      cityName: '',
      areaName: '',
      latlng: [],
      address: '',
      poiname: '',
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {setLocation} = slice.actions;

//需要参数的
export const getLocationAsync = async dispatch => {
  initMap(dispatch);
};
const initMap = async dispatch => {
  // setOnceLocation(true);
  // setGpsFirst(true);
  // setGpsFirstTimeout(3000);
  if (Platform.OS === 'android') {
    // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION); //近似定位权限（模糊定位不允许连续定位，无法获取位置，不要写这个）
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ); //精确定位权限
  } else {
    setLocatingWithReGeocode(true);
  }
  await init({
    ios: '',
    android: '8baf063dbc5bf86cc935438e76098b91',
  });
  getPosition(dispatch);
};
function updateLocationState(location, dispatch) {
  if (location) {
    location.updateTime = new Date().toLocaleString();
    let data = location.location;
    /*
    {"accuracy": 30, "adCode": "420115", "address": "湖北省武汉市江夏区南湖大道73号靠近铁箕山派出所",
    "altitude": 0, "city": "武汉市", "cityCode": "027", "coordinateType": "GCJ02", "country": "中国",
    "description": "在铁箕山派出所附近", "district": "江夏区", "errorCode": 0, "errorInfo": "success",
    "gpsAccuracy": -1, "heading": 0, "latitude": 30.479322, "locationDetail": "#id:Sb2Vkbm1oYTljZjg4MWZhZTlia2hoMjEzYjJlYWJkLA==#csid:54c74a95295840028d2f384e0b9547da#pm111011",
    "locationType": 4, "longitude": 114.393645, "poiName": "铁箕山派出所", "province": "湖北省", "speed": 0,
    "street": "南湖大道", "streetNumber": "73号", "timestamp": 1711184015396, "trustedLevel": 1}
    */
    console.log(`当前位于${data.city}！`);
    dispatch(
      setLocation({
        provinceName: data.province,
        cityName: data.city,
        areaName: data.district,
        address: data.address,
        poiName: data.poiName,
        poiName: data.poiName,
        latlng: [Number(data.latitude), Number(data.longitude)],
      }),
    );
  }
}
const getPosition = dispatch => {
  Geolocation.getCurrentPosition(
    position => updateLocationState(position, dispatch),
    error => updateLocationState(error),
  );
};

//查询的
export const selectLocationLatlng = state => state.locate.location.latlng;
export const selectLocation = state => state.locate.location;

export default slice.reducer;
