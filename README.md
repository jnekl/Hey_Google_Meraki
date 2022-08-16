# Hey_Google_Meraki
This project will be integrating Google Nest assistant with Meraki API, so that you can interact, configure, and monitor your home network with Google Nest voice commands such as "Hey Google, how many clients are on the Wi-Fi?" and many more.

This project consists of 3 main sections:
  1. [Meraki Dashboard API](https://developer.cisco.com/meraki/api-latest/) - to interact with Meraki devices 
  2. Google Actions Console - to configure conversational aspect
  3. Google Functions - fulfilment platform 
 
 **Setup** 

**Meraki Dashboard API:**

Enable API access in your Meraki dashboard organization and obtain an API key [instructions](https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API/).


**Google Actions Console:**

Prerequisites:

Assuming that you already have a Google account and a Google Assistant, we need to activate a few things on Google account (source: https://codelabs.developers.google.com/codelabs/actions-builder-1#1)

Check your Google permission settings. First of all, you need to enable the necessary permissions so the simulator can access your Action. To enable permissions, follow these steps:

Go to the Activity controls page.
If you haven’t already done so, sign in with your Google Account.
Enable the following permissions:
Web & App Activity
Under Web & App Activity, select the Include Chrome history and activity from sites, apps, and devices that use Google services checkbox.
Create an Actions project. Your Actions project is a container for your Action. To create your Actions project for this codelab, follow these steps:

Open the Actions console.
Click New project.
Type in a project name, such as meraki-api. (The name is for your internal reference. Later, you can set an external name for your project.)
Click Create project.
In the What kind of Action do you want to build? screen, select the Custom card.
Click Next.
Select the Blank project card.
Click Start building.
Associate a billing account. To deploy your fulfilment later in this lab using Cloud Functions, you must associate a billing account with your project in Google Cloud. If you haven’t already associated a billing account with your project, follow these steps:

Go to the Google Cloud Platform billing page.
Click Add billing account or Create Account.
Enter your payment information.
Click Start my free trial or Submit and enable billing.
Go to the Google Cloud Platform billing page.
Click the My Projects tab.
Click the three dots under Actions next to the Actions project for the lab.
Click Change billing.
In the drop-down menu, select the billing account you configured. Click Set account.
To avoid incurring charges, follow the steps in the Clean up your project section at the end of this codelab.

Configuration:

Once all pre-requisites are met, we can move on to the Google Actions Console configuration. This is where the conversational part of the flow is configured.

Step 1. Go to Develop > Settings > Display name and set the key phrase. This phrase is going to be used to activate your application. Also, you can choose a Google Assistant voice here based on your preferences.

Step 2. Go to Main Invocation and change the settings as per the screenshot below. The response from Google upon activation can be set in the speech section of YAML file. You won’t be able to set a transition to the scene just yet, but once we create a scene, please, come back to the Main invocation and select it from drop-down menu.

Step 3. Create an intent for your action by clicking to a + button. Provide as many training phrases as you can, use all possible synonyms and options. After all, it will help the Assistant to understand your query if you deviate slightly from a training phrase.

Step 4. Create and configure a scene. You can think of a scene as something similar to Interactive Voice Menu in a call center environment. You hear a pre-recorded message and you select your options by pressing 1, 2 or other buttons. In our case, instead of pressing those buttons we will just give our Google Assistant commands and we will get a response based on our query. The scene allows you to configure a very complex scenario but we will try to keep things simple in this example. Let’s just add all intents in the User Intent Handling section. In When Intent is matched, check Call your webhook box and type the handler name. The handler name will have to match to the method in our code which will write a bit later.


**Google Functions:**

This is where we start coding and programming our handlers which in turn will fulfil our service. We have already activated the Google Function which is part of Google Cloud suite. This is a paid service by Google, however, the first 2 million invocation per month are free so it should be more than enough for our use case.

Go to Webhooks section in Google Actions Console and you will see a code editor there with a few lines of code.

This code is to program a handler which returns a number of clients currently connected to the network. There are two pieces of input: your API key from Meraki Dashboard and your Meraki network ID [how to find network ID](https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-network-id)
  -Please see "Index.js" file for the code
  

After that you need to save the changes and hit Deploy Fulfilment button (it might take a couple of minutes to deploy a new code). There is a View Logs link on this page which is going to bring you to the Google Functions page. It is handy to use this page for debugging while writing and testing your code. Use this statement in NODE.JS is going to print the output into logs console.log();

As you can see, Google Actions is using Node.JS as a programming language and I understand that it might not be the first language of your choice but do not worry. Meraki have got you covered. There is very detailed documentation which contains not only a full list of API endpoints and sample responses, it also includes code snippets for different programming languages including Node.JS which you can just copy and paste to create your own handler.



**Conclusion**
This project was a way to showcase the endless possibilites with the Meraki API and ultimately automate. Meraki's goal is to simplify eveything and I believe we showed a fun way to simplify using Google voice commands.
