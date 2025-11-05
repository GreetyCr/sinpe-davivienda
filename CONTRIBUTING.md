# Guía de Contribución - SINPE Davivienda

¡Gracias por tu interés en contribuir al proyecto SINPE Davivienda! 🎉

## 🚀 Comenzando

1. **Fork el repositorio**
   ```bash
   # Desde GitHub, haz click en "Fork"
   ```

2. **Clona tu fork**
   ```bash
   git clone https://github.com/TU-USUARIO/sinpe-davivienda.git
   cd sinpe-davivienda
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```

## 📝 Proceso de Contribución

### 1. Reglas de Commits

Usamos **Conventional Commits** para mantener un historial limpio:

```
tipo(alcance): descripción corta

Descripción más detallada si es necesario.

Refs: #numero-issue
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (sin cambio de código)
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```bash
feat(transfer): Añadir validación de número de teléfono
fix(auth): Corregir error en Face ID en iOS
docs(readme): Actualizar instrucciones de instalación
```

### 2. Estructura de Branches

```
main              # Rama principal (protegida)
├── feature/*     # Nuevas funcionalidades
├── fix/*         # Correcciones de bugs
├── docs/*        # Cambios en documentación
└── refactor/*    # Refactorizaciones
```

### 3. Pull Requests

Antes de crear un PR:

1. ✅ Asegúrate de que el código compile sin errores
   ```bash
   npx tsc --noEmit
   ```

2. ✅ Formatea el código (si hay prettier configurado)

3. ✅ Actualiza la documentación si es necesario

4. ✅ Escribe una descripción clara del PR:
   ```markdown
   ## Descripción
   Breve descripción de los cambios

   ## Tipo de cambio
   - [ ] Bug fix
   - [ ] Nueva funcionalidad
   - [ ] Cambio que rompe compatibilidad
   - [ ] Documentación

   ## ¿Cómo se ha probado?
   Describe cómo probaste los cambios

   ## Checklist
   - [ ] Mi código sigue las guías de estilo
   - [ ] He documentado cambios complejos
   - [ ] Mis cambios no generan nuevos warnings
   ```

## 🎨 Guías de Estilo

### TypeScript

- ✅ Usar TypeScript strict mode
- ✅ Tipar todas las funciones y variables
- ✅ Evitar `any`, usar `unknown` si es necesario
- ✅ Usar interfaces para props de componentes

```typescript
// ✅ Correcto
interface TransferProps {
  amount: number;
  recipient: string;
  onConfirm: () => void;
}

export const Transfer: React.FC<TransferProps> = ({ amount, recipient, onConfirm }) => {
  // ...
};

// ❌ Incorrecto
export const Transfer = (props: any) => {
  // ...
};
```

### React Native / Componentes

- ✅ Componentes funcionales con hooks
- ✅ Nombres de componentes en PascalCase
- ✅ Props destructuradas
- ✅ Usar `StyleSheet.create` para estilos
- ✅ Evitar inline styles

```typescript
// ✅ Correcto
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

// ❌ Incorrecto
<View style={{ flex: 1, padding: 16 }} />
```

### Colores y Tema

- ✅ SIEMPRE usar constantes de `/constants/Colors.ts`
- ✅ NO usar colores hardcodeados
- ✅ Respetar la paleta de Davivienda

```typescript
// ✅ Correcto
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  text: {
    color: Colors.primary.red,
  },
});

// ❌ Incorrecto
const styles = StyleSheet.create({
  text: {
    color: '#FF0000',
  },
});
```

## 📁 Estructura de Archivos

Al añadir nuevos archivos, seguir esta estructura:

```
app/                    # Rutas de Expo Router
  ├── (auth)/          # Grupo de autenticación
  ├── (tabs)/          # Grupo de tabs principales
  └── _layout.tsx      # Layout raíz

components/            # Componentes reutilizables
  ├── Button.tsx
  ├── Card.tsx
  └── Input.tsx

constants/             # Constantes (colores, temas, etc)
types/                 # Tipos TypeScript compartidos
utils/                 # Utilidades y helpers
assets/                # Imágenes, fuentes, etc
docs/                  # Documentación adicional
  └── adr/            # Architecture Decision Records
```

## 🔐 Seguridad

- ❌ NUNCA commitear `.env` con valores reales
- ❌ NUNCA exponer API keys o secretos
- ✅ Usar `.env.example` para documentar variables necesarias
- ✅ Almacenar datos sensibles con `expo-secure-store`

## 📚 Documentación de Decisiones (ADR)

Para cambios arquitectónicos importantes, crear un ADR en `/docs/adr/`:

```markdown
# ADR XXX: Título de la Decisión

## Estado
[Propuesto | Aceptado | Rechazado | Deprecado]

## Contexto
¿Qué problema estamos resolviendo?

## Decisión
¿Qué decidimos hacer?

## Consecuencias
¿Qué implica esta decisión?

## Alternativas Consideradas
¿Qué otras opciones evaluamos?
```

## 🐛 Reportar Bugs

Usa GitHub Issues con esta plantilla:

```markdown
**Descripción del bug**
Descripción clara y concisa.

**Para reproducir**
Pasos para reproducir:
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento esperado**
Lo que debería pasar.

**Screenshots**
Si aplica, añade screenshots.

**Entorno:**
 - Device: [iPhone 14, Pixel 6, etc]
 - OS: [iOS 17.0, Android 13]
 - App Version: [1.0.0]
```

## ✨ Solicitar Features

Usa GitHub Issues con el tag `enhancement`:

```markdown
**¿Qué problema resuelve este feature?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**¿Consideraste alternativas?**
Otras soluciones que consideraste.

**Contexto adicional**
Cualquier otro contexto, screenshots, etc.
```

## 🎯 Prioridades del Proyecto

1. **UX para usuarios jóvenes** (~25 años)
   - Diseño moderno y limpio
   - Animaciones fluidas
   - Gestos intuitivos

2. **Seguridad**
   - Autenticación biométrica
   - Encriptación de datos sensibles
   - Validaciones robustas

3. **Performance**
   - Tiempos de carga rápidos
   - Animaciones a 60fps
   - Optimización de imágenes

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación en `/docs/`
2. Lee los ADRs existentes en `/docs/adr/`
3. Abre un issue con el tag `question`

---

¡Gracias por contribuir a SINPE Davivienda! 🚀🎉

