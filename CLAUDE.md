# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure
- Main Alphard site: `/src`
- Sonoki artist site: `/k_sonoki`
- Both use Next.js with similar configurations

## Critical Rules
### Scope Limitations
- **DO NOT modify any files in the `/k_sonoki` directory**

### Development Approach
- Always make changes carefully, thoroughly, and attentively
- Before implementing any change, check 5 times for potential impacts on other parts of the codebase
- Changes should be comprehensive and cautious to maintain stability
- Act as a professional developer at all times

### When Uncertain
- When in doubt, do not make changes without seeking explicit confirmation from the requestor
- Never hesitate to ask for clarification when requirements are unclear or potentially problematic

### Layout & Design Integrity
- Always consider the overall design and verify that layout remains intact across all viewports
- If changes cause any layout breakage or visual issues, immediately revert the changes
- Test all modifications in multiple screen sizes to ensure responsive behavior is preserved

### Refactoring Guidelines
- When refactoring, prioritize code reduction over addition to maintain simplicity
- Always consider if functionality can be achieved with less code rather than more
- Evaluate if existing code can be simplified before adding new implementations

## Code Standards
### Font Usage
- Use Inter font as fallback for Helvetica
- Japanese text must use Helvetica/Inter (not serif fonts)

### Structure & Organization
- Follow existing component structure patterns
- CSS files separate per page with global styles in globals.css
- Each page has Client component with main logic

### Development Practices
- Use CSS variables for styling consistency (fonts, colors)
- Implement responsive designs for all components
- Use React Hooks for state management and data fetching
- Follow existing error handling patterns with try/catch

## Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint