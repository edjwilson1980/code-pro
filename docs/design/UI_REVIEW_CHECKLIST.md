# UI Review Checklist

The design director scores each screen out of 10. **PASS = 8+ with no "must fix" items.** Check phone (390px) first, then desktop (1440px).

| # | Check | Points |
|---|---|---|
| 1 | **Clarity:** the purpose and main action are obvious in 3 seconds; one primary action | 2 |
| 2 | **Phone comfort:** tap targets 44px+, primary action within thumb reach, no sideways scrolling, nothing hover-only | 2 |
| 3 | **Readability:** body 16px+, good line length, contrast AA or better, clear hierarchy | 1 |
| 4 | **Consistency:** colors, type, spacing and radius all from DESIGN_SYSTEM.md; matches other screens | 1 |
| 5 | **States:** loading, empty, error and success all designed and in plain language | 1 |
| 6 | **Flow:** no unnecessary steps or fields; next step always clear; easy to go back | 1 |
| 7 | **Copy:** customer-friendly words, no jargon, buttons say what happens ("Add to cart," not "Submit") | 1 |
| 8 | **Accessibility:** input labels, alt text, visible focus, no color-only meaning | 1 |

**Automatic FIX** regardless of score: broken layout on phone, unreadable text, a primary action that's hidden or below unclear content, or a missing error state on a form or payment.
