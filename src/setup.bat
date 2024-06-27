@echo off

:: Title of the script
title BotGenie Installer

:: Display big text
echo ######################################################################
echo #                      BotGenie Installer                            #
echo ######################################################################
echo.

:: Ask user for installation location
set /p installLocation=Please enter the installation location (e.g., C:\BotGenie): 

:: Check if the specified folder exists
if not exist "%installLocation%" (
    echo Creating installation folder: %installLocation%
    mkdir "%installLocation%"
) else (
    echo Installation folder already exists: %installLocation%
)

:: Move the entire parent folder to the specified location
echo Moving the script and its contents to %installLocation%...
move "%~dp0" "%installLocation%" > nul

:: Change directory to the new location
cd /d "%installLocation%"

:: Download the Node.js installer
echo Downloading Node.js installer...
powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi -OutFile node-v20.15.0-x64.msi"

:: Check if the download was successful
if %errorlevel% neq 0 (
    echo Failed to download Node.js installer.
    pause
    exit /b %errorlevel%
)

:: Run the Node.js installer quietly
echo Running Node.js installer...
start /wait msiexec /i node-v20.15.0-x64.msi /quiet

:: Check if the installation was successful
if %errorlevel% neq 0 (
    echo Failed to install Node.js.
    pause
    exit /b %errorlevel%
)

:: Ask the user for input
set /p token=Please enter your token: 
set /p prefix=Please enter your prefix: 
set /p userid=Please enter your user ID: 

:: Save the input to config.json in the new location
(
echo {
echo     "token": "%token%",
echo     "prefix": "%prefix%",
echo     "userId": "%userid%"
echo }
) > config.json

:: Display the content of config.json
echo.
echo The following configuration has been saved to %installLocation%\config.json:
type config.json

:: Install npm packages
echo Installing npm packages...
npm install

:: Check if npm install was successful
if %errorlevel% neq 0 (
    echo Failed to install npm packages.
    pause
    exit /b %errorlevel%
)

:: Create the run_bot.bat file in the new location
echo @echo off > run_bot.bat
echo echo You currently have no commands installed, get some from our GitHub before running. >> run_bot.bat
echo pause >> run_bot.bat
echo exit /b 0 >> run_bot.bat

:: Notify user about the created run_bot.bat
echo.
echo The run_bot.bat file has been created in %installLocation%. You can use it to run your bot with "node index.js".
echo.

:: Pause to allow the user to see the information
pause

:: End of script
exit /b 0
