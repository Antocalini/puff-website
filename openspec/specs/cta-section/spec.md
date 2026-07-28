# CTA Section Specification

## Purpose

Cerrar la landing con una invitación de conversión clara, sin confirmar promociones o condiciones no aprobadas.

## Requirements

### Requirement: Final conversion callout

La sección MUST incluir mensaje de cierre, términos de apoyo y una CTA con destino aprobado. Copy, trial, descuentos y condiciones pendientes SHALL usar `[NEEDS CLIENT INPUT]`.

#### Scenario: Approved final CTA

- GIVEN copy, condiciones y destino aprobados
- WHEN una persona llega al cierre
- THEN encuentra el mensaje y CTA final
- AND la CTA dirige al destino aprobado

#### Scenario: Unapproved promotion

- GIVEN que no se aprobó trial, descuento o duración
- WHEN se prepara la sección
- THEN el dato se marca `[NEEDS CLIENT INPUT]`
- AND no se promociona una oferta inferida

### Requirement: Landing-only conversion boundary

La CTA MUST NOT ejecutar suscripciones, pagos ni autenticación en la landing. Puede dirigir a una experiencia externa solo cuando su destino sea aprobado.

#### Scenario: Activate final CTA

- GIVEN una CTA visible
- WHEN una persona la activa
- THEN no se muestra un formulario de pago dentro de la landing

### Requirement: Accessible responsive CTA

La sección MUST mantener contenido y CTA legibles en móvil, con contraste AA y foco visible. Decoración o movimiento SHALL permanecer detrás del contenido y no impedir interacción.

#### Scenario: Reduced motion CTA

- GIVEN que se prefiere movimiento reducido
- WHEN se carga la CTA
- THEN mensaje y control aparecen sin animación no esencial

#### Scenario: Keyboard CTA

- GIVEN navegación por teclado
- WHEN el foco alcanza la CTA
- THEN el control tiene nombre accesible y contraste de foco suficiente
