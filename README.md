
# Rent My Tent - Mono-Repo - v0.0.1

### Environment

 - Mac OSX 10.14.5
 - Node v12.16.1
 - NPM v6.13.4
 - Xcode v11.3.1
 - Android Studio v3.6.1
 - React v16.12.0
 - React-Native v0.61.5
 - React-Native-Web v0.12.1

### Install

  - `$ yarn`
  - `$ cd packages/mobile/ios`
  - `$ pod install`
  - `$ cd -`
  
### Run for Web
  
  - `$ yarn workspace web start`
  - Browse to http://localhost:3000
  
### Run for IOS or Android
  
  - `$ yarn workspace mobile start`
  - Run the project;
    - [iOS] Via Xcode
      - `$ yarn xcode` (open the project on Xcode)
      - Press the Run button
    - [Android] Via Android Studio
      - `$ yarn studio` (open the project on Android Studio)
        - **NOTE**: Requires creating a Command-Line Launcher from Android Studio. Easiest way is to create a shortcut using Android Studio's built in tool: Menu --> Tools --> Create command line launcher.
      - Press the Run button
    - Via CLI
      - _You may need to launch your device emulator before the next command_
      - `$ yarn android` or `$ yarn ios`
