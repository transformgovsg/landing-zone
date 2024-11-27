---
title: ‘Re-architecturing Whole-of-Government Grant Portals’
description: ‘Yeo Yong Kiat | Alex and Yong Kiat had a vision for how the Singapore public service should re-design grant application portals. Read about how they championed their vision, starting with the Business Grants Portal.’
pubDate: 2024-02-07
author: ‘Yeo Yong Kiat’
---

> Alex and I had very little in common. I was a policy officer, and Alex was a software engineer - we couldn't have come from more different backgrounds and disciplines. But somehow, we would always spend a significant portion of our time at work discussing how to make things in government better. It was rare to find someone who cared about problems with a passion.
>
> Before we started TransformGovSG, Alex and I had a different dream - to transform the way government grant portals work. Quite poetically, the TransformGovSG team and us pioneered an early concept of how we could potentially collapse all four government grant portals and policy processes onto a single digital platform. We spent a huge amount of time and energies engaging various government stakeholders at various forums, and performing various technical experiments.
>
> Our goal was to create a single re-useable platform that could not only act as a grant application portal, but also as a portal for all application-based policies in Singapore. We envisioned huge cost and manpower savings, and the potential to re-deploy our engineers for other innovation projects elsewhere in government.
> 
> Today, our ambition has been succeeded by the current Business Grants Portal team, and they have taken our idea further into implementation.
>
> So this is a tribute to where the idea first began, and is part of us seeking closure from our previous portfolio as we look to the next bound in our public service tech journey.
> 
> -- Yong Kiat

## Let's start from where it all began - government grant policies.

If you're in the business of public service, you would know that disbursement of government aid or grants form a significant portion of our service delivery. Grants are government policies that offer financial incentives, subsidies or assistance to entities or individuals, in exchange for the conceptualisation and execution of proposals that fulfill the public good.

In the early 2000s, as grant policies proliferated to meet the burgeoning needs of our national landscape, we were soon met with a key problem statement - each grant sector had become too complex with too many grants and processes for entities and individuals to navigate. What was the point of a grant, if it was not discoverable? What was the use of a grant, if application forms processes were too long and confusing?

What's a grant sector you ask? In Singapore, we have 5 grant sectors, each with its unique beneficiaries: 

- The **business grants sector**, where business owners apply for grants that bootstrap them for productivity enhancements or market expansion. 
- The **research grants sector**, where academics receive grants for critical Research & Development functions and projects.
- The **community grants sector**, where charities, communities and individuals are granted seed funds to kickstart grounds-up projects for our communities.
- The **social grants sector**, where voluntary welfare organisations and other similar organisations receive financial assistance, for onward discretionary disbursement to needy individuals.
- The **skills & training grants sector**, where trainig providers and individuals receive financial assistance to engage in life-long learning and continuing education initiatives.

As expected, the Singapore public service was very quick to ride what is known as the first digitalisation wave of public service. In the early 2010s, it embarked on a grand plan to digitalise the grant application, approval and disbursement process via Grant Portals. Each grant sector would build its own bespoke Grant Portal, each made up of two key components:

- A public-facing web portal with SingPass/CorpPass logins, that allowed for quick discovery of grants, ease of application, submission of supporting documents and disbursement of grant payouts.
- A government-facing portal that allowed for receipt, tracking, approval and auditing of all grant applications and disbursements.

