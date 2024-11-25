---
title: 'Your Guide to Sense'
description: 'This user guide bootstraps you for using Sense, an open source AI data assistant developed by government policy officers and developers. Learn about our product philosophy, and how to use Sense effectively in various aspects of your work.'
pubDate: '2024-11-25'
author: 'Your Name'
---
In this user guide, we provide a walkthrough of the following:

- A brief history of how Sense came to be
- An overview of Sense's features
- Tips for writing good prompts, finetuned for policy analytics
- How to get the most out of Sense, from basic features to advanced capabilities

We hope you will use Sense to democratise policy analytics capabilities throughout your organisation or your work processes. If you're interested to co-develop, contribute to our open source repository [here](https://www.insertlinkhere.com). 

## What is Sense?
Simply put, Sense is a data assistant for public service agencies and organisations that sits on top of your databases. It has an underlying AI-feature that allows you to quickly make sense of your data. Beyond simple data queries, Sense comes packed with a range of features such as visualisation, dashboarding, user access control and alot more.

## What Can Sense Do?
Sense has the following key features that supports everything from policy analytics to data governance to LLM customisation, most of which do not require any further engineering effort:

- **Data Chat:** A chat interface that allows you to interact with data entirely in natural language
- **Free Data Exploration:** Free exploration of all the data in your database or uploaded files via an intuitive interface
- **Visualisation:** Create the charts and graphs you require to better communicate your data findings
- **Dashboarding:** String your visualisation products together into a coherent and refreshable dashboard, great for KPI reporting
- **Code Editing:** For the power users who understand SQL, create analytics models and customised views for your dashboard
- **Metadata Management:** Whenever policy or business logic changes, edit the definition of any of your datafields and train your LLM accordingly
- **Database Connection:** Self-connect to any database and interact with it via Sense's data chat feature
- **File Uploads:** Upload any CSV files and interact with it via Sense's data chat feature 
- **Audit Logs:** Track cost, usage rate and user queries
- **System Prompt Management:** Freely rewrite your system prompts without the need for any engineering work
- **User Access Controls:** Maintain a list of users and assign them access to databases, with complete separation of viewing privileges

Excited to start your foray into AI-enabled policy analytics? Read on!

