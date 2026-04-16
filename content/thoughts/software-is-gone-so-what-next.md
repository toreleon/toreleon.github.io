---
title: "Software is gone. So, what next?"
excerpt: "Coding agents solved the IDE. The more interesting question is where they go next — and what it means that the center of my day is no longer typing code."
date: "2026-04-17"
readTime: "7 min read"
category: "Essays"
tags: ["Coding Agents", "Multi-Agent Systems", "AI Engineering", "Future of Software"]
---

For most of my career the job was clear. Read a ticket, open a file, type code, push a PR. The unit of work was a keystroke; the craft was in choosing which keystrokes, in what order, with what discipline. That framing is what I trained for, what I interviewed for, what I argued about on lunch breaks.

Sometime in the last two years that framing quietly collapsed on me.

I still write code. But increasingly I don't *type* it. I describe an intent, supervise a plan, review a diff, and re-route when the agent goes somewhere I didn't expect. The keystrokes moved down the stack. What stays is judgment — what to build, what to cut, what to measure, what to trust. When people say "software is gone," they don't mean programs are gone. They mean the old loop is gone. The one where the bottleneck was typing.

## The old answer doesn't fit anymore

A year ago the honest response to "what will this change?" was "autocomplete, but better." That's no longer true. Today's agents open files you didn't mention, run tests, read logs, propose migrations, and argue with you about naming. A competent agent is not a faster typist — it's a junior engineer that never sleeps and never asks for benefits, with a bounded but real understanding of your codebase.

That reframe matters because it changes who the agent replaces. Autocomplete replaced muscle memory. Agents replace the loop — the thing where you read a bug report, form a hypothesis, reproduce it, fix it, and ship. Not the senior engineer. Not yet. But the grunt version of that loop, the one we used to assign to interns and call "ramp-up," is already done.

## The interesting question is where they go next

This is what I've been sitting with. If the IDE is a solved substrate — if an agent can now move through a codebase the way a developer moves through a codebase — what happens when you point it at something that *isn't* a codebase?

A finance team's quarterly close has a structure not unlike a repo: sources of truth, dependencies, inconsistent naming, institutional folklore, a small number of senior operators who remember why things are the way they are. A legal team's diligence workflow has that shape too. So does an ops rotation. So does a clinical trial coordinator's inbox. None of these people think of themselves as programmers, but the work has the same texture: gather context, make a plan, execute, verify, repeat.

The thesis I keep coming back to is that coding agents were never really about code. Code was the first domain where three things were true at once: the work was mostly text, the environment was reproducible, and the feedback loop was fast. Any domain with those three properties will get its coding-agent moment, just with different file extensions.

## What that means for me, practically

I've stopped treating code as the center of my day. The center is now the spec around the code: the task shape, the tools the agent can call, the evaluation harness, the guardrails, the place to park human judgment so the agent doesn't need to ask twice. The code still needs to be right. But "being right" is now a property of the system I designed, not of the line I just typed.

A few things have gotten sharper for me as a result:

- **Evaluation is the job.** If I can't tell whether an agent did the task correctly without reading the diff myself, I haven't finished designing the task. Every agent loop I've shipped and been proud of started with the eval and ended with the prompt.
- **Tools are a product surface.** The set of things the agent can do in your system is a UI, and it deserves UI-grade taste. Bad tool shapes make good models look stupid.
- **Domain context lives in people, not wikis.** The most valuable thing I do on any new problem is sit with the person who currently does the job by hand and watch them work. The agent is a transcription of that watching, plus a delta.
- **Multi-agent is rarely the first answer.** When one agent fails at a task, splitting it into five usually just moves the failure around. The real win is almost always a better single loop — tighter tools, better evals, a clearer spec — before you reach for orchestration.

## Software isn't gone. The ceremony is.

I don't actually think software is going away. What's going away is the ceremony around it — the implicit assumption that every useful digital outcome has to pass through a human typing in an IDE. That assumption built the entire industry I grew up in, and it's worth being honest that a lot of what we called "engineering" was just the cost of moving intent through a keyboard.

What's left when that cost drops is the interesting part. Taste. Judgment. Knowing which problem is worth solving. Knowing what "done" looks like in a domain where done used to mean "the expert signed off in their head." These things don't get automated by the next model release. They get more valuable.

So when someone asks me what I'm working on, the honest answer is: coding agents, but not for coding. I'm spending my time on the domains where nobody has built the eval harness yet, where the tools don't exist, where the expert is still doing the work by hand because there's no IDE for their job.

That's the next loop. That's what I mean when I say the era of writing software is ending, and the next one is about where coding agents go once they leave the IDE.
