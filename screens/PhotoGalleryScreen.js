import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import {
  Card,
  Button,
  Text,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3;

const PhotoGalleryScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const samplePhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1427504494785-cdfc993e38ae?w=300&h=300&fit=crop', title: 'Annual Function' },
    { id: 2, url: 'https://images.unsplash.com/photo-1516321370467-5e86cf2d9739?w=300&h=300&fit=crop', title: 'Sports Day' },
    { id: 3, url: 'https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=300&h=300&fit=crop', title: 'Science Fair' },
    { id: 4, url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop', title: 'Field Day' },
    { id: 5, url: 'https://images.unsplash.com/photo-1524178232363-1601bc27a24f?w=300&h=300&fit=crop', title: 'Graduation' },
    { id: 6, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', title: 'Cultural Event' },
    { id: 7, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop', title: 'Debate Competition' },
    { id: 8, url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&h=300&fit=crop', title: 'Art Exhibition' },
    { id: 9, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', title: 'Concert' },
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setPhotos(samplePhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const renderPhotoGrid = ({ item }) => (
    <TouchableOpacity
      style={styles.photoItem}
      onPress={() => {
        setSelectedImage(item);
        setModalVisible(true);
      }}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.url }}
        style={styles.photo}
      />
      <View style={styles.photoOverlay}>
        <Icon name="magnify-plus" size={24} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Header */}
      <View style={[styles.header, styles.headerBackground]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Photo Gallery</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* Info Banner */}
      <Card style={styles.infoBanner}>
        <View style={styles.infoBannerContent}>
          <Icon name="information" size={20} color="#45B7D1" />
          <Text style={styles.infoBannerText}>Tap on any image to view full size</Text>
        </View>
      </Card>

      {/* Photos Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.loadingText}>Loading gallery...</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          renderItem={renderPhotoGrid}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          {selectedImage && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage.url }}
                style={styles.fullImage}
                resizeMode="contain"
              />
              <View style={styles.imageInfo}>
                <Text style={styles.imageTitle}>{selectedImage.title}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="download" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="share" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBackground: {
    backgroundColor: '#1A237E',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  infoBanner: {
    marginHorizontal: 12,
    marginVertical: 12,
    backgroundColor: '#E8F4F8',
  },
  infoBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  infoBannerText: {
    fontSize: 12,
    color: '#45B7D1',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  photoItem: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoItem: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100,
    padding: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  fullImage: {
    width: '100%',
    height: '70%',
  },
  imageInfo: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    padding: 12,
    backgroundColor: '#FFFFFF22',
    borderRadius: 30,
  },
});

export default PhotoGalleryScreen;
