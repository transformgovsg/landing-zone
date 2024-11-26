---
title: '"We would do it again with no hesitation"'
description: 'Kenny Wong | Meet the team who powered Singapore’s digital tools to curb the spread of COVID-19 as we unpack their journey from start to decommissioning.'
pubDate: '2024-04-01'
author: 'Yeo Yong Kiat'
---

>_This interview was conducted by [Kenny Wong](https://www.linkedin.com/in/kennywyk/), a fellow product manager at GovTech. It was initially meant to be published in a whole-of-government newsletter, but somehow we never made it to print._
>
>_I'm really proud to have led both the TraceTogether and SafeEntry teams, even if it was only for a short time from 2022 onwards, post-COVID-19. While maintaining the COVID-19 systems and planning for reactivation, the teams worked together with me to re-engineer the Business Grants Portal into a modern platform, and I got to know [Alex](https://www.linkedin.com/in/alexngconnects/), Nay Zaw, Neal and all the other developers much better._
>
>_Ever since Alex and I created TransformGovSG together, I've always wondered how I could capture the team's excellence under Alex in those days - COVID-19 learnings are valuable, beyond technical expertise. Turns out Kenny did a wonderful interview that captured their spirit during COVID-19 times - I really resonate with what Kenny wrote in the opening, that putting pen to paper is truly the best way to build a legacy. And so here I've reproduced Kenny's writing in fully glory._
>
>_Enjoy. This was a GovTech we truly loved and respected._
>
> -- Yeo Yong Kiat

## How do we build a legacy that withstands time?

I am penning this piece a week after interviewing Alex, Neal, Han Yang (HY), and Nay Zaw (NZ). During this week, I fretted over a daunting task - How do I convey the palpable sense of camaraderie and national pride that I felt during the interview through prose? How do I communicate the tender moments of vulnerability and hope that surfaced as we wrapped up our chat? The answer came to me as I read through my notes - in the face of a seemingly impossible task, start small, chase small improvements, rely on others for support, and give it your all. 

That’s how we build a legacy that withstands time.

## In a few lines, describe SafeEntry and TraceTogether for our readers.

*HY & NZ*: TraceTogether (TT) enabled us to contact people who were at risk of COVID-19 transmissions.

*Alex & Neal*: SafeEntry (SE) complemented TraceTogether by providing location data. While we could trace contacts via TraceTogether, there were times when a person was unable to remember where he/she had been, especially if some time had passed. SafeEntry helped jog people’s memories of where they have been!

## How did your journey with TT/ SE start?

*Alex*: I received a call from Steven (Director/GDS) on Sunday night. He said that the COVID-19 situation was getting bad. I was told to drop all of my existing commitments, and work with him to develop a digital response to the crisis by Wednesday (there was a ministerial statement scheduled then).

*HY*: Alex was one of the pioneers on the team. The rest of us joined a little later on a voluntary basis while juggling our core products. But it quickly became clear that COVID-19 would be a prolonged fight that required our undivided attention, so a group of us had to offboard our existing products to focus full-time on TT/SE. Thankfully our teammates were understanding and gave us their full support during the transition.

## What challenges did you face?

*Alex*: The first two weeks were pure chaos! We had only 2 - 3 developers to develop a workable solution for contact tracing. By Monday, we built a simple web app that launched your smartphone camera and scanned barcodes for check in. Even that was not straightforward as camera libraries were generally poorly maintained. Given the time constraints, we were testing the app on our own devices on Monday night, and fixing issues through the night in preparation for user testing at a wet market on Tuesday morning. As there were many uncertain variables at place, we had to control the production environment as best as possible, for instance by asking enforcers to use a specific web browser. 

Thinking back, we made good engineering decisions on the fly - for instance, having an option to manually input an individual’s NRIC via a barcode scanner as an alternative to the sometimes laggy camera scanning option - interestingly, this also created a business opportunity for manufacturers as there was high demand for barcode scanners.

*HY*: Testing was similarly a headache for TT. We had over 100 smartphone models and over 10 token types to test. The overall engineering climate was also moving rapidly - while TT was initially rejected by app stores due to privacy concerns, a sudden decision was made by big tech to whitelist all government apps related to COVID-19 efforts. Upon launching, we had incredibly strong adoption that was beyond our anticipation, the team had to rush back to the office to provide product support as we pushed TT to the app stores. It was literally all hands on deck!

## Thinking back, what were things that we did well?

*Alex*: I liked that tech was leading the charge. Given the urgency, we emphasised practical development considerations such as security over compliance. This helped us to move faster.

*Neal*: Agreed. One of the major breakthroughs that we had was getting Engineering a seat at the table - we could register our views and concerns at policy discussions. This helped to speed up development and production as we could quickly get approval from the steering committee to proceed. During COVID-19, we learned that taking a few extra risks can significantly speed up our development and production processes.

*Alex*: It wasn’t all smooth-sailing. Remember the rule that people had to be vaccinated before entering shopping malls? The product teams advocated for allowing people access if SE could automatically pull and verify their vaccination records back-end. But policy insisted on including an additional step in the process - for people to indicate yes/no to whether they were vaccinated, as there were valid concerns on the system taking on too much fast-changing logic on vaccination/entry restrictions. This created a slew of problems, such as long queues of people waiting to enter the shopping malls. Singaporeans were frustrated. We were too. Eventually we did away with manual verification, but there was already some damage in Singaporeans’ trust in our IT capabilities.

## Public sentiments?

*NZ*: Generally, the public were supportive. However, a number of valid concerns were raised, such as the TT App causing the phone battery to drain faster or interfering with some other Bluetooth devices, like bluetooth earphones. We took feedback seriously, observed the issues firsthand on the ground, and tested the app on various devices. Some of these issues were difficult to reproduce and address - while we improved the app’s stability and reliability as much as possible, it would never be flawless.

*HY*: I remember someone reverse engineered one of our apps and found comments such as alamak in our source code (laughing). When it was shared on social media, it seemed that Singaporeans found it funny and were sympathetic to the hard work and long hours that our engineers had to put in.

*Neal*: There were other funny incidents like a small shop complaining that his rival pasted his QR code at the store’s entrance, instead of using their own (laughing). There was a misimpression that their business would be affected if they were visited by a COVID-19 patient, like the government would force them to close their shops for a period of time. We had to reassure them that these concerns were unfounded!

*Alex*: Agree, Singaporeans were generally supportive. But being human, I was sometimes discouraged when I read online comments from a vocal minority who were strongly negative and skeptical of the government’s efforts. For instance, they would spread falsehoods like the government is tracking Singaporeans’ whereabouts. This severely affected the team’s morale because it’s not true - in fact we would strongly protest if there was ever any attempt to use our apps for this purpose. It made us question why we were working so hard if our efforts were not appreciated. As a team lead, I had to encourage the team by sharing compliments and positive feedback to balance out the negativity, but you know as humans - we can receive 10 compliments and yet our minds will dwell on just 1 piece of negative feedback...

## How did decommissioning go?

Neal: Conversation on decommissioning started sometime in early 2023 when vaccination rates were high and the COVID-19 situation seemed to have stabilised. But the assessment then was to keep the systems running for a while longer to monitor the situation. Actual proposal to decommission was raised early this year - it was a sensible decision due to two factors: (1) MOH had purged all contact tracing data a year ago, and (2) the COVID-19 (Temporary Measures) Act 2020 would only remain in force till April 2024. Without the Act, there was no legislative basis to maintain the apps.

Alex: Mixed feelings - many of us have been with the products for several years so it was a little hard to let go. At the same time, it also signals that the COVID-19 fight is behind us, which is a good thing! On a practical level, I’m also happy as there would no longer be any need to do compliance work - quite meaningless as there were no users.

Neal: As part of decommissioning, we also laid out reactivation plans if another crisis emerges. For now, we’re good. Bittersweet feelings lah. (all nodding)

## Any words you want to leave to the readers?

*Alex*: I’m going to start on a more sober note - I think that our way of working has regressed. One question that I keep asking myself is why we can move quickly during times of crisis, but once the crisis is over, we find ourselves once again stuck in endless conversations on compliance and security? Why is there this constant sense of paranoia that things could go wrong, which causes development and production to freeze? It’s a clear regression.

*Neal*: Similar sentiments to Alex - I have been thinking about the importance of having a unifying goal or vision. In a crisis, it’s easier to align given that the priority is to tackle the crisis, and it also proves that the government can move fast. But in lieu of a crisis, how do we achieve this unifying force? If we can’t agree on priorities and trade-offs, then the work will feel draining and prolonged, a sure-fire way to induce burnout.

*NZ*: Agree. Ask any of us now whether we lived up to GovTech’s values, such as being agile, bold, and collaborative during the fight against Covid, and you can probably anticipate the responses you’ll receive.

*HY*: Tackling the pandemic was a unifying goal that everyone could align on, regardless of your role, seniority, team, whether you’re in the public or private sector. That is rare. At the end of the day, we can look back at our efforts with a smile.

*Alex*: Oh no, I caused us to end on a negative note (all laughing). Okay I try to end on a more positive note ok? Back in 2020 - 2022, the work was tough and the hours were long, but if given a choice I would do it all over again, because there’s meaning in the work. Now, I am still here fighting to improve the way that we work. There are some promising signs, such as the ministries being more open to hear our perspectives, and introducing policies to support faster product development, e.g. IM8-lite, pilot project waivers. But I think there’s room for us to do more, such as creating a more collaborative culture to partner the private sector in digital solutions for public good. We have to do better!

