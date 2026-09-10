import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { notifications } from '../mocks/data';
import { useAppDemo } from '../context/AppDemoContext';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

export function Header({ navigation, back = false, title, minimal = false }) {
  const { theme } = useTheme();
  const { hasNotifications, markNotificationsRead } = useAppDemo();
  const [open, setOpen] = useState(false);

  function openNotifications() {
    markNotificationsRead();
    setOpen(true);
  }

  return (
    <>
      <View style={[styles.header, minimal && styles.headerMinimal]}>
        <Pressable
          accessibilityLabel={back ? 'Retour' : 'Réglages'}
          onPress={() => (back ? navigation.goBack() : navigation.navigate('Settings'))}
          style={styles.headerAction}
          hitSlop={8}
        >
          <Ionicons name={back ? 'chevron-back' : 'settings-outline'} size={22} color={theme.textMuted} />
        </Pressable>
        {title ? (
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{title}</Text>
        ) : (
          <View style={styles.titleSpacer} />
        )}
        <Pressable accessibilityLabel="Notifications" onPress={openNotifications} style={styles.headerAction} hitSlop={8}>
          <Ionicons name="notifications-outline" size={22} color={theme.textMuted} />
          {hasNotifications && <View style={[styles.dot, { backgroundColor: theme.danger }]} />}
        </Pressable>
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(false)} style={[styles.modalShade, { backgroundColor: theme.backgroundSoft }]}>
          <Pressable style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.track }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Notifications</Text>
            {notifications.map((item) => (
              <View key={item.id} style={[styles.notification, { borderBottomColor: theme.track }]}>
                <Text style={[styles.noticeTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.noticeDetail, { color: theme.textMuted }]}>{item.detail}</Text>
              </View>
            ))}
            <Pressable onPress={() => setOpen(false)} style={styles.close}>
              <Text style={[styles.closeText, { color: theme.textMuted }]}>Fermer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerMinimal: { marginBottom: 4 },
  headerAction: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontFamily: 'Anton_400Regular', fontSize: 18, letterSpacing: 0.5 },
  titleSpacer: { flex: 1 },
  dot: { position: 'absolute', right: 8, top: 8, width: 8, height: 8, borderRadius: 4 },
  modalShade: { flex: 1, justifyContent: 'flex-end', padding: layout.screenPaddingX },
  sheet: { borderWidth: StyleSheet.hairlineWidth, borderRadius: layout.cardRadius, padding: layout.cardPadding },
  sheetTitle: { fontFamily: 'Anton_400Regular', fontSize: 22, marginBottom: 16 },
  notification: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  noticeTitle: { fontWeight: '600', fontSize: 15 },
  noticeDetail: { marginTop: 4, lineHeight: 20, fontSize: 14 },
  close: { alignSelf: 'center', marginTop: 16, paddingVertical: 8 },
  closeText: { fontSize: 14, fontWeight: '600' },
});
