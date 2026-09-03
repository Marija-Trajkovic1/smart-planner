export function getFontFamily(type: string | undefined): string {
  switch (type) {
    case 'PLAIN': return 'Arial, sans-serif';
    case 'SERIF': return 'Georgia, serif';
    case 'MONO': return '"Courier New", Courier, monospace';
    case 'MODERN': return '"Helvetica Neue", Helvetica, "Segoe UI", sans-serif';
    case 'GEOMETRIC': return '"Trebuchet MS", sans-serif';
    case 'CLASSIC': return '"Times New Roman", Times, serif';
    case 'IMPACT': return 'Impact, Charcoal, sans-serif';
    case 'PLAYFUL': return '"Comic Sans MS", "Comic Neue", cursive';
    default: return 'inherit';
  }
}
