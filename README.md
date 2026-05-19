# agent-skills

CLI interno para instalar y gestionar skills de agentes IA entre proyectos del equipo.

## Instalación

Cloná el repositorio y prepará el entorno:

```bash
git clone <repo-url>
cd agent-skills
npm install
```

---

## Comandos

### `list` — Listar skills disponibles

```bash
node bin/cli.js list
```

Muestra todas las skills disponibles con su nombre, versión, descripción y tags.

**Ejemplo de salida:**

```
📦 Skills disponibles (1)

  ● example-skill   v1.0.0  —  Skill de ejemplo para demostrar el instalador
                               Tags: demo, example
```

---

### `install <skill-name>` — Instalar una skill (interactivo)

```bash
node bin/cli.js install example-skill
```

Muestra el nombre y descripción de la skill y pregunta al usuario dónde instalarla.
Si la carpeta destino ya existe, pregunta si desea sobreescribirla.

**Flujo interactivo:**

```
ℹ  Instalando: example-skill v1.0.0
? ¿Dónde querés instalar la skill? (./skills/example-skill)
⠸  Copiando archivos...
✔  Skill instalada correctamente en ./skills/example-skill
```

---

### `install <skill-name> --dest <ruta>` — Instalar con destino directo

```bash
node bin/cli.js install example-skill --dest ./my-project/skills
```

Instala la skill directamente en la ruta especificada, sin preguntas interactivas.

**Ejemplo de salida:**

```
ℹ  Instalando: example-skill v1.0.0
ℹ  Destino:    ./my-project/skills/example-skill

⠸  Copiando archivos...
✔  Skill instalada correctamente en ./my-project/skills/example-skill
```

---

### `info <skill-name>` — Ver información de una skill

```bash
node bin/cli.js info example-skill
```

Muestra los metadatos de la skill y la lista de archivos que contiene.

**Ejemplo de salida:**

```
📄 example-skill — v1.0.0
   Skill de ejemplo para demostrar el instalador
   Tags: demo, example
   Archivos: SKILL.md, metadata.json
```

---

## Estructura de una skill

Cada skill es una carpeta dentro de `/skills` con al menos dos archivos requeridos:

```
skills/
└── nombre-skill/
    ├── SKILL.md          # Prompt/instrucciones de la skill (requerido)
    └── metadata.json     # Metadatos (requerido)
```

Puede incluir archivos y subcarpetas adicionales; todos se copian recursivamente al destino.

### Formato de `metadata.json`

```json
{
  "name": "nombre-skill",
  "version": "1.0.0",
  "description": "Descripción breve de lo que hace esta skill",
  "tags": ["tag1", "tag2"],
  "author": "tu-nombre"
}
```

### Formato de `SKILL.md`

Archivo Markdown con el prompt o instrucciones que el agente debe seguir para ejecutar la skill.
No tiene un formato estricto; puede incluir secciones, ejemplos, restricciones, etc.

---

## Cómo agregar una nueva skill

1. Creá una carpeta con el nombre de tu skill dentro de `/skills`:

   ```bash
   mkdir skills/mi-nueva-skill
   ```

2. Creá el archivo `metadata.json`:

   ```json
   {
     "name": "mi-nueva-skill",
     "version": "1.0.0",
     "description": "Lo que hace esta skill",
     "tags": ["ai", "tools"],
     "author": "tu-nombre"
   }
   ```

3. Creá el archivo `SKILL.md` con el prompt o instrucciones del agente.

4. (Opcional) Agregá cualquier archivo o subcarpeta adicional que la skill necesite.

La skill aparecerá automáticamente en `node bin/cli.js list` sin necesidad de registrarla manualmente.

---

## Requisitos

- Node.js >= 18
- Tener el repositorio clonado localmente
