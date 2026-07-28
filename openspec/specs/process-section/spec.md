# Process Section Specification

## Purpose

Explicar el flujo de trabajo de alto nivel y reservar una demostración visual del dashboard sin crear un portal.

## Requirements

### Requirement: Three-step process

La sección MUST presentar exactamente tres pasos de proceso en secuencia clara. Las definiciones operativas, tiempos y términos no aprobados SHALL indicarse como `[NEEDS CLIENT INPUT]`.

#### Scenario: Read process sequence

- GIVEN que una persona llega a la sección
- WHEN recorre el contenido en orden de documento
- THEN puede identificar tres pasos consecutivos
- AND ningún paso depende solo de una ilustración o número

#### Scenario: Missing operational definition

- GIVEN que la definición de un paso no fue validada
- WHEN se prepara el contenido
- THEN la definición se marca `[NEEDS CLIENT INPUT]`

### Requirement: Dashboard preview boundary

La sección MAY incluir una captura, mockup o marcador del dashboard, pero MUST dejar claro que es una previsualización. No SHALL incluir autenticación, creación de briefs ni otra función de portal.

#### Scenario: Approved dashboard visual

- GIVEN un activo visual aprobado por el cliente
- WHEN se muestra la previsualización
- THEN se presenta como referencia del flujo
- AND no funciona como dashboard interactivo

#### Scenario: Missing dashboard asset

- GIVEN que no existe captura o mockup aprobado
- WHEN se muestra la sección
- THEN se usa `[NEEDS CLIENT INPUT]`
- AND no se fabrica una interfaz que implique capacidades reales

### Requirement: Responsive and accessible process

La sección MUST conservar la secuencia de los pasos y texto alternativo útil para contenido visual significativo. En móvil SHALL apilar pasos y previsualización sin pérdida de contenido.

#### Scenario: Mobile process

- GIVEN un viewport menor de 768 px
- WHEN se visualiza la sección
- THEN los tres pasos aparecen antes o junto a la previsualización en orden lógico

#### Scenario: Informative preview

- GIVEN una previsualización que comunica información
- WHEN un lector de pantalla la encuentra
- THEN recibe una alternativa textual equivalente
