# 🍔 Drawer Menu - Menú Hamburguesa

## 📋 Descripción General

Menú lateral deslizante (drawer) moderno y atractivo diseñado para usuarios jóvenes (~25 años). Proporciona acceso rápido a todas las funcionalidades principales de la app con animaciones suaves y un diseño limpio.

---

## 🎨 Diseño

### Filosofía de Diseño
- **Moderno y Minimalista**: Diseño limpio sin elementos innecesarios
- **Iconografía Colorida**: Cada sección tiene su propio color para fácil identificación
- **Animaciones Fluidas**: Transiciones suaves que no distraen
- **Información Clara**: Avatar del usuario, estado online y datos personales visibles

### Dimensiones
- **Ancho**: 85% del ancho de pantalla
- **Altura**: Pantalla completa
- **Animación**: 300ms slide + fade
- **Overlay**: Semi-transparente (50% opacidad)

---

## 🏗️ Estructura

### 1. Header (Zona Roja)
```
┌─────────────────────────────────────┐
│  [Avatar]    [X]                    │
│   • Online                          │
│                                     │
│  Randall Bonilla                    │
│  randall@example.com                │
└─────────────────────────────────────┘
```

**Elementos:**
- Avatar circular con iniciales
- Indicador de estado online (verde)
- Nombre completo del usuario
- Email
- Botón de cerrar (esquina superior derecha)

