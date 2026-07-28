# Portfolio Section Specification

## Purpose

Exhibir trabajo aprobado por categoría sin inventar proyectos ni prometer entregables no demostrados.

## Requirements

### Requirement: Categorized portfolio

La sección MUST listar trabajos aprobados en las categorías Graphic, Web y Video. Cada elemento SHALL incluir medio, título y contexto únicamente si el cliente los aportó; datos ausentes MUST mostrar `[NEEDS CLIENT INPUT]`.

#### Scenario: View approved work

- GIVEN elementos de portfolio aprobados
- WHEN se carga la sección
- THEN cada elemento se asocia con una categoría visible
- AND no se le atribuye cliente, resultado ni alcance no confirmado

#### Scenario: Missing category content

- GIVEN que una categoría no tiene activos aprobados
- WHEN se prepara la sección
- THEN se identifica `[NEEDS CLIENT INPUT]` o se excluye la categoría
- AND no se rellena con ejemplos ficticios

### Requirement: Category filtering

La sección MUST permitir ver todos los trabajos o una categoría a la vez mediante controles con estado perceptible. El filtrado SHALL conservar todos los elementos en la fuente de contenido.

#### Scenario: Filter category

- GIVEN elementos en más de una categoría
- WHEN una persona selecciona “Web”
- THEN se muestran solo elementos Web
- AND el control seleccionado comunica su estado

#### Scenario: Empty filtered result

- GIVEN que una categoría aprobada no tiene elementos publicados
- WHEN se selecciona esa categoría
- THEN se comunica claramente que no hay trabajos disponibles

### Requirement: Accessible responsive media

Cada medio MUST tener texto alternativo o equivalencia contextual y los filtros MUST ser operables por teclado. En móvil, la cuadrícula SHALL evitar recortes que oculten evidencia relevante.

#### Scenario: Keyboard filter

- GIVEN navegación por teclado
- WHEN el foco llega a un filtro
- THEN el estado y resultado actualizado son perceptibles

#### Scenario: Narrow media layout

- GIVEN un viewport de 320 px
- WHEN se muestran elementos del portfolio
- THEN no hay desbordamiento horizontal ni metadatos solo visibles al hover
