# BrainEdit
Mindmachine Editor for generating binaural Tracks and flickering LED-Arduino-Glasses support.
This Editor is part of the www.brainstatesharing.com project.

![Screenshot](https://raw.githubusercontent.com/cpietsch/BrainEdit/master/screenshot.png?raw=true "Screenshot")

# Build
- current nw.js version: 0.12.0
- npm install
- serialport needs recompilation with 0.12.0 nw flag (https://github.com/nwjs/nw-gyp/issues/69)
- Put nw.js as OSX version in deploy/ as BrainEdit.app and execute deploy.sh

# Arduino
- Put the sketch in /arduino on your arduino
- Make yourself nice goggles and connect the leds to the pins stated in the sketch