**Colores:**
- Fondo: `Colors.primary.red` (#dd141d)
- Texto: Blanco
- Avatar: Fondo blanco con texto rojo

### 2. Menú Items

#### Sección Principal
- 🏠 **Inicio** - Rojo
- 👤 **Mi Perfil** - Azul
- 💳 **Mis Tarjetas** - Naranja
- ⭐ **Favoritos** - Amarillo

#### Sección Beneficios
- 🎁 **Recompensas** - Verde azulado (badge: 3)
- 🎟️ **Promociones** - Naranja/Warning (badge: 5)
- 🛡️ **Seguridad** - Verde

#### Sección Configuración
- 🔔 **Notificaciones**
- ❓ **Ayuda y Soporte**
- ℹ️ **Acerca de**

#### Acción Crítica
- 🚪 **Cerrar Sesión** - Rojo (estilo especial)

### 3. Footer
```
┌─────────────────────────────────────┐
│        SINPE Davivienda             │
│           Versión 1.0.0             │
└─────────────────────────────────────┘
```

---

## 🎯 Características

### ✨ Funcionalidades Principales

1. **Animaciones Nativas**
   - Slide horizontal desde la izquierda
   - Fade in del overlay
   - Duración: 300ms (apertura) / 250ms (cierre)
   - `useNativeDriver: true` para mejor performance

2. **Badges de Notificación**
   - Recompensas: 3 nuevas
   - Promociones: 5 activas
   - Diseño circular rojo con texto blanco

3. **Indicadores Visuales**
   - Estado online con punto verde
   - Iconos de colores únicos por categoría
   - Feedback de presión (pressed state)
   - Chevron indicando navegación

4. **Separadores**
   - Divisores sutiles entre secciones
   - Color: `Colors.ui.divider`

5. **Cierre del Menú**
   - Tap en overlay oscuro
   - Botón X en header
   - Botón back de Android (automático)

---

## 🛠️ Implementación Técnica

### Componente Principal
```typescript
<DrawerMenu 
  visible={menuVisible} 
  onClose={() => setMenuVisible(false)} 
/>
```

### Estructura de MenuItem
```typescript
interface MenuItem {
  id: string;           // Identificador único
  title: string;        // Texto del menú
  icon: string;         // Nombre del ícono (MaterialCommunityIcons)
  iconColor?: string;   // Color del ícono
  onPress: () => void;  // Acción al presionar
  badge?: number;       // Número de badge (opcional)
  divider?: boolean;    // Si es un separador
}
```

### Animaciones
```typescript
// Slide desde la izquierda
const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

// Fade del overlay
const fadeAnim = useRef(new Animated.Value(0)).current;

// Animación paralela al abrir
Animated.parallel([
  Animated.timing(slideAnim, { toValue: 0, duration: 300 }),
  Animated.timing(fadeAnim, { toValue: 1, duration: 300 }),
]).start();
```

---

## 📱 Responsive Design

### Mobile
- **Ancho del Drawer**: 85% de la pantalla
- **Padding Superior**: Ajustado para iOS notch (60px) y Android (40px)
- **Área Táctil**: Mínimo 44x44 px por elemento

### Tablets
- Mismo diseño escalado
- Se mantienen las proporciones

---

## 🎨 Paleta de Colores

| Elemento | Color | Código |
|----------|-------|--------|
| Header | Rojo Davivienda | #dd141d |
| Inicio | Rojo | #dd141d |
| Perfil | Azul | #0082C4 |
| Tarjetas | Naranja | #f8991d |
| Favoritos | Amarillo | #ffe01c |
| Recompensas | Verde Azulado | #00a094 |
| Promociones | Naranja Warning | #f8991d |
| Seguridad | Verde Éxito | #00a094 |
| Cerrar Sesión | Rojo Error | #dd141d |
| Avatar Background | Blanco | #FFFFFF |
| Online Indicator | Verde | #00a094 |

---

## 🔄 Estados

### Estado Normal
- Fondo blanco
- Texto negro
- Icono con color asignado

### Estado Pressed
- Fondo gris claro (`Colors.background.secondary`)
- Ligera reducción de opacidad
- Sin cambio de color de texto/icono

### Estado Logout
- Texto rojo
- Icono rojo
- Sin badge
- Estilo especial para acción crítica

---

## 📊 Métricas UX

### Tiempos de Animación
- **Apertura**: 300ms
- **Cierre**: 250ms
- **Feedback táctil**: Instantáneo

### Espaciado
- **Padding items**: 16px vertical, 20px horizontal
- **Gap entre ícono y texto**: 16px
- **Altura de item**: ~60px
- **Margen entre secciones**: 16px

---

## 🚀 Mejoras Futuras (TODO)

1. **Navegación Real**
   - Integrar con Expo Router
   - Navegación a pantallas reales
   - Cerrar drawer después de navegar

2. **Perfil Expandible**
   - Tap en avatar para ver perfil completo
   - Opción de cambiar foto
   - Ver estadísticas rápidas

3. **Badges Dinámicos**
   - Conectar con backend real
   - Actualizar en tiempo real
   - Animación de entrada de badges

4. **Tema Oscuro**
   - Soporte para dark mode
   - Transición suave entre temas

5. **Gestos Avanzados**
   - Swipe para abrir/cerrar
   - Pan gesture desde el borde

6. **Personalización**
   - Usuario puede reordenar items
   - Mostrar/ocultar secciones
   - Favoritos personalizados

---

## 🎓 Decisiones de Diseño

### ¿Por qué 85% de ancho?
- Balance perfecto entre visibilidad y contexto
- Permite ver un poco de la pantalla anterior (contexto)
- Estándar en apps modernas (Instagram, Twitter)

### ¿Por qué iconos de colores?
- Identificación visual rápida
- Atractivo para usuarios jóvenes
- Reduce carga cognitiva
- Brand identity consistente

### ¿Por qué badges en algunas opciones?
- Llamar atención a nuevas funciones
- Gamificación (recompensas)
- Urgencia en promociones
- Aumenta engagement

### ¿Por qué separadores?
- Agrupa funcionalidades relacionadas
- Mejora escaneabilidad
- Jerarquía visual clara

---

## 🧪 Testing

### Casos de Prueba
1. ✅ Abrir menú con botón hamburguesa
2. ✅ Cerrar menú con botón X
3. ✅ Cerrar menú con tap en overlay
4. ✅ Cerrar menú con botón back (Android)
5. ⏳ Navegar a cada sección
6. ⏳ Verificar badges actualizados
7. ⏳ Confirmar logout

### Dispositivos Probados
- [ ] iPhone SE (pantalla pequeña)
- [ ] iPhone 14 Pro (notch)
- [ ] Android Samsung (gesture navigation)
- [ ] Tablet iPad
- [ ] Tablet Android

---

## 📝 Código de Ejemplo

### Uso Básico
```typescript
import { DrawerMenu } from '@/components/DrawerMenu';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setMenuVisible(true)}>
        Abrir Menú
      </Button>
      
      <DrawerMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </>
  );
}
```

### Integración con Header
```typescript
headerLeft: () => (
  <Pressable onPress={() => setMenuVisible(true)}>
    <Icon name="menu" size={26} color="#fff" />
  </Pressable>
)
```

---

## 🎯 KPIs y Objetivos

### Métricas de Éxito
- **Tasa de uso del menú**: >40% de sesiones
- **Tiempo hasta interacción**: <2 segundos
- **Navegación desde menú**: >30% del total
- **Tasa de error**: <1%

### Objetivos de UX
1. ✅ Menú accesible en todo momento
2. ✅ Navegación intuitiva
3. ✅ Diseño atractivo para usuarios jóvenes
4. ✅ Animaciones fluidas (60fps)
5. ✅ Feedback inmediato

---

## 🏆 Características Destacadas

### Lo que hace especial este menú:

1. **Avatar con Estado Online** 🟢
   - Indicador visual de conexión
   - Borde animado sutil
   - Iniciales personalizadas

2. **Badges Informativos** 🔴
   - Notificaciones sin ser intrusivos
   - Números dinámicos
   - Diseño minimalista

3. **Iconografía Colorida** 🎨
   - Cada sección con identidad visual
   - Facilita memorización
   - Atractivo y moderno

4. **Separación Inteligente** 📑
   - Agrupación lógica de funciones
   - Jerarquía visual clara
   - Fácil escaneo

5. **Cerrar Sesión Destacado** 🚪
   - Acción crítica fácil de encontrar
   - Estilo diferenciado (rojo)
   - Posición fija al final

---

## 📚 Referencias

- [Material Design - Navigation Drawer](https://m3.material.io/components/navigation-drawer)
- [iOS Human Interface Guidelines - Side Navigation](https://developer.apple.com/design/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

**Desarrollado con ❤️ para usuarios jóvenes que valoran diseño moderno y funcionalidad clara**

