# Pricing Section Specification

## Purpose

Permitir comparar las cuatro ofertas de diseño sin convertir la landing en un checkout.

## Requirements

### Requirement: Four-tier comparison

La sección MUST presentar cuatro tiers comparables con nombre, precio, alcance y límites definidos por el cliente. Cualquier precio, beneficio o definición de “project” sin aprobación SHALL usar `[NEEDS CLIENT INPUT]`.

#### Scenario: Compare complete tiers

- GIVEN que el cliente aprobó la información comercial
- WHEN una persona consulta pricing
- THEN puede comparar los cuatro tiers con los mismos campos
- AND la definición de “project” está disponible junto a sus límites

#### Scenario: Missing commercial details

- GIVEN un precio, límite o inclusión no confirmado
- WHEN se muestra el tier correspondiente
- THEN ese valor se etiqueta `[NEEDS CLIENT INPUT]`
- AND no se deduce desde material de auditoría

### Requirement: Conversion boundaries

Cada tier MUST ofrecer una CTA que lleve a un siguiente paso aprobado; la sección MUST NOT recopilar pagos, suscripciones ni credenciales.

#### Scenario: Select a tier

- GIVEN un destino de conversión aprobado
- WHEN una persona activa la CTA de un tier
- THEN llega al destino aprobado
- AND no completa un pago dentro de la landing

### Requirement: Accessible responsive comparison

La matriz MUST ser operable por teclado y mantener asociación entre cada valor y su tier. En pantallas estrechas SHALL transformarse a una presentación legible sin eliminar inclusiones o límites.

#### Scenario: Mobile comparison

- GIVEN un viewport de 320 px
- WHEN se consulta pricing
- THEN cada tier conserva nombre, precio, alcance y límite legibles

#### Scenario: Keyboard CTA

- GIVEN navegación por teclado
- WHEN el foco llega a una CTA de tier
- THEN la CTA tiene foco visible y nombre que identifica el tier
