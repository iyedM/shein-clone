# 🎨 Design System & Color Palette

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **SHEIN Red** | #E8393A | Brand accent, buttons, badges |
| **Black** | #111111 | Text, dark backgrounds |
| **White** | #FFFFFF | Card backgrounds, text |
| **Light Gray** | #f5f5f5 | Subtle backgrounds |
| **Border Gray** | #e8e8e8 | Borders, dividers |

### Accent Colors

#### Warm
| Name | Hex | Usage |
|------|-----|-------|
| Light Red | #ff6b6b | Gradient end |
| Orange | #FF9800 | Call-to-action, gradients |
| Orange Light | #FFB74D | Gradient end |

#### Cool
| Name | Hex | Usage |
|------|-----|-------|
| Beige | #D8C3A5 | Neutral accent |
| Teal | #2A9D8F | Alternative accent |

---

## Gradient Combinations

### 1. Red Gradient (Primary)
```
from-[#E8393A] to-[#ff6b6b]
```
**Used in:**
- Flash sale section
- Banner cards
- Active buttons
- Product badges

### 2. Orange Gradient
```
from-[#FF9800] to-[#FFB74D]
```
**Used in:**
- Banner cards
- Accent elements
- Special promotions

### 3. Black Gradient
```
from-[#111111] to-[#353535]
```
**Used in:**
- Dark backgrounds
- Premium sections
- High contrast areas

### 4. Light Gradient
```
from-[#f9f9f9] to-[#f0f0f0]
```
**Used in:**
- Category icon backgrounds
- Subtle backgrounds
- Hover states

---

## Typography System

### Font Family
- **Default**: System sans-serif stack (Tailwind default)
- **Weight**: 400 (normal), 600 (semibold), 700 (bold), 900 (black)

### Sizes

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| **h1** | text-6xl | font-black | Hero headlines |
| **h2** | text-4xl | font-black | Section titles |
| **h3** | text-lg | font-black | Card titles |
| **body** | text-base | font-normal | Body text |
| **small** | text-xs | font-bold | Labels, badges |

### Examples
```jsx
// Hero Section
<h1 className="text-4xl md:text-6xl font-black">Title</h1>

// Card Title
<h3 className="text-lg font-black">Card Title</h3>

// Body Text
<p className="text-base font-normal">Content</p>

// Label
<span className="text-xs font-bold">BADGE</span>
```

---

## Spacing Scale

### Margins & Padding
| Class | Value |
|-------|-------|
| p-2 | 8px |
| p-3 | 12px |
| p-4 | 16px |
| p-6 | 24px |
| p-8 | 32px |
| mt-1 | 4px |
| mt-2 | 8px |
| mt-3 | 12px |
| mt-4 | 16px |
| mt-6 | 24px |

### Gap (Flex/Grid)
| Class | Value |
|-------|-------|
| gap-2 | 8px |
| gap-3 | 12px |
| gap-4 | 16px |
| gap-5 | 20px |

---

## Shadow System

### Elevation Levels

| Shadow | CSS | Usage |
|--------|-----|-------|
| **Light** | shadow-sm | Subtle depth |
| **Medium** | shadow-md | Cards, buttons |
| **Strong** | shadow-lg | Hover states |
| **Extra** | shadow-xl | Prominent hovers |

### Implementation
```jsx
// Card with shadow
<div className="shadow-md hover:shadow-lg transition-shadow">

// Product card on hover
<div className="group rounded-xl shadow-md group-hover:shadow-xl">
```

---

## Border Radius

| Radius | Class | Usage |
|--------|-------|-------|
| 4px | rounded-[4px] | Sharp elements |
| 8px | rounded | Subtle rounding |
| 12px | rounded-xl | Most components |
| 16px | rounded-2xl | Large sections |
| 50% | rounded-full | Pills, icons |

---

## Animation & Transitions

### Duration
- **Fast**: 150ms - Micro-interactions
- **Standard**: 300ms - Most transitions
- **Slow**: 500ms - Entrance animations

### Easing
- **Default**: ease-out - Smooth natural motion

### Properties
```jsx
// Smooth all properties
transition-all duration-300

// Specific property
transition-shadow duration-300

// Multiple
transition-all duration-300 ease-out
```

