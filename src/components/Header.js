import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { notifications } from '../mocks/data';
import { useAppDemo } from '../context/AppDemoContext';
import { useTheme } from '../theme/ThemeContext';

export function Header({ navigation, back = false, title = 'OLYMPIUS' }) {
  const { theme } = useTheme();
  const { hasNotifications, markNotificationsRead } = useAppDemo();
  const [open, setOpen] = useState(false);

  function openNotifications() {
    markNotificationsRead();
    setOpen(true);
  }

  return (
    <>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel={back ? 'Retour' : 'Réglages'}
          onPress={() => back ? navigation.goBack() : navigation.navigate('Settings')}
          style={styles.headerAction}
        >
          <Ionicons name={back ? 'chevron-back' : 'settings-outline'} size={30} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Pressable accessibilityLabel="Notifications" onPress={openNotifications} style={styles.headerAction}>
          <Ionicons name="notifications-outline" size={28} color={theme.text} />
          {hasNotifications && <View style={[styles.dot, { backgroundColor: theme.danger }]} />}
        </Pressable>
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(false)} style={[styles.modalShade, { backgroundColor: theme.backgroundSoft }]}>
          <Pressable style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.accentPrimary }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>NOTIFICATIONS</Text>
            {notifications.map((item) => (
              <View key={item.id} style={[styles.notification, { borderBottomColor: theme.track }]}>
                <View style={[styles.noticeMark, { backgroundColor: theme.accentPrimary }]} />
                <View style={styles.noticeCopy}>
                  <Text style={[styles.noticeTitle, { color: theme.text }]}>{item.title}</Text>
                  <Text style={[styles.noticeDetail, { color: theme.textMuted }]}>{item.detail}</Text>
                </View>
              </View>
            ))}
            <Pressable onPress={() => setOpen(false)} style={[styles.close, { borderColor: theme.line }]}>
              <Text style={[styles.closeText, { color: theme.text }]}>FERMER</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 72, paddingTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerAction: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: 'Anton_400Regular', fontSize: 27, letterSpacing: 0.6 },
  dot: { position: 'absolute', right: 9, top: 9, width: 11, height: 11, borderRadius: 6 },
  modalShade: { flex: 1, justifyContent: 'flex-end', padding: 18 },
  sheet: { borderWidth: 1, borderRadius: 24, padding: 21 },
  sheetTitle: { fontFamily: 'Anton_400Regular', fontSize: 28, letterSpacing: 0.4 },
  notification: { flexDirection: 'row', gap: 12, paddingVertical: 17, borderBottomWidth: 1 },
  noticeMark: { width: 9, height: 9, borderRadius: 5, marginTop: 7 },
  noticeCopy: { flex: 1 },
  noticeTitle: { fontWeight: '800', fontSize: 15 },
  noticeDetail: { marginTop: 4, lineHeight: 19, fontSize: 13 },
  close: { alignSelf: 'center', marginTop: 18, paddingVertical: 8, paddingHorizontal: 25, borderWidth: 1, borderRadius: 20 },
  closeText: { fontFamily: 'Anton_400Regular', fontSize: 17 },
});
