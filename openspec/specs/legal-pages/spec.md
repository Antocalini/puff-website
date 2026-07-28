# Legal Pages Specification

## Purpose

Reservar páginas públicas de Privacy Policy y Terms of Service con contenido jurídico proporcionado por el cliente.

## Requirements

### Requirement: Required legal destinations

El sitio MUST proporcionar destinos separados para Privacy Policy y Terms of Service desde el footer. Los textos legales, entidad responsable y jurisdicción SHALL ser contenido aprobado por el cliente.

#### Scenario: Open privacy policy

- GIVEN que una persona activa el enlace Privacy Policy
- WHEN el destino está publicado
- THEN puede acceder al texto de Privacy Policy

#### Scenario: Open terms

- GIVEN que una persona activa el enlace Terms of Service
- WHEN el destino está publicado
- THEN puede acceder al texto de Terms of Service

### Requirement: Missing legal content handling

Si no se ha entregado texto legal aprobado, cada documento MUST señalar `[NEEDS CLIENT INPUT]`; la landing MUST NOT inventar cláusulas, políticas de privacidad, jurisdicciones ni compromisos.

#### Scenario: No approved privacy copy

- GIVEN que falta Privacy Policy aprobada
- WHEN se prepara la página
- THEN el contenido pendiente se identifica `[NEEDS CLIENT INPUT]`
- AND no se presentan términos ficticios como legales

### Requirement: Accessible legal reading

Las páginas legales MUST usar estructura semántica de títulos y enlaces legibles, y SHALL ser accesibles por teclado a 320 px y superiores.

#### Scenario: Mobile legal page

- GIVEN un viewport de 320 px
- WHEN se lee un documento legal
- THEN el texto se ajusta sin desbordamiento horizontal

#### Scenario: Keyboard legal navigation

- GIVEN navegación por teclado
- WHEN una persona recorre enlaces del documento
- THEN cada enlace tiene foco visible y nombre accesible
