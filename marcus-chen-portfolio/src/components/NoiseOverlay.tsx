export interface NoiseOverlayProps {
  className?: string
  /** Grain strength. Kept low on purpose — this should read as film stock, not static. */
  opacity?: number
}

/**
 * Film-grain layer.
 *
 * Renders the `.noise-overlay` utility from index.css, which paints an inline
 * SVG `feTurbulence` fractal-noise tile as a data URI. Purely decorative:
 * `aria-hidden` + `pointer-events-none` mean it never reaches the a11y tree and
 * never intercepts clicks.
 *
 * Positioning is deliberately NOT baked in: the caller passes it via
 * `className` (`absolute inset-0` for a layer scoped to a `relative` ancestor,
 * `fixed inset-0` for a viewport-wide layer). Hardcoding a position utility
 * here would collide with the caller's — both are single-class utilities of
 * equal specificity, so the winner would be decided by Tailwind's emission
 * order rather than by intent.
 */
export function NoiseOverlay({ className, opacity = 0.035 }: NoiseOverlayProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={['noise-overlay pointer-events-none', className]
        .filter(Boolean)
        .join(' ')}
      // Inline style beats the utility's own opacity, keeping the prop authoritative.
      style={{ opacity }}
    />
  )
}