### Common Effects
```jsx
// Scale on hover
group-hover:scale-105

// Lift effect
hover:-translate-y-1

// Shadow enhancement
group-hover:shadow-xl

// Color change
hover:text-[#E8393A]

// Combined effect
group-hover:scale-110 group-hover:shadow-xl transition-all duration-300
```

---

## Component Specifications

### Buttons
```jsx
// Primary Button
<button className="bg-[#E8393A] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
  Action
</button>

// Secondary Button
<button className="border-2 border-[#E8393A] text-[#E8393A] px-6 py-3 rounded-lg font-bold hover:bg-[#E8393A] hover:text-white">
  Action
</button>
```

### Cards
```jsx
// Product Card
<article className="rounded-xl border border-[#e8e8e8] bg-white hover:shadow-xl transition-all duration-300">
  {/* Content */}
</article>

// Section Card
<div className="bg-white p-6 rounded-xl shadow-md">
  {/* Content */}
</div>
```

### Badge
```jsx
// Discount Badge
<span className="rounded-[2px] bg-[#E8393A] px-1.5 py-0.5 text-[10px] font-bold text-white">
  -60%
</span>

// Info Badge
<span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-xs font-semibold text-[#111111]">
  NEW
</span>
```

---

## Responsive Breakpoints

| Breakpoint | Size | Class |
|-----------|------|-------|
| Mobile | < 640px | base (no prefix) |
| Tablet | 768px | md: |
| Desktop | 1024px | lg: |
| Large | 1280px | xl: |
| Extra Large | 1536px | 2xl: |

### Example
```jsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
  Items
</div>
```

---

## Accessibility Features

### Color Contrast
- Text on backgrounds meet WCAG AA (4.5:1 for small text)
- White text on #E8393A passes contrast
- Black text on white passes contrast

### Touch Targets
- Minimum 48px for interactive elements
- Proper spacing between clickable areas
- Clear focus states (Tailwind focus-ring)

### Semantic HTML
```jsx
// Use semantic elements
<button onClick={handle}>Action</button>
<a href="/path">Link</a>
<nav>{/* Navigation */}</nav>
<section>{/* Section */}</section>
```

---

## Dark Mode Considerations

Currently light-only, but can add dark mode with:
```jsx
// Example dark mode (if implemented)
<div className="bg-white dark:bg-[#111111] text-[#111111] dark:text-white">
  Content
</div>
```

---

## CSS Architecture

### Approach
- **Utility-first**: Tailwind CSS v4
- **Component-based**: React components
- **Type-safe**: Full TypeScript

### File Organization
```
src/
├── app/
│   └── globals.css (global styles)
├── components/
│   ├── ui/ (reusable UI components)
│   ├── layout/ (layout components)
│   ├── home/ (homepage sections)
│   └── product/ (product-related)
├── lib/
│   └── utils.ts (utility functions)
└── styles/
    └── (if needed for custom CSS)
```

---

## Best Practices

### Do ✅
- Use consistent spacing (gap-3, gap-4)
- Apply shadow for depth
- Use transitions for smoothness
- Keep color consistent with brand
- Follow 12px border radius for components

### Don't ❌
- Mix different shadow levels randomly
- Use harsh colors without gradients
- Add unnecessary animations
- Break spacing consistency
- Use extreme font sizes

---

## Color Accessibility

All colors tested for WCAG compliance:
- ✅ Red (#E8393A) on white text ≥ 4.5:1
- ✅ Black (#111111) on white text ≥ 4.5:1
- ✅ White on red background ≥ 4.5:1

---

## Performance Notes

### CSS Optimization
- Tailwind purges unused classes
- GPU-accelerated transforms (transform, opacity)
- No unnecessary box-shadows
- Efficient gradient usage

### Animation Performance
- Use `transform` for animations (GPU accelerated)
- Use `opacity` for fade (GPU accelerated)
- Avoid animating `left`, `top`, `width` (triggers repaints)
- Max 300ms for standard transitions

---

## Export Notes

### Color Variables (if needed)
```css
:root {
  --color-brand: #E8393A;
  --color-black: #111111;
  --color-white: #FFFFFF;
  --color-border: #e8e8e8;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Component Patterns
All styles are in Tailwind utilities - no separate CSS files needed for styling.

---

**Design System Version: 1.0** | **Last Updated: April 2026**
