import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Platform, ScrollView } from 'react-native';

//Fetch APIs in web react
const API_URL = 'http://localhost:5000';

export default function App() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/api/foods`);
      const data = await response.json();
      setFoods(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching foods:', error);
      setError('Không thể tải danh sách món ăn');
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const imageSource = Platform.OS === 'web' 
      ? { uri: `${API_URL}${item.imageUrl}` }
      : { uri: `${API_URL}${item.imageUrl}` };

// Định nghĩa styles trước để tránh lỗi "styles is not defined"
const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    transform: [{ rotate: '-20deg' }],
  },    
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },  
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  available: {
    color: 'green',
    marginTop: 5,
    fontWeight: 'bold',
  },
  soldOut: {
    color: 'red',
    marginTop: 5,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
});

// Hàm để lấy đường dẫn hình ảnh đúng dựa trên nền tảng
const getImageSource = (imageName) => {
  if (Platform.OS === 'web') {
    // Trên web, sử dụng URL tương đối đến thư mục public
    return { uri: `/assets/images/${imageName}.jpg` };
  } else {
    // Trên mobile, sử dụng require
    switch(imageName) {
      case 'banh': return require('./assets/images/banh.jpg');
      case 'bun': return require('./assets/images/bun.jpg');
      case 'com': return require('./assets/images/com.jpg');
      case 'pho': return require('./assets/images/pho.jpg');
      default: return null;
    }
  }
};

export default function App() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = [
      {
        id: 1,
        name: "Bún bò Huế",
        imageKey: "banh",
        status: "Available",
      },
      {
        id: 2,
        name: "Phở bò",
        imageKey: "bun",
        status: "Sold Out",
      },
      {
        id: 3,
        name: "Miến",
        imageKey: "com",
        status: "Sold Out",
      },
      {
        id: 4,
        name: "Mì",
        imageKey: "pho",
        status: "Available",
      },
    ];
    setFoods(localData);
    setLoading(false);
  }, []);  

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Món Ăn</Text>
      
      {/* Ảnh test để xác nhận cấu hình đúng */}
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Image 
          source={{ uri: '/assets/images/com.jpg' }}
          style={{ width: 200, height: 150, borderRadius: 10 }}
        />
        <Text style={{marginTop: 10}}>Ảnh test</Text>
      </View>
      
      <ScrollView>
        {foods.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `/assets/images/${item.imageKey}.jpg` }}
                style={styles.image}
                resizeMode="cover"
              />
              {item.status === 'Sold Out' && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>SOLD OUT</Text>
                </View>
              )}
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}