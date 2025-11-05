# ADR 001: Stack Tecnológico

## Estado
Aceptado

## Fecha
2025-11-05

## Contexto
Necesitamos construir una aplicación móvil moderna para SINPE Davivienda dirigida a usuarios jóvenes (~25 años) como parte de un hackathon. La app debe ser visualmente atractiva, funcional y fácil de mantener.

## Decisión
Hemos decidido utilizar el siguiente stack tecnológico:

### Core
- **React Native (0.81.5)**: Framework cross-platform para iOS y Android
- **Expo (SDK 54)**: Toolchain que simplifica el desarrollo y deployment
- **TypeScript**: Para type-safety y mejor experiencia de desarrollo

### Navegación
- **Expo Router (6.0.14)**: Sistema de navegación basado en archivos, moderno y declarativo
- Razón: Simplifica la estructura de rutas y mejora el rendimiento comparado con React Navigation standalone

### UI/UX
- **React Native Paper (5.14.5)**: Librería de componentes Material Design
- Razón: Componentes listos para usar, altamente personalizables, excelente para prototipado rápido
- **React Native Reanimated (4.1.1)**: Para animaciones fluidas
- Razón: Mejor rendimiento que Animated API nativo

### Autenticación
- **Expo Local Authentication**: Para Face ID / Touch ID
- **Expo Secure Store**: Para almacenar PIN de forma segura
- Razón: APIs nativas de Expo optimizadas y fáciles de implementar

### Iconos
- **React Native Vector Icons**: Amplia colección de iconos
- **@expo/vector-icons**: Iconos pre-empaquetados con Expo

## Consecuencias

### Positivas
- Desarrollo rápido gracias a Expo y componentes pre-construidos
- Type-safety con TypeScript reduce bugs
- Expo Router simplifica la navegación
- React Native Paper acelera el desarrollo de UI consistente
- Fácil integración de autenticación biométrica

### Negativas
- React Native Paper puede requerir personalización para coincidir exactamente con el branding de Davivienda
- Expo añade overhead comparado con React Native CLI puro
- Algunas librerías nativas pueden requerir custom dev clients

## Alternativas Consideradas
1. **React Navigation standalone**: Más complejo de configurar
2. **NativeBase**: Menos popular que Paper, menor ecosistema
3. **Custom UI desde cero**: Muy lento para un hackathon

## Notas
- La paleta de colores de Davivienda está definida en `/constants/Colors.ts`
- El tema personalizado está en `/constants/Theme.ts`
- Prioridad en UX para usuarios jóvenes: gestos intuitivos, animaciones fluidas, diseño limpio

