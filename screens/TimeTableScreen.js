import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const TimeTableScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [timeTableData, setTimeTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.userData) {
      setUser(route.params.userData);
    }
  }, [route.params]);

  const fetchTimeTable = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/timetable');
      if (response.status === 200) {
        const dataArray = response.data.data || [];
        setTimeTableData(dataArray);
      }
    } catch (error) {
      console.error('fetchTimeTable: Error:', error);
      // Mock data
      setTimeTableData([
        {
          timetableid: '1',
          day: 'Monday',
          subject: 'Mathematics',
          starttime: '09:00 AM',
          endtime: '10:00 AM',
          room: '101',
          teacher: 'Mr. John',
        },
        {
          timetableid: '2',
          day: 'Monday',
          subject: 'English',
          starttime: '10:15 AM',
          endtime: '11:15 AM',
          room: '102',
          teacher: 'Mrs. Jane',
        },
        {
          timetableid: '3',
          day: 'Tuesday',
          subject: 'Science',
          starttime: '09:00 AM',
          endtime: '10:00 AM',
          room: '103',
          teacher: 'Mr. Smith',
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchTimeTable();
    }
  }, [user]);

  const handleViewTimeTable = (item) => {
    navigation.navigate('TimeTableDetail', {
      userData: user,
      timeTableData: item,
    });
  };

  const renderTimeTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.day || 'N/A'}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.subject || 'N/A'}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.starttime || 'N/A'}</Text>
      </View>
      <View style={styles.tableCellAction}>
        <TouchableOpacity
          onPress={() => handleViewTimeTable(item)}
          style={styles.viewButton}
        >
          <Icon name="eye" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Time Table</Title>
          <Divider style={styles.divider} />

          {loading ? (
            <ActivityIndicator animating={true} size="large" style={styles.loader} />
          ) : (
            <>
              <View style={styles.tableHeader}>
                <View style={styles.tableCell}>
                  <Text style={styles.headerText}>Day</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.headerText}>Subject</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.headerText}>Time</Text>
                </View>
                <View style={styles.tableCellAction}>
                  <Text style={styles.headerText}>Action</Text>
                </View>
              </View>

              {timeTableData.length > 0 ? (
                <FlatList
                  data={timeTableData}
                  renderItem={renderTimeTableRow}
                  keyExtractor={(item) => item.timetableid?.toString() || Math.random().toString()}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Icon name="inbox" size={48} color="#ccc" />
                  <Text style={styles.noDataText}>No time table found</Text>
                </View>
              )}
            </>
          )}

          <Button
            mode="contained"
            onPress={fetchTimeTable}
            style={styles.refreshButton}
            loading={loading}
          >
            Refresh
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
  },
  tableCellAction: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1976D2',
  },
  cellText: {
    fontSize: 12,
    color: '#333',
  },
  viewButton: {
    padding: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
  },
  loader: {
    marginVertical: 20,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  refreshButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
  },
});

export default TimeTableScreen;
