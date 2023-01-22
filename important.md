####  Important  ####

As the website is https protected but the api is http secured only. Therefore at runtime it will give mixed content error.

To avoid this we have to allow insecure
Steps to Allow Insecure Content in Chrome

To allow insecure content on individual sites within Chrome, click on the lock icon in the URL bar, then click 'Site settings'.

enter image description here


There you will see a list of various permissions the page has. Choose 'Allow' next to 'Insecure content'.

enter image description here

Now your HTTPS site can access HTTP endpoint
