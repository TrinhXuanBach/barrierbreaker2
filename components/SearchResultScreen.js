import {useState, useCallback, useEffect} from 'react';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
  Linking,
  Alert,
  ActivityIndicator, //sửa
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import DropdownMenu from 'react-native-dropdown-menu';
import AutoHeightImage from 'react-native-auto-height-image';
import Constant from '../constant/Constant';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
//import ProductDetailScreen from '../components/ProductDetailScreen';
const datas = [
  [
    'Phường',
    'Cống Vị',
    'Điện Biên','Đội Cấn', 'Giảng Võ','Kim Mã','Liễu Giai','Ngọc Hà','Ngọc Khánh','Nguyễn Trung Trực','Phúc Xá', 'Quán Thánh', 'Thành Công','Trúc Bạch','Vĩnh Phúc'],
  ['Đường',
  'An Xá',
  'Bà Huyện Thanh Quan',
  'Bắc Sơn',
  'Bưởi',
  'Cao Bá Quát',
  'Cầu Giấy',
  'Châu Long',
  'Chu Văn An',
  'Chùa Một Cột',
  'Cửa Bắc',
  'Đặng Dung',
  'Đặng Tất',
  'Đào Tấn',
  'Điện Biên Phủ',
  'Độc Lập',
  'Đốc Ngữ',
  'Đội Cấn',
  'Đội Nhân',
  'Giang Văn Minh',
  'Giảng Võ',
  'Hàng Bún',
  'Hàng Đậu',
  'Hàng Than',
  'Hoàng Diệu',
  'Hoàng Hoa Thám',
  'Hoàng Văn Thụ',
  'Hòe Nhai',
  'Hồng Hà',
  'Hồng Phúc',
  'Hùng Vương',
  'Huỳnh Thúc Kháng',
  'Khúc Hạo',
  'Kim Mã',
  'Kim Mã Thượng',
  'La Thành',
  'Lạc Chính',
  'Láng Hạ',
  'Lê Duẩn',
  'Lê Hồng Phong',
  'Lê Trực',
  'Liễu Giai',
  'Linh Lang',
  'Lý Nam Đế',
  'Mạc Đĩnh Chi',
  'Mai Anh Tuấn',
  'Nam Cao',
  'Nam Tràng',
  'Nghĩa Dũng',
  'Ngọc Hà',
  'Ngọc Khánh',
  'Ngũ Xã',
  'Nguyễn Biểu',
  'Nguyễn Cảnh Chân',
  'Nguyễn Chí Thanh',
  'Nguyễn Công Hoan',
  'Nguyên Hồng',
  'Nguyễn Khắc Hiếu',
  'Nguyễn Khắc Nhu',
  'Nguyễn Phạm Tuân',
  'Nguyễn Thái Học',
  'Nguyễn Thiếp',
  'Nguyễn Tri Phương',
  'Nguyễn Trung Trực',
  'Nguyễn Trường Tộ',
  'Nguyễn Văn Ngọc',
  'Núi Trúc',
  'Ông Ích Khiêm',
  'Phạm Hồng Thái',
  'Phạm Huy Thông',
  'Phan Đình Phùng',
  'Phan Huy Ích',
  'Phan Kế Bính',
  'Phó Đức Chính',
  'Phúc Xá',
  'Quần Ngựa',
  'Quán Thánh',
  'Sơn Tây',
  'Tân Ấp',
  'Thanh Bảo',
  'Thành Công',
  'Thanh Niên',
  'Tôn Thất Đàm',
  'Tôn Thất Thiệp',
  'Trần Huy Liệu',
  'Trần Phú',
  'Trần Tế Xương',
  'Trấn Vũ',
  'Trúc Bạch',
  'Vạn Bảo',
  'Văn Cao',
  'Vạn Phúc',
  'Vĩnh Phúc',
  'Yên Ninh',
  'Yên Phụ',
  'Yên Thế'],
  ['Vị trí', 'Đông','Tây', 'Nam', 'Bắc', 'Đông Nam', 'Tây Nam'],
  ['Diện tích', '0 - 25 m²', '25-50m²', '50-100m²', '100-150m²', '150-200m²', '200-250m²', '250-300m²', '300-500m²'
],
];
const firstRequest = Constant.fisrtquery
const dataList = [
  {
    src: Constant.SearchResultScreen.banner,
    money: '3.9000.000.000 đ',
    address: '172 Ngọc Khánh, Quận Ba Đình, Hà Nội',
    numberbedroom: '3',
    numberbathroom: '2',
    size: '102.6m²',
    date: '5/8/2020',
  },
  {
    src: Constant.SearchResultScreen.banner,
    money: '3.9000.000.000 đ',
    address: '123',
    numberbedroom: '3',
    numberbathroom: '2',
    size: '102.6m²',
    date: '5/8/2020',
  },
  {
    src: Constant.SearchResultScreen.banner,
    money: '3.9000.000.000 đ',
    address: 'Tổ 3, Trung Sơn, Tam Điệp, Ninh Bình',
    numberbedroom: '3',
    numberbathroom: '2',
    size: '102.6m²',
    date: '5/8/2020',
  },
  {
    src: Constant.SearchResultScreen.banner,
    money: '3.9000.000.000 đ',
    address: 'Tổ 3, Trung Sơn, Tam Điệp, Ninh Bình',
    numberbedroom: '3',
    numberbathroom: '2',
    size: '102.6m²',
    date: '5/8/2020',
  },
  {
    src: Constant.SearchResultScreen.banner,
    money: '3.9000.000.000 đ',
    address: 'Tổ 3, Trung Sơn, Tam Điệp, Ninh Bình',
    numberbedroom: '3',
    numberbathroom: '2',
    size: '102.6m²',
    date: '5/8/2020',
  },
];

