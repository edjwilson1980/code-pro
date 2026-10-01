# Kickoff Questions

## How Claude runs the Q&A: senior engineer mode
Ask like a senior engineer whose career depends on this project shipping right. The expensive mistakes happen here, not in the code.

- **Understand the business before the feature.** Ask what problem costs money or time today, and how it's done now, before asking what to build. The real requirement is often different from the first request.
- **Don't accept vague answers.** "It should be fast," "lots of users," "simple." Pin them to numbers and examples: how many orders a day? What's "slow" today? Show me one real example.
- **Hunt for what breaks.** For every flow, ask what happens when it fails: payment declined, file too big, customer uploads the wrong thing, internet drops, two people edit at once, an API is down.
- **Find the hidden work.** Existing data to move over, existing plugins or workflows it must not break, staff who need training, someone who has to maintain it after launch.
- **Challenge, respectfully.** If an answer adds big cost or risk, say so and offer a cheaper or safer option. For example: "That needs user accounts, which adds about a week. Would a magic-link email do for v1?"
- **Make it easy for Ed.** He's the owner, not a coder. Ask in plain English, up to 5 questions per round, ideally multiple-choice with a **(Recommended)** option and a one-line reason. Skip anything already answered or obvious from his memory and context.
- **Adapt.** The bank below is a floor, not a script. Ask follow-ups where answers reveal risk; skip sections that don't apply.
- **Close the loop.** End with "Here's what I heard" (one screen), the top 3 risks, and any assumptions that still need a yes or no. All of this goes into the PRD.

Order: business, then users and flows, then the hard questions, then tech, then security, then done and budget, then client terms.

## 1. The business problem
1. In one sentence, what does it do, and for whom?
2. What's the pain today? How is it done now (manual steps, tools, spreadsheets), and what does that cost in hours, mistakes or lost sales?
3. How will we know it worked: what number moves? (Orders, time saved, fewer errors, revenue.)
4. What happens if we don't build it, or it's late? (That tells us real priority and deadline.)

## 2. Users and flows
5. Who uses it? Customers, staff, Ed, the client's team? How tech-savvy are they, and are they on phones or desktops?
6. Walk me through the main path step by step, the happy path: "a customer lands on…, then…"
7. Must-haves for v1, and what can wait for v2? (Push for the smallest v1 that solves the pain.)
8. Any apps or sites it should look or work like? Brand colors, logo, fonts?

## 3. The hard questions (where projects fail)
9. **Volume and scale:** how many users, orders, files or records per day now, and in a year? Biggest file size? Busiest time (holidays, drops)?
10. **Failure paths:** what should happen when payment fails, an upload is wrong or huge, an outside service is down, or a customer abandons halfway?
11. **Existing systems:** what must this plug into or not break (WooCommerce, current plugins, n8n workflows, Google Drive folders, the printer workflow)? Who owns those?
12. **Existing data:** is there data to import or migrate (customers, orders, products)? How messy is it?
13. **Edge cases:** returns or refunds, edits after ordering, duplicates, international customers, taxes, time zones, accessibility.
14. **Who runs it after launch?** Who fixes things, updates content, answers "it's broken"? Does staff need training or a how-to?
15. **Errors and monitoring:** what counts as an emergency (text Ed now) versus a daily summary? (Connects to home base.)

## 4. Where it lives (tech)
16. What is it: WordPress plugin, web app, mobile app, internal tool, or automation?
17. Hosting: SiteGround, Vercel, Supabase, the client's server? Is there a staging copy yet?
18. Logins: who logs in, and how (email and password, magic link, Google)? Different roles?
19. Payments: Stripe, WooCommerce checkout, invoices? One-time or subscriptions?
20. Connections: WooCommerce, Google Drive or Sheets, n8n, email or SMS, other APIs? Do we have access and test accounts for each?

## 5. Security and data
21. Who should be able to see or change what (admins, staff, customers)?
22. What's the worst thing that could happen if it broke or got hacked (lost orders, leaked customer data, wrong charges)?
23. What sensitive data does it touch (customer info, payments, addresses, uploaded artwork rights)? Where must it be stored?
24. Any rules we must follow (PCI for cards, client NDA, data must stay in the US, a "no AI or cloud" clause)?

## 6. Done and budget
25. What does "done" look like? Which 3 to 5 test scenarios prove it works?
26. Deadline, and is it hard (an event or drop) or soft?
27. Credit or budget limit for the build? Ongoing monthly costs you're OK with (hosting, APIs)?

## 7. Client jobs only
28. Client name, main contact, decision-maker, and how they want updates?
29. Exact scope: what's included, what costs extra, and how change requests are handled?
30. Who owns the code at the end? Transfer the repo, or add them to it?
31. Who pays for hosting, domains and API services after launch?
32. Any NDA or rule that code must stay off cloud services?
33. Payment schedule and handoff checklist (logins via password manager, docs, training)?
