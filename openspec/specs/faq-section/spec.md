# FAQ Section Specification

## Purpose

Resolver objeciones comunes del modelo DaaS mediante preguntas y respuestas validadas.

## Requirements

### Requirement: Client-approved FAQ content

La sección MUST contener preguntas y respuestas aprobadas por el cliente para las objeciones principales. Políticas, SLA, propiedad, pausas, cancelación y definición de “project” sin validar SHALL usar `[NEEDS CLIENT INPUT]`.

#### Scenario: Answer a validated objection

- GIVEN una pregunta y respuesta aprobadas
- WHEN una persona la expande
- THEN recibe la respuesta íntegra aprobada

#### Scenario: Missing policy answer

- GIVEN que una política comercial o legal no está confirmada
- WHEN se prepara la FAQ
- THEN se indica `[NEEDS CLIENT INPUT]`
- AND no se establece una política implícita

### Requirement: Accessible accordion disclosure

Cada pregunta MUST ser el único control de su fila y MUST comunicar su estado expandido. La respuesta SHALL estar asociada programáticamente con la pregunta y seguir el orden natural del documento.

#### Scenario: Expand with keyboard

- GIVEN una pregunta cerrada y enfocada
- WHEN una persona la activa mediante teclado
- THEN su respuesta se muestra
- AND el estado expandido cambia de forma perceptible y programática

#### Scenario: Collapse a response

- GIVEN una pregunta abierta
- WHEN se vuelve a activar su control
- THEN la respuesta se oculta sin mover el foco inesperadamente

### Requirement: Responsive FAQ legibility

La FAQ MUST preservar preguntas, controles y respuestas en todos los tamaños, incluido 320 px. Las respuestas SHALL tener contraste AA y no depender de color o animación para indicar estado.

#### Scenario: Narrow viewport FAQ

- GIVEN un viewport de 320 px
- WHEN se abre una respuesta extensa
- THEN el texto se adapta sin desbordamiento horizontal
