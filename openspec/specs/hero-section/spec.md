# Hero Section Specification

## Purpose

Comunicar la propuesta de valor de Puff y dirigir a la acción primaria sin afirmar pruebas no verificadas.

## Requirements

### Requirement: Value proposition and action

El hero MUST presentar una propuesta de valor en inglés, copy de apoyo y una CTA principal con destino aprobado. El copy final SHALL usar `[NEEDS CLIENT INPUT]` cuando no haya sido aprobado por el cliente.

#### Scenario: Approved hero content

- GIVEN copy y destino de CTA aprobados
- WHEN carga la landing
- THEN se muestra una propuesta, apoyo y CTA comprensibles
- AND la CTA dirige al destino aprobado

#### Scenario: Missing CTA destination

- GIVEN que el cliente no proporcionó destino para la CTA
- WHEN se prepara el hero
- THEN el destino se marca `[NEEDS CLIENT INPUT]`
- AND no se enlaza a pagos ni a un portal de cliente

### Requirement: Social-proof placeholder

El hero MAY reservar un espacio para una señal de confianza, pero MUST NOT mostrar logos, testimonios, métricas o resultados sin evidencia proporcionada por el cliente.

#### Scenario: Unavailable social proof

- GIVEN que no hay prueba social aprobada
- WHEN se renderiza el hero
- THEN el espacio usa `[NEEDS CLIENT INPUT]` o se omite
- AND no contiene afirmaciones inventadas

### Requirement: Responsive and accessible hero

El hero MUST mantener lectura, CTA y orden semántico en 320 px y superiores. El texto de cuerpo sobre amarillo SHALL usar contraste AA y toda decoración MUST ser ignorada por lectores de pantalla.

#### Scenario: Narrow viewport

- GIVEN un viewport de 320 px
- WHEN se visualiza el hero
- THEN headline, apoyo y CTA se apilan sin desbordamiento horizontal

#### Scenario: Keyboard interaction

- GIVEN navegación por teclado
- WHEN el foco llega a la CTA
- THEN el control tiene nombre accesible y foco visible
