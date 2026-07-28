# Testimonials Section Specification

## Purpose

Ofrecer estructura de confianza para testimonios y logos respaldados por el cliente.

## Requirements

### Requirement: Verified testimonial content

La sección MUST mostrar únicamente testimonios, atribuciones y permisos proporcionados o aprobados por el cliente. Todo contenido pendiente SHALL usar `[NEEDS CLIENT INPUT]` y MUST NOT simular una reseña.

#### Scenario: Approved testimonial

- GIVEN una cita y atribución aprobadas
- WHEN se muestra el testimonio
- THEN se preservan texto, autor y contexto autorizados

#### Scenario: Unavailable testimonial

- GIVEN que no hay una cita aprobada
- WHEN se prepara la sección
- THEN el contenido se etiqueta `[NEEDS CLIENT INPUT]` o se omite
- AND no se inventa una persona, empresa o resultado

### Requirement: Authorized logo bar

La sección MAY incluir logos de clientes solo con autorización y activo aprobado. Un logo MUST tener texto alternativo que identifique la organización o usar `[NEEDS CLIENT INPUT]` si falta autorización.

#### Scenario: Approved logo

- GIVEN un logo autorizado
- WHEN aparece en la barra
- THEN su alternativa identifica la organización

#### Scenario: Missing logo authorization

- GIVEN que falta permiso o activo
- WHEN se prepara la barra
- THEN se marca `[NEEDS CLIENT INPUT]`
- AND no se usa un logo de terceros

### Requirement: Accessible responsive presentation

Si la sección rota o pagina contenido, MUST disponer de controles pausables y operables por teclado; no SHALL avanzar automáticamente con movimiento reducido. En móvil, testimonios y logos MUST permanecer legibles.

#### Scenario: Reduced motion

- GIVEN que se prefiere movimiento reducido
- WHEN se visualiza contenido testimonial rotativo
- THEN no avanza automáticamente

#### Scenario: Keyboard control

- GIVEN navegación por teclado
- WHEN existe un control de paginación
- THEN tiene nombre accesible, foco visible y resultado perceptible
