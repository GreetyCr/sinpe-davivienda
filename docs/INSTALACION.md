# Guía de Instalación - SINPE Davivienda

Esta guía te ayudará a configurar el entorno de desarrollo para la aplicación móvil SINPE Davivienda en **macOS** y **Windows**.

---

## 📋 Requisitos Previos

### Ambos Sistemas (macOS y Windows)

- **Node.js** (versión 18 o superior)
  - Descargar desde: https://nodejs.org/
  - Verificar instalación: `node --version`
  
- **Git**
  - macOS: Viene pre-instalado o instalar con Homebrew: `brew install git`
  - Windows: Descargar desde https://git-scm.com/
  - Verificar instalación: `git --version`

- **Expo Go App** (para testing en dispositivo físico)
  - iOS: https://apps.apple.com/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

---

## 🍎 Instalación en macOS

### Paso 1: Instalar Homebrew (si no lo tienes)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Paso 2: Instalar Node.js

```bash
brew install node
```

### Paso 3: Instalar Watchman (recomendado para mejor performance)

```bash
brew install watchman
```

### Paso 4: Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/DAVIVIENDA.git
cd DAVIVIENDA
```

### Paso 5: Instalar dependencias

```bash
npm install
```

### Paso 6: Iniciar el proyecto

```bash
npm start
```

### Paso 7: Ejecutar en simulador iOS (requiere Xcode)

1. Instalar Xcode desde App Store
2. Instalar Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Ejecutar:
   ```bash
   npm run ios
   ```

### Paso 8: Ejecutar en dispositivo físico

1. Abrir Expo Go en tu iPhone/iPad
2. Escanear el código QR que aparece en la terminal
3. La app se cargará automáticamente

---

## 🪟 Instalación en Windows

### Paso 1: Instalar Node.js

1. Descargar el instalador desde https://nodejs.org/
2. Ejecutar el instalador y seguir las instrucciones
3. Verificar instalación abriendo **PowerShell** o **CMD**:
   ```cmd
   node --version
   npm --version
   ```

### Paso 2: Instalar Git

1. Descargar Git desde https://git-scm.com/download/win
2. Ejecutar el instalador con opciones por defecto
3. Verificar instalación:
   ```cmd
   git --version
   ```

### Paso 3: Clonar el repositorio

```cmd
git clone https://github.com/TU-USUARIO/DAVIVIENDA.git
cd DAVIVIENDA
```

### Paso 4: Instalar dependencias

```cmd
npm install
```

### Paso 5: Iniciar el proyecto

```cmd
npm start
```

### Paso 6: Ejecutar en emulador Android

#### Requisitos:
- **Android Studio**: https://developer.android.com/studio
- Configurar emulador Android siguiendo: https://docs.expo.dev/workflow/android-studio-emulator/

#### Ejecutar:
```cmd
npm run android
```

### Paso 7: Ejecutar en dispositivo físico

1. Abrir Expo Go en tu dispositivo Android
2. Escanear el código QR que aparece en la terminal o navegador
3. La app se cargará automáticamente

---

## 🔧 Solución de Problemas Comunes

### Error: "Command not found: expo"

**Solución:**
```bash
npm install -g expo-cli
```

### Error: "Unable to resolve module"

**Solución:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules
npm install
npm start -- --clear
```

### Error en Windows: "execution of scripts is disabled"

**Solución:** Abrir PowerShell como Administrador y ejecutar:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Metro Bundler no se conecta

**Solución:**
```bash
# Reiniciar con limpieza de caché
npx expo start --clear
```

### Problemas con Face ID/Touch ID en simulador

**Nota:** La autenticación biométrica NO funciona en simuladores/emuladores.
- iOS Simulator: Puedes simular Face ID desde: Features > Face ID
- Testing real requiere dispositivo físico

---

## 📱 Testing en Dispositivos Físicos

### iOS (iPhone/iPad)

1. Instalar **Expo Go** desde App Store
2. Asegurarse de estar en la misma red WiFi que tu Mac
3. Ejecutar `npm start`
4. Escanear el QR con la cámara o dentro de Expo Go
5. La app se cargará automáticamente

### Android

1. Instalar **Expo Go** desde Google Play
2. Asegurarse de estar en la misma red WiFi que tu PC
3. Ejecutar `npm start`
4. Escanear el QR desde Expo Go
5. La app se cargará automáticamente

---

## 🚀 Scripts Disponibles

```bash
npm start          # Inicia Metro bundler
npm run android    # Ejecuta en emulador/dispositivo Android
npm run ios        # Ejecuta en simulador/dispositivo iOS (solo macOS)
npm run web        # Ejecuta en navegador web
```

---

## 🔐 Variables de Entorno

El proyecto usa variables de entorno para configuración. Asegúrate de:

1. Copiar `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Editar `.env` con tus valores (si es necesario)

**Nota:** El archivo `.env` NO debe ser commiteado al repositorio por seguridad.

---

## 📚 Recursos Adicionales

- **Documentación de Expo**: https://docs.expo.dev/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **React Native Paper**: https://callstack.github.io/react-native-paper/
- **Guía de Testing en Dispositivos**: https://docs.expo.dev/get-started/expo-go/

---

## 🆘 Soporte

Si encuentras problemas durante la instalación:

1. Revisa la sección de **Solución de Problemas** arriba
2. Consulta la documentación oficial de Expo
3. Verifica que estés usando las versiones correctas de Node.js (>=18)
4. Asegúrate de estar en la misma red WiFi para testing en dispositivos

---

## ✅ Verificación de Instalación Exitosa

Después de ejecutar `npm start`, deberías ver:

```
Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor
```

Si ves esto, ¡la instalación fue exitosa! 🎉

---

**Última actualización:** Noviembre 2025  
**Versión de la app:** 1.0.0