![The Business Grants Portal](https://rogueteacher.me/images/transformgovsg/bgp-frontend.png)
<figcaption>The Business Grants Portal (BGP)</figcaption>

Each Grant Portal came to be known as a Whole-of-Government (WOG) Grant Portal, since it was to consolidate all grant policies within its respective grant sector. The Business Grants Portal (BGP, [link](https://www.businessgrants.gov.sg/)) was Singapore's first such digital product, developed in 11 months and launched in Q4CY2016 ([link](https://www.businesstimes.com.sg/international/budget-flash-business-grants-portal-be-launched-q4-2016)). Soon, other Grant Portals followed, and today we have a total of three other WOG Grant Portals:

- [OurSG Grants Portal](https://oursggrants.gov.sg/), which consolidated community and social grants
- [Integrated Grant Management System](https://www.researchgrant.gov.sg/pages/index.aspx), which served the research grant sector
- [Training Partners Gateway](https://www.tpgateway.gov.sg/), which consolidated training grants for everyone

Not surprisingly, Singapore did a great job. That first problem statement of grant policy fragmentation was resolved - people could now discover grants easily, and apply for grants seamlessly through consolidated forms and processes on each WOG Grant Portal. With end-to-end digitalisation, it also increased the government's productivity drastically.

## But post-Covid, trouble knocked on our doors once again. Grant policies had grown not just in sheer number, but in policy complexity

Again, if you're ever in the business of public service, you would be familiar with this evergreen problem of policy evolution. The first generation of problem statements are usually clear cut, and so are the stakeholders. But as we move on to the second generation of problem statements, objectives become more complex, and stakeholder lines blur.

Take healthcare for example - it used to be just primary care and acute care in the 1960s - 1980s. But today, healthcare spans the entire complex spectrum, from social services to traditional healthcare services to long term care services that somehow sit in the middle of this spectrum. This sociohealthcare spectrum has led to a complex fragmentation of stakeholders, where we now also need to focus on the sector development of voluntary welfare organisations as well.

The same happened for government grant policies. What used to be clear cut grant policies meant only for training fragmented into grants that were applicable for businesses as well. When we launched the GP-IT enablement grant for General Practitioners - would you have classified it as a business grant, or a social grant since it fulfilled healthcare objectives? Or perhaps when you choose to fund companies for critical R&D capabilities and sandboxes, is this a research grant or a business grant?

![The Business Grants Portal](https://rogueteacher.me/images/transformgovsg/tgp-frontend.png)
<figcaption>The Training Partners Gateway</figcaption>

The user experience once again fragmented - the previous assumption that each grant sector had its own unique set of stakeholders no longer held true, and we started to see multiple groups of stakeholders navigate across different grant portals and processes to apply for their grants. 

And this time, it seemed like having bespoke Grant Portals was not the solution anymore. Neither could we harmonise policies further - because there simply is a limit to such things.

## Internally, we had other issues to contend with. Increasing cost of maintenance, transferring know-how between grant portal teams, and the need to do more with less manpower.

When Alex and I took over the grant portal portfolio in 2022, we had huge problems internally on our hands.

The cost of maintaining a single grant portal was a single squad of engineers and product manager. But with four different WOG Grant Portals, this meant four separate squads and four times the cost. Surely there must be a way to achieve greater cost efficiency?

Grant portals were, in Singapore parlance, "_different but same same_". We had four separate teams working in silos, since all four grant portals were different products with different customer bases - yet the core of a grant policy was identical across the grant sectors. We had understood so much about grant processes through 7 years of working with grant policy agencies - surely there must be commonalities across that we could streamline?

Engineering resources are by nature scarce and expensive. Were we getting four different groups of engineers to develop and maintain the same thing four times, over and over again? If only there was some way to create re-useable modules across grant sectors, so we could just scale down maintenance and then re-deploy our resources for other use cases.

> Our engineers are literally doing the same thing over and over again, four times. And all these engineers are working in separate product teams. It's impossible to bring people across different products to work together. I'm sure there's so much we can learn from having all four grant portal teams sit together, and develop together.
> -- **Alex Ng** (to Yong Kiat, in his first month of work)

Just by simply talking through the problems, Alex and I landed on a natural solution - **the collapse of all four WOG Grant Portals into a single re-useable platform**. But surely this was foolishness, in my first month of work no less?

> You're saying it's possible to conceptualise a single grant portal backbone where we can bring all the engineers and policy divisions together, to launch and maintain grant policies on? Is that even possible? Do you even know how complex a single grant sector is? How can you even begin to harmonise processes - surely there must be a limit!
> -- **Yong Kiat** (laughing at the sheer incredulity of Alex's suggestion)

But this man, Alex, seemed confident in both his engineering team as well as my stakeholder engagement capabilities:

> Don't try, don't know. You've got to take me up on this, and let me try. I'm not saying we just force agencies to harmonise their policies across sectors - that's crazy. I'm saying, from the technical angle, perhaps it is possible to re-architect the entire Grant Portal concept, into this set of re-useable modules that are applicable across multiple grant sectors. We lean forward, policy agencies lean forward, and we all meet in the middle. You've got to lead the way on the business engagement front - you get all the Senior Management agreeing to use a single platform and change what they can, and I get all the engineers agreeing to trade know-how to make this thing happen.
> -- **Alex** (throwing the challenge back at his boss)

## What started as a simple coffee chat evolved into an 8-month intensive implementation of an aggressive business strategy. We set out to persuade senior management, and experiment with various technical stacks.

<img src="https://rogueteacher.me/images/transformgovsg/bgp-001.webp" alt="Alex conducting all-hands-on-deck exihibit A" align="center">
<figcaption>Alex conducting all hands on deck, rallying our engineers</figcaption>

On the technical end, Alex spent months bringing teams across GovTech together. These were all product teams who were developing some kind of policy portal, and Alex's goal was to see if there was some kind of solid base that we could pivot off, rather than starting from scratch. After all, re-using code is one of the oldest tricks in an engineer's rabbit hat.

What were we looking out for? Well, if you examine a grant policy process in detail, you'll realise that consolidating all policies across all sectors onto a single digital platform is possible only when technical two conditions are met:

- Application forms are made freely configurable. That is, the platform allows for a flexible definition or set-up of application forms across all grant sectors.
- Grant approval workflows are made freely configurable. That is, the platform also allows for the flexible configuration of bespoke grant approval workflows, which differs from agency to agency.

<img src="https://rogueteacher.me/images/transformgovsg/bgp-003.webp" alt="Alex conducting all-hands-on-deck exihibit B" align="center">
<figcaption>Grant portal engineers co-creating what would make a good grant portal</figcaption>

When Alex and his team performed the technical assessment, he realised that most product teams, if not all, only created policy portals with configurable forms. There were a million products out there that could allow for the free configuration of forms - FormSG, Form Builder, Google Forms, you name it. But there were very few products, if not none, that allowed for fully customisable workflows.

And that was an interesting enough technical gap in the government digital market for Alex's team of engineers to resolve.

On the business front was a whole set of people challenges I had never seen the likes of since COVID-19 days. When I saw the obstacles ahead of me, I did wonder if a single Assistant Director could muster his way through the forces of government to persuade and change processes. 

There was first the challenge of seeking innovation funding and manpower resourcing. Alex required a team of 5 engineers and UX designers to produce a robust enough prototype that could lead into productionisation. All new ideas had to be put through an internal product review forum at GovTech Senior Management level. Perhaps what helped was that I was entirely new to the GovTech ecosystem - thus oblivious to all the political scrutiny and judgment, I boldly presented a business proposal to revamp grant portals across government.

Maybe it was the freshness with which I spoke. Maybe it was the naivety with which I believed my team of engineers could succeed. Or maybe it was just Senior Management wanting to believe that such an innovation was possible. We ended up clinching the deal internally, and we secured 5 precious headcounts to chart the way forward.

Before I knew it, I was making our product pitches to Senior Management from various government agencies - National Research Foundation, EnterpriseSG, Ministry of Trade & Industry, Ministry of Social & Family Development, Ministry of Health and the Ministry of Culture, Community & Youth. I relentlessly sold our vision, that collapsing all grant processes and operations onto a single platform was possible, and would reap a theoretical 75% reduction in costs if done properly. 

Approval from Senior Management was not without its dues. As part of change management, I had to synthesise a huge amount of feedback provided by the various directorates, in order to make sure that our product could cater to the unique needs across various grant sectors. I suppose this was my first introduction to the job of a product manager: the relentless communication of a vision, and the continuous gathering of product requirements.

## I suppose we would have more stories to tell if we had continued to work on whole-of-government grant portals. But we did not.

Alex and I have since passed the development baton onto another team, who now carries our torch. We sometimes muse about whether we would have come up with more interesting or ambitious ways to reconceptualise grant portal development in the Singapore public service. Sometimes we even wonder if the torch is still the same one we once held as we charged through the various obstacles in government to secure support.

No matter the musing, there is very little to regret. Because in the public service, there is no end of problems that require solving. And that's where Alex, the team and I, are looking to next.
























