####  Important  ####

As the website is https protected but the api is http secured only. Therefore at runtime it will give mixed content error.

![Screenshot (14)](https://user-images.githubusercontent.com/78202118/213909428-8ff3ffe1-9ee3-4afb-883c-8ef2d6139166.png)


To avoid this we have to allow insecure content in chrome

# Steps to Allow Insecure Content in Chrome

To allow insecure content on individual sites within Chrome, click on the lock icon in the URL bar, then click 'Site settings'.

![image](https://user-images.githubusercontent.com/78202118/213909405-d50a50db-f44b-4348-8543-7da708da315f.png)

There you will see a list of various permissions the page has. Choose 'Allow' next to 'Insecure content'.

![image](https://user-images.githubusercontent.com/78202118/213909415-fc04344f-23a9-40db-bf11-f4a937de4c0b.png)

Now your HTTPS site can access HTTP endpoint
