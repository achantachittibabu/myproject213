import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Button, Divider, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const ExamsScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.userData) setUser(route.params.userData);
  }, [route.params]);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/exams');
      setExamsData(response.data.data || []);
    } catch (error) {
      setExamsData([
        { examid: '1', subject: 'Mathematics', date: '2024-03-15', time: '10:00 AM', room: '101' },
        { examid: '2', subject: 'English', date: '2024-03-16', time: '02:00 PM', room: '102' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchExams();
  }, [user]);

  const renderExamRow = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.subject || 'N/A'}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.date || 'N/A'}</Text>
      </View>
      <View style={styles.tableCellAction}>
        <TouchableOpacity onPress={() => navigation.navigate('ExamDetail', { userData: user, examData: item })} style={styles.viewButton}>
          <Icon name="eye" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Exams</Title>
          <Divider style={styles.divider} />
          {loading ? (
            <ActivityIndicator animating={true} size="large" style={styles.loader} />
          ) : (
            <>
              <View style={styles.tableHeader}>
                <View style={styles.tableCell}><Text style={styles.headerText}>Subject</Text></View>
                <View style={styles.tableCell}><Text style={styles.headerText}>Date</Text></View>
                <View style={styles.tableCellAction}><Text style={styles.headerText}>Action</Text></View>
              </View>
              {examsData.length > 0 ? (
                <FlatList data={examsData} renderItem={renderExamRow} keyExtractor={(item) => item.examid?.toString()} scrollEnabled={false} />
              ) : (
                <View style={styles.noDataContainer}>
                  <Icon name="inbox" size={48} color="#ccc" />
                  <Text style={styles.noDataText}>No exams found</Text>
                </View>
              )}
            </>
          )}
          <Button mode="contained" onPress={fetchExams} style={styles.refreshButton} loading={loading}>Refresh</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  card: { marginBottom: 16 },
  divider: { marginVertical: 16 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#FFEBEE', paddingVertical: 12, paddingHorizontal: 8, borderRadius: 4, marginBottom: 8, borderBottomWidth: 2, borderBottomColor: '#F44336' },
  tableRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff', marginBottom: 2 },
  tableCell: { flex: 1, justifyContent: 'center' },
  tableCellAction: { flex: 0.8, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontWeight: '600', fontSize: 12, color: '#C62828' },
  cellText: { fontSize: 12, color: '#333' },
  viewButton: { padding: 8, backgroundColor: '#FFEBEE', borderRadius: 4 },
  loader: { marginVertical: 20 },
  noDataContainer: { alignItems: 'center', paddingVertical: 40 },
  noDataText: { marginTop: 12, fontSize: 14, color: '#999' },
  refreshButton: { marginTop: 16, backgroundColor: '#F44336' },
});

export default ExamsScreen;
