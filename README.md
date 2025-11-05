# SINPE Davivienda

Aplicación móvil moderna para transferencias SINPE del Banco Davivienda, desarrollada para hackathon con enfoque en usuarios jóvenes (~25 años).

## Características

- 💸 **Transferencias SINPE**: Envía dinero de forma rápida y segura
- 📊 **Historial**: Consulta todas tus transacciones
- 📱 **Solicitar Saldo**: Genera cobros y compártelos
- 🔐 **Autenticación Biométrica**: Face ID / Touch ID + PIN
- 📄 **Comprobantes**: Descarga PDFs de tus transacciones
- 📞 **Recargas**: Recarga saldo telefónico
- 🎨 **Diseño Moderno**: UI optimizada para jóvenes con animaciones fluidas

## Stack Tecnológico

- **React Native** con **Expo SDK 54**
- **TypeScript** para type-safety
- **Expo Router** para navegación
- **React Native Paper** para componentes UI
- **React Native Reanimated** para animaciones

Ver decisiones arquitectónicas completas en [`/docs/adr/`](./docs/adr/)

## Requisitos Previos

- Node.js >= 18
- npm o yarn
- Expo CLI
- Expo Go app (para testing en dispositivo)

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd DAVIVIENDA

# Instalar dependencias
npm install

# Iniciar el proyecto
npm start
```

## Scripts Disponibles

```bash
npm start          # Inicia Metro bundler
npm run android    # Ejecuta en emulador Android
npm run ios        # Ejecuta en simulador iOS
npm run web        # Ejecuta en navegador web
```

## Estructura del Proyecto

```
DAVIVIENDA/
├── app/                    # Rutas de Expo Router
│   ├── auth/              # Pantallas de autenticación
│   ├── tabs/              # Pantallas principales con tabs
│   ├── _layout.tsx        # Layout principal
│   └── index.tsx          # Pantalla de inicio
├── components/            # Componentes reutilizables
├── constants/             # Constantes (colores, tema, etc)
│   ├── Colors.ts         # Paleta de Davivienda
│   ├── Theme.ts          # Tema de React Native Paper
│   ├── Typography.ts     # Tipografía
│   └── Spacing.ts        # Espaciado y border radius
├── types/                # Tipos TypeScript
├── utils/                # Utilidades y helpers
├── assets/               # Imágenes, fuentes, etc
└── docs/                 # Documentación
    └── adr/              # Architecture Decision Records
```

## Guía de Marca Davivienda

### Colores Principales
- **Rojo Davivienda**: `#dd141d`
- **Azul Davivienda**: `#0082C4`
- **Amarillo Davivienda**: `#ffe01c`
- **Naranja Davivienda**: `#f8991d`

### Tipografía
- **Fuente**: Arial (Regular, Cursiva, Negrita)
- **Tamaños**: 12-40pt según jerarquía

Ver más detalles en [`constants/Colors.ts`](./constants/Colors.ts) y [`constants/Theme.ts`](./constants/Theme.ts)

## Variables de Entorno

Copiar `.env.example` a `.env` y configurar:

```bash
cp .env.example .env
```

Ver `.env.example` para variables disponibles.

## Seguridad

- Las credenciales NUNCA se commitean al repositorio
- Usar `.env` para secretos (ya está en `.gitignore`)
- PINs almacenados con `expo-secure-store`
- Face ID requiere permisos configurados en `app.json`

## Contribución

1. Crear branch desde `main`
2. Hacer cambios y commits descriptivos
3. Documentar decisiones importantes en `/docs/adr/`
4. Abrir Pull Request

## Licencia

Proyecto desarrollado para hackathon Banco Davivienda.

---

Desarrollado con ❤️ para usuarios jóvenes de Costa Rica