# Product Background
## Who Created Sense?
Sense was first created by a Ministry of Health policy officer ([Yeo Yong Kiat](https://www.linkedin.com/in/yongkiat/)) and two software engineers from GovTech ([Ani Adhikary](https://www.linkedin.com/in/tuxboy/), [Wilson Wan](https://www.linkedin.com/in/wilson-wan-wl/)). Subsequently, it was developed in GovTech and taken to production by a digital innovation unit ([TransformGovSG](https://transform.gov.sg)). Today, the ex-members of TransformGovSG maintain the documentation and software as part of an open source project, in hopes that it will continue to benefit the various government agencies who have adopted it.

## Why Sense?
Globally, public service officers face technical and bureaucratic bottlenecks when reviewing policies or appeals. When Yong Kiat was at the Ministry of Health (Singapore), he would spend up to 3 months writing code for data extractions, enlisting the help of data analysts, and waiting for data access. It was a nightmare having to work across 7 or 8 databases at a single time for a single policy review.

After secondment to the Government Technology Agency, Yong Kiat and his team of software engineers re-visited this old problem. They realised that they could cut down the time taken by up to 90%, and relieve the frustration felt by many public service officers. 

They replicated the process of policy officers working with data analysts using Large Language Models (LLMs), and designed a comprehensive policy analytics solution that could powered entirely by natural language. Beyond analytics features, Sense was also designed to meet the unique cybersecurity and data governance requirements of the Singapore public service. To keep cost low for government, they kept to using open source implementations, rather than proprietary software packages.

Their vision for Sense was to democratise policy analytics capabilities throughout entire agencies within the government, and to fundamentally transform the processes in which officers would seek approval for data usage. Today Sense is an open source implementation, which can be adopted by any organisation hoping to securely empower their data analytics processes with Artificial Intelligence.

## How Does Sense Preserve Data Security?
Data security is a non-negotiable in the Singapore public service, and for many organisations. Sense preserves data security through the following implementations:

- **Agencies who implement Sense are able to establish "no data-sharing" arrangements with LLM service providers.** This ensures that all user queries are not used to train external models.
- **All data transmissions are encrypted.** Any interception will have quite a bit of work to do before they can understand your interactions with Sense.
- **Sense retains all data values within the government IT environment.** Only metadata is sent to LLM service providers, and all code executions take place back in the government IT environment.
- **Sense was built off open source implementations.** Agencies using Sense will not have any vendor- or proprietary lock-in, and will be able to use Sense to complement a wide range of commercial products or in-house technologies.
- **Self-deployment contains everything in your own environment.** You don't need to move your data out of your organisation - deploy Sense in the security and convenience of your own agency's environment. Everything is yours.

Sense is a significant development in the way government can use technology. It allows for advanced AI technologies to be implemented, while adhering to strict security standards.

## Tech Stack
As of 2025, Sense uses a unique combination of the following open source packages:

- **Chainlit:** a Python package to build production ready Conversational AI
- **Metabase:** a business intelligence tool that you can connect to many popular databases
- **AdminJS:** an auto-generated admin panel for Node.js applications that allows you to manage all your data in one place
- **Langfuse:** a LLM engineering platform allowing for easy LLM observability, metrics, evaluations, prompt management

With these, Sense rides upon the active development of these packages in the open source community.

# Getting Started: Sense Chat Interface
It's easiest to start with the Sense chat interface, and getting data into Sense for you to interact with. This section describes how most users will interact with Sense to perform quick policy analytics using the Sense chat interface.

## Sense Chat Login
(_when your organisation installs Sense, you should be given a URL e.g. https://sense.moh.gov.sg, which allows you to access the Sense chat interface - check in with your respective agency IT divisions for the URL and specific login instructions_)

When you access the Sense chat URL, you will likely be asked for login credentials. Most organisations will have their own authentication protocols (e.g. username + password). Regardless, login these days should be a breeze with any OAuth2-compliant service provider your agency decides to use.

_Illustration: WOG AAD login for Singapore public service agencies_
For Singapore public service agencies, one possibility your agency may set up is for you to use your WOG AAD account for login. If so, login is as simple as a single click on the corporate login button:

[![Sense Login](https://rogueteacher.me/images/transformgovsg/sense-login.png)](https://rogueteacher.me/images/transformgovsg/sense-login.mov)

## Sense Chat
After login, you'll be immediately brought to the Sense chat interface, with four key components:

- **New Chat Button**: starts a new chat session, and the chat interface refreshes
- **Side Panel Toggle**: opens the side panel where you can see past conversations with Sense, and access the ReadMe
- **Choose Database Button**: opens a dropdown where you can choose the database of your choice
- **Chat Bar**: where you type in your queries for Sense to answer

[![Sense Chat](https://rogueteacher.me/images/transformgovsg/sense-chat.png)](https://rogueteacher.me/images/transformgovsg/sense-chat.mov)

## Chat Memory & Performance Issues
Sense is able to remember accurately up to 10 previous queries in the same chat session. We have chosen this memory length because it strikes a good balance between the need for sufficient context memory and accurate retrieval of context. 

If you find that Sense is not behaving optimally, simply start a new chat session to clear Sense's memory cache.

## Data Extractions
Whenever a query is completed, Sense produces a download link that allows you to download the data that you requested for. Click on the link to download the data in the form of a CSV file, for further exploration on Microsoft Excel. The link remains valid for 5 minutes at a go, so do take note to re-query Sense if the time limit has lapsed.

[![Data Extractions](https://rogueteacher.me/images/transformgovsg/sense-data-extractions.png)](https://rogueteacher.me/images/transformgovsg/sense-data-extractions.mov)

## Query Rate Limit
Sense is configured to allow for up to 16 queries to be performed in each 5 minute interval. When the query limit is reached, you will received a message that no further queries are allowed. Simply wait for 5 minutes and the rate limit resets.

For now, the rate limit is configured via a parameter change in the source code.

## Prompt Tutorials
Nothing accelerates learning more than a good demonstration. In this section, we created a set of videos that bring you through different classes of prompts that you can use to explore data with Sense. At the end of each tutorial we provide a summary, and also list all the pitfalls of using a LLM tool like Sense to perform policy analytics.

### Tutorial 1 - Getting Started
In this tutorial, we show you the main components and broad features of Sense. In future tutorials, you'll learn how to make more complicated prompts to get the business and policy insights you need.
[![Tutorial 1 - Getting Started](https://rogueteacher.me/images/transformgovsg/tutorial-001-getting-started.png)](https://www.youtube.com/watch?v=T6NNAHgMyQ0)

### Tutorial 2 - Basic Queries I
Having seen what the Sense chat interface is capable of, we proceed to equip you with a set of basic queries to get started on your LLM data analytics journey. Don't underestimate these queries - you'll be using them far more often than you think. Once you string them together, you can create pretty complex queries.
[![Tutorial 2 - Basic Queries I](https://rogueteacher.me/images/transformgovsg/tutorial-002-basic-queries-I.png)](https://www.youtube.com/watch?v=ZeHppprjQt0)

### Tutorial 3 - Basic Queries II
This tutorial builds off the previous one, and we show you another set of basic queries that you will find useful for many of your data analytics work in a public policy outfit.
[![Tutorial 3 - Basic Queries II](https://rogueteacher.me/images/transformgovsg/tutorial-003-basic-queries-II.png)](https://www.youtube.com/watch?v=EY22ac8e_Pw)

### Tutorial 4 - Data Investigation
You're now ready for more complex data investigations! We explore how to examine line items in this tutorial.
[![Tutorial 4 - Data Investigation](https://rogueteacher.me/images/transformgovsg/tutorial-004-data-investigation.png)](https://www.youtube.com/watch?v=-ExAa-T1nZo)

### Tutorial 5 - Putting Data Together
We introduce the concept of a primary key in this tutorial video, and teach you how to combine different datasets using a common primary key across all of them. Thankfully, Sense does a lot of data merging automatically for you, so it's not going to be a difficult task.
[![Tutorial 5 - Putting Data Together](https://rogueteacher.me/images/transformgovsg/tutorial-005-putting-data-together.png)](https://www.youtube.com/watch?v=-ExAa-T1nZo)

### Tutorial 6 - Statistical Distributions
We demonstrate how easy it is to obtain statistical distributions of a given dataset, which gives you a broad macro-feel of your policy data. We look at things like mean, median and percentiles in this tutorial.
[![Tutorial 6 - Statistical Distributions](https://rogueteacher.me/images/transformgovsg/tutorial-006-statistical-distributions.png)](https://www.youtube.com/watch?v=CFUOpotU2Cs)

### Tutorial 7 - Grouping by Parameters
Grouping refers to how we can aggregate the results of one column according to the distinct values of another column in your dataset. It is an extremely powerful query to understand patterns in your data.
[![Tutorial 7 - Grouping by Parameters](https://rogueteacher.me/images/transformgovsg/tutorial-007-grouping-by-parameters.png)](https://www.youtube.com/watch?v=gcUQDvgPp4I)

### Tutorial 8 - Table Manipulation
Sense remembers the context of all your previous queries in the same chat session. We show how you can make use of that and edit a previous tabular output, such as the addition of columns or reformatting a table.
[![Tutorial 8 - Table Manipulation](https://rogueteacher.me/images/transformgovsg/tutorial-008-table-manipulation.png)](https://www.youtube.com/watch?v=6oyTKoY38QE)

### Tutorial 9 - Breaking Down a Query
LLMs can be burdened by overly-complicated queries that may require a lot of context. We demonstrate how Sense performs much better when a complex query is broken down sufficiently into smaller parts.
[![Tutorial 9 - Breaking Down a Query](https://rogueteacher.me/images/transformgovsg/tutorial-009-breaking-down-a-query.png)](https://www.youtube.com/watch?v=jWHwD_GChzY)

### Tutorial 10 - Creating More Context
LLMs perform better with more context, and Sense is no different. We illustrate how the results drastically improve when more context is given to Sense via user prompts.
[![Tutorial 10 - Creating More Context](https://rogueteacher.me/images/transformgovsg/tutorial-010-creating-more-context.png)](https://www.youtube.com/watch?v=VB19y2xVM3M)

### Tutorial 11 - SQL Murder Mystery
In this episode, we try using Sense to solve the classic SQL Murder Mystery. This doubles up as an actual use case where you see us using Sense in a very real way, debugging, troubleshooting and all. Check out our [Medium](https://medium.com/@yeoyongkiat/sense-solving-the-sql-murder-mystery-with-a-large-language-model-business-intelligence-tool-309dc79f040c) for an accompanying explanation and write-up.
[![Tutorial 11 - SQL Murder Mystery](https://rogueteacher.me/images/transformgovsg/tutorial-011-SQL-murder-mystery.png)](https://www.youtube.com/watch?v=rgjF0_Jr7Os)

# Getting Awesome: Data & Metadata Management
After you've learnt how the Sense chat interface works, it's time to figure out how to get Sense connected to some data. In this section, we explain how the administrative users within your agency can use Sense to connect to databases and enable file uploads, via a backend data and metadata management panel.

(_We have adopted [Metabase](https://www.metabase.com/learn/), an open source data management and business intelligence solution. If you're interested in harnessing the full potential of this module, click on the link for more in-depth tutorials by the wonderful Metabase team._)

## Data & Metadata Management Panel Login
(_When your organisation installs Sense, all administrative users should be given a URL e.g. metabase.moh.gov.sg, which allows you to access a backend data and metadata management panel - check in with your respective agency IT divisions for the URL and specific login instructions_)

_Illustration: Username + Password Login_
Each agency's IT division would set up your respective login protocols. We illustrate what the login process could look like with a simple username + password protocol:

[![Data & Metadata Management Panel Login](https://rogueteacher.me/images/transformgovsg/sense-data-metadata-panel-login.png)](https://rogueteacher.me/images/transformgovsg/sense-data-metadata-panel-login.mov)

## Database Connection
(**Summary**: access the database connection panel via **Settings** > **Admin settings** > **Databases** > **Add database** > **Save**)

Upon logging in successfully to the panel, you will be able to access the "Admin settings" tab via the "Gear" icon located in the upper right hand of the panel screen. 

Navigate to the "Databases" tab, and you will see the list of all databases that Sense is connected to. To add a new database connection, click on the "Add database" button.

This brings you to a database connection panel where you simply key in the credentials of your database and hit the "Save" button at the bottom of the panel to connect it to Sense. For more details on how to add and manage a database, check out the main Metabase documentation [here](https://www.metabase.com/docs/latest/databases/connecting#:~:text=To%20add%20a%20database%20connection,settings%20differ%20database%20to%20database).

[![Database Connection](https://rogueteacher.me/images/transformgovsg/sense-database-connection.png)](https://rogueteacher.me/images/transformgovsg/sense-database-connection.mov)

## Metadata Management
(**Summary**: access the metadata configuration panel via **Settings** > **Admin settings** > **Table Metadata** > **[Select database from dropdown]]** > **[Select table from side panel]**)

Navigate from **Settings** > **Admin settings** > **Table Metadata** and you will be brought to a panel that provides a dropdown to select the database which you wish to manage the metadata for. Select your database and you'll see a list of all data tables within the database made available to Sense.

This panel allows you to perform the following actions:

- **Table Visibility**: hide or make visible individual tables - hiding a table means that the Sense chat interface will not be able to access the table, even though Sense is connected to the database
- **Table Description**: describe the data table, and include important policy context or rules here e.g. provide a definition of per capita household income (PCHI), or how government subsidies are calculated - the data here is sent to the LLM service
- **Column Definitions**: describe the individual datafields, and include important policy definitions or equations here - the data here is sent to the LLM service
- **Column Visbility**: indicate whether you want a datafield to show up in the Sense chat interface or not
- **Column Semantic Type**: choose from a dropdown that describes the type of data that is in your column e.g. date, location

[![Metadata Management](https://rogueteacher.me/images/transformgovsg/sense-metadata-management.png)](https://rogueteacher.me/images/transformgovsg/sense-metadata-management.mov)

## File Uploads

# Getting Serious: User Access Panel
