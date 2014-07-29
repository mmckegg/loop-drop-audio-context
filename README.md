loop-drop-audio-context
===

AudioContext prepopluted with all the soundbank modules used in [Loop Drop](https://github.com/mmckegg/loop-drop-app).

Use this connecting to [loop-drop-server](https://github.com/mmckegg/loop-drop-server) and using [soundbank](https://github.com/mmckegg/soundbank) and you want things to sound consistent.


## Install

```bash
$ npm install loop-drop-audio-context
```

## Usage

```js
var Soundbank = require('soundbank')
var audioContext = require('loop-drop-audio-context')

var soundbank = Soundbank(audioContext)
soundbank.connect(audioContext.destination)

soundbank.update({
  id: '5',
  offset: 0,
  sources: [
    { node: 'oscillator',
      shape: 'sawtooth',
      note: {
        node: 'scale',
        scale: 'major',
        root: 60
      }
    }
  ],
  processors: [
    { node: 'filter',
      type: 'lowpass',
      frequency: { 
        node: 'lfo',
        rate: 4,
        shape: 'sine',
        sync: true,
        value: 1000,
        amp: 1000
      }
    },
    { node: 'delay', 
      time: 3/8,
      wet: 0.5
    },
    { node: 'overdrive' }
  ]
})

soundbank.update({
  id: '6',
  node: 'inherit',
  from: '5',
  offset: 1
})

soundbank.update({
  id: '7',
  node: 'inherit',
  from: '5',
  offset: 2
})

soundbank.triggerOn(5, audioContext.currentTime + 1)
soundbank.triggerOff(5, audioContext.currentTime + 2)

soundbank.triggerOn(6, audioContext.currentTime + 3)
soundbank.triggerOff(6, audioContext.currentTime + 4)

soundbank.triggerOn(7, audioContext.currentTime + 5)
soundbank.triggerOff(7, audioContext.currentTime + 6)
```