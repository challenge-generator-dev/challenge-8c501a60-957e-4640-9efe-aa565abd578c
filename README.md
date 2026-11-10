# Implementación de CRUD de órdenes en DynamoDB

En el contexto de una plataforma de comercio electrónico, se requiere implementar operaciones CRUD para gestionar órdenes en una tabla DynamoDB. Las órdenes son creadas por clientes, actualizadas por el sistema de procesamiento de pagos, y consultadas por el equipo de soporte al cliente. Cada orden tiene un identificador único, un estado, y una lista de productos con sus cantidades. El sistema debe manejar errores como órdenes duplicadas y productos no disponibles. La API REST expuesta debe ser capaz de crear, leer, actualizar y eliminar órdenes de manera eficiente y segura.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 12 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración y modelado inicial

**Objetivo:** Configurar la tabla DynamoDB y modelar las operaciones CRUD básicas.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Diseñar la estructura de la tabla DynamoDB para almacenar órdenes.
- Implementar la creación de una nueva orden.
- Verificar que la nueva orden se almacena correctamente en DynamoDB.

**Entregable:** Tabla DynamoDB configurada y operaciones CRUD básicas implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la cardinalidad y las relaciones entre órdenes y productos.
- Piensa en cómo manejar errores de validación al crear una orden.

</details>

### Fase 2: Implementación de operaciones CRUD completas

**Objetivo:** Implementar operaciones CRUD completas para órdenes, incluyendo lectura, actualización y eliminación.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementar la lectura de una orden por su identificador.
- Implementar la actualización del estado de una orden.
- Implementar la eliminación de una orden.
- Verificar que todas las operaciones CRUD funcionen correctamente.

**Entregable:** Operaciones CRUD completas implementadas y verificadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar errores al leer, actualizar o eliminar órdenes.
- Piensa en cómo garantizar la consistencia de los datos al actualizar una orden.

</details>

### Fase 3: Optimización y manejo de errores

**Objetivo:** Optimizar las operaciones CRUD y manejar adecuadamente los errores.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Optimizar las operaciones CRUD para mejorar el rendimiento.
- Implementar un manejo adecuado de errores para cada operación CRUD.
- Verificar que el sistema maneje correctamente los casos de error.

**Entregable:** Operaciones CRUD optimizadas y manejo de errores implementado.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de índices en DynamoDB para mejorar el rendimiento.
- Piensa en cómo comunicar errores de manera clara y útil al usuario.
- Terraform: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y cómo se aplica en el contexto de DynamoDB?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en la gestión de órdenes en una plataforma de comercio electrónico?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD para crear, leer, actualizar y eliminar órdenes en DynamoDB?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en DynamoDB para optimizar el rendimiento y manejar errores?

## Criterios de Evaluacion

- Implementación correcta de la estructura de la tabla DynamoDB para almacenar órdenes.
- Implementación y verificación de operaciones CRUD básicas (crear orden).
- Implementación y verificación de operaciones CRUD completas (leer, actualizar, eliminar orden).
- Optimización de las operaciones CRUD para mejorar el rendimiento.
- Implementación y verificación de un manejo adecuado de errores para cada operación CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
  - `GET /orders`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
