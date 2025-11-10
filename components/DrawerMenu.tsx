import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { mockUser } from '@/utils/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.85;

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconColor?: string;
  onPress: () => void;
  badge?: number;
  divider?: boolean;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Inicio',
      icon: 'home',
      iconColor: Colors.primary.red,
      onPress: () => {
        console.log('Navegando a Inicio (Perfil)');
        onClose();
      },
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      icon: 'star',
      iconColor: Colors.primary.yellow,
      onPress: () => {
        console.log('Navegando a Favoritos (Transferencias)');
        // TODO: Navegar a la página de transferencias
        onClose();
      },
    },
    {
      id: 'divider1',
      title: '',
      icon: '',
      onPress: () => {},
      divider: true,
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: 'bell',
      iconColor: Colors.primary.blue,
      onPress: () => {
        console.log('Navegando a Notificaciones');
        onClose();
      },
    },
    {
      id: 'divider2',
      title: '',
      icon: '',
      onPress: () => {},
      divider: true,
    },
    {
      id: 'logout',
      title: 'Cerrar Sesión',
      icon: 'logout',
      iconColor: Colors.status.error,
      onPress: () => {
        console.log('Cerrando sesión');
        onClose();
      },
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        {/* Overlay oscuro */}
        <Pressable style={styles.overlay} onPress={onClose}>
          <Animated.View
            style={[
              styles.overlayBackground,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </Pressable>

        {/* Drawer - alineado a la izquierda */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Header del Drawer */}
          <View style={styles.drawerHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(mockUser.name)}</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color={Colors.text.white} />
            </Pressable>
          </View>

          {/* Menu Items */}
          <ScrollView
            style={styles.menuContainer}
            contentContainerStyle={styles.menuContent}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item) => {
              if (item.divider) {
                return <View key={item.id} style={styles.divider} />;
              }

              return (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                    item.id === 'logout' && styles.logoutItem,
                  ]}
                  onPress={item.onPress}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.iconColor}15` },
                    ]}
                  >
                    <Icon name={item.icon} size={22} color={item.iconColor} />
                  </View>
                  
                  <Text
                    style={[
                      styles.menuItemText,
                      item.id === 'logout' && styles.logoutText,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {item.badge && item.badge > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}

                  <Icon
                    name="chevron-right"
                    size={20}
                    color={Colors.text.light}
                    style={styles.chevron}
                  />
                </Pressable>
              );
            })}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>SINPE Davivienda</Text>
              <Text style={styles.footerVersion}>Versión 1.0.0</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: DRAWER_WIDTH,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DRAWER_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.background.primary,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerHeader: {
    backgroundColor: Colors.primary.red,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.complementary.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary.red,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.status.success,
    borderWidth: 3,
    borderColor: Colors.primary.red,
  },
  userInfo: {
    marginBottom: Spacing.sm,
  },
  userName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    paddingVertical: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  menuItemPressed: {
    backgroundColor: Colors.background.secondary,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.text.primary,
  },
  chevron: {
    marginLeft: 'auto',
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.text.white,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.ui.divider,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
  },
  logoutItem: {
    marginTop: Spacing.sm,
  },
  logoutText: {
    color: Colors.status.error,
    fontWeight: Typography.weights.semibold,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginTop: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: Typography.sizes.xs,
    color: Colors.text.light,
  },
});

