# Site Shell Specification

## Purpose

Definir la estructura navegable y accesible de la landing pública de Puff Cross Media.

## Requirements

### Requirement: Landing navigation

La landing MUST ofrecer navegación por anclas hacia las secciones disponibles y MUST NOT enlazar a rutas inexistentes. La navegación SHALL conservar el orden de lectura y foco en todos los tamaños de pantalla.

#### Scenario: Navigate to a section

- GIVEN que una persona está en cualquier punto de la landing
- WHEN activa un enlace de navegación válido
- THEN la vista llega a la sección identificada
- AND la URL no resuelve a una ruta 404

#### Scenario: Mobile navigation order

- GIVEN un viewport menor de 768 px
- WHEN se muestra la navegación
- THEN sus controles se pueden recorrer por teclado
- AND no se oculta contenido de navegación esencial

### Requirement: Shared footer and contact

El sitio MUST incluir un pie con identificación de marca, enlaces sociales, contacto y enlaces legales; los valores no suministrados SHALL mostrarse como `[NEEDS CLIENT INPUT]`.

#### Scenario: Missing client contact details

- GIVEN que no se entregaron datos de contacto o enlaces sociales
- WHEN se renderiza el pie
- THEN cada dato pendiente se etiqueta `[NEEDS CLIENT INPUT]`
- AND no se inventan destinos ni cuentas

#### Scenario: Footer accessibility

- GIVEN que una persona navega mediante teclado
- WHEN alcanza los enlaces del pie
- THEN cada enlace tiene un nombre accesible y foco visible

### Requirement: Baseline metadata

El sitio SHOULD exponer título, descripción y datos de compartición basados únicamente en copy y activos aprobados. Cualquier nombre legal, URL canónica u organización pendiente MUST usar `[NEEDS CLIENT INPUT]`.

#### Scenario: Unapproved metadata

- GIVEN que faltan valores de marca o legales aprobados
- WHEN se prepara metadata pública
- THEN los campos pendientes quedan identificados como `[NEEDS CLIENT INPUT]`
