# Brand System Specification

## Purpose

Establecer restricciones de identidad, composición y movimiento aplicables a la landing de marketing.

## Requirements

### Requirement: Brand identity constraints

El sistema MUST conservar Puff yellow como señal primaria, superficies blanco/negro/gris y una expresión profesional y lúdica con intervenciones hand-drawn. Las fuentes finales, logo y activos no aprobados SHALL usar `[NEEDS CLIENT INPUT]`.

#### Scenario: Apply brand surfaces

- GIVEN una sección de la landing
- WHEN se define su identidad visual
- THEN usa amarillo Puff como señal primaria
- AND no reemplaza la marca con una paleta corporativa genérica

#### Scenario: Missing brand asset

- GIVEN que falta un logo, fuente o ilustración autorizada
- WHEN se especifica la sección
- THEN el activo se marca `[NEEDS CLIENT INPUT]`
- AND no se presume un activo definitivo

### Requirement: Accessible responsive visual system

La landing MUST alcanzar contraste WCAG AA para texto de cuerpo, foco visible y orden semántico intacto. Toda composición SHALL colapsar a flujo de documento bajo 768 px sin ocultar contenido.

#### Scenario: Yellow text treatment

- GIVEN una superficie amarilla
- WHEN se muestra texto de cuerpo
- THEN el texto usa un color que satisface contraste AA

#### Scenario: Mobile composition

- GIVEN un viewport menor de 768 px
- WHEN una composición editorial contiene superposición
- THEN el contenido se apila y conserva orden de lectura y foco

### Requirement: Optional motion behavior

Cuando se apruebe un runtime de motion, la landing MAY usar Lenis + GSAP + ScrollTrigger para coreografía no esencial. Con `prefers-reduced-motion`, MUST desactivar suavizado de scroll y animaciones no esenciales; contenido y CTA SHALL aparecer de inmediato.

#### Scenario: Normal motion preference

- GIVEN que el usuario no solicita movimiento reducido
- WHEN existe una revelación no esencial
- THEN puede usar opacidad y transformaciones sin retrasar contenido esencial

#### Scenario: Reduced motion preference

- GIVEN `prefers-reduced-motion`
- WHEN carga la landing
- THEN no hay smooth scrolling ni coreografía de scroll no esencial
- AND el contenido permanece completamente disponible
