---
title: 'Your Guide to Sense'
description: 'Transform | This user guide bootstraps you for using Sense, an open source AI data assistant developed by government policy officers and developers. Learn about our product philosophy, and how to use Sense effectively in various aspects of your work.'
pubDate: '2024-11-25'
author: 'Yeo Yong Kiat'
pinned: true
---
# Overview

In this user guide, we provide a walkthrough of the following:

- A brief history of how Sense came to be
- An overview of Sense's features
- Tips for writing good prompts, finetuned for policy analytics
- How to get the most out of Sense, from basic features to advanced capabilities

We hope you will use Sense to democratise policy analytics capabilities throughout your organisation or your work processes. If you're interested to co-develop, contribute to our open source repository [here](https://www.insertlinkhere.com) (coming soon!). 

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
- **Self-deployment contains everything in your own environment.** You don't need to move your data out of your organisation - deploy Sense in the security and convenience of your own Agency's environment. Everything is yours.

Sense is a significant development in the way government can use technology. It allows for advanced AI technologies to be implemented, while adhering to strict security standards.

## Tech Stack
As of 2025, Sense uses a unique combination of the following open source packages:

- **Chainlit:** a Python package to build production ready Conversational AI ([link](https://docs.chainlit.io/get-started/overview))
- **Metabase:** a business intelligence tool that you can connect to many popular databases ([link](https://metabase.com))
- **AdminJS:** an auto-generated admin panel for Node.js applications that allows you to manage all your data in one place ([link](https://adminjs.co/))
- **Langfuse:** a LLM engineering platform allowing for easy LLM observability, metrics, evaluations, prompt management ([link](https://langfuse.com/))

With these, Sense rides upon the active development of these packages in the open source community.

# Organizations and Users in Sense

## Organizations

In Sense, an **Organization** refers to a sub-unit of an **Agency**. For example, the Ministry of Health (MOH) may have two divisions known as Healthcare Finance and Healthcare Analytics. Healthcare Finance uses a database known as the National Electronic Finance Records (NEFR), and Healthcare Analytics uses a database known as the Population Health Survey Database (PHSD). In the Sense nomenclature, we refer to these entities as:

| Entity Type       | Entity Name            | Database  |
| ----------------- | ---------------------- | ----------|
| Agency            | Ministry of Health     | NEFR, PHSD|
| Organization      | Healthcare Finance     | NEFR      |
| Organization      | Healthcare Analytics   | PHSD      |

## Users

In Sense, we speak of three types of users:

- Super User
- Organisational Admin
- Normal User

### Super User
For each **Agency**, Sense is deployed and maintained by a group of users known as the **Super User**. This user group has access to every single component and feature in Sense:

- **Chat Interface**: perform data queries in natural language
- **Data & Metadata Management Module**: connect databases, define metadata, construct visualisations and upload data files
- **User Access Panel**: configure user access rights, manage list of users, define **Organisation** groups, define metadata

This is typically the IT division within your respective agencies. They will host Sense on an internal server, deploy it for the entire Agency, and connect the various databases within the **Agency** to Sense. They will also create the various **Organizations** within your Agency.

### Organisational Admin
After a **Super User** creates an **Organization**, he will then assign the Organization a **Database** and an **Organizational Admin**. 

The role of the **Organizational Admin** is to maintain strict user access control over his **Database** - he will be able to manage a list of **Normal Users** in his **Organisation**, who have access to his Database via Sense. Typically, the **Organizational Admin** is the data owner of the **Database**, who understands his data structure as well as the needs of the people who require his data. 

He has access to the following components and features in Sense:

- **Chat Interface**: perform data queries in natural language
- **User Access Panel**: configure user access rights, manage list of users, define **Organisation** groups, define metadata

### Normal User

Most users of Sense will be limited to being a Normal User, who will only have access to the **Chat Interface** for making queries to databases that have been granted access by their respective **Organizational Admins**.

# Sense Chat Interface
It's easiest to start with the Sense chat interface, and getting data into Sense for you to interact with. This section describes how most users will interact with Sense to perform quick policy analytics using the Sense chat interface.

## Sense Chat Login
(_when your organisation installs Sense, **Normal Users** should be given a URL e.g. https://sense.moh.gov.sg, which allows you to access the Sense chat interface - check in with your respective Agency IT divisions or [**Super Users**](#super-user) for the URL and specific login instructions_)

When you access the Sense chat URL, you will likely be asked for login credentials. Most organisations will have their own authentication protocols (e.g. username + password). Regardless, login these days should be a breeze with any OAuth2-compliant service provider your Agency decides to use.

### Illustration: WOG AAD login for Singapore public service agencies

For Singapore public service agencies, one possibility your Agency may set up is for you to use your WOG AAD account for login. If so, login is as simple as a single click on the corporate login button:

<iframe
    src="https://www.youtube.com/embed/eFXBXwV-FUY?si=4L_yPzO3Zbj2zoj1"
    title="Sense Login"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Sense Chat
After login, you'll be immediately brought to the Sense chat interface, with four key components:

- **New Chat Button**: starts a new chat session, and the chat interface refreshes
- **Side Panel Toggle**: opens the side panel where you can see past conversations with Sense, and access the ReadMe
- **Choose Database Button**: opens a dropdown where you can choose the database of your choice
- **Chat Bar**: where you type in your queries for Sense to answer

<iframe
    src="https://www.youtube.com/embed/fE37Ge-c01I?si=rw5cUz-xNagbZ5WR"
    title="Sense Chat"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Chat Memory & Performance Issues
Sense is able to remember accurately up to 10 previous queries in the same chat session. We have chosen this memory length because it strikes a good balance between the need for sufficient context memory and accurate retrieval of context. 

If you find that Sense is not behaving optimally, simply start a new chat session to clear Sense's memory cache.

## Data Extractions
Whenever a query is completed, Sense produces a download link that allows you to download the data that you requested for. Click on the link to download the data in the form of a CSV file, for further exploration on Microsoft Excel. The link remains valid for 5 minutes at a go, so do take note to re-query Sense if the time limit has lapsed.

<iframe
    src="https://www.youtube.com/embed/tZ7Pm4mJLjQ?si=o9ukrbJBWUNWi1eV"
    title="Data Extractions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Query Rate Limit
Sense is configured to allow for up to 16 queries to be performed in each 5 minute interval. When the query limit is reached, you will received a message that no further queries are allowed. Simply wait for 5 minutes and the rate limit resets.

For now, the rate limit is configured via a parameter change in the source code.

## Prompt Tutorials
Nothing accelerates learning more than a good demonstration. In this section, we created a set of videos that bring you through different classes of prompts that you can use to explore data with Sense. At the end of each tutorial we provide a summary, and also list all the pitfalls of using a LLM tool like Sense to perform policy analytics.

### Tutorial 1 - Getting Started
In this tutorial, we show you the main components and broad features of Sense. In future tutorials, you'll learn how to make more complicated prompts to get the business and policy insights you need.

<iframe
    src="https://www.youtube.com/embed/T6NNAHgMyQ0?si=_lM02MIwgjh1Pc4D"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 2 - Basic Queries I
Having seen what the Sense chat interface is capable of, we proceed to equip you with a set of basic queries to get started on your LLM data analytics journey. Don't underestimate these queries - you'll be using them far more often than you think. Once you string them together, you can create pretty complex queries.

<iframe
    src="https://www.youtube.com/embed/ZeHppprjQt0?si=rBDvl4-75tU5XKpx"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 3 - Basic Queries II
This tutorial builds off the previous one, and we show you another set of basic queries that you will find useful for many of your data analytics work in a public policy outfit.

<iframe
    src="https://www.youtube.com/embed/EY22ac8e_Pw?si=AG6WU1TSqGwQO4S6"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 4 - Data Investigation
You're now ready for more complex data investigations! We explore how to examine line items in this tutorial.

<iframe
    src="https://www.youtube.com/embed/-ExAa-T1nZo?si=WNWARQhWJxCGpm_T"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 5 - Putting Data Together
We introduce the concept of a primary key in this tutorial video, and teach you how to combine different datasets using a common primary key across all of them. Thankfully, Sense does a lot of data merging automatically for you, so it's not going to be a difficult task.

<iframe
    src="https://www.youtube.com/embed/3QvXOmRodVY?si=AZP4ALNq1GPgAe4K"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 6 - Statistical Distributions
We demonstrate how easy it is to obtain statistical distributions of a given dataset, which gives you a broad macro-feel of your policy data. We look at things like mean, median and percentiles in this tutorial.

<iframe
    src="https://www.youtube.com/embed/CFUOpotU2Cs?si=6xVASkdq7CqEU-Om"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 7 - Grouping by Parameters
Grouping refers to how we can aggregate the results of one column according to the distinct values of another column in your dataset. It is an extremely powerful query to understand patterns in your data.

<iframe
    src="https://www.youtube.com/embed/gcUQDvgPp4I?si=f6H6QRUuP5o8LIez"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 8 - Table Manipulation
Sense remembers the context of all your previous queries in the same chat session. We show how you can make use of that and edit a previous tabular output, such as the addition of columns or reformatting a table.

<iframe
    src="https://www.youtube.com/embed/6oyTKoY38QE?si=5SY5pkZTcLTJXB_j"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 9 - Breaking Down a Query
LLMs can be burdened by overly-complicated queries that may require a lot of context. We demonstrate how Sense performs much better when a complex query is broken down sufficiently into smaller parts.

<iframe
    src="https://www.youtube.com/embed/jWHwD_GChzY?si=RPWWcfX5DIQeyD8-"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 10 - Creating More Context
LLMs perform better with more context, and Sense is no different. We illustrate how the results drastically improve when more context is given to Sense via user prompts.

<iframe
    src="https://www.youtube.com/embed/VB19y2xVM3M?si=2pOsWQO_aDAe_RgT"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Tutorial 11 - SQL Murder Mystery
In this episode, we try using Sense to solve the classic SQL Murder Mystery. This doubles up as an actual use case where you see us using Sense in a very real way, debugging, troubleshooting and all. Check out our [Medium](https://medium.com/@yeoyongkiat/sense-solving-the-sql-murder-mystery-with-a-large-language-model-business-intelligence-tool-309dc79f040c) for an accompanying explanation and write-up.

<iframe
    src="https://www.youtube.com/embed/rgjF0_Jr7Os?si=hJydjiG1rTHVZkMl"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

# Data & Metadata Management Module
After you've learnt how the Sense chat interface works, it's time to figure out how to get Sense connected to some data. In this section, we explain how the [**Super Users**](#super-user) within your Agency can use Sense to connect to databases and enable file uploads, via a backend data and metadata management panel. (**Note**: only [**Super Users**](#super-user) will have access to this module.)

We have adopted [Metabase](https://www.metabase.com/learn/), an open source data management and business intelligence solution. If you're interested in harnessing the full potential of this module, click on the link for more in-depth tutorials by the wonderful Metabase team.

## Data & Metadata Management Panel Login
(_When your organisation installs Sense, [**Super Users**](#super-user) should have designated a URL e.g. https://metabase.sense.moh.gov.sg, which allows you to access a backend data and metadata management panel - if you require access, check in with your respective Agency IT divisions or [**Super Users**](#super-user) for the URL and specific login instructions_)

### Illustration: Username + Password Login
Each Agency's IT division would set up your respective login protocols. We illustrate what the login process could look like with a simple username + password protocol:

<iframe
    src="https://rogueteacher.me/images/transformgovsg/sense-data-metadata-panel-login.mov"
    title="Data & Metadata Management Panel Login"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Database Connection
(**Summary**: access the database connection panel via **Settings** > **Admin settings** > **Databases** > **Add database** > **Save**)

Upon logging in successfully to the panel, you will be able to access the "Admin settings" tab via the "Gear" icon located in the upper right hand of the panel screen. 

Navigate to the "Databases" tab, and you will see the list of all databases that Sense is connected to. To add a new database connection, click on the "Add database" button.

This brings you to a database connection panel where you simply key in the credentials of your database and hit the "Save" button at the bottom of the panel to connect it to Sense. For more details on how to add and manage a database, check out the main Metabase documentation [here](https://www.metabase.com/docs/latest/databases/connecting#:~:text=To%20add%20a%20database%20connection,settings%20differ%20database%20to%20database).

<iframe
    src="https://rogueteacher.me/images/transformgovsg/sense-database-connection.mov"
    title="Database Connection"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Metadata Management
(**Summary**: access the metadata configuration panel via **Settings** > **Admin settings** > **Table Metadata** > **[Select database from dropdown]** > **[Select table from side panel]**)

Navigate from **Settings** > **Admin settings** > **Table Metadata** and you will be brought to a panel that provides a dropdown to select the database which you wish to manage the metadata for. Select your database and you'll see a list of all data tables within the database made available to Sense.

This panel allows you to perform the following actions:

- **Table Visibility**: hide or make visible individual tables - hiding a table means that the Sense chat interface will not be able to access the table, even though Sense is connected to the database
- **Table Description**: describe the data table, and include important policy context or rules here e.g. provide a definition of per capita household income (PCHI), or how government subsidies are calculated - the data here is sent to the LLM service
- **Column Definitions**: describe the individual datafields, and include important policy definitions or equations here - the data here is sent to the LLM service
- **Column Visbility**: indicate whether you want a datafield to show up in the Sense chat interface or not
- **Column Semantic Type**: choose from a dropdown that describes the type of data that is in your column e.g. date, location

<iframe
    src="https://www.youtube.com/embed/g2vPEt6QSV4?si=qhxUUuJP1OZXkbTn"
    title="Metadata Management"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## File Uploads
Sense also allows you to upload a file for data queries in natural language. However, you'll need your **Super Users** to help you configure your file uploads.

### Setting Up File Uploads
**Super Users** will need to perform the following actions to set up file uploads (more info contained in the respective Metabase links):

**1. Connect to a database using a database user account with write access ([link](https://www.metabase.com/docs/latest/databases/uploads#connect-to-a-database-using-a-database-user-account-with-write-access)).** This way Metabase will be able to store the uploaded data somewhere. Currently, databases that support file upload include PostgreSQL, MySQL, Redshift and ClickHouse.

**2. Select the database and schema you want to store the uploaded data in, and then uploading the data file.** If Metabase is connected to a database using a database user account with write access, **Super Users** can enable uploads by:

- Clicking on the gear icon in the upper right on the home page and navigating to **Admin settings** > **Settings** > **Uploads**
- Selecting the database Metabase should use to store the data
- Go to **My Analytics** and click the cloud upload icon in the upper right, and uploading the relevant CSV file
- Metabase will then create a data table (using your CSV file) within the database that you connected to

<iframe
    src="https://www.youtube.com/embed/wxd8x8PRlo8?si=bucDGcFCQnBVMO8B"
    title="File Uploads"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

**3. Add people to a group with view data and create query access to the upload schema database.**

## Visualisations & Dashboards

# User Access Panel

Government takes data governance very seriously. Let's see how we can use a module known as the User Access Panel to maintain a privileged user list, so that only authorised officers are allowed to access your databases through Sense. (**Note**: only [**Super Users**](#super-user) will have access to this module.)

We have adopted [AdminJS](https://adminjs.co/), an open source admin panel package for apps written in Node.js. If you're interested in harnessing the full potential of this module, click on the link to understand what other features have been made available by the wonderful AdminJS team.

## User Access Panel Login
(_when your organisation installs Sense, **Super Users**](#super-user) would have designated a URL e.g. https://admin.sense.moh.gov.sg, which allows you to login to the Sense user access panel - if you need access to this panel, check in with your respective Agency IT divisions for the URL and specific login instructions_)

As with the other components of Sense, when you access the user access panel URL, you will likely be asked for login credentials.

### Illustration: WOG AAD login for Singapore public service agencies

For Singapore public service agencies, one possibility your Agency may set up is for you to use your WOG AAD account for login. If so, login is as simple as a single click on the corporate login button:

<iframe
    src="https://www.youtube.com/embed/136w67DhMa8?si=kETXkDcuGiYEXJtC"
    title="User Access Panel Login"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Audit Log
As Super Users or Organization Admins, from the sidebar, you can click on "Audit Log" and select "Log" to bring up the audit log:

- Each line item records a specific action performed within the User Access Panel by a specific Super User, with relevant details such as time of action
- When you click on a specific record, it then brings up more details of the user action for you to investigate, if required
- This feature is used when performing investigations or troubleshooting why and when certain user rights were modified

<iframe
    src="https://www.youtube.com/embed/WDD1SXcK1Og?si=CilSvHo2wLeVc3GM"
    title="Checking Audit Logs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Super User >> Creating an Organization, Creating Users/Super Users, Assigning Databases & Managing Organization Admins
If you're a Super User, you should be using the user access panel to create Organizations, assign Databases to each Organization, and create Organization Admins for each Organization.

### Creating an Organization
To create an Organization, click on "Users And Organizations" on the side panel and select "Organization". This will bring up a list of all "Organizations" already defined in Sense.

Next, click on "Create new" (or "Create first record" if it's your first Organization), and key in the name of your Organization. In the video example below, we are creating an Organization called "SSG Public Engagement Division".

Once you hit the "Save" button, the Organization will be saved within Sense's configuration set-up.

<iframe
    src="https://www.youtube.com/embed/GlP1nPltbGo?si=yqtL3uYRrhoUKtRD"
    title="Creating an Organization"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Assigning Databases to an Organization
After you have created an Organization, you should assign a Database to the Organization so they have a dataset to query. Click on "Metabase" on the side panel and select "Database". This will bring up a list of all Databases already connected to Sense.

Next, click on the Database that you wish to assign access to (in the video below, we are choosing the Database called "SSG Redshift"). This will then bring up a configuration panel where you can define the "Owning Organization". Click on "Add existing item" and this will bring up a dropdown selection box where you can select the Organization you wish to assign this Database to. In the video below, we are assigning the "SSG Redshift" database to the "SSG Public Engagement Division" Organization.

Once you hit the "Submit" button, the selected database will have been assigned to the Organization of choice.

<iframe
    src="https://www.youtube.com/embed/ir2BLl_ldL0?si=-Ow6e0qNwYgihsBn"
    title="Assigning Databases"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Creating Users
As a Super User, you can create a list of users for your Agency. To do so, click on "Users And Organizations" on the side panel and select "User". This will bring up a list of all "Users" already defined in Sense.

Next, click on "Create new". This will bring you to a configuration menu where you can create a new user by keying in their email addresses (and replicating the input in the "Remote Id" field). Once you click "Save", you will have created a new user with the specified email address, in Sense.

<iframe
    src="https://www.youtube.com/embed/sLV6QhLtZaM?si=1nbpdiwP0icqtnJE"
    title="Creating Users"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Creating Super Users
As a Super User, you can create other Super Users for your Agency. To do so, click on "Users And Organizations" on the side panel and select "Superuser". This will bring up a list of all "Superusers" already defined in Sense.

Next, click on "Create new". This will bring you to a configuration menu where you can create a new Super User by selecting from a dropdown list of existing users.

<iframe
    src="https://www.youtube.com/embed/cYP-nK8PqRM?si=ObuDgmeieF7htHeA"
    title="Creating Super Users"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Creating Organization Admins
Another thing to do after creating an Organization is to create an Organization Admin. To do so, click on "Users And Organizations" on the side panel and select "Organization Admin". This will bring up a list of all "Organization Admins" already defined in Sense.

Next, click on "Create new" (or "Create first record" if it's your first Organization). This will bring you to a dropdown dialogue box where you can select an existing user and the Organization you want him to be an Organization Admin of. In the video below, we are selecting karen_teo@ssg.gov.sg to be the Organization Admin of the "SSG Public Engagement Division" Organization. Once you click "Save", the selected user will be the Organization Admin of the selected Organization.

<iframe
    src="https://www.youtube.com/embed/T3AyZepPm6k?si=FpoPowTxw8Pl6Ztq"
    title="Creating Organization Admins"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

## Organization Admins >> Creating Users, Assigning Databases to Users & Controlling Database Visibility

### Creating Users
As an Organization Admin, you can also create a list of users for your Agency. To do so, click on "Users And Organizations" on the side panel and select "User". This will bring up a list of all "Users" already defined in Sense.

Next, click on "Create new". This will bring you to a configuration menu where you can create a new user by keying in their email addresses (and replicating the input in the "Remote Id" field). Once you click "Save", you will have created a new user with the specified email address, in Sense.

<iframe
    src="https://www.youtube.com/embed/sLV6QhLtZaM?si=1nbpdiwP0icqtnJE"
    title="Creating Users"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Assigning Databases to Users
As an Organization Admin, you should assign a Database to the users within Organization so they have a dataset to query. Click on "Metabase" on the side panel and select "Database". This will bring up a list of all Databases already connected to Sense.

Next, click on the Database that you wish to assign access to (in the video below, we are choosing the Database called "SSG Redshift"). This will then bring up a configuration panel where you can define the "Users With Database Access". Click on "Add existing item" and this will bring up a dropdown selection box where you can select the users in the Organization you wish to assign this Database to.

<iframe
    src="https://www.youtube.com/embed/rg-SAPrre6A?si=nug9oh2QeI0oVFYg"
    title="Assigning Databases to Users"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

### Controlling Database Visibility
As Organizational Admins, you are able to control what data tables or datafields are visible to users using the Sense chat interface. There are two levels of controlling database visibility:

- Table Visibility
- Field Visibility

#### Table Visibility
To control table visibility, click on "Metabase" on the side panel and select "Database". This will bring up a list of all Databases already connected to Sense.

Next, click on the Database that you wish to control visibility for (in the video below, we are choosing the Database called "SSG Redshift"). This will then bring up a configuration panel where you can click on "Tables", which will then bring up a list of all the data tables in your database. 

Each line item is a data table within your database, and the last column "Visibility" shows whether your data table is "Visible" or "Hidden" from users in the Sense chat interface.

To toggle the visbility of each data table, click on the data table you wish to adjust. This brings you to a configuration panel where you can toggle the visibility of the data table in question.

<iframe
    src="https://www.youtube.com/embed/ZAs_qxwOMus?si=6PeRnMu9tYziDaGa"
    title="Controlling Table Visibility"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

#### Field Visibility
To control field visibility, click on "Metabase" on the side panel and select "Database". This will bring up a list of all Databases already connected to Sense.

Next, click on the Database that you wish to control visibility for (in the video below, we are choosing the Database called "SSG Redshift"). This will then bring up a configuration panel where you can click on "Tables", which will then bring up a list of all the data tables in your database. 

Click on the data table that you're interested in and you will be shown a list of all the datafields within the data table. Each line item is a datafield within your data table, and the last column "Visibility" shows whether your data table is "Visible" or "Hidden" from users in the Sense chat interface.

To toggle the visbility of each datafield, click on the datafield you wish to adjust. This brings you to a configuration panel where you can toggle the visibility of the datafield in question.

<iframe
    src="https://www.youtube.com/embed/kkWLgsetrzI?si=lOd700ew-p-W_Odu"
    title="Controlling Field Visibility"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
>
</iframe>

# Conclusion
In summary, Sense is a complete data analytics package for government agencies to self-deploy within their own environment. It was designed to give government agencies full control over the critical portions of their work and data governance processes, with the hopes of allowing them to access state of the art LLM technologies without fear of data breaches.

On our open source Github repository, you will find a lot more technical documentation. This will be useful for the various IT divisions of the respective government agencies who would like to set up Sense as an in-house data analytics solution.


