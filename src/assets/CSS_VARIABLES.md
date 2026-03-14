# CSS Variables Documentation

## Color Palette

### Primary Colors (Blue - Professional & Trustworthy)
```css
--primary-color: #2563EB;      /* Blue 600 - Main brand color */
--primary-dark: #1D4ED8;       /* Blue 700 - Hover states */
--primary-light: #3B82F6;      /* Blue 500 - Highlights */
```

### Secondary Colors (Amber - Warm Accents)
```css
--secondary-color: #F59E0B;    /* Amber 500 - Accent elements */
--accent-color: #FBBF24;       /* Amber 400 - Highlights */
```

### Background Colors
```css
--bg-primary: #F8FAFC;         /* Main background */
--bg-secondary: #FFFFFF;       /* Cards, surfaces */
--bg-accent: #F1F5F9;          /* Section backgrounds */
--bg-warm: #FEF3C7;            /* CTA highlights */
```

### Text Colors
```css
--text-primary: #1E293B;       /* Headings, important text */
--text-secondary: #64748B;     /* Body text */
--text-muted: #94A3B8;         /* Secondary text */
--text-light: #F8FAFC;         /* Text on dark backgrounds */
```

## Gradients

```css
--gradient-primary: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
--gradient-blue: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
--gradient-light: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
--gradient-warm: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(37, 99, 235, 0.05);
--shadow-md: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(37, 99, 235, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(37, 99, 235, 0.15);
--shadow-glow: 0 0 40px rgba(37, 99, 235, 0.2);
--shadow-soft: 0 8px 30px rgba(37, 99, 235, 0.08);
```

## Border Radius

```css
--radius-sm: 8px;              /* Small elements */
--radius-md: 12px;             /* Medium elements */
--radius-lg: 16px;             /* Large elements */
--radius-xl: 24px;             /* Extra large */
--radius-xxl: 32px;            /* XXL elements */
--radius-full: 9999px;         /* Pill/circle */
```

## Usage Examples

### Button
```css
.btn {
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
}
```

### Card
```css
.card {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
}
```

### Badge
```css
.badge {
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius-full);
  color: var(--primary-color);
}
```
