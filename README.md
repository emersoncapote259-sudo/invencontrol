Descripción del programa

El programa será un sistema web de gestión de inventarios diseñado para pequeñas empresas comerciales. La aplicación permitirá almacenar y administrar información relacionada con productos, cantidades disponibles, movimientos de inventario y reportes administrativos.

El sistema estará orientado a resolver problemas frecuentes como:

Pérdida de productos.
Errores en registros manuales.
Falta de control del stock.
Desabastecimiento o exceso de mercancía.
Dificultades para consultar información rápidamente.

El software funcionará desde un navegador web, permitiendo el acceso desde computadores del negocio sin necesidad de instalar programas adicionales.

Funciones principales del sistema
1. Inicio de sesión

Permitirá el acceso únicamente a usuarios autorizados mediante usuario y contraseña.

2. Gestión de productos

El administrador podrá:

Registrar productos.
Editar información.
Eliminar productos.
Consultar existencias.
Buscar productos por nombre o código de barras.
3. Control de inventario

El sistema permitirá:

Registrar entradas de mercancía.
Registrar salidas de productos.
Actualizar cantidades automáticamente.
Consultar movimientos realizados.
4. Alertas automáticas

El programa notificará cuando:

Un producto tenga poco stock.
Existan productos próximos a vencer.
Haya exceso de inventario.
5. Reportes

El sistema generará reportes sobre:

Productos disponibles.
Productos más vendidos.
Historial de movimientos.
Cantidades en inventario.

Además, los reportes podrán descargarse en Excel.

6. Panel visual

El sistema mostrará gráficas y estadísticas sencillas para facilitar el análisis del inventario.

Planificación para crear el programa
Fase 1: Análisis y levantamiento de requerimientos

En esta etapa se identifican las necesidades del supermercado y las funciones que tendrá el sistema.

Actividades:
Realizar entrevistas a empleados y administradores.
Identificar problemas del inventario actual.
Definir requerimientos funcionales y no funcionales.
Elaborar historias de usuario.
Resultado esperado:

Documento con todos los requerimientos del sistema.

Fase 2: Diseño del sistema

En esta fase se diseña la estructura visual y técnica del programa.

Diseño de interfaz

Se crearán prototipos en Figma para visualizar:

Pantalla de login.
Menú principal.
Módulo de productos.
Reportes.
Alertas.
Diseño de base de datos

Se construirá el modelo entidad-relación de la base de datos.

Tablas principales:
Usuarios
Productos
Categorías
Entradas
Salidas
Reportes
Arquitectura del sistema

Se utilizará arquitectura MVC:

Modelo → Base de datos.
Vista → Interfaz visual.
Controlador → Lógica del sistema.
Resultado esperado:

Diseño completo del sistema y base de datos.

Fase 3: Desarrollo del programa

En esta etapa se comenzará la programación del software.

Tecnologías recomendadas
Área	Tecnología
Frontend	HTML, CSS, JavaScript
Backend	PHP o Node.js
Base de datos	MySQL
Diseño	Figma
Servidor	XAMPP o Apache
Desarrollo de módulos
Sprint 1
Inicio de sesión.
Registro de usuarios.
Sprint 2
Registro de productos.
Consulta de productos.
Sprint 3
Entradas y salidas de inventario.
Actualización automática del stock.
Sprint 4
Sistema de alertas.
Reportes en Excel.
Sprint 5
Gráficas y estadísticas.
Optimización del sistema.
Fase 4: Pruebas del sistema

Se verificará que todas las funciones trabajen correctamente.

Tipos de pruebas
Pruebas funcionales.
Pruebas de usuarios.
Pruebas de seguridad.
Corrección de errores.
Resultado esperado:

Sistema estable y funcional.

Fase 5: Implementación

El sistema será instalado en el supermercado.

Actividades:
Configurar servidor.
Crear base de datos.
Capacitar usuarios.
Realizar pruebas reales.
Estructura general del programa
Módulos del sistema
Sistema de Inventario
│
├── Inicio de Sesión
├── Gestión de Usuarios
├── Gestión de Productos
├── Entradas de Inventario
├── Salidas de Inventario
├── Alertas
├── Reportes
└── Estadísticas
Base de datos propuesta
Tabla productos
Campo	Tipo
id_producto	INT
nombre	VARCHAR
categoria	VARCHAR
cantidad	INT
precio	DECIMAL
codigo_barras	VARCHAR
fecha_vencimiento	DATE
Metodología de trabajo

Se recomienda utilizar Scrum porque permite trabajar por etapas pequeñas llamadas Sprints.

Roles
Product Owner

Define necesidades del sistema.

Scrum Master

Organiza y supervisa el trabajo.

Equipo de desarrollo

Programa y diseña el software.

Tiempo estimado del proyecto
Fase	Tiempo
Análisis	1 mes
Diseño	1 mes
Desarrollo	2 meses
Pruebas	1 mes
Implementación	1 mes

Duración total aproximada: 6 meses.

Resultado esperado del programa

Al finalizar el proyecto se espera obtener:

Un sistema web funcional.
Mejor control del inventario.
Menos errores manuales.
Información organizada.
Alertas automáticas de stock.
Reportes rápidos y precisos.
Mayor eficiencia en el supermercado.

En general, el programa permitirá optimizar el manejo del inventario y mejorar la organización de los pequeños negocios mediante el uso de herramientas tecnológicas.
## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
3. Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

```
nextjs/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```


Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier




