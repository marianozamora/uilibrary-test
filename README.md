# Library

Buscador de assets internos — KPIs, layouts, visualizaciones y storyboards. La idea es que el equipo pueda encontrar rápido lo que necesita para armar reportes y presentaciones, y pedir acceso cuando está restringido.

## Correr el proyecto

```bash
pnpm install
pnpm dev
```

## Cómo agregar un asset

Todo el catálogo vive en `app/data/assets.ts`. Agregar una entrada al array `ASSETS`:

```ts
{
  id: 11,
  name: 'Gross Margin',
  type: 'kpi',
  tags: ['finance', 'margin'],
  date: '01/15/2025',
  featured: false,
  trending: false,
  affiliate: false,
  desc: 'Margen bruto como porcentaje de ingresos netos.',
  bq: ['¿Cómo evoluciona el margen mes a mes?'],
  metricIds: ['gross_margin_pct'],
  calc: '(Revenue - COGS) / Revenue',
  visuals: true,
}
```

El campo `type` determina en qué tab aparece y qué secciones muestra el modal de detalle.

## Notas

- Los favoritos se guardan en `localStorage` (clave `library-favorites`), así que persisten entre sesiones pero son por navegador.
- La búsqueda filtra por nombre, descripción y tags.
- Para assets con `affiliate: true` aparece el banner de acceso restringido y el botón conecta al formulario de solicitud.