const BANNER =
  'https://dankocity.nhadat86.vn/wp-content/uploads/2019/10/cv.jpg';
function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.headertext}>
        1/7 - 31/7 > Giá trung bình: {props.money}
      </Text>
    </View>
  );
}

function Item(props) {
  // const newLocal = {
  //   backgroundColor: '#ecfdfa',
  //   marginTop: props.index === 0 ? 0 : 16,
  // };
  //console.log(props.srcImg)
  return (
    <TouchableOpacity
      //style={newLocal}
      activeOpacity={0.9}
      onPress={() => props.nav.navigate(Constant.SearchResultScreen.goTo)}>
      <View>
        <AutoHeightImage
          width={Dimensions.get('window').width}
          source={{uri : props.srcImg}}
        />
        <Text style={styles.itemtext}>{props.money}</Text>
      </View>
      <View style={{padding: 8}}>
        <Text style={styles.addresstext}>{props.address}</Text>
        <View style={styles.detailinformation}>
          <View style={styles.detail}>
            <Text style={{marginRight: 5}}>{props.numberbedroom}</Text>
            <Image
              style={{marginRight: 5}}
              source={Constant.SearchResultScreen.bedroom}
            />
            <Text style={{marginRight: 5}}>{props.numberbathroom}</Text>
            <Image
              style={{marginRight: 5}}
              source={Constant.SearchResultScreen.bathroom}
            />
            <Text>{props.size}</Text>
          </View>

          <View style={styles.date}>
            <Text>{props.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchResultScreen({navigation}) {
  const [valueSearch, onChangeTextSearch] = useState('');
  const [valueMenu, onChangeTextMenu] = useState('');
  const [data, setData] = useState()
  const [average, setAverage] = useState('')
  //const [loading, setLoading] = useState(true)
  const getListData = useCallback(async () => {
    try {
      const response = await fetch(`https://barrierbreakerapi.herokuapp.com/?district=${Constant.fisrtquery.district}&min_price=${Constant.fisrtquery.min_price}&max_price=${Constant.fisrtquery.max_price}&page=1`)
      const jsonData = await response.json()
      const list     = jsonData.list_data
      const dataAverage = jsonData.average
      setData(list)
      setAverage(dataAverage)

    } catch(error) {
      Alert(error)
    }
  }, []) 

  useEffect(() => {
    getListData()
  }, [])

  // if(data.size == 0)
  // {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.header}>
  //         <TouchableOpacity
  //           onPress={() => navigation.goBack()}
  //           style={styles.iconback}>
  //           <Icon
  //             name="chevron-left"
  //             size={30}
  //             color="black"
  //             style={{textAlign: 'center', marginTop: 10}
  //           } />
  //         </TouchableOpacity>
  //         <TextInput
  //           placeholder="Tìm địa điểm, căn hộ chung cư..."
  //           style={{height: 50, borderColor: '#468684', borderWidth: 1, flex: 8}}
  //           onChangeText={(text) => onChangeTextSearch(text)}
  //           value={valueSearch}
  //         />
  //       </View>
  //       <View style={{flex: 1}}>
          
  //         <DropdownMenu
  //           bgColor={'#ecfdfa'}
  //           tintColor={'#666666'}
  //           activityTintColor={'#238778'}
  //           handler={(selection, row) =>
  //             onChangeTextMenu({text: data[selection][row]})
  //           }
  //           data={data}>
  //           <TouchableOpacity
  //               onPress={() => Linking.openURL('http://www.google.com.vn/')}>
  //           </TouchableOpacity>
            
  //         <ImageBackground
  //         source={require('../assets/notfound.png')} style={styles.image_error} 
  //         >
  //           <Text style={styles.texterror}>Thật đáng tiếc! Chúng tôi không tìm thấy căn hộ mà bạn đã chọn</Text>
  //         </ImageBackground>
            
  //         </DropdownMenu>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconback}>
          <Icon
            name="chevron-left"
            size={30}
            color="black"
            style={{textAlign: 'center', marginTop: 10}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Tìm địa điểm, căn hộ chung cư..."
          style={{height: 50, borderColor: '#468684', borderWidth: 1, flex: 8}}
          onChangeText={(text) => onChangeTextSearch(text)}
          value={valueSearch}
        />
      </View>
      <View style={{flex: 1}}>
        <DropdownMenu
          bgColor={'#ecfdfa'}
          tintColor={'#238778'}
          activityTintColor={'#238778'}
          handler={(selection, row) =>
            onChangeTextMenu({text: data[selection][row]})
          }
          data={datas}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Constant.WebviewScreen.goTo)}>
            <AutoHeightImage
              width={Dimensions.get('window').width}
              height={100}
              source={{uri: BANNER}}
            />
          </TouchableOpacity>

         
          <FlatList
             ListHeaderComponent={() => <Header money={average} />}
             renderItem={({item, index}) => (
              <Item
                money={item.price}
                address={item.address}
                numberbedroom={item.number_bedroom}
                numberbathroom={item.number_bathroom}
                date={item.date}
                size={item.area}
                srcImg = {item.image}
                nav={navigation}
              />
            )}
            keyExtractor = {item => {item.address}}
            data={data}
          />
        </DropdownMenu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdfa',
    alignItems: "center",
    justifyContent: "center"
  },

  header: {
    flexDirection: 'row',
  },
  iconback: {
    backgroundColor: '#468684',
    height: 50,
    width: 50,
  },

  headertext: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'UVN Sach Vo',
    color: '#468684',
  },

  itemtext: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#00aa97',
    padding: 8,
    borderRadius: 20,
    fontFamily: 'UVN Sach Vo',
  },

  addresstext: {
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'UVN Sach Vo',
    color: '#468684',
    
  },

  detailinformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  detail: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
  },

  date: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
    fontFamily: 'UVN Sach Vo',
    fontWeight: "bold",
  },
  dataList:{
    fontFamily: 'UVN Sach Vo',
  },
  image_error: {
    flex: 1,
    resizeMode:"cover",
    marginBottom: 200,
    justifyContent:"center"
  },
  texterror: {
    fontSize: 25,
    marginTop: 500,
    marginLeft: 30,
    color: '#74928e',
    fontWeight:'bold'
  }
  
});